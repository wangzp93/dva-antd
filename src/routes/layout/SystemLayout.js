import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { Switch, Route, Redirect } from 'dva/router';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';

import Exception404 from '../exception/404';
import { PrivateRoute, dynamicComponent } from '../../utils/formatRoute';
import { SystemRouters } from '../../config/router';
import { getMenu } from '../../utils/formatMenu';
import { MenuList } from '../../config/menu';

const { Header, Content, Sider, Footer } = Layout;
const BreadcrumbItem = Breadcrumb.Item;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

@connect(models=> ({
    user: models["user"]
}))
export default class SystemLayout extends PureComponent {
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys: ""
    }
    componentDidMount() {
        this.setCollapseMenus(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // props改变时，也要改变菜单
        this.setCollapseMenus(nextProps);
    }
    // 根据路由，设置展开的SubMenu和选中的MenuItem
    setCollapseMenus = (props)=> {
        // 把 '/system/order/shopOrder/myOrder' 转换为 ['/system/order/', '/system/order/shopOrder']
        let path = props.location.pathname;
        if (path == "/system/404") return;
        let openKeys = [];
        while(openKeys[openKeys.length-1] != path) {
            let lastPath = openKeys[openKeys.length-1];
            let start = openKeys.length>0 ? lastPath.length : 0;
            let end = path.indexOf("/", start+1);
            let key = path.substring(0, end>0 ? end : path.length);
            openKeys.push(key);
        }
        openKeys.shift();   // 第一个是根路径，在菜单中不存在，要删除
        openKeys.pop();     // 最后一个是MenuItem，也要删除
        this.setState({
            openKeys,
            selectedKeys: path
        });
    }
    loginout = ()=> {
        this.props.dispatch({
            type: "user/setUser",
            payload: {
                userId: ""
            }
        });
        setTimeout(()=> {
            this.props.history.push("/login");
        }, 500);
    }
    // 折叠左侧菜单栏
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    // 折叠或展开菜单时触发
    openChange = (openKeys)=> {
        this.setState({
            openKeys
        });
    }
    // 点击MenuItem时，跳转路由
    clickMenu = ({ key })=> {
        this.props.history.push(key);
    }
    render() {
        const { collapsed, openKeys, selectedKeys } = this.state;
        const menu = (
            <Menu>
                {/* <MenuItem>修改密码</MenuItem> */}
                {/* <Menu.Divider /> */}
                <MenuItem onClick={this.loginout}>退出登录</MenuItem>
            </Menu>
        );
        return (
            <Layout style={{minHeight: "100%"}}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div style={{ height: 32, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        onOpenChange={this.openChange}
                        onClick={this.clickMenu}
                    >
                        {
                            getMenu(MenuList, "/system")
                        }
                    </Menu>
                </Sider>
                <Layout style={{minHeight: "100%"}}>
                    <Header theme="lignt" style={{ paddingLeft: 20, background: "#FFF" }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Dropdown overlay={menu}>
                            <span style={{ float: "right", cursor: "pointer"}} onClick={e => e.preventDefault()}>
                                <UserOutlined />
                                <span style={{marginLeft: 10, fontSize: 18}}>{ this.props.user.userName }</span>
                            </span>
                        </Dropdown>
                    </Header>
                    <Breadcrumb style={{ margin: '16px 20px' }}>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>List</BreadcrumbItem>
                        <BreadcrumbItem>App</BreadcrumbItem>
                    </Breadcrumb>
                    <Content style={{ margin: "0 20px", minHeight: 280, background: "#FFF" }}>
                        <Switch>
                            {
                                SystemRouters.map(({path, models, component})=> {
                                    const UserComponent = dynamicComponent(this, models, component);
                                    return <PrivateRoute path={path} Component={UserComponent} key={path} />;
                                })
                            }
                            <Route exact path="/system/404" component={Exception404} />
                            <Redirect to="/system/404" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}> ©2020 Created by wangzp </Footer>
                </Layout>
            </Layout>
        );
    }
}