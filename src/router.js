import React, { Fragment } from 'react';
import { Router, Route, Switch, Redirect, Link } from 'dva/router';
import { PublicRouters, PrivateRouters } from './config/router';
import { PrivateRoute, dynamicComponent } from './utils/formatRoute';

import LoginLayout from './routes/layout/LoginLayout';
import SystemLayout from './routes/layout/SystemLayout';
import MyOrder from './routes/order/shopOrder/MyOrder';
import E404 from './routes/exception/404';

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Fragment>
        <Switch>
          <Redirect exact from="/" to="/system/order/shopOrder/myOrder" />
          {
            PublicRouters.map(({path, models, component})=> {
              const UserComponent = dynamicComponent(app, models, component);
              return <Route path={path} exact component={UserComponent} key={path} />;
            })
          }
          {
            PrivateRouters.map(({path, models, component}, i)=> {
              const UserComponent = dynamicComponent(app, models, component);
              return <PrivateRoute path={path} Component={UserComponent} key={path} />;
            })
          }
          <Redirect to="/404" />
        </Switch>
       </Fragment>
    </Router>
  );
}

export default RouterConfig;
