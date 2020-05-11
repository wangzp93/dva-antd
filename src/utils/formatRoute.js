import React from 'react';
import { connect } from 'dva';
import dynamic from 'dva/dynamic';
import { Route, Redirect } from 'dva/router';

/**
 * 权限控制的路由
 */
@connect(models=> ({
    user: models["user"]
}))
export class PrivateRoute extends React.Component {
    render() {
        const { userId } = this.props.user;
        const { path, Component, key } = this.props;
        return (
            userId != "" ?
            <Route path={path} key={key} render={(props)=><Component {...props} />} /> :
            <Redirect to="/login" />
        );
    }
}

/**
 * 按需引入models
 * @param {*} app 
 * @param {*} models 
 * @param {*} component 
 */
export function dynamicComponent(app, models, component) {
    return dynamic({
        app,
        models: ()=> models.map(m=> import(`../models/${m}`)),
        component: ()=> import(`../routes/${component}`)
    });
}