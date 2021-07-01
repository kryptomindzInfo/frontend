/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

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
import InterBankFees from 'containers/InterBankFees/Loadable';
import Documents from 'containers/Documents/Loadable';
import OperationalHistory from 'containers/OperationalHistory/Loadable';
import MasterHistory from 'containers/MasterHistory/Loadable';
import InfraProfile from 'containers/InfraProfile/Loadable';
import InfraReports from 'containers/InfraReports/Loadable';
import InfraCurrency from 'containers/InfraCurrency/Loadable';
import InfraCountry from 'containers/InfraCountry/InfraCountry';
import History from 'containers/History/Loadable';
import BankMasterHistory from 'containers/BankMasterHistory/Loadable';
import BankEscrowHistory from 'containers/BankEscrowHistory/Loadable';
import BankBranchList from 'containers/BankBranchList/Loadable';
import TermsConditions from 'components/TermsConditions';
import BankCreateFee from 'containers/BankCreateFee/Loadable';
import BankCreateInterBankFee from 'containers/BankCreateInterBankFee/Loadable';
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
import BranchOperationalHistory from 'containers/BranchOperationalHistory';
import BranchMasterHistory from 'containers/BranchMasterHistory';
import CashierSendMoney from 'containers/CashierSendMoney';
import CashierLogin from 'containers/CashierLogin';
import CashierForgotPassword from 'containers/CashierForgotPassword';
import CashierOTPPage from 'containers/CashierOTPPage';
import CashierSetup from 'containers/CashierSetup';
import CashierDashboard from 'containers/CashierDashboard';
import CashierReports from 'containers/CashierReports';
import BranchReports from 'containers/BranchReports';
import CashierInfo from 'containers/CashierInfo';
import BankEditFee from 'containers/BankEditFee';
import BankEditInterBankFee from 'containers/BankEditInterBankFee';
import FeeList from 'containers/FeeList';
import InterBankFeeList from 'containers/InterBankFeeList';
import PartnerReports from 'containers/PartnerReports';
import BankReports from 'containers/BankReports';
import InfraMerchant from 'containers/InfraMerchantList/InfraMerchantList';
import MerchantReports from 'containers/MerchantReports';
import InfraMerchantReports from 'containers/InfraMerchantReports';
import { ThemeProvider } from 'styled-components';
import AllRoutes from './AllRoutes';
import BankCreationConfirmationPage from '../../components/BankCreationConfirmationPage';
import CashierRoute from './CashierRoute';
import BranchRoute from './BranchRoute';
import BankRoute from './BankRoute';
import InfraRoute from './InfraRoute';
import GlobalStyle from '../../global-styles';
import BankMerchantList from '../BankMerchantList/BankMerchantList';
import BankPartnerListPage from '../BankPartners/BankPartnerListPage';
import BankerCustomerListPage from '../BankCustomers/BankCustomerListPage';
import BankerCompensationPage from '../BankCompensation/BankCompensationPage';
import BankerOverallCompensationPage from '../BankCompensation/BankOverallCompensationPage';
import BackOfficeListPage from '../BackOffice/BackOfficeListPage';
import PartnerInfoPage from '../BankPartners/PartnerInfoPage';
import MerchantFeesPage from '../BankMerchantList/fees/MerchantFeesPage';
import MerchantInterBankFeesPage from '../BankMerchantList/interBankFees/MerchantFeesPage';
import CommissionFeesPage from '../BankMerchantList/commission/CommissionFeesPage';
import InterBankCommissionFeesPage from '../BankMerchantList/interBankCommission/CommissionFeesPage';
import MerchantSettingsPage from '../BankMerchantList/settings/MerchantSettingsPage';
import { InfraMerchantFeeListPage } from '../InfraMerchant/InfraMerchantFeeListPage';
import CashierMerchantListPage from '../CashierPayBills/CashierMerchantListPage';
import InfraMerchantList from '../InfraInfo/Merchants/InfraMerchantList';

