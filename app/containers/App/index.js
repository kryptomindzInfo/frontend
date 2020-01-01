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
import InfraRoute from './InfraRoute';
import BankRoute from './BankRoute';

import HomePage from 'containers/HomePage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import OTPPage from 'containers/OTPPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import BankPage from 'containers/BankPage/Loadable';
import InfraInfo from 'containers/InfraInfo/Loadable';
import CreateFee from 'containers/CreateFee/Loadable';
import EditFee from 'containers/EditFee/Loadable';
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
import BankInfo from 'containers/BankInfo/Loadable';
import BankDocuments from 'containers/BankDocuments/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import BankFees from 'containers/BankFees/Loadable';
import Documents from 'containers/Documents/Loadable';
import OperationalHistory from 'containers/OperationalHistory/Loadable';
import MasterHistory from 'containers/MasterHistory/Loadable';
import InfraProfile from 'containers/InfraProfile/Loadable';
import BankOperationalHistory from 'containers/BankOperationalHistory/Loadable';
import TermsConditions from '../../components/TermsConditions';


import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../global-styles';

import 'react-toastify/dist/ReactToastify.css';import FeeList from '../FeeList';

const theme = {
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
  const token = localStorage.getItem('logged');
  const bankToken = localStorage.getItem('bankLogged');
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} notify={notify} />
          <Route exact path="/setup" component={SetupPage} notify={notify} />
          <Route exact path="/lang" component={LocaleToggle} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/forgot-setup" component={ForgotSetup} />
          <Route exact path="/otp" component={OTPPage} />

          <InfraRoute exact path = "/dashboard" component={DashboardPage} />
          <InfraRoute exact path="/banks" component={BankPage} />
          <InfraRoute exact path="/profile" component={InfraProfile} />
          <InfraRoute exact path="/user" component={UserPage} />
          <InfraRoute path="/fees/:bank?" component={FeeList} />
          <InfraRoute path="/info/:bank?" component={InfraInfo} />
          <InfraRoute path="/createfee/:bank?" component={CreateFee} />
          <InfraRoute path="/editfee/:bank?" component={EditFee} />
          <InfraRoute path="/documents/:bank?" component={Documents} />
          <InfraRoute path="/operationalHistory/:bank?" component={OperationalHistory} />
          <InfraRoute path="/masterHistory/:bank?" component={MasterHistory} />

          <Route exact path="/bank" component={BankLoginPage} />
          <Route exact path="/bank/setup" component={BankSetupPage} />
          <Route exact path="/bank/activate" component={BankActivate} />
          <Route exact path="/bank/forgot-password" component={BankForgotPasswordPage}/>
          <Route exact path="/bank/otp" component={BankOTPPage} />
          <Route exact path="/termsConditions" component={TermsConditions} />


          <BankRoute exact path="/bank/dashboard" component={BankDashboard} />
          <BankRoute path="/bank/info" component={BankInfo} />
          <BankRoute path="/bank/fees" component={BankFees} />
          <BankRoute path="/bank/documents" component={BankDocuments} />
          <BankRoute path="/bank/operationalHistory" component={BankOperationalHistory} />

          

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}
