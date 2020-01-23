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
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from 'components/Wrapper';
import A from 'components/A';
import CashierHeader from 'components/Header/CashierHeader';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Card from 'components/Card';
import ActionBar from 'components/ActionBar';
import SidebarCashier from 'components/Sidebar/SidebarCashier';
import Main from 'components/Main';
import Table from 'components/Table';

import { API_URL, STATIC_URL, CURRENCY } from '../App/constants';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});


const token = localStorage.getItem('cashierLogged');
const bid = localStorage.getItem('cashierId');
const logo = localStorage.getItem('bankLogo');
const email = localStorage.getItem('cashierEmail');
const mobile = localStorage.getItem('cashierMobile');

export default class CashierDashboard extends Component {
  constructor() {
    super();
    this.state = {
      token,
      otpEmail: email,
      otpMobile: mobile
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);


  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {

  }

  render() {


    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return null;
    }
    const dis = this;
    return (

      <Wrapper  from="branch">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | CASHIER | E-WALLET</title>
        </Helmet>
        <CashierHeader active="dashboard" bankName={this.props.match.params.bank} bankLogo={STATIC_URL+logo} from="cashier" />
        <Container verticalMargin>

        <SidebarCashier />
          <Main>
            <div className="clr">
            <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                Opening Balance
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                Cash Received
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                Paid in Cash
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                Fee Generated
                </h4>
                <div className="cardValue">0</div>
              </Card>
            </div>
            <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
              <p className="notification"><strong>Congrats</strong> You have received {CURRENCY} 200.00 from <strong>Test User</strong> on 27th December 2019</p>
            </ActionBar>

            <Card bigPadding>
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Recent Activities</h3>
                  <h5>E-wallet activity</h5>
                </div>
              </div>
              <div className="cardBody">
                <div className="clr">
                  <div className="menuTabs" onClick={() => this.filterData('')}>
                    All
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('DR')}
                  >
                    Payment Sent
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('CR')}
                  >
                    Payment Received
                  </div>
                </div>
                <Table marginTop="34px" smallTd>
                  <tbody>
                    
                            <tr>
                              <td>
                                <div className="labelGrey">Nov 15, 2019</div>
                              </td>
                              <td>
                                <div className="labelBlue">
                                  Transfered to Sandeep
                                </div>
                                <div className="labelSmallGrey">Completed</div>
                              </td>
                              <td>
                                <div className="labelGrey">
                                {CURRENCY} 500
                                </div>
                              </td>
                            </tr>
                        
                  </tbody>
                </Table>
                <div className="clr mt20">
                  <A float="right">View All</A>
                </div>
              </div>
            </Card>
          </Main>
        </Container>
       
      </Wrapper>
    );
  }
}
