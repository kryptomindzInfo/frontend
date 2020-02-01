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
import Popup from 'components/Popup';
import Button from 'components/Button';

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

var start = new Date();
start.setHours(0,0,0,0);
start = start.toISOString();
console.log(start);

var end = new Date();
end.setHours(23,59,59,999);
end = end.toISOString();

export default class CashierDashboard extends Component {
  constructor() {
    super();
    this.state = {
      token,
      otpEmail: email,
      otpMobile: mobile,
      historyPop: false,
      trans_type: '',
      cashReceived: 0,
      openingBalance: 0,
      cashPaid: 0,
      feeGenerated: 0,
      perPage: 20,
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

this.showHistory = this.showHistory.bind(this);
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
  closePopup = () => {
    this.setState({
      historyPop:false
    });
  };
  showHistoryPop = (v) => {
   console.log(v);
   this.setState({ historyPop: true, historyLoading:true, popmaster: v.master_code});
   this.getTransHistory(v.master_code);
  };

  getTransHistory =(master_code) =>{
    axios
      .post(`${API_URL}/getTransHistory`, {
        token: token,
        master_code: master_code
      })
      .then(res => {
        if (res.status == 200) {
          // var result = res.data.history1.concat(res.data.history2);
          // result.sort(function(a, b) {
          //     return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()// implicit conversion in number
          // });
          // var l = result.length;

          this.setState(
            {
              popresult: res.data.result,
              historyLoading: false,
              popmaster: master_code
            }
          );
        }
      })
      .catch(err => {});
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
      this.setState({ history: out }, ( ) => {
        let dis = this;
        setTimeout(function(){
          dis.getHistory();
        }, 3000);
      });
    });
  };

