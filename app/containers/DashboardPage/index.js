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
      totalUsers: 0,
      totalCashiers: 0,
      totalBranches: 0,
      totalMerchantBranches: 0,
      totalPartnrBranches: 0,
      totalPartnrCashiers: 0,
      totalPartners: 0,
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
          totalMerchants: res.data.data.totalMerchants,
          totalUsers: res.data.data.totalusers,
          totalCashiers: res.data.data.totalcashiers,
          totalBranches: res.data.data.totalbranches,
          totalMerchantBranches: res.data.data.totalmerchantbranches,
          totalPartnerBranches: res.data.data.totalpartnrbranches,
          totalPartnerCashiers: res.data.data.totalpartnrcashiers,
          totalPartners: res.data.data.totalpartners,
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
                  cardWidth="151px"
                  textAlign="center"
                  col
                >
                  <h4>
                    <FormattedMessage {...messages.box1} />
                  </h4>
                  <div className="cardValue">{this.state.totalBanks}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box2} />
                </h4>
                <div className="cardValue">{this.state.totalMerchants}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box3} />
                </h4>
                <div className="cardValue">{this.state.totalUsers}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box4} />
                </h4>
                <div className="cardValue">{this.state.totalCashiers}</div>
              </Card>
            </div>

            <div className="clr mt10">
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box5} />
                </h4>
                <div className="cardValue">{this.state.totalBranches}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box6} />
                </h4>
                <div className="cardValue">{this.state.totalMerchantBranches}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box7} />
                </h4>
                <div className="cardValue">{this.state.totalPartners}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                  <FormattedMessage {...messages.box8} />
                </h4>
                <div className="cardValue">0</div>
              </Card>
            </div>
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