const appTheme = {
  primary: '#417505',
  // primary: "#ff0000",
  // secondary: "#ff0000",
  secondary: '#6cac69',
  accent: '#f5a623',
  danger: '#f52828',
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
  const notify = () => toast('Wow so easy !');

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <BranchRoute exact path="/send-money" component={CashierSendMoney} />
          <Route exact path="/routes" component={AllRoutes} />
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
          <InfraRoute exact path="/reports" component={InfraReports} />
          <InfraRoute exact path="/profile" component={InfraProfile} />
          <InfraRoute exact path="/merchantlist" component={InfraMerchant} />
          <InfraRoute exact path="/currency" component={InfraCurrency} />
          <InfraRoute exact path="/country" component={InfraCountry} />
          <InfraRoute exact path="/user" component={UserPage} />
          <InfraRoute path="/fees/:bank?" component={FeeList} />
          <InfraRoute path="/inter-bank-fees/:bank?" component={InterBankFeeList} />
          <InfraRoute path="/info/:bank?" component={InfraInfo} />
          <InfraRoute path="/createfee/:bank?" component={CreateFee} />
          <InfraRoute path="/editfee/:bank?" component={EditFee} />
          <InfraRoute path="/documents/:bank?" component={Documents} />
          <InfraRoute
            path="/operationalHistory/:bank?"
            component={OperationalHistory}
          />
          <InfraRoute path="/masterHistory/:bank?" component={MasterHistory} />
          <InfraRoute
            path="/bankCreation-confirmationPage"
            component={BankCreationConfirmationPage}
          />
          <InfraRoute
            exact
            path="/infra/merchant/fees/:id"
            component={p => (
              <InfraMerchantFeeListPage active='fee' bank= 'intrabank' feeType="fee" {...p} />
            )}
          />
          <InfraRoute
            exact
            path="/infra/merchant/commission/:id"
            component={p => (
              <InfraMerchantFeeListPage active='commission' bank= 'intrabank' feeType="commission" {...p} />
            )}
          />
          <InfraRoute
            exact
            path="/infra/merchant/inter-bank-fees/:id"
            component={p => (
              <InfraMerchantFeeListPage active='interbankfees' bank='interbank' feeType="fee" {...p} />
            )}
          />
           <InfraRoute
            exact
            path="/infra/merchantreports/:id"
            component={InfraMerchantReports}
          />
          <InfraRoute
            exact
            path="/infra/merchant/inter-bank-commission/:id"
            component={p => (
              <InfraMerchantFeeListPage active='interbankcommission' bank='interbank' feeType="commission" {...p} />
            )}
          />
          <InfraRoute
            exact
            path="/merchants/:id"
            component={p => <InfraMerchantList {...p} />}
          />
          <Route  exact path="/bank" component={(props) => <BankLoginPage {...props} setTheme={setTheme} appTheme={theme} />} />
          <Route exact path="/bank/setup" component={BankSetupPage} />
          <Route exact path="/bank/activate" component={BankActivate} />
          <Route
            exact
            path="/bank/forgot-password"
            component={BankForgotPasswordPage}
          />
          <Route exact path="/bank/otp" component={BankOTPPage} />
          <BankRoute exact path="/bank/dashboard" setTheme={setTheme} appTheme={theme} component={BankDashboard} />
          <BankRoute exact path="/bank/agencies" component={BankBranchList} />
          <BankRoute path="/bank/info" component={BankInfo} />
          <BankRoute path="/bank/fees" component={BankFees} />
          <BankRoute path="/bank/interBankFees" component={InterBankFees} />
          <BankRoute path="/bank/documents" component={BankDocuments} />
          <BankRoute path="/bank/branches" component={BankBranchList} />
          <BankRoute path="/bank/branch/:branch?" component={BankBranchInfo} />
          <BankRoute exact path="/bank/reports" component={BankReports} />
          <BankRoute
            path="/bank/cashiers/:branch?"
            component={BankCashierList}
          />
           <BankRoute
            apitype='bank'
            exact
            path="/bank/branchcashier/reports/:id"
            component={CashierReports}
          />
          <BankRoute path="/bank/users" component={BankUser} />
          <BankRoute path="/bank/create-fee" component={BankCreateFee} />
          <BankRoute path="/bank/create-inter-bank-fee" component={BankCreateInterBankFee} />
          <BankRoute
            path="/bank/theme"
            component={BankTheme}
            setTheme={setTheme}
            appTheme={theme}
          />
          <BankRoute
            path="/bank/operationalHistory"
            component={History}
          />
          <BankRoute
            exact
            path="/bank/cashier/:branch?/:cashier?"
            component={BankCashierInfo}
          />
          <BankRoute exact path="/bank/create-fee" component={BankCreateFee} />
          <BankRoute exact path="/bank/create-inter-bank-fee" component={BankCreateInterBankFee} />
          <BankRoute
            exact
            path="/bank/theme"
            component={BankTheme}
            setTheme={setTheme}
            appTheme={theme}
          />
          <BankRoute
            exact
            path="/bank/escrowHistory"
            component={BankEscrowHistory}
          />
          <BankRoute
            exact
            path="/bank/masterHistory"
            component={BankMasterHistory}
          />
          <BankRoute
            exact
            path="/bank/cashier/:branch?/:cashier?"
            component={BankCashierInfo}
          />
          <BankRoute
            exact
            path="/bank/edit-fee/:fee?"
            component={BankEditFee}
          />
          <BankRoute
            exact
            path="/bank/edit-inter-bank-fee/:fee?"
            component={BankEditInterBankFee}
          />
          <BankRoute
            exact
            path="/bank/merchants"
            component={BankMerchantList}
          />
          <BankRoute
            exact
            path="/bank/merchants/fee/:id"
            component={MerchantFeesPage}
          />
           <BankRoute
            exact
            path="/bank/merchants/interbankfee/:id"
            component={MerchantInterBankFeesPage}
          />
          <BankRoute
            exact
            path="/bank/merchants/info/:id"
            component={MerchantSettingsPage}
          />
           <BankRoute
            exact
            path="/bank/partnerreports/:id"
            component={PartnerReports}
          />
           <BankRoute
            exact
            path="/bank/merchantreports/:id"
            component={MerchantReports}
          />
          
          
          <BankRoute
            exact
            path="/bank/merchants/commision/:id"
            component={CommissionFeesPage}
          />
           <BankRoute
            apitype={"bank"}
            exact
            path="/bank/branchdashboard/:id?"
            component={BranchDashboard}
          />
           <BankRoute
            apitype={"bank"}
            exact
            path="/bank/branchreports/:id?"
            component={BranchReports}
          />
         
          <BankRoute
            exact
            path="/bank/merchants/interbankcommision/:id"
            component={InterBankCommissionFeesPage}
          />
          <BankRoute
            exact
            path="/bank/partners"
            component={BankPartnerListPage}
          />
          <BankRoute
            exact
            path="/bank/customers"
            component={BankerCustomerListPage}
          />
          <BankRoute
            exact
            path="/bank/compensation"
            component={BankerOverallCompensationPage}
          />
          
           <BankRoute
            exact
            path="/bank/backoffice"
            component={BackOfficeListPage}
          />
          <BankRoute
            exact
            path="/bank/partners/info/:id"
            component={PartnerInfoPage}
          />

          <Route exact path="/branch/:bank?" component={BranchLogin} />
          <Route
            exact
            path="/branch/:bank?/forgot-password"
            component={BranchForgotPassword}
          />
          <Route exact path="/branch/:bank?/otp" component={BranchOTPPage} />
          <Route exact path="/branch/:bank?/setup" component={BranchSetup} />
          <BranchRoute
            exact
            apitype={'branch'}
            path="/branch/:bank?/dashboard"
            component={BranchDashboard}
          />
           <BranchRoute
            apitype='branch'
            exact
            path="/branch/:bank?/cashier/reports/:id"
            component={CashierReports}
          />
          <BranchRoute
            exact
            apitype={'branch'}
            path="/branch/:bank?/report"
            component={BranchReports}
          />
          {/* <BranchRoute
            exact
            path="/branch/operationalHistory"
            component={BranchOperationalHistory}
          /> */}
          <BranchRoute
            exact
            path="/branch/:bank?/operationalHistory"
            component={BranchOperationalHistory}
          />
          <BranchRoute
            exact
            path="/branch/:bank?/masterHistory"
            component={BranchMasterHistory}
          />
          <BranchRoute
            exact
            path="/branch/:bank?/info"
            component={BranchInfo}
          />
          <BranchRoute
            exact
            path="/branch/:bank?/cashiers"
            component={BranchCashierList}
          />
          <BranchRoute
            exact
            path="/branch/:bank?/cashier/:cashier?"
            component={BranchCashierInfo}
          />
          <BranchRoute
            exact
            path="/branch/:bank?/dashboard/send-money"
            component={CashierSendMoney}
          />

          <Route exact path="/cashier/:bank?" component={CashierLogin} />
          <Route
            exact
            path="/cashier/:bank?/forgot-password"
            component={CashierForgotPassword}
          />
          <Route exact path="/cashier/:bank?/otp" component={CashierOTPPage} />
          <Route exact path="/cashier/:bank?/setup" component={CashierSetup} />
          <CashierRoute
            exact
            path="/cashier/:bank?/dashboard"
            component={CashierDashboard}
          />
          <CashierRoute
            exact
            apitype={'cashier'}
            path="/cashier/:bank?/reports"
            component={CashierReports}
          />
          <CashierRoute
            exact
            path="/cashier/:bank?/info"
            component={CashierInfo}
          />
          <CashierRoute
            exact
            path="/cashier/:bank?/pay-bills"
            component={p => <CashierMerchantListPage {...p} />}
          />

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}
