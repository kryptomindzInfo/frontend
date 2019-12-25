import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BankRoute = ({component: Component, ...rest}) => {
    function isLogin(){
        var token = localStorage.getItem('bankLogged');
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
            : <Redirect to="/bank" />
        )} />
    );
};

export default BankRoute;