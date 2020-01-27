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
import Pagination from 'react-js-pagination';

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
      otpMobile: mobile,
      trans_type: '',
      perPage: 5,
      totalCount: 100,
      allhistory: [],
      activePage: 1,
      active: 'Active',
      trans_from: '',
      trans_to: '',
      transcount_from: '',
      history: [],
      filter: '',
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

   showHistory = () => {
    this.setState({ history: [] }, () => {
      var out = [];
      var start = (this.state.activePage - 1) * this.state.perPage;
      var end = this.state.perPage * this.state.activePage;
      if (end > this.state.totalCount) {
        end = this.state.totalCount;
      }
      for (var i = start; i < end; i++) {
        out.push(this.state.allhistory[i]);
      }
      this.setState({ history: out });
    });
  };

  getHistory = () => {
    axios
      .post(`${API_URL}/getHistory`, {
        token: token,
        where: { cashier_id : bid},
        from: 'cashier',
        page: this.state.activePage,
        offset: this.state.perPage,
      })
      .then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.setState(
            {
              loading: false,
              allhistory: res.data.history,
              totalCount: res.data.history.length,
            },
            () => {
              this.showHistory();
            },
          );
        }
      })
      .catch(err => {});
  };

  getHistoryTotal = () => {
    axios
      .post(`${API_URL}/getHistoryTotal`, {
        token: token,
        where: { cashier_id : bid},
        from: 'cashier'
      })
      .then(res => {
        if (res.status == 200) {
          console.log(res.data);
          this.setState({ loading: false, totalCount: res.data.total }, () => {
            this.getHistory();
          });
        }
      })
      .catch(err => {});
  };

  filterData = e => {
    this.setState({ filter: e });
  };

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.showHistory();
  };


  componentDidMount() {
    this.getHistory();
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
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
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
                  <h3>Recent Activity</h3>
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
                    
                  </tbody>
                </Table>
                <div>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={this.state.totalCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            </Card>
          </Main>
        </Container>
       
      </Wrapper>
    );
  }
}
