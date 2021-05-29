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
import messages from './messages';
import DashCards from 'components/DashCrads';
import Wrapper from 'components/Wrapper';
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import A from 'components/A';
import Loader from 'components/Loader';
import Main from 'components/Main';
import Card from 'components/Card';
import Row from 'components/Row';
import Col from 'components/Col';
import SidebarBank from 'components/Sidebar/SidebarBank';
import { postRequest, getRequest } from '../App/ApiCall';
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

const token = localStorage.getItem('bankLogged');

export default class BankDashboard extends Component {

  constructor() {
    super();
    this.state = {
      otp: '',
      showOtp: false,
      bank_id: localStorage.getItem('bankId'), 
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: '',
      agencystats:{},
      partnerstats:{},
      mechantstats:{},
      popup: false,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);


  editSignal = (primary,secondary) => {
    this.props.setTheme({
      ...this.props.appTheme,
      secondary:  primary,
      primary: secondary,
    });
  };

  getData = async() => {
    this.editSignal(localStorage.getItem('primary') ? localStorage.getItem('primary') : '#417505',localStorage.getItem('secondary') ? localStorage.getItem('secondary') : '#417505')
    const agencystats = await postRequest("getBankDashStatsForAgencies", token, {bank_id:this.state.bank_id});
    const partnerstats = await postRequest("getBankDashStatsForPartners", token, {bank_id:this.state.bank_id});
    const merchantstats = await postRequest("getBankDashStatsForMerchants", token, {bank_id:this.state.bank_id});
    this.setState({
      loading:false,
      partnerstats:partnerstats.data.data,
      agencystats:agencystats.data.data,
      mechantstats: merchantstats.data.data,
    })
  }

  async componentDidMount() {
    this.getData();
  };

  render() {
    const { loading, redirect, popup } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/bank" />;
    }
    return (
      <Wrapper from="bank">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | BANK | E-WALLET</title>
        </Helmet>
        <BankHeader active="dashboard" />
        <Container verticalMargin>
          
          <Main fullWidth>
            <h1 style={{color:'green',textAlign:'center'}}>Agencies</h1>
            <hr></hr> 
            <Row>
              <Col cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  textAlign="center"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Number of Agencies</h4>
                  <div className="cardValue">{this.state.agencystats.totalAgencies}</div>
                </Card>
              </Col>
              <Col cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Opening Balance</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.agencystats.openingBalance}</div>
                </Card>
              </Col>
              <Col  cW='50%'>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Received</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}:{this.state.agencystats.cashReceived.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.agencystats.cashReceivedFee.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.agencystats.cashReceivedComm.toFixed(2)}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col  cW='50%'>
                  <Card
                    style={{height:'130px'}}
                    marginBottom="10px"
                    buttonMarginTop="32px"
                    textAlign="center"
                    bigPadding
                    smallValue
                  >
                    <h4>Cash Paid</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue">{CURRENCY}:{this.state.agencystats.cashPaid}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{CURRENCY}:{this.state.agencystats.cashPaidFee}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{CURRENCY}:{this.state.agencystats.cashPaidFeeComm}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col> 
              <Col cW='50%'>
              <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  bigPadding
                  textAlign="center"
                  smallValue
                >
                  <h4>Revenue Collected</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.agencystats.feeGenerated.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.agencystats.commissionGenerated.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Total</h5>
                      <div className="cardValue">{CURRENCY}: {(parseFloat(this.state.agencystats.commissionGenerated,10)+ parseFloat(this.state.agencystats.feeGenerated,10)).toFixed(2)}</div>
                    </Col>
                  </Row>
                  
