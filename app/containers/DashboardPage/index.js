/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Wrapper';
import Header from 'components/Header/index';
import Container from 'components/Container';
import A from 'components/A';
import Main from 'components/Main';
import Card from 'components/Card';
import Loader from 'components/Loader';
import MasterWallet from 'components/Sidebar/MasterWallet';
import messages from './messages';
import { postRequest, getRequest } from '../App/ApiCall';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const token = localStorage.getItem('logged');
// const token = token;

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      totalBanks: 0,
      totalMerchants: 0,
      totalMerchantStaff: 0,
      totalMerchantCashier: 0,
      totalInfraMerchants: 0,
      totalUsers: 0,
      totalCashiers: 0,
      totalBranches: 0,
      totalMerchantBranches: 0,
      totalPartnerBranches: 0,
      totalPartnerCashiers: 0,
      totalPartners: 0,
      bankFee:0,
      partnerFee:0,
      bankCommission:0,
      partnerCommission:0,
      bankTrans:0,
      partnerTrans:0,
      merchantFee:0,
      merchantCommission:0,
      merchantInvoice:0,
      merchantInvoiceCreated:0,
      notification: '',
      popup: false,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  logout = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
  };

  async componentDidMount() {
    if (token !== undefined && token !== null) {
      const res = await postRequest("getDashStats", token, {})
      if(res.data.data.status === 0) {
        toast.error(res.data.data.message);
      } else {
        this.setState({
          loading: false,
          totalBanks: res.data.data.totalBanks,
          totalBankMerchants: res.data.data.totalBankMerchants,
          totalInfraMerchants: res.data.data.totalInfraMerchants,
          totalMerchantStaff: res.data.data.totalMerchantStaff,
          totalMerchantCashier: res.data.data.totalMerchantCashier,
          totalUsers: res.data.data.totalusers,
          totalCashiers: res.data.data.totalcashiers,
          totalBranches: res.data.data.totalbranches,
          totalMerchantBranches: res.data.data.totalmerchantbranches,
          totalPartnerBranches: res.data.data.totalpartnerbrances,
          totalPartnerCashiers: res.data.data.totalpartnercashiers,
          totalPartners: res.data.data.totalpartners,
          bankFee: res.data.data.bankfee, 
          partnerFee: res.data.data.partnerfee,
          bankCommission: res.data.data.bankcommission,
          partnerCommission: res.data.data.partnercommission,
          bankTrans: res.data.data.banktranscount,
          partnerTrans: res.data.data.partnertranscount,
          merchantFee: res.data.data.merchanfee,
          merchantCommission: res.data.data.merchantcommission,
          merchantInvoice: res.data.data.merchantinvoice,
          merchantInvoiceCreated:res.data.data.merchantinvoicecreated,
        });
      }
    } else {
      alert('Login to continue');
      this.setState({ loading: false, redirect: true });
    }
  };

  render() {
    const { loading, redirect, popup } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="dashboard" />
        <Container verticalMargin>
          {/* <Sidebar marginRight>
            <OperationalWallet />
            <MasterWallet />
          </Sidebar> */}
          <Main fullWidth>
            <div className="clr">
              <A href="/banks" float="left">
                <Card
                  horizontalMargin="7px"
                  cardWidth="180px"
                  textAlign="center"
                  col
                  smallValue
                >
                  <h4>
                    Total Banks
                  </h4>
                  <div className="cardValue">{this.state.totalBanks}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Agencies
                </h4>
                <div className="cardValue">{this.state.totalBranches}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                smallValue
                textAlign="center"
                col
              >
                <h4>
                  Total Bank Cashiers
                </h4>
                <div className="cardValue">{this.state.totalCashiers}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                smallValue
                textAlign="center"
                col
              >
                <h4>
                  Fee Generated By Bank
                </h4>
                <div className="cardValue">{this.state.bankFee.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Commission Generated By Bank
                </h4>
                <div className="cardValue">{this.state.bankCommission.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Revenue
                </h4>
                <div className="cardValue">{(this.state.bankFee+this.state.bankCommission).toFixed(2)}</div>
              </Card>
            </div>
            <div className="clr">
              <A href="/banks" float="left">
                <Card
                  horizontalMargin="7px"
                  cardWidth="180px"
                  textAlign="center"
                  smallValue
                  col
                >
                  <h4>
                    Total Bank Partners
                  </h4>
                  <div className="cardValue">{this.state.totalPartners}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Partners Agencies
                </h4>
                <div className="cardValue">{this.state.totalPartnerBranches}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Partners Cashiers
                </h4>
                <div className="cardValue">{this.state.totalPartnerCashiers}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Fee Generated By Partner
                </h4>
                <div className="cardValue">{this.state.partnerFee.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Commission Generated By Partner
                </h4>
                <div className="cardValue">{this.state.partnerCommission.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Partner Revenue
                </h4>
                <div className="cardValue">{(this.state.partnerFee+this.state.partnerCommission).toFixed(2)}</div>
              </Card>
            </div>
            <div className="clr">
              <A href="/banks" float="left">
                <Card
                  horizontalMargin="7px"
                  cardWidth="180px"
                  textAlign="center"
                  smallValue
                  col
                >
                  <h4>
                    Total Bank Merchants
                  </h4>
                  <div className="cardValue">{this.state.totalBankMerchants}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Merchant Branches
                </h4>
                <div className="cardValue">{this.state.totalMerchantBranches}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Merchant Staff
                </h4>
                <div className="cardValue">{this.state.totalMerchantStaff}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Merchant Cashier
                </h4>
                <div className="cardValue">{this.state.totalMerchantCashier}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Invoice Created By Bank Merchant
                </h4>
                <div className="cardValue">{this.state.merchantInvoiceCreated}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Merchant's Invoice Paid 
                </h4>
                <div className="cardValue">{this.state.merchantInvoice}</div>
              </Card>
              </div>
            <div className="clr">
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Fee Generated By Bank Merchant
                </h4>
                <div className="cardValue">{this.state.merchantFee.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Commission Generated By Bank Merchant
                </h4>
                <div className="cardValue">{this.state.merchantCommission.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Bank Merchant Revenue
                </h4>
                <div className="cardValue">{(this.state.merchantFee+this.state.merchantCommission).toFixed(2)}</div>
              </Card>
              {/* <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Invoices Paid
                </h4>
                <div className="cardValue">{this.state.merchantInvoice}</div>
              </Card> */}
              {/* <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Users
                </h4>
                <div className="cardValue">{this.state.totalUsers}</div>
              </Card> */}
            </div>
            
            <div className="clr">
              <A href="/banks" float="left">
                <Card
                  horizontalMargin="7px"
                  cardWidth="180px"
                  textAlign="center"
                  smallValue
                  col
                >
                  <h4>
                    Total Infra Merchants
                  </h4>
                  <div className="cardValue">{this.state.totalBankMerchants}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Infra Merchant Branches
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Infra Merchant Staff
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Infra Merchant Cashier
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Invoice Created By Infra Merchant
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                h4FontSize="16px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Infra Merchant's Invoice Paid 
                </h4>
                <div className="cardValue">0</div>
              </Card>
              </div>
            <div className="clr">
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Fee Generated By Infra Merchant
                </h4>
                <div className="cardValue">0.00</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Commission Generated By Infra Merchant
                </h4>
                <div className="cardValue">0.00</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Infra Merchant Revenue
                </h4>
                <div className="cardValue">0.00</div>
              </Card>
              {/* <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Invoices Paid
                </h4>
                <div className="cardValue">{this.state.merchantInvoice}</div>
              </Card> */}
              {/* <Card
                horizontalMargin="7px"
                cardWidth="180px"
                textAlign="center"
                smallValue
                col
              >
                <h4>
                  Total Users
                </h4>
                <div className="cardValue">{this.state.totalUsers}</div>
              </Card> */}
            </div>
            

           
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