  getHistory = () => {
    axios
      .post(`${API_URL}/getCashierHistory`, {
        token: token,
        where: {cashier_id : bid},
        from: 'cashier',
        page: this.state.activePage,
        offset: this.state.perPage,
      })
      .then(res => {
        if (res.status == 200) {
          var notification = {};
          var result = res.data.history1.concat(res.data.history2);
          result.sort(function(a, b) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()// implicit conversion in number
          }, () => {

          });
          var l = result.length;
          console.log(result.length);
          console.log(result[l-1]);


          this.setState(
            {
              ticker: result[0],
              loading: false,
              allhistory: result,
              totalCount: result.length,
            },
            () => {
              this.showHistory();
            },
          );
        }
      })
      .catch(err => {});
  };

  getStats = () => {
    axios
      .post(`${API_URL}/getCashierDashStats`, {
        token: token,
        start: start,
        end: end
      })
      .then(res => {
        if (res.status == 200) {
          let received = res.data.cashReceived == null ? 0 : res.data.cashReceived;
          let paid = res.data.cashPaid == null ? 0 : res.data.cashPaid;
          this.setState({
            loading: false,
            openingBalance: res.data.openingBalance,
            cashReceived: received,
            cashPaid: paid,
            feeGenerated: res.data.feeGenerated
          }, () => {
            var dis  = this;
            setTimeout(function(){
              dis.getStats();
            }, 3000);
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



getBranchByName  = () => {
  axios
      .post(`${API_URL}/getBranchByName`, {
        name: this.props.match.params.bank
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({  branchDetails: res.data.banks}, () => {
            this.getStats();
            this.getHistory();
          });
        }
      })
      .catch(err => {});
};

formatDate = (date) => {
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
  var isoformat = date;

  var readable = new Date(isoformat);
  var m = readable.getMonth(); // returns 6
  var d = readable.getDate(); // returns 15
  var y = readable.getFullYear();
  var h = readable.getHours();
  var mi = readable.getMinutes();
  var mlong = months[m];
  return d + ' ' + mlong + ' ' + y + ' ' + h + ':' + mi;
}

  componentDidMount() {
    this.getBranchByName();
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

        <SidebarCashier refresh={this.getHistory.bind(this)}/>
          <Main>
            <div className="clr">
            <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>
                Opening Balance
                </h4>
                <div className="cardValue">{CURRENCY} {this.state.openingBalance.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>
                Cash Received
                </h4>
                <div className="cardValue">{CURRENCY} {this.state.cashReceived.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>
                Paid in Cash
                </h4>
                <div className="cardValue">{CURRENCY} {this.state.cashPaid.toFixed(2)}</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                smallValue
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                Fee Generated
                </h4>
                <div className="cardValue">{CURRENCY} {this.state.feeGenerated.toFixed(2)}</div>
              </Card>
            </div>
            <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
            {
              this.state.ticker ?
              <p className="notification">
              {
                dis.state.ticker.status == 1 ?

                  dis.state.ticker.trans_type == 'DR' ?
                  <span><strong>Congrats</strong> You have received {CURRENCY} {Number(this.state.ticker.amount)+Number(this.state.ticker.fee)} from <strong>{JSON.parse(this.state.ticker.receiver_info).givenname }</strong> on {this.formatDate(this.state.ticker.created_at)}</span>
                  :
                  <span><strong>Congrats</strong> You have sent {CURRENCY} {this.state.ticker.amount} to <strong>{this.state.ticker.sender_name}</strong> on {this.formatDate(dis.state.ticker.created_at)}</span>
                :
                  <span><strong className="red">Oops!</strong> Your last transaction (<strong>{dis.state.ticker.master_code}</strong>) on {this.formatDate(dis.state.ticker.created_at)} was failed</span>
                }
              </p>
              :
              null
            }

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
                <Table marginTop="34px" marginBottom="34px" smallTd textAlign="left">
                  <tbody>
                    {this.state.history && this.state.history.length > 0
                      ? this.state.history.map(function(b) {
                        // var sinfo = b.trans_type == "CR" ? b.sender_info ? null;
                        // var rinfo = b.trans_type == "CR" ? b.receiver_info ? null;
                        var sinfo = {};
                        var rinfo = {};
                          var fulldate = dis.formatDate(b.created_at);
                          return  dis.state.filter ==  b.trans_type ||
                            dis.state.filter == ''  ?  (
                            <tr key={b._id}>
                              <td>
                                <div className="labelGrey">{fulldate}</div>
                              </td>
                              <td>
                                <div className="labelBlue" onClick={() => dis.showHistoryPop(b)}>
                                  {
                                    b.sender_info ?
                                    <span>Cash sent from {JSON.parse(b.sender_info).givenname+" "+JSON.parse(b.sender_info).familyname} to {JSON.parse(b.receiver_info).givenname+" "+JSON.parse(b.receiver_info).familyname}</span>
                                    :
                                    <span>Cash claimed from {b.sender_name} to {b.receiver_name}</span>
                                  }
                                </div>
                                <div className="labelSmallGrey">{
                                  b.status == 1 ?
                                  <span>Completed</span>
                                  :
                                  <span className="red">Failed</span>
                                }</div>
                              </td>
                              <td>
                                <div className="labelGrey">
                                 {b.transaction_code == 'DR' ? '-XOF' : 'XOF'}{b.amount}
                                </div>
                              </td>
                            </tr>
                            ) : null;
                        })
                      : null}
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
        { this.state.historyPop ?
        <Popup close={this.closePopup.bind(this)} accentedH1 bigBody>
            <div>
          <h1 >Transaction Details ({this.state.popmaster})</h1>
          {
            this.state.historyLoading ?
            <Button filledBtn disabled><Loader /></Button>
            :
            <Table marginTop="34px" smallTd textAlign="left">
                  <tbody>
                    {this.state.popresult && this.state.popresult.length > 0
                      ? this.state.popresult.map(function(b) {
                          var isoformat = new Date(b.tx_data.tx_timestamp.seconds*1000).toISOString();
                          var fulldate = dis.formatDate(isoformat);

                          return dis.state.filter == b.tx_data.tx_type ||
                            dis.state.filter == '' ? (
                            <tr key={b.tx_data.tx_id}>
                              <td>
                                <div className="labelGrey">{fulldate}</div>
                              </td>
                              <td>
                                <div className="labelBlue">
                                  {b.tx_data.tx_details}
                                </div>{' '}
                                <div className="labelSmallGrey">Completed</div>
                              </td>
                              <td className="right">
                                <div className="labelGrey">
                                  {
                                    b.tx_data.tx_type == 'DR'
                                    ?
                                    <span>{CURRENCY} -{b.amount}</span>
                                    :
                                    <span>{CURRENCY} {b.amount}</span>
                                  }
                                  
                                </div>
                              </td>
                              <td>{b.tx_data.child_id}</td>
                            </tr>
                          ) : null;
                        })
                      : null}
                  </tbody>
                </Table>
          }
          </div>
        </Popup>
        : null
      }
      </Wrapper>
    );
  }
}
