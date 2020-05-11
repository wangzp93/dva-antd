import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

@connect()
export default class SystemLayout extends PureComponent {
    login = ()=> {
        this.props.dispatch({
            type: "user/setUser",
            payload: {
                userId: "1",
                userName: "wangzp"
            }
        });
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <h1>login</h1>
                <Button onClick={this.login}>登录</Button>
            </div>
        );
    }
}