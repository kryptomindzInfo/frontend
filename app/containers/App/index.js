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
import BankInfo from 'containers/BankInfo/Loadable';
import CreateFee from 'containers/CreateFee/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LocaleToggle from 'containers/LocaleToggle/index';

import BankLoginPage from 'containers/BankLoginPage/Loadable';
import BankForgotPasswordPage from 'containers/BankForgotPasswordPage/Loadable';
import BankOTPPage from 'containers/BankOTPPage/Loadable';
import BankSetupPage from 'containers/BankSetupPage/Loadable';
import BankDashboard from 'containers/BankDashboard/Loadable';
import BankActivate from 'containers/BankActivate/Loadable';
import SetupPage from 'containers/SetupPage/Loadable';
import ForgotSetup from 'containers/ForgotSetup/Loadable';
import BankBankInfo from 'containers/BankBankInfo/Loadable';
import OperationalHistory from 'containers/OperationalHistory/Loadable';
import MasterHistory from 'containers/MasterHistory/Loadable';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../global-styles';

import 'react-toastify/dist/ReactToastify.css';const theme = {
  primary: '#417505',
  secondary: '#6cac69',
  accent: '#f5a623',
  light: '#9ea0a5',
  vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
  hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
  font: 'Roboto',
  fontSize: '14px',
};
toast.configure();

export default function App() {
  const notify = () => toast('Wow so easy !');
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} notify={notify} />
          <Route exact path="/setup" component={SetupPage} notify={notify} />
          <Route exact path="/lang" component={LocaleToggle} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/otp" component={OTPPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/banks" component={BankPage} />
          <Route exact path="/bank" component={BankLoginPage} />
          <Route exact path="/" component={HomePage} notify={notify} />
          <Route exact path="/bank/setup" component={BankSetupPage} />
          <Route exact path="/forgot-setup" component={ForgotSetup} />
          
          <Route path="/fees/:bank?" component={BankInfo} />
          <Route path="/bank/info" component={BankBankInfo} />
          <Route path="/createfee/:bank?" component={CreateFee} />
          <Route path="/operationalHistory/:bank?" component={OperationalHistory} />
          <Route path="/masterHistory/:bank?" component={MasterHistory} />
          <Route
            exact
            path="/bank/forgot-password"
            component={BankForgotPasswordPage}
          />
          <Route exact path="/bank/otp" component={BankOTPPage} />
          <Route exact path="/bank/activate" component={BankActivate} />
          <Route exact path="/bank/dashboard" component={BankDashboard} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}
