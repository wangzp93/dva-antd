import React from 'react';
import { Link } from 'dva/router';
import * as Icon from '@ant-design/icons';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

/**
 * 获取垂直菜单
 * @param {*} MenuList 
 * @param {*} parentPath 
 */
export function getMenu(MenuList, parentPath) {
    return MenuList.map(({ path, name, icon="", children=[] })=> {
        let myPath = `${parentPath}/${path}`;
        return (
            children.length > 0 ?
            <SubMenu key={myPath} icon={React.createElement(Icon[icon])} title={name}>
                {
                    getMenu(children, myPath)
                }
            </SubMenu> :
            <MenuItem key={myPath}>{name}</MenuItem>
        );
    });
}