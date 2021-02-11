/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';

import Wrapper from 'components/Wrapper';
import CashierHeader from 'components/Header/CashierHeader';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Card from 'components/Card';
import ActionBar from 'components/ActionBar';
import SidebarCashier from 'components/Sidebar/SidebarCashier';
import Main from 'components/Main';
import Table from 'components/Table';
import Pagination from 'react-js-pagination';
import TextInput from 'components/TextInput';
import Popup from 'components/Popup';
import Button from 'components/Button';
import Row from 'components/Row';
import Col from 'components/Col';
import FormGroup from 'components/FormGroup';

import { API_URL, CURRENCY, STATIC_URL } from '../App/constants';

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
//enable the following line and disable the next line to test for tomorrow
var today = new Date(new Date().setDate(new Date().getDate() + 1));
//var today =new Date();
today.setHours(0, 0, 0, 0);
today = today.getTime();




export default class CashierDashboard extends Component {
  constructor() {
    super();
    this.state = {
      token,
      otpEmail: email,
      otpMobile: mobile,
      agree: false,
      showPending: false,
      loading:true,
      historyPop: false,
      tomorrow: false,
      trans_type: '',
      cashReceived: 0,
      openingBalance: 0,
      closingBalance: 0,
      cashPaid: 0,
      feeGenerated: 0,
      commissionGenerated: 0,
      closingTime: null,
      perPage: 20,
      totalCount: 100,
      allhistory: {},
      DR:{},
      CR:{},
      activePage: 1,
      active: 'Active',
      trans_from: '',
      trans_to: '',
      transcount_from: '',
      pending: [],
      history: [],
      filter: '',
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.showHistory = this.showHistory.bind(this);
    this.child = React.createRef();
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
      historyPop: false,
      openCashierPopup: false,
      showOpeningOTP: false,
    });
  };
  showHistoryPop = v => {
    this.setState({
      historyPop: true,
      historyLoading: true,
      popmaster: v.master_code,
    });
    this.getTransHistory(v.master_code);
  };

  showPending = () => {
    this.setState({
      showPending: true
    });

  };
  showALL = () => {
    this.setState({
      showPending: false
    });
  }

  openCashier = e => {
    this.setState({
      openCashierPopup: true
    });
  };

  addOpeningBalance = event => {
    event.preventDefault();
    if (this.state.agree) {

      this.setState(
        {
          showOpeningOTP: true,
          otpOpt: 'openingBalance',
          otpTxt: 'Your OTP to open cashier balance is ',
        },
        () => {
          this.generateOTP();
        },
      );
    } else {
      this.setState({
        notification: 'You need to agree'
      });
      this.error();
    }
  };

  proceed = (items,type,interbank) => {

    this.child.current.proceed(items,type,interbank);
  };


  startTimer = () => {
    var dis = this;
    var timer = setInterval(function () {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        var time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };
  generateOTP = () => {
    this.setState({ resend: false, timer: 30 });

    axios
      .post(`${API_URL}/sendOTP`, {
        email: this.state.otpEmail,
        mobile: this.state.otpMobile,
        page: this.state.otpOpt,
        type: 'cashier',
        txt: this.state.otpTxt,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              otpId: res.data.id,
              notification: 'OTP Sent',
            });
            this.startTimer();
            this.success();
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };
  verifyOpeningOTP = event => {
    event.preventDefault();

    this.setState({
      verifyEditOTPLoading: true,
    });
    axios
      .post(`${API_URL}/openCashierBalance`, this.state)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Cashier opened successfully!',
              },
              function () {
                this.success();
                this.closePopup();
                this.getStats();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          verifyEditOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          verifyEditOTPLoading: false,
        });
        this.error();
      });

  };

  handleCheckbox = event => {
    const { value, name } = event.target;
    if (value == "true") {
      var v = false;
    } else {
      var v = true;
    }
    this.setState({
      [name]: v,
    });
  };
  getTransHistory = master_code => {
    axios
      .post(`${API_URL}/getTransHistory`, {
        token: token,
        master_code: master_code,
      })
      .then(res => {
        if (res.status == 200) {
          // var result = res.data.history1.concat(res.data.history2);
          // result.sort(function(a, b) {
          //     return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()// implicit conversion in number
          // });
          // var l = result.length;
          const history = res.data.result.reverse();
          this.setState({
            popresult: history,
            historyLoading: false,
            popmaster: master_code,
          });
        }
      })
      .catch(err => { });
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
      this.setState({ history: out }, () => {
        let dis = this;
        setTimeout(function () {
          dis.getHistory();
        }, 3000);
      });
    });
  };
  
  groupHistoryBasedOnMasterCode = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
  getHistory = async() => {
    try{
      const res = await axios.post(`${API_URL}/cashier/getTransactionHistory`, {
        token: token,
        where: { cashier_id: bid },
        from: 'cashier',
        page: this.state.activePage,
        offset: this.state.perPage,
      });
      if (res.status == 200) {
        return (
          {
            DR: res.data.history.filter(element => element.Value.tx_data.tx_type === 'DR'),
            CR: res.data.history.filter(element => element.Value.tx_data.tx_type === 'CR'),
          }
        )

        }
    }catch (err){
      console.log(err);
    }
    
      
  };

  getStats = () => {
    axios
      .post(`${API_URL}/getCashierDashStats`, {
        token: token
      })
      .then(res => {
        if (res.status == 200) {
          let received = res.data.cashReceived == null ? 0 : res.data.cashReceived;
          let paid = res.data.cashPaid == null ? 0 : res.data.cashPaid;
          var closingTime = res.data.closingTime;

          if (closingTime != undefined && closingTime != null) {
            closingTime = new Date(closingTime);
            closingTime.setHours(0, 0, 0, 0);
            closingTime = closingTime.getTime();
            if (res.data.isClosed && closingTime < today) {
              closingTime = true;
            } else {
              closingTime = false;
            }
          } else if (!res.data.transactionStarted) {
            closingTime = true;
          }
          this.setState(
            {
              tomorrow: closingTime,
              closingTime: res.data.closingTime,
              openingBalance: res.data.openingBalance,
              closingBalance: res.data.closingBalance,
              cashReceived: received,
              cashPaid: paid,
              feeGenerated: res.data.feeGenerated,
              commissionGenerated: res.data.commissionGenerated,
              isClosed: res.data.isClosed
            },
            () => {
              var dis = this;
              setTimeout(function () {
                dis.getStats();
              }, 10000);
            },
          );
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function () {
          dis.getStats();
        }, 10000);
      });
  };

  filterData = e => {

    this.setState({ showPending: false, filter: e });
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.showHistory();
  };

  getBranchByName = () => {
    try{
      const res = axios.post(`${API_URL}/getBranchByName`, {
        name: this.props.match.params.bank,
      })
      if(res.status == 200) {
        return res.data.banks; 
      }
    }catch(err){
      console.log(res);
    }
  };

  formatDate = date => {
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
    return (
      {
        date: d + ' ' + mlong + ' ' + y,
        time: h + ':' + mi,
      }
    )
  };

  componentDidMount= async() => {
    this.setState(
      {
        loading:true,
      }
    );
    const branch=await this.getBranchByName();
    this.getStats();
    const allHistory = await this.getHistory();
    console.log(allHistory);
    const TransHistoryDR = await this.groupHistoryBasedOnMasterCode(allHistory.DR,trans => trans.Value.tx_data.master_id);
    const TransHistoryCR = await this.groupHistoryBasedOnMasterCode(allHistory.CR,trans => trans.Value.tx_data.master_id);

    this.setState(
      {
        branchDetails:branch,
        DR:TransHistoryDR,
        CR:TransHistoryCR,
        loading:false,
      }
    );
    
  };

  render() {
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }

    function inputBlur(e) {
      const { target } = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }

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

    var tempDate = new Date();
    var date =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear()
    const currDate = this.formatDate(tempDate);
    return (
      <Wrapper from="branch">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | CASHIER | E-WALLET</title>
        </Helmet>
        <CashierHeader
          active="reports"
          bankName={this.props.match.params.bank}
          bankLogo={STATIC_URL + logo}
          from="cashier"
        />
        <Container verticalMargin>
          <Main>
            <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
              style={{ display: 'none' }}
            >
              {this.state.ticker ? (
                <p className="notification">
                  {dis.state.ticker.status == 1 ? (
                    dis.state.ticker.trans_type == 'DR' ? (
                      <span>
                        <strong>Congrats</strong> You have received {CURRENCY}{' '}
                        {Number(this.state.ticker.amount) +
                          Number(this.state.ticker.fee)}{' '}
                        from{' '}
                        <strong>
                          {
                            JSON.parse(this.state.ticker.receiver_info)
                              .givenname
                          }
                        </strong>{' '}
                        on {this.formatDate(this.state.ticker.created_at)}
                      </span>
                    ) : (
                        <span>
                          <strong>Congrats</strong> You have sent {CURRENCY}{' '}
                          {this.state.ticker.amount} to{' '}
                          <strong>{this.state.ticker.sender_name}</strong> on{' '}
                          {this.formatDate(dis.state.ticker.created_at)}
                        </span>
                      )
                  ) : (
                      <span>
                        <strong className="red">Oops!</strong> Your last
                      transaction (
                        <strong>{dis.state.ticker.master_code}</strong>) on{' '}
                        {this.formatDate(dis.state.ticker.created_at)} was failed
                      </span>
                    )}
                </p>
              ) : null}
            </ActionBar>

            <Card bigPadding style={{ marginTop: '50px' }}>
            <div>
                <h1>DR</h1>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Time</th> <th>Description</th><th>Status</th><th>Amount</th></tr>
                      </thead>
                      <tbody>
                      {this.state.DR
                          ? Array.from(this.state.DR).map( ([key, b]) => {
                            var fulldate = dis.formatDate(b[0].Timestamp);
                            return (
                            <tr key={key}>
                              <td>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td>
                                <div className="labelGrey">{fulldate.time}</div>
                              </td>
                              <td>
                                <div
                                  className="labelGrey"
                                >
                                  {b[0].Value.remarks}
                                </div>
                              </td>
                              <td>
                                <div
                                  className="labelBlue"
                                >
                                  {b[0].Value.tx_data.tx_details}
                                </div>
                              </td>
                              <td>
                              <div
                                  className="labelGrey"
                                >
                                  XOF {b[0].Value.amount}
                                </div>

                              </td>
                            </tr>
                            )
                          })
                          : null
                        }
                    </tbody>
                </Table>
            </div>
            <div>
                <h1>CR</h1>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                   <thead>
                        <tr><th>Date</th><th>Time</th> <th>Description</th><th>Status</th><th>Amount</th></tr>
                      </thead>
                      <tbody>
                      {this.state.CR
                          ? Array.from(this.state.CR).map( ([key, b]) => {
                            var fulldate = dis.formatDate(b[0].Timestamp);
                            return (
                            <tr key={key}>
                              <td>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td>
                                <div className="labelGrey">{fulldate.time}</div>
                              </td>
                              <td>
                                <div
                                  className="labelGrey"
                                >
                                  {b[0].Value.remarks}
                                </div>
                              </td>
                              <td>
                                <div
                                  className="labelBlue"
                                >
                                  {b[0].Value.tx_data.tx_details}
                                </div>
                              </td>
                              <td>
                              <div
                                  className="labelGrey"
                                >
                                  XOF {b[0].Value.amount}
                                </div>

                              </td>
                            </tr>
                            )
                          })
                          : null
                        }
                    </tbody>
                </Table>
            </div>
            </Card>
          </Main>
        </Container>
        {this.state.historyPop ? (
          <Popup close={this.closePopup.bind(this)} accentedH1 bigBody>
            <div>
              <h1>Transaction Details ({this.state.popmaster})</h1>
              {this.state.historyLoading ? (
                <Button filledBtn disabled>
                  <Loader />
                </Button>
              ) : (
                  <Table marginTop="34px" smallTd textAlign="left">
                    <tbody>
                      {this.state.popresult && this.state.popresult.length > 0
                        ? this.state.popresult.map(function (b) {
                          var isoformat = new Date(
                            b.tx_data.tx_timestamp.seconds * 1000,
                          ).toISOString();
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
                                    {b.tx_data.tx_type == 'DR' ? (
                                      <span>
                                        {CURRENCY} -{b.amount}
                                      </span>
                                    ) : (
                                        <span>
                                          {CURRENCY} {b.amount}
                                        </span>
                                      )}
                                  </div>
                                </td>
                                <td>{b.tx_data.child_id}</td>
                              </tr>
                            ) : null;
                        })
                        : null}
                    </tbody>
                  </Table>
                )}
            </div>
          </Popup>
        ) : null}

        {this.state.openCashierPopup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showOpeningOTP ? (
              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifyOpeningOTP}>
                  <FormGroup>
                    <label>OTP*</label>
                    <TextInput
                      type="text"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.otp}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                  {this.verifyEditOTPLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                      <Button filledBtn marginTop="50px">
                        <span>Verify</span>
                      </Button>
                    )}

                  <p className="resend">
                    Wait for <span className="timer">{this.state.timer}</span>{' '}
                    to{' '}
                    {this.state.resend ? (
                      <span className="go" onClick={this.generateOTP}>
                        Resend
                      </span>
                    ) : (
                        <span>Resend</span>
                      )}
                  </p>
                </form>
              </div>
            ) : (
                <div>
                  <h1>Open Cashier</h1>
                  <form action="" method="post" onSubmit={this.addOpeningBalance}>


                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>

                      <Col cW="20%" textAlign="right">
                        <strong>Opening for the day</strong>
                      </Col>
                      <Col cW="20%" textAlign="center">
                        :
                    </Col>
                      <Col cW="35%">
                        {
                          currDate
                        }
                        {/* {Date.now().toISOString()} */}

                      </Col>
                    </Row>

                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>

                      <Col cW="20%" textAlign="right">
                        <strong>Cash in Hand</strong>
                      </Col>
                      <Col cW="20%" textAlign="center">
                        :
                    </Col>
                      <Col cW="35%">
                        {
                          this.state.openingBalance + this.state.cashReceived - this.state.cashPaid
                        }
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>
                      <Col cW="20%" textAlign="right">
                        <strong></strong>
                      </Col>
                      <Col cW="20%" textAlign="center">

                      </Col>
                      <Col cW="35%">

                      </Col>
                    </Row>


                    <div style={{
                      marginTop: '20px',
                      fontSize: '18px',
                      textAlign: 'center'
                    }}>
                      <input type="checkbox"
                        name="agree"
                        value={this.state.agree}
                        checked={this.state.agree}
                        required
                        onClick={this.handleCheckbox} />  Agree to the opening balance?
                  </div>


                    <Button filledBtn marginTop="50px">
                      <span>Open</span>
                    </Button>

                  </form>
                </div>
              )}
          </Popup>
        ) : null}
      </Wrapper>
    );
  }
}
