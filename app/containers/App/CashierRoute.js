import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CashierRoute = ({ component: Component, ...rest }) => {
  function isLogin() {
    var token = localStorage.getItem('cashierLogged');
    if (!token || token == null || token == undefined || token == '') {
      return false;
    } else {
      return true;
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} {...rest} /> : <Redirect to={"/cashier/"+this.props.match.params.bank} />
      }
    />
  );
};

export default CashierRoute;
