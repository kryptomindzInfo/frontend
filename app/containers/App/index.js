/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import HomePage from 'containers/HomePage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import OTPPage from 'containers/OTPPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import BankPage from 'containers/BankPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from '../../global-styles';

const theme = {
  primary: '#417505',
  secondary: '#6cac69',
  light : '#9ea0a5',
  vGradient : 'linear-gradient(to bottom, #6cac6a, #102910)',
  hGradient : 'linear-gradient(to right, #6cac6a 1%, #102910)',
  font: 'Roboto',
  fontSize: '14px',
};

import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function App() {
  const notify = () => toast("Wow so easy !");
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Switch>
        <Route exact path="/" component={HomePage} notify={notify} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/otp" component={OTPPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/bank" component={BankPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}
