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
import Button from 'components/Button';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import Row from 'components/Row';
import Col from 'components/Col';
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
            <div style={{backgroundColor:"goldenrod", padding:'10px'}}>
              <Row style={{marginTop:'15px'}}>
                <Col cW='20%'>
                    <Card
                      horizontalMargin="0pxx"
                      cardWidth="220px"
                      textAlign="center"
                      col
                      smallValue
                      style={{height:'120px', marginLeft:'20px'}}
                    >
                      <h4>
                        Banks
                      </h4>
                      <div className="cardValue">{this.state.totalBanks}</div>
                    </Card>
                  
                  
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    h4FontSize="16px"
                    textAlign="center"
                    smallValue
                    col
                    style={{height:'120px', marginLeft:'8px'}}
                  >
                    <h4>
                      Bank Agencies
                    </h4>
                    <div className="cardValue">{this.state.totalBranches}</div>
                  </Card>
                </Col>
                <Col cW='20%'> 
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Bank Cashiers
                    </h4>
                    <div className="cardValue">{this.state.totalCashiers}</div>
                  </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Bank Transactions
                    </h4>
                    <div className="cardValue">{this.state.bankTrans}</div>
                  </Card>
                </Col>
                <Col cW='20%'></Col>
              </Row>
              
              <Row style={{marginTop:'20px'}}>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'20px'}}
                  >
                    <h4>Agency Cash Paid</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                     horizontalMargin="0px"
                     cardWidth="302px"
                     smallValue
                     textAlign="center"
                     col
                    style={{height:'120px', marginLeft:'-5px'}}
                  >
                    <h4>Agency Cash Reveived</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-30px'}}
                  >
                    <h4>Revenue</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.bankFee.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.bankCommission.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue"> {(this.state.bankFee+this.state.bankCommission).toFixed(2)}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='10%'></Col>
              </Row>
              
              <Row style={{marginTop:'20px'}}>
                <Col cW='20%'>
                 
                    <Card
                      horizontalMargin="0px"
                      cardWidth="220px"
                      textAlign="center"
                      col
                      smallValue
                      style={{height:'120px', marginLeft:'20px'}}
                    >
                      <h4>
                        Partners
                      </h4>
                      <div className="cardValue">{this.state.totalPartners}</div>
                    </Card>
                  
                  
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    h4FontSize="16px"
                    textAlign="center"
                    smallValue
                    col
                    style={{height:'120px', marginLeft:'8px'}}
                  >
                    <h4>
                      Partner Agencies
                    </h4>
                    <div className="cardValue">{this.state.totalPartnerBranches}</div>
                  </Card>
                </Col>
                <Col cW='20%'> 
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Partner Cashiers
                    </h4>
                    <div className="cardValue">{this.state.totalPartnerCashiers}</div>
                  </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Partner Transactions
                    </h4>
                    <div className="cardValue">{this.state.partnerTrans}</div>
                  </Card>
                </Col>
                <Col cW='20%'></Col>
              </Row>
              
              <Row style={{marginTop:'20px'}}>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'20px'}}
                  >
                    <h4>Partner Cash Paid</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                     horizontalMargin="0px"
                     cardWidth="302px"
                     smallValue
                     textAlign="center"
                     col
                    style={{height:'120px', marginLeft:'-5px'}}
                  >
                    <h4>Partner Cash Reveived</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-30px'}}
                  >
                    <h4>Revenue</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.partnerFee.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.partnerCommission.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue"> {(this.state.partnerFee+this.state.partnerCommission).toFixed(2)}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='10%'></Col>
              </Row>
              
              <Row style={{marginTop:'20px'}}>
                <Col cW='20%'>
                 
                    <Card
                      horizontalMargin="0px"
                      cardWidth="220px"
                      textAlign="center"
                      col
                      smallValue
                      style={{height:'120px', marginLeft:'20px'}}
                    >
                      <h4>
                        Bank Merchants
                      </h4>
                      <div className="cardValue">{this.state.totalBankMerchants}</div>
                    </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    h4FontSize="16px"
                    textAlign="center"
                    smallValue
                    col
                    style={{height:'120px', marginLeft:'8px'}}
                  >
                    <h4>
                    Bank Merchant Branches
                    </h4>
                    <div className="cardValue">{this.state.totalMerchantBranches}</div>
                  </Card>
                </Col>
                <Col cW='20%'> 
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Bank Merchant Staff
                    </h4>
                    <div className="cardValue">{this.state.totalMerchantStaff}</div>
                  </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                      Bank Merchant Cashier
                    </h4>
                    <div className="cardValue">{this.state.totalMerchantCashier}</div>
                  </Card>
                </Col>
                <Col cW='20%'></Col>
              </Row>
              <Row style={{marginTop:'20px', marginBottom:'15px'}}>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'20px'}}
                  >
                    <h4>Invoice</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Created</h5>
                        <div className="cardValue">{this.state.merchantInvoiceCreated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Uploaded</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                     horizontalMargin="0px"
                     cardWidth="302px"
                     smallValue
                     textAlign="center"
                     col
                    style={{height:'120px', marginLeft:'-5px'}}
                  >
                    <h4>Invoice Paid</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Number</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-20px'}}
                  >
                    <h4>Revenue</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.merchantFee.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.merchantCommission.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue">{(this.state.merchantFee+this.state.merchantCommission).toFixed(2)}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='10%' style={{marginTop:'50px',marginRight:'10px'}}>
                  <A href='/banks'>
                    <Button
                      style={{
                        padding:'10px',
                        backgroundColor:'green',
                        color:'white',
                        marginRight:'60px'
                        
                      }}
                    >
                      <h4>View All</h4>
                    </Button>
                  </A>
                </Col>
              </Row>
            
            </div> 
            <div style={{backgroundColor:"goldenrod", padding:'10px', marginTop:'20px'}}>
            <Row style={{marginTop:'20px'}}>
                <Col cW='20%'>
                 
                    <Card
                      horizontalMargin="0px"
                      cardWidth="220px"
                      textAlign="center"
                      col
                      smallValue
                      style={{height:'120px', marginLeft:'20px'}}
                    >
                      <h4>
                        Infra Merchants
                      </h4>
                      <div className="cardValue">{this.state.totalInfraMerchants}</div>
                    </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    h4FontSize="16px"
                    textAlign="center"
                    smallValue
                    col
                    style={{height:'120px', marginLeft:'8px'}}
                  >
                    <h4>
                    Infra Merchant Branches
                    </h4>
                    <div className="cardValue">0</div>
                  </Card>
                </Col>
                <Col cW='20%'> 
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                    Infra Merchant Staff
                    </h4>
                    <div className="cardValue">0</div>
                  </Card>
                </Col>
                <Col cW='20%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="220px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'0px'}}
                  >
                    <h4>
                    Infra Merchant Cashier
                    </h4>
                    <div className="cardValue">0</div>
                  </Card>
                </Col>
                <Col cW='40%'></Col>
              </Row>
              <Row style={{marginTop:'20px', marginBottom:'15px'}}>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="300px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'20px'}}
                  >
                    <h4>Invoice</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Created</h5>
                        <div className="cardValue">{this.state.merchantInvoiceCreated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Uploaded</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                     horizontalMargin="0px"
                     cardWidth="300px"
                     smallValue
                     textAlign="center"
                     col
                    style={{height:'120px', marginLeft:'-1px'}}
                  >
                    <h4>Invoice Paid</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Number</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Amount</h5>
                        <div className="cardValue"> 0</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="300px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-20px'}}
                  >
                    <h4>Revenue</h4>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.merchantFee.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.merchantCommission.toFixed(2)}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue">{(this.state.merchantFee+this.state.merchantCommission).toFixed(2)}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col cW='10%' style={{marginTop:'50px',marginRight:'10px'}}>
                  <A href='/merchantlist'>
                    <Button
                      style={{
                        padding:'10px',
                        backgroundColor:'green',
                        color:'white',
                        marginRight:'60px'
                        
                      }}
                    >
                      <h4>View All</h4>
                    </Button>
                  </A>
                </Col>
              </Row>
            
         </div> 
           
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
