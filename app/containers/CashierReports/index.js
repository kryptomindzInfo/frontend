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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
const bankId = localStorage.getItem('bankId');
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
      date:new Date(),
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
      sendMoneyNwtNw: [],
      sendMoneyNwtW: [],
      sendMoneyNwtM: [],
      sendMoneyNwtO: [],
      sendMoneyWtNw: [],
      pending: [],
      history: [],
      filter: '',
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);


    this.child = React.createRef();
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  
  getHistory = async() => {
    const yesterday = new Date(this.state.date)
    yesterday.setDate(yesterday.getDate() - 2)
    try{
      const res = await axios.post(`${API_URL}/cashier/queryTransactionStates`, {
        token: token,
        status: "1",
        date_after: yesterday,
        date_before: this.state.date,
        page_start: 0,
        limit: 100
    });
      if (res.status == 200) {
        return ({
          sendMoneyNwtNw:res.data.transactions.filter(trans => trans.txType === "Non Wallet To Non Wallet" && trans.state==="DONE"),
          sendMoneyNwtW: res.data.transactions.filter(trans => trans.txType === "Non Wallet to Wallet" && trans.state==="DONE"),
          sendMoneyNwtM: res.data.transactions.filter(trans => trans.txType === "Non Wallet to Merchant" && trans.state==="DONE"),
          sendMoneyNwtO: res.data.transactions.filter(trans => trans.txType === "Non Wallet to Operational" && trans.state==="DONE"),
          sendMoneyWtNw:res.data.transactions.filter(trans => trans.txType === "Wallet To Non Wallet" && trans.state==="DONE"),
        });
      }
    } catch (err){
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
    // const allHistory = await this.getHistory();
    this.setState(
      {
        branchDetails:branch,
        // sendMoneyNwtNw: allHistory.sendMoneyNwtNw.reverse(),
        // sendMoneyNwtW: allHistory.sendMoneyNwtW.reverse(),
        // sendMoneyNwtM: allHistory.sendMoneyNwtM.reverse(),
        // sendMoneyNwtO: allHistory.sendMoneyNwtO.reverse(),
        // sendMoneyWtNw: allHistory.sendMoneyWtNw.reverse(),
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
        <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
              <h4 style={{color:"green"}}><b>Select Date for report</b></h4>
              <Row>
                <Col>
                  <Row>
                    <Col cW='35%'>
                      <FormGroup>
                      <MuiPickersUtilsProvider
                       utils={DateFnsUtils}
                                                >
                        <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Date"
                        size="small"
                        minDate={date}
                        fullWidth
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        required
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={
                          this.state.date
                          }
                        onChange={date =>
                        this.setState({
                              date: date,
                        })
                        }
                         KeyboardButtonProps={{
                        'aria-label': 'change date',
                                                    }}
                        />
                      </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Col>

                    <Col cw='25%'>
                      <Button style={{padding:'9px'}} onClick={()=>this.getHistory()}>Get Report</Button>
                    </Col>
                  </Row>
                      
                </Col>

              </Row>
            </ActionBar>
           

        <div className="clr">
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>Opening Balance</h4>
                <div className="cardValue">
                  {
                    <span> {CURRENCY} {this.state.openingBalance.toFixed(2)}</span>
                  }
                </div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="125px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>Cash Received</h4>
                <div className="cardValue">
                  {CURRENCY} {this.state.cashReceived.toFixed(2)}
                </div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="125px"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
              >
                <h4>Paid in Cash</h4>
                <div className="cardValue">
                  {CURRENCY} {this.state.cashPaid.toFixed(2)}
                </div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="125px"
                smallValue
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>Fee</h4>
                <div className="cardValue">
                  {CURRENCY} {this.state.feeGenerated.toFixed(2)}
                </div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="125px"
                smallValue
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>Commision</h4>
                <div className="cardValue">
                  {CURRENCY}  {this.state.commissionGenerated.toFixed(2)}
                </div>
              </Card>
            </div>

           
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Send Money (Cash to Cash)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtNw.length > 0
                          ? this.state.sendMoneyNwtNw.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{b.childTx[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {b.childTx[0].transaction.from_name} to {b.childTx[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">-</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">XOF {b.childTx[0].transaction.amount}</div>
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
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Send Money (Cash to Wallet)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtW.length > 0
                          ? this.state.sendMoneyNwtW.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{b.childTx[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {b.childTx[0].transaction.from_name} to {b.childTx[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">-</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">XOF {b.childTx[0].transaction.amount}</div>
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
            
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Send Money (Cash to Merchant)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtM.length > 0
                          ? this.state.sendMoneyNwtM.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{b.childTx[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {b.childTx[0].transaction.from_name} to {b.childTx[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">-</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">XOF {b.childTx[0].transaction.amount}</div>
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
          
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Send Money (Cash to Operational)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtO.length > 0
                          ? this.state.sendMoneyNwtO.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{b.childTx[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {b.childTx[0].transaction.from_name} to {b.childTx[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">XOF {b.childTx[0].transaction.amount}</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">-</div>
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
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Claim Money (Cash to Cash)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyNwtNw.length > 0
                          ? this.state.sendMoneyNwtNw.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            var child = b.childTx.filter(c=>c.transaction.note === "Cashier claim Money");
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{child[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {child[0].transaction.from_name} to {child[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">XOF {child[0].transaction.amount}</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">-</div>
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
          
            <Card style={{ marginTop: '50px' }}>
            <div>
                <h3 style={{color:"green"}}>Claim Money (Wallet to Cash)</h3>
                <Table
                  marginTop="34px"
                  marginBottom="34px"
                  smallTd
                  textAlign="left"
                >
                  <thead>
                        <tr><th>Date</th><th>Transaction ID</th> <th>Description</th><th>Transaction Type</th><th>Transaction Status</th><th>Debit</th><th>Credit</th></tr>
                      </thead>
                      <tbody>
                      {this.state.sendMoneyWtNw.length > 0
                          ? this.state.sendMoneyWtNw.map( (b,i) => {
                            var fulldate = dis.formatDate(b.createdAt);
                            var child = b.childTx.filter(c=>c.transaction.note === "Cashier claim Money");
                            return (
                            <tr key={i} >
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{fulldate.date}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">{child[0].transaction.master_code}</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">
                                  Transfered From {child[0].transaction.from_name} to {child[0].transaction.to_name}
                                </div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Cash to Cash</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">Completed</div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey">XOF {child[0].transaction.amount}</div>
                              </td>
                              <td style={{textAlign:"center"}}> 
                                <div className="labelGrey">-</div>
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
