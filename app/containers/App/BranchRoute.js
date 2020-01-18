import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BranchRoute = ({ component: Component, ...rest }) => {
  function isLogin() {
    var token = localStorage.getItem('branchLogged');
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
        isLogin() ? <Component {...props} {...rest} /> : <Redirect to={"/branch/"+this.props.match.params.bank} />
      }
    />
  );
};

export default BranchRoute;
