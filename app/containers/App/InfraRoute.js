import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const InfraRoute = ({component: Component, ...rest}) => {
    function isLogin(){
        var token = localStorage.getItem('logged');
        if(!token || token == null || token == undefined || token == ''){
            return false;
        }else{
            return true;
        }
    }
    return (
        <Route {...rest} render={props => (
            isLogin() ?
              <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default InfraRoute;
