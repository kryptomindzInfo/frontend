/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfraRoute from './InfraRoute';
import BankRoute from './BankRoute';
import BranchRoute from './BranchRoute';

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
import BankBranchInfo from 'containers/BankBranchInfo/Loadable';
import BankDocuments from 'containers/BankDocuments/Loadable';
import BankTheme from 'containers/BankTheme/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import BankFees from 'containers/BankFees/Loadable';
import Documents from 'containers/Documents/Loadable';
import OperationalHistory from 'containers/OperationalHistory/Loadable';
import MasterHistory from 'containers/MasterHistory/Loadable';
import InfraProfile from 'containers/InfraProfile/Loadable';
import BankOperationalHistory from 'containers/BankOperationalHistory/Loadable';
import BankBranchList from 'containers/BankBranchList/Loadable';
import TermsConditions from 'components/TermsConditions';
import BankCreationConfirmationPage from '../../components/BankCreationConfirmationPage';
import BankCreateFee from 'containers/BankCreateFee/Loadable';
import BankCashierList from 'containers/BankCashierList/Loadable';
import BankUser from 'containers/BankUser';
import BranchLogin from 'containers/BranchLogin';
import BranchForgotPassword from 'containers/BranchForgotPassword';
import BranchOTPPage from 'containers/BranchOTPPage';
import BranchSetup from 'containers/BranchSetup';
import BranchDashboard from 'containers/BranchDashboard';
import BranchInfo from 'containers/BranchInfo';
import BankCashierInfo from 'containers/BankCashierInfo';
import BranchCashierList from 'containers/BranchCashierList';
import BranchCashierInfo from 'containers/BranchCashierInfo';
import CashierLogin from 'containers/CashierLogin';
import CashierForgotPassword from 'containers/CashierForgotPassword';
import CashierOTPPage from 'containers/CashierOTPPage';
import CashierSetup from 'containers/CashierSetup';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../global-styles';

import 'react-toastify/dist/ReactToastify.css';
import FeeList from '../FeeList';

const appTheme = {
  primary: '#417505',
  // primary: "#ff0000",
  // secondary: "#ff0000",
  secondary: '#6cac69',
  accent: '#f5a623',
  light: '#9ea0a5',
  greyLine: '#666565 ',
  vGradient: 'linear-gradient(to bottom, #6cac6a, #102910)',
  hGradient: 'linear-gradient(to right, #6cac6a 1%, #102910)',
  font: 'Roboto',
  fontSize: '14px',
};
toast.configure();

export default function App(props) {
  const [theme, setTheme] = useState(appTheme);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTheme({ primary: "#ff0000"})
  //   }, 3000)
  // }, [])

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
          <Route exact path="/termsConditions" component={TermsConditions} />

          <InfraRoute exact path="/dashboard" component={DashboardPage} />
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
          <InfraRoute path="/bankCreation-confirmationPage" component={BankCreationConfirmationPage} />

          <Route exact path="/bank" component={BankLoginPage} />
          <Route exact path="/bank/setup" component={BankSetupPage} />
          <Route exact path="/bank/activate" component={BankActivate} />
          <Route exact path="/bank/forgot-password" component={BankForgotPasswordPage} />
          <Route exact path="/bank/otp" component={BankOTPPage} />

          <BankRoute exact path="/bank/dashboard" component={BankDashboard} />
          <BankRoute path="/bank/info" component={BankInfo} />
          <BankRoute path="/bank/fees" component={BankFees} />
          <BankRoute path="/bank/documents" component={BankDocuments} />
          <BankRoute path="/bank/branches" component={BankBranchList} />
          <BankRoute path="/bank/branch/:branch?" component={BankBranchInfo} />
          <BankRoute path="/bank/cashiers/:branch?" component={BankCashierList} />
          <BankRoute path="/bank/users" component={BankUser} />
          <BankRoute path="/bank/create-fee" component={BankCreateFee} />
          <BankRoute path="/bank/theme" component={BankTheme} setTheme={setTheme} appTheme={theme} />
          <BankRoute path="/bank/operationalHistory" component={BankOperationalHistory} />
          <BankRoute exact path="/bank/cashier/:branch?/:cashier?" component={BankCashierInfo} />

          <Route exact path="/branch/:bank?" component={BranchLogin} />
          <Route exact path="/branch/:bank?/forgot-password" component={BranchForgotPassword} />
          <Route exact path="/branch/:bank?/otp" component={BranchOTPPage} />
          <Route exact path="/branch/:bank?/setup" component={BranchSetup} />
          <BranchRoute exact path="/branch/:bank?/dashboard" component={BranchDashboard} />
          <BranchRoute exact path="/branch/:bank?/info" component={BranchInfo} />
          <BranchRoute exact path="/branch/:bank?/cashiers" component={BranchCashierList} />
          <BranchRoute exact path="/branch/:bank?/cashier/:cashier?" component={BranchCashierInfo} />

          <Route exact path="/cashier/:bank?" component={CashierLogin} />
          <Route exact path="/cashier/:bank?/forgot-password" component={CashierForgotPassword} />
          <Route exact path="/cashier/:bank?/otp" component={CashierOTPPage} />
          <Route exact path="/cashier/:bank?/setup" component={CashierSetup} />

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}