                </Card>
              </Col>
            </Row>
            <Row>
            <Col cW='45%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Invoices Paid</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Number</h5>
                      <div className="cardValue">{this.state.agencystats.invoicePaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.agencystats.amountPaid}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col  cW='33%'>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash In Hand</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.agencystats.cashInHand}</div>
                </Card>
              </Col>
              <Col  cW='33%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Closing Balance</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.agencystats.closingBalance}</div>
                </Card>
              </Col>
            </Row>
            <hr></hr> 
            <h1 style={{color:'green',textAlign:'center'}}>Partners</h1>
            <hr></hr> 
            <Row>
              <Col cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  textAlign="center"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Number of Partners</h4>
                  <div className="cardValue">{this.state.partnerstats.totalPartners}</div>
                </Card>
              </Col>
              <Col cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Opening Balance</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.partnerstats.openingBalance}</div>
                </Card>
              </Col>
              <Col cW='50%'>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Received</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.cashReceived}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.cashReceivedFee}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}:{this.state.partnerstats.cashReceivedComm}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              
              
            </Row>
            <Row>
              <Col cW='50%'>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Paid</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.cashPaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.cashPaidFee}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}:{this.state.partnerstats.cashPaidComm}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col cW='50%'>
              <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  bigPadding
                  textAlign="center"
                  smallValue
                >
                  <h4>Revenue Collected</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.feeGenerated.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.commissionGenerated.toFixed(2)}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Total</h5>
                      <div className="cardValue">{CURRENCY}: {(parseFloat(this.state.partnerstats.commissionGenerated,10)+ parseFloat(this.state.partnerstats.feeGenerated,10)).toFixed(2)}</div>
                    </Col>
                  </Row>
                  
                </Card>
              </Col>
              
            </Row>
            <Row>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Invoices Paid</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Number</h5>
                      <div className="cardValue">{this.state.partnerstats.invoicePaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.partnerstats.amountPaid}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash In Hand</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.partnerstats.cashInHand}</div>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Closing Balance</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.partnerstats.closingBalance}</div>
                </Card>
              </Col>
            </Row>
            <hr></hr> 
            <h1 style={{color:'green',textAlign:'center'}}>Merchants</h1>
            <hr></hr> 
            <Row>
          <Col>
            <DashCards title='Invoice Created' no={this.state.mechantstats.bills_created} amount={this.state.mechantstats.amount_created}/>
          </Col>
          <Col>
            <DashCards title='Invoice Uploaded' no={0} amount={0}/>
          </Col>
          <Col>
            <DashCards title='Invoice Paid' no={this.state.mechantstats.bills_paid} amount={this.state.mechantstats.amount_paid}/>
          </Col>
          <Col>
            <DashCards title='Invoice Pending' no={this.state.mechantstats.bills_created-this.state.mechantstats.bills_paid} amount={(this.state.mechantstats.amount_created-this.state.mechantstats.amount_paid).toFixed(2)}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <DashCards title='Paid by bank' no={this.state.mechantstats.bill_paid_by_BC} amount={this.state.mechantstats.amount_paid_by_BC} fee={this.state.mechantstats.fee_generated_by_BC} commission={this.state.mechantstats.commission_generated_by_BC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by partner' no={this.state.mechantstats.bill_paid_by_PC} amount={this.state.mechantstats.amount_paid_by_PC} fee={this.state.mechantstats.fee_generated_by_PC} commission={this.state.mechantstats.commission_generated_by_PC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by merchant' no={this.state.mechantstats.bill_paid_by_MC} amount={this.state.mechantstats.amount_paid_by_MC} fee={this.state.mechantstats.fee_generated_by_MC} commission={this.state.mechantstats.commission_generated_by_MC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by user' no={this.state.mechantstats.bill_paid_by_US} amount={this.state.mechantstats.amount_paid_by_US} fee={this.state.mechantstats.fee_generated_by_US} commission={this.state.mechantstats.commission_generated_by_US} row={3}/>
          </Col>
        </Row>
        <Row>
                <Col>
                <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
                      <h4>Total Revenue</h4>
                      <Row>
                          <Col >
                              <Row>
                                  Fee:
                              </Row>
                              <Row>
                                  <span className="cardValue">
                                    {
                                      parseFloat(this.state.mechantstats.fee_generated_by_BC) +
                                      parseFloat(this.state.mechantstats.fee_generated_by_PC)+
                                        parseFloat(this.state.mechantstats.fee_generated_by_MC) +
                                          parseFloat(this.state.mechantstats.fee_generated_by_US)
                                    }
                                  </span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Commission:
                              </Row>
                              <Row>
                                  <span className="cardValue">
                                    {
                                      parseFloat(this.state.mechantstats.commission_generated_by_US) +
                                        parseFloat(this.state.mechantstats.commission_generated_by_BC)+
                                          parseFloat(this.state.mechantstats.commission_generated_by_PC) +
                                            parseFloat(this.state.mechantstats.commission_generated_by_MC)
                                    }
                                  </span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Total:
                              </Row>
                              <Row>
                                  <span className="cardValue">
                                    {
                                      parseFloat(this.state.mechantstats.fee_generated_by_BC) +
                                      parseFloat(this.state.mechantstats.fee_generated_by_PC)+
                                      parseFloat(this.state.mechantstats.fee_generated_by_MC) +
                                      parseFloat(this.state.mechantstats.fee_generated_by_US) +
                                        parseFloat(this.state.mechantstats.commission_generated_by_US) +
                                          parseFloat(this.state.mechantstats.commission_generated_by_BC)+
                                            parseFloat(this.state.mechantstats.commission_generated_by_PC) +
                                              parseFloat(this.state.mechantstats.commission_generated_by_MC)
                                    }
                                  </span>
                              </Row>
                          </Col> 
                      </Row>
                  
                </Card>
              </Col>
        </Row>

          </Main>
        </Container>
      </Wrapper>
    );
  }
}
