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
import history from 'utils/history.js';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Footer from 'components/Footer';
import Wrapper from 'components/Wrapper';
import A from 'components/A';
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Nav from 'components/Header/Nav';
import Welcome from 'components/Header/Welcome';
import SidebarBank from 'components/Sidebar/SidebarBank';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import MiniPopUp from 'components/MiniPopUp';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import Popup from 'components/Popup';
import SelectInput from 'components/SelectInput';

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
const bid = localStorage.getItem('bankId');

export default class BankBranchList extends Component {
  constructor() {
    super();
    this.state = {
      sid: '',
      bank: bid,
      name: '',
      bank_id: localStorage.getItem('bankId'), 
      bankName: localStorage.getItem('bankName'),
      bankLogo: localStorage.getItem('bankLogo'),
      admin: localStorage.getItem('admin'),
      address1: '',
      html: '',
      popname: '',
      poprange: '',
      poptype: '',
      poppercent: '',
      state: '',
      zip: '',
      country: '',
      ccode: '',
      mobile: '',
      email: '',
      logo: null,
      contract: null,
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: 'Welcome',
      popup: false,
      token: localStorage.getItem('bankLogged'),
      user_id: token,
      banks: [],
      branches: [],
      copybranches: [],
      otp: '',
      showOtp: false,
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleInputChange = event => {
    const { value, name } = event.target;
    if (name === 'name') {
      this.setState({
        [name]: value.trim(),
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  showPopup = () => {
    this.setState({ popup: true });
  };
  showEditPopup = v => {
    this.setState({
      editPopup: true,
      name: v.name,
      bcode: v.bcode,
      credit_limit: v.credit_limit,
      eworking_from: v.working_from == 0 ? this.state.working_from : v.working_from,
      eworking_to: v.working_to == 0 ? this.state.working_to : v.working_to,
      username: v.username,
      address1: v.address1,
      state: v.state,
      zip: v.zip,
      country: v.country,
      ccode: v.ccode,
      mobile: v.mobile,
      email: v.email,
      branch_id: v._id,
    });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
      name: '',
      address1: '',
      state: '',
      zip: '',
      bcode: '',
      country: '',
      email: '',
      mobile: '',
      credit_limit: '',
      otp: '',
      showOtp: false,
      showEditOtp: false,
    });
  };
  showMiniPopUp = (b, r) => {
    this.setState({
      popname: b.name,
      poptype: b.trans_type,
      sid: b._id,
      popup: true,
      html: r,
    });
    //this.props.history.push('/createfee/'+this.state.bank_id);
  };

  closeMiniPopUp = () => {
    this.setState({
      popup: false,
    });
  };
  countryChange = event => {
    const { value, name } = event.target;
    const title = event.target.options[event.target.selectedIndex].title;

    this.setState({
      [name]: value,
      ccode: title,
    });
  };

  logout = () => {
    // event.preventDefault();
    // axios.post(API_URL+'/logout', {token: token})
    // .then(res => {
    //    if(res.status == 200){
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
    //     }else{
    //       const error = new Error(res.data.error);
    //       throw error;
    //     }
    // })
    // .catch(err => {
    //   alert('Login to continue');
    //   this.setState({ redirect: true });
    // });
  };

  addBranch = event => {
    event.preventDefault();

    this.setState({
      addBranchLoading: true,
    });

    axios
      .post(`${API_URL}/addBranch`, {
        name: this.state.name,
        bcode: this.state.bcode,
        username: this.state.username,
        credit_limit: this.state.credit_limit,
        cash_in_hand: this.state.cash_in_hand,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        ccode: this.state.ccode,
        email: this.state.email,
        mobile: this.state.mobile,
        working_from: this.state.working_from,
        working_to: this.state.working_to,
        token: this.state.token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.status === 0) {
            throw res.data.message;
          } else {
            this.setState({
              notification: 'Branch added successfully!',
            });
            this.success();
            this.closePopup();
            this.getBranches();
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          addBranchLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          addBranchLoading: false,
        });
        this.error();
      });
  };

  editBranch = event => {
    this.setState({
      editBranchLoading: false,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/editBranch`, {
        name: this.state.name,
        username: this.state.username,
        credit_limit: this.state.credit_limit,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        ccode: this.state.ccode,
        email: this.state.email,
        mobile: this.state.mobile,
        branch_id: this.state.branch_id,
        working_from: this.state.eworking_from,
        working_to: this.state.eworking_to,
        token: this.state.token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Bank updated successfully!',
              },
              function () {
                this.success();
                this.closePopup();
                this.getData();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          editBranchLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          editBranchLoading: false,
        });
        this.error();
      });
  };

  blockBranch = (e, s) => {
    var dis = this;
    axios
      .post(`${API_URL}/branchStatus`, {
        token: this.state.token,
        branch_id: e,
        status: s,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            var n = s == 1 ? 'Unblocked' : 'Blocked';
            this.setState({
              notification: 'Branch ' + n,
            });
            this.success();
            this.getData();
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };

  approve = event => {
    this.setState({
      approveLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/approveFee`, {
        id: this.state.sid,
        token: this.state.token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Approved',
              },
              () => {
                this.success();
                this.closeMiniPopUp();
                this.getData();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          approveLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          approveLoading: false,
        });
        this.error();
      });
  };

  decline = event => {
    this.setState({
      declineLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/declineFee`, {
        id: this.state.sid,
        token: this.state.token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Declined',
              },
              () => {
                this.success();
                this.closeMiniPopUp();
                this.getData();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          declineLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          declineLoading: false,
        });
        this.error();
      });
  };

  showWallet = event => {
    event.preventDefault();
  };

  removeFile = key => {
    this.setState({
      [key]: null,
    });
  };

  triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };

  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
    }
  }

  fileUpload(file, key) {
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(`${API_URL}/fileUpload?token=${this.state.token}`, formData, config)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              [key]: res.data.name,
            });
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
  }



  getBranches = async() => {
    try {
      const res = await axios.post(`${API_URL}/getBranches`, { token:this.state.token, bank_id: this.state.bank_id });
      if (res.status == 200) {
        return ({branches:res.data.branches,loading:false});
      }
    } catch(err){
      console.log(err);
    }
  }

  getBranchDashStats = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/bank/getBranchDashStats`, { token:this.state.token,branch_id:id });
      if (res.status == 200) {
        return (res.data);
      }
    } catch(err){
      console.log(err);
    }
  }

  getBranchStats = async(blist) => {
    const stats = blist.map(async (branch) => {
      const branchstats = await this.getBranchDashStats(branch._id);
      return (branchstats);
    });
    const result= await Promise.all(stats);
    return({res:result,loading:false});
  }
  getData = async() => {
    this.setState(
      {
        loading:true,
      }
    );
    const branches = await this.getBranches();
    console.log(branches.branches);
    const branchstats = await this.getBranchStats(branches.branches);
    console.log(branchstats);
    this.setState(
      {
        branches: branches.branches,
        branchStats:branchstats.res,
        loading:branchstats.loading,
        totalCashier: branchstats.res.reduce(
          (a, b) => a + b.totalCashier, 0
        ),
        openingBalance: branchstats.res.reduce(
          (a, b) => a + b.openingBalance, 0
        ).toFixed(2),
        cashInHand: branchstats.res.reduce(
          (a, b) => a + b.cashInHand, 0
        ).toFixed(2),
        feeGenerated: branchstats.res.reduce(
          (a, b) => a + b.feeGenerated, 0
        ).toFixed(2),
        commissionGenerated: branchstats.res.reduce(
          (a, b) => a + b.commissionGenerated, 0
        ).toFixed(2),
        invoicePaid: branchstats.res.reduce(
          (a, b) => a + b.invoicePaid, 0
        ),
        amountPaid: branchstats.res.reduce(
          (a, b) => a + b.amountPaid, 0
        ),
        accepted: branchstats.res.reduce(
          (a, b) => a + b.accepted, 0
        ),
        declined: branchstats.res.reduce(
          (a, b) => a + b.cancelled, 0
        ),
        pending: branchstats.res.reduce(
          (a, b) => a + b.pending, 0
        ),
        cashReceived: branchstats.res.reduce(
          (a, b) => a + b.cashReceived, 0
        ).toFixed(2),
        cashReceivedFee: branchstats.res.reduce(
          (a, b) => a + b.cashReceivedFee, 0
        ).toFixed(2),
        cashReceivedComm: branchstats.res.reduce(
          (a, b) => a + b.cashReceivedComm, 0
        ).toFixed(2),
        cashPaid: branchstats.res.reduce(
          (a, b) => a + b.cashPaid, 0
        ).toFixed(2),
        cashPaid: branchstats.res.reduce(
          (a, b) => a + b.cashPaidFee, 0
        ).toFixed(2),
        cashPaid: branchstats.res.reduce(
          (a, b) => a + b.cashPaidComm, 0
        ).toFixed(2),
        closingBalance: branchstats.res.reduce(
          (a, b) => a + b.closingBalance, 0
        ).toFixed(2),
      }
    );
    
  }

  componentDidMount() {
    // this.setState({ bank: this.state.bank_id });
    console.log(localStorage.getItem('admin'));
    if (token !== undefined && token !== null) {
      // this.getBank();
      this.getData();
      // this.getBranches();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }


  searchlistfunction = (value) => {
    console.log(value)
    // console.log(this.state.searchrules)
    const newfilterdata = this.state.copybranches.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );

    this.setState({ branches: newfilterdata })

  }

  render() {
    console.log(this.props);
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
    return (
      <Wrapper from="bank">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <BankHeader active="branches" />
        <Container verticalMargin>
          <SidebarBank />
          <Main>
          <Row>
              <Col  cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  textAlign="center"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Number of Agency</h4>
                  <div className="cardValue">{this.state.branches.length}</div>
                </Card>
              </Col>
              <Col  cW='25%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Opening Balance</h4>
                  <div className="cardValue">{CURRENCY}: {this.state.openingBalance}</div>
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
                      <div className="cardValue">{this.state.cashReceived}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.cashReceivedFee}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.cashReceivedComm}</div>
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
                      <div className="cardValue">{this.state.cashPaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.cashPaidFee}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.cashPaidFeeComm}</div>
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
                      <div className="cardValue">{CURRENCY}: {this.state.feeGenerated}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.commissionGenerated}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Total</h5>
                      <div className="cardValue">{CURRENCY}: {(parseFloat(this.state.commissionGenerated,10)+ parseFloat(this.state.feeGenerated,10)).toFixed(2)}</div>
                    </Col>
                  </Row>
                  
                </Card>
              </Col>
            </Row>
            <Row>
            <Col cW='35%'>
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
                      <div className="cardValue">{this.state.invoicePaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {this.state.amountPaid}</div>
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
                  <div className="cardValue">{CURRENCY}: {this.state.cashInHand}</div>
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
                  <div className="cardValue">{CURRENCY}: {this.state.closingBalance}</div>
                </Card>
              </Col>
              <Col  cW='33%'>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  textAlign="center"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Discripancy</h4>
                  <div className="cardValue">{CURRENCY}: 0</div>
                </Card>
              </Col>
            </Row>
            
          </Main>
          <Main fullWidth>
            <Card bigPadding>
            { this.state.admin === false || this.state.admin === 'false' ? (
               <Button
               className="addBankButton"
               flex
               style={{
                 float:"right",
                 marginBottom:'10px',
               }}
               onClick={() => this.showPopup()}
             >
                <i className="material-icons">add</i>
               <span>Add Agency</span>
             </Button>

            ):''}
           
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Agency List</h3>
                  {/* <h5>Your friends and family</h5> */}
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Agency Name</th>
                      <th>Total Cashier</th>
                      <th>Opening Balance ({CURRENCY})</th>
                      <th>Cash Received ({CURRENCY})</th>
                      <th>Cash Paid ({CURRENCY})</th>
                      <th>Invoice Paid </th>
                      <th>Amount Collected ({CURRENCY})</th>
                      <th>Fee Collected ({CURRENCY})</th>
                      <th>Commission Collected ({CURRENCY})</th>
                      <th>Revenue Collected ({CURRENCY})</th>
                      <th>Cash in Hand ({CURRENCY})</th>
                      <th>Closing Balance ({CURRENCY})</th>
                      <th>Discripancy ({CURRENCY})</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.branches && this.state.branches.length > 0
                      ? this.state.branches.map(function (b,i) {
                        return (
                          <tr key={b._id}>
                            <td>{b.name}</td>
                            <td className="tac">{b.total_cashiers}</td>
                            <td className="tac">{dis.state.branchStats[i].openingBalance.toFixed(2)}</td>
                            <td className="tac">{dis.state.branchStats[i].cashReceived.toFixed(2)}</td>
                            <td className="tac">{dis.state.branchStats[i].cashPaid.toFixed(2)}</td>
                            <td className="tac">{dis.state.branchStats[i].invoicePaid}</td>
                            <td className="tac">{dis.state.branchStats[i].amountPaid}</td>
                            <td className="tac">{dis.state.branchStats[i].feeGenerated.toFixed(2)}</td>
                            <td className="tac">{dis.state.branchStats[i].commissionGenerated.toFixed(2)}</td>
                            <td className="tac">{(dis.state.branchStats[i].feeGenerated + dis.state.branchStats[i].commissionGenerated).toFixed(2)}</td>
                            <td className="tac">{dis.state.branchStats[i].cashInHand}</td>
                            <td className="tac">{dis.state.branchStats[i].closingBalance.toFixed(2)}</td>
                            <td className="tac">0</td>
                            <td className="tac bold green">
                              
                              <Button
                                style={{minWidth:'90%', marginRight:'5px'}}
                                onClick={() => {
                                  localStorage.setItem(
                                    'selectedBranch',
                                    JSON.stringify(b),
                                  );
                                history.push(`/bank/branchdashboard/${b._id}`);
                                }}
                              >                    
                                View                   
                              </Button>
                              <span className="absoluteMiddleRight primary popMenuTrigger">
                                <i className="material-icons ">more_vert</i>
                                <div className="popMenu">
                                  <A href={'/bank/branch/' + b._id}>
                                    Branch Info
                                    </A>
                                  <span onClick={() => dis.showEditPopup(b)}>
                                    Edit
                                    </span>
                                  {b.status == -1 ? (
                                    <span
                                      onClick={() =>
                                        dis.blockBranch(b._id, 1)
                                      }
                                    >
                                      Unblock
                                    </span>
                                  ) : (
                                      <span
                                        onClick={() =>
                                          dis.blockBranch(b._id, -1)
                                        }
                                      >
                                        Block
                                      </span>
                                    )}
                                </div>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Main>
        
        </Container>
        {this.state.popup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showOtp ? (
              <div>
                <h1>
                  <FormattedMessage {...messages.verify} />
                </h1>
                <form action="" method="post" onSubmit={this.verifyOTP}>
                  <FormGroup>
                    <label>
                      <FormattedMessage {...messages.otp} />*
                    </label>
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
                  {this.state.verifyOTPLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                      <Button filledBtn marginTop="50px">
                        <span>
                          <FormattedMessage {...messages.verify} />
                        </span>
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
                  <h1>Add Agency</h1>
                  <form action="" method="post" onSubmit={this.addBranch}>
                    <FormGroup>
                      <label>Branch Name*</label>
                      <TextInput
                        type="text"
                        name="name"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Branch ID*</label>
                      <TextInput
                        type="text"
                        name="bcode"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.bcode}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Branch Admin: User ID*</label>
                      <TextInput
                        type="text"
                        name="username"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <Row>
                      <Col cW="20%" mR="2%">
                        <FormGroup>
                          <TextInput
                            // type="text"
                            // name="ccode"
                            readOnly
                            label={CURRENCY}
                            placeholder={CURRENCY}
                          // value={this.state.ccode}
                          // onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col cW="78%">
                        <FormGroup>
                          <label>Credit Limit</label>
                          <TextInput
                            type="text"
                            name="credit_limit"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.credit_limit}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col cW="20%" mR="2%">
                        <FormGroup>
                          <TextInput
                            // type="text"
                            // name="ccode"
                            readOnly
                            label={CURRENCY}
                            placeholder={CURRENCY}
                          // value={this.state.ccode}
                          // onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col cW="78%">
                        <FormGroup>
                          <label>Cash in Hand</label>
                          <TextInput
                            type="text"
                            name="cash_in_hand"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.cash_in_hand}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <label>Address*</label>
                      <TextInput
                        type="text"
                        name="address1"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.address1}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>

                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            <FormattedMessage {...messages.popup3} />*
                        </label>
                          <TextInput
                            type="text"
                            name="state"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.state}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <FormattedMessage {...messages.popup4} />*
                        </label>
                          <TextInput
                            type="text"
                            name="zip"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.zip}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <SelectInput
                            type="text"
                            name="country"
                            value={this.state.country}
                            onChange={this.countryChange}
                            required
                          >
                            <option title="" value="">
                              Select Country*
                          </option>
                            <option title="+213">Algeria</option>
                            <option title="+376">Andorra</option>
                            <option title="+244">Angola</option>
                            <option title="+1264">Anguilla</option>
                            <option title="+1268">Antigua &amp; Barbuda</option>
                            <option title="+54">Argentina</option>
                            <option title="+374">Armenia</option>
                            <option title="+297">Aruba</option>
                            <option title="+61">Australia</option>
                            <option title="+43">Austria</option>
                            <option title="+994">Azerbaijan</option>
                            <option title="+1242">Bahamas</option>
                            <option title="+973">Bahrain</option>
                            <option title="+880">Bangladesh</option>
                            <option title="+1246">Barbados</option>
                            <option title="+375">Belarus</option>
                            <option title="+32">Belgium</option>
                            <option title="+501">Belize</option>
                            <option title="+229">Benin</option>
                            <option title="+1441">Bermuda</option>
                            <option title="+975">Bhutan</option>
                            <option title="+591">Bolivia</option>
                            <option title="+387">Bosnia Herzegovina</option>
                            <option title="+267">Botswana</option>
                            <option title="+55">Brazil</option>
                            <option title="+673">Brunei</option>
                            <option title="+359">Bulgaria</option>
                            <option title="+226">Burkina Faso</option>
                            <option title="+257">Burundi</option>
                            <option title="+855">Cambodia</option>
                            <option title="+237">Cameroon</option>
                            <option title="+1">Canada</option>
                            <option title="+238">Cape Verde Islands</option>
                            <option title="+1345">Cayman Islands</option>
                            <option title="+236">Central African Republic</option>
                            <option title="+56">Chile</option>
                            <option title="+86">China</option>
                            <option title="+57">Colombia</option>
                            <option title="+269">Comoros</option>
                            <option title="+242">Congo</option>
                            <option title="+682">Cook Islands</option>
                            <option title="+506">Costa Rica</option>
                            <option title="+385">Croatia</option>
                            <option title="+53">Cuba</option>
                            <option title="+90392">Cyprus North</option>
                            <option title="+357">Cyprus South</option>
                            <option title="+42">Czech Republic</option>
                            <option title="+45">Denmark</option>
                            <option title="+253">Djibouti</option>
                            <option title="+1809">Dominica</option>
                            <option title="+1809">Dominican Republic</option>
                            <option title="+593">Ecuador</option>
                            <option title="+20">Egypt</option>
                            <option title="+503">El Salvador</option>
                            <option title="+240">Equatorial Guinea</option>
                            <option title="+291">Eritrea</option>
                            <option title="+372">Estonia</option>
                            <option title="+251">Ethiopia</option>
                            <option title="+500">Falkland Islands</option>
                            <option title="+298">Faroe Islands</option>
                            <option title="+679">Fiji</option>
                            <option title="+358">Finland</option>
                            <option title="+33">France</option>
                            <option title="+594">French Guiana</option>
                            <option title="+689">French Polynesia</option>
                            <option title="+241">Gabon</option>
                            <option title="+220">Gambia</option>
                            <option title="+7880">Georgia</option>
                            <option title="+49">Germany</option>
                            <option title="+233">Ghana</option>
                            <option title="+350">Gibraltar</option>
                            <option title="+30">Greece</option>
                            <option title="+299">Greenland</option>
                            <option title="+1473">Grenada</option>
                            <option title="+590">Guadeloupe</option>
                            <option title="+671">Guam</option>
                            <option title="+502">Guatemala</option>
                            <option title="+224">Guinea</option>
                            <option title="+245">Guinea - Bissau</option>
                            <option title="+592">Guyana</option>
                            <option title="+509">Haiti</option>
                            <option title="+504">Honduras</option>
                            <option title="+852">Hong Kong</option>
                            <option title="+36">Hungary</option>
                            <option title="+354">Iceland</option>
                            <option title="+91">India</option>
                            <option title="+62">Indonesia</option>
                            <option title="+98">Iran</option>
                            <option title="+964">Iraq</option>
                            <option title="+353">Ireland</option>
                            <option title="+972">Israel</option>
                            <option title="+39">Italy</option>
                            <option title="+1876">Jamaica</option>
                            <option title="+81">Japan</option>
                            <option title="+962">Jordan</option>
                            <option title="+7">Kazakhstan</option>
                            <option title="+254">Kenya</option>
                            <option title="+686">Kiribati</option>
                            <option title="+850">Korea North</option>
                            <option title="+82">Korea South</option>
                            <option title="+965">Kuwait</option>
                            <option title="+996">Kyrgyzstan</option>
                            <option title="+856">Laos</option>
                            <option title="+371">Latvia</option>
                            <option title="+961">Lebanon</option>
                            <option title="+266">Lesotho</option>
                            <option title="+231">Liberia</option>
                            <option title="+218">Libya</option>
                            <option title="+417">Liechtenstein</option>
                            <option title="+370">Lithuania</option>
                            <option title="+352">Luxembourg</option>
                            <option title="+853">Macao</option>
                            <option title="+389">Macedonia</option>
                            <option title="+261">Madagascar</option>
                            <option title="+265">Malawi</option>
                            <option title="+60">Malaysia</option>
                            <option title="+960">Maldives</option>
                            <option title="+223">Mali</option>
                            <option title="+356">Malta</option>
                            <option title="+692">Marshall Islands</option>
                            <option title="+596">Martinique</option>
                            <option title="+222">Mauritania</option>
                            <option title="+269">Mayotte</option>
                            <option title="+52">Mexico</option>
                            <option title="+691">Micronesia</option>
                            <option title="+373">Moldova</option>
                            <option title="+377">Monaco</option>
                            <option title="+976">Mongolia</option>
                            <option title="+1664">Montserrat</option>
                            <option title="+212">Morocco</option>
                            <option title="+258">Mozambique</option>
                            <option title="+95">Myanmar</option>
                            <option title="+264">Namibia</option>
                            <option title="+674">Nauru</option>
                            <option title="+977">Nepal</option>
                            <option title="+31">Netherlands</option>
                            <option title="+687">New Caledonia</option>
                            <option title="+64">New Zealand</option>
                            <option title="+505">Nicaragua</option>
                            <option title="+227">Niger</option>
                            <option title="+234">Nigeria</option>
                            <option title="+683">Niue</option>
                            <option title="+672">Norfolk Islands</option>
                            <option title="+670">Northern Marianas</option>
                            <option title="+47">Norway</option>
                            <option title="+968">Oman</option>
                            <option title="+680">Palau</option>
                            <option title="+507">Panama</option>
                            <option title="+675">Papua New Guinea</option>
                            <option title="+595">Paraguay</option>
                            <option title="+51">Peru</option>
                            <option title="+63">Philippines</option>
                            <option title="+48">Poland</option>
                            <option title="+351">Portugal</option>
                            <option title="+1787">Puerto Rico</option>
                            <option title="+974">Qatar</option>
                            <option title="+262">Reunion</option>
                            <option title="+40">Romania</option>
                            <option title="+7">Russia</option>
                            <option title="+250">Rwanda</option>
                            <option title="+378">San Marino</option>
                            <option title="+239">Sao Tome &amp; Principe</option>
                            <option title="+966">Saudi Arabia</option>
                            <option title="+221">Senegal</option>
                            <option title="+381">Serbia</option>
                            <option title="+248">Seychelles</option>
                            <option title="+232">Sierra Leone</option>
                            <option title="+65">Singapore</option>
                            <option title="+421">Slovak Republic</option>
                            <option title="+386">Slovenia</option>
                            <option title="+677">Solomon Islands</option>
                            <option title="+252">Somalia</option>
                            <option title="+27">South Africa</option>
                            <option title="+34">Spain</option>
                            <option title="+94">Sri Lanka</option>
                            <option title="+290">St. Helena</option>
                            <option title="+1869">St. Kitts</option>
                            <option title="+1758">St. Lucia</option>
                            <option title="+249">Sudan</option>
                            <option title="+597">Suriname</option>
                            <option title="+268">Swaziland</option>
                            <option title="+46">Sweden</option>
                            <option title="+41">Switzerland</option>
                            <option title="+963">Syria</option>
                            <option title="+886">Taiwan</option>
                            <option title="+7">Tajikstan</option>
                            <option title="+66">Thailand</option>
                            <option title="+228">Togo</option>
                            <option title="+676">Tonga</option>
                            <option title="+1868">Trinidad &amp; Tobago</option>
                            <option title="+216">Tunisia</option>
                            <option title="+90">Turkey</option>
                            <option title="+7">Turkmenistan</option>
                            <option title="+993">Turkmenistan</option>
                            <option title="+1649">
                              Turks &amp; Caicos Islands
                          </option>
                            <option title="+688">Tuvalu</option>
                            <option title="+256">Uganda</option>
                            <option title="+44">UK</option>
                            <option title="+380">Ukraine</option>
                            <option title="+971">United Arab Emirates</option>
                            <option title="+598">Uruguay</option>
                            <option title="+1">USA</option>
                            <option title="+7">Uzbekistan</option>
                            <option title="+678">Vanuatu</option>
                            <option title="+379">Vatican City</option>
                            <option title="+58">Venezuela</option>
                            <option title="+84">Vietnam</option>
                            <option title="+84">Virgin Islands - British</option>
                            <option title="+84">Virgin Islands - US</option>
                            <option title="+681">Wallis &amp; Futuna</option>
                            <option title="+969">Yemen</option>
                            <option title="+967">Yemen</option>
                            <option title="+260">Zambia</option>
                            <option title="+263">Zimbabwe</option>
                          </SelectInput>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup>
                          <label>
                            <FormattedMessage {...messages.popup8} />*
                        </label>
                          <TextInput
                            type="email"
                            name="email"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col cW="20%" mR="2%">
                        <FormGroup>
                          <TextInput
                            type="text"
                            name="ccode"
                            readOnly
                            value={this.state.ccode}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col cW="78%">
                        <FormGroup>
                          <label>
                            <FormattedMessage {...messages.popup7} />*
                        </label>
                          <TextInput
                            type="text"
                            // pattern="[0-9]{10}"
                            title="Mobile"
                            name="mobile"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.mobile}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <label>Working Hours</label>
                    <Row>
                      <Col cW="49%" mR="2%">

                        <FormGroup>
                          <label  className="focused">From*</label>
                          <TextInput
                            type="time"
                            name="working_from"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            min="00:00" max="12:00"
                            autoFocus
                            value={this.state.working_from}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>

                      </Col>
                      <Col cW="49%">
                        <FormGroup>
                          <label className="focused">To*</label>
                          <TextInput
                            type="time"
                            autoFocus
                            min="12:01"
                            max="23:00"
                            name="working_to"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.working_to}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>

                      </Col>
                    </Row>

                    {this.state.addBranchLoading ? (
                      <Button filledBtn marginTop="10px" disabled>
                        <Loader />
                      </Button>
                    ) : (
                        <Button filledBtn marginTop="10px">
                          <span>Add Agency</span>
                        </Button>
                      )}
                  </form>
                </div>
              )}
          </Popup>
        ) : null}

        {this.state.editPopup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showEditOtp ? null : (
              <div>
                <h1>Edit Branch</h1>
                <form action="" method="post" onSubmit={this.editBranch}>
                  <FormGroup>
                    <label>Branch Name*</label>
                    <TextInput
                      type="text"
                      name="name"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      autoFocus
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Branch ID*</label>
                    <TextInput
                      type="text"
                      name="bcode"
                      readOnly
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.bcode}
                      onChange={this.handleInputChange}
                      autoFocus
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Branch Admin: User ID*</label>
                    <TextInput
                      type="text"
                      name="username"
                      onFocus={inputFocus}
                      readOnly
                      onBlur={inputBlur}
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      autoFocus
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Credit Limit</label>
                    <TextInput
                      type="text"
                      name="credit_limit"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.credit_limit}
                      onChange={this.handleInputChange}
                      autoFocus
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Address*</label>
                    <TextInput
                      type="text"
                      name="address1"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.address1}
                      onChange={this.handleInputChange}
                      required
                      autoFocus
                    />
                  </FormGroup>

                  <Row>
                    <Col>
                      <FormGroup>
                        <label>
                          <FormattedMessage {...messages.popup3} />*
                        </label>
                        <TextInput
                          type="text"
                          name="state"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.state}
                          onChange={this.handleInputChange}
                          required
                          autoFocus
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>
                          <FormattedMessage {...messages.popup4} />*
                        </label>
                        <TextInput
                          type="text"
                          name="zip"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.zip}
                          onChange={this.handleInputChange}
                          required
                          autoFocus
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <SelectInput
                          type="text"
                          name="country"
                          value={this.state.country}
                          onChange={this.countryChange}
                          required
                          autoFocus
                        >
                          <option title="" value="">
                            Select Country*
                          </option>
                          <option title="+213">Algeria</option>
                          <option title="+376">Andorra</option>
                          <option title="+244">Angola</option>
                          <option title="+1264">Anguilla</option>
                          <option title="+1268">Antigua &amp; Barbuda</option>
                          <option title="+54">Argentina</option>
                          <option title="+374">Armenia</option>
                          <option title="+297">Aruba</option>
                          <option title="+61">Australia</option>
                          <option title="+43">Austria</option>
                          <option title="+994">Azerbaijan</option>
                          <option title="+1242">Bahamas</option>
                          <option title="+973">Bahrain</option>
                          <option title="+880">Bangladesh</option>
                          <option title="+1246">Barbados</option>
                          <option title="+375">Belarus</option>
                          <option title="+32">Belgium</option>
                          <option title="+501">Belize</option>
                          <option title="+229">Benin</option>
                          <option title="+1441">Bermuda</option>
                          <option title="+975">Bhutan</option>
                          <option title="+591">Bolivia</option>
                          <option title="+387">Bosnia Herzegovina</option>
                          <option title="+267">Botswana</option>
                          <option title="+55">Brazil</option>
                          <option title="+673">Brunei</option>
                          <option title="+359">Bulgaria</option>
                          <option title="+226">Burkina Faso</option>
                          <option title="+257">Burundi</option>
                          <option title="+855">Cambodia</option>
                          <option title="+237">Cameroon</option>
                          <option title="+1">Canada</option>
                          <option title="+238">Cape Verde Islands</option>
                          <option title="+1345">Cayman Islands</option>
                          <option title="+236">Central African Republic</option>
                          <option title="+56">Chile</option>
                          <option title="+86">China</option>
                          <option title="+57">Colombia</option>
                          <option title="+269">Comoros</option>
                          <option title="+242">Congo</option>
                          <option title="+682">Cook Islands</option>
                          <option title="+506">Costa Rica</option>
                          <option title="+385">Croatia</option>
                          <option title="+53">Cuba</option>
                          <option title="+90392">Cyprus North</option>
                          <option title="+357">Cyprus South</option>
                          <option title="+42">Czech Republic</option>
                          <option title="+45">Denmark</option>
                          <option title="+253">Djibouti</option>
                          <option title="+1809">Dominica</option>
                          <option title="+1809">Dominican Republic</option>
                          <option title="+593">Ecuador</option>
                          <option title="+20">Egypt</option>
                          <option title="+503">El Salvador</option>
                          <option title="+240">Equatorial Guinea</option>
                          <option title="+291">Eritrea</option>
                          <option title="+372">Estonia</option>
                          <option title="+251">Ethiopia</option>
                          <option title="+500">Falkland Islands</option>
                          <option title="+298">Faroe Islands</option>
                          <option title="+679">Fiji</option>
                          <option title="+358">Finland</option>
                          <option title="+33">France</option>
                          <option title="+594">French Guiana</option>
                          <option title="+689">French Polynesia</option>
                          <option title="+241">Gabon</option>
                          <option title="+220">Gambia</option>
                          <option title="+7880">Georgia</option>
                          <option title="+49">Germany</option>
                          <option title="+233">Ghana</option>
                          <option title="+350">Gibraltar</option>
                          <option title="+30">Greece</option>
                          <option title="+299">Greenland</option>
                          <option title="+1473">Grenada</option>
                          <option title="+590">Guadeloupe</option>
                          <option title="+671">Guam</option>
                          <option title="+502">Guatemala</option>
                          <option title="+224">Guinea</option>
                          <option title="+245">Guinea - Bissau</option>
                          <option title="+592">Guyana</option>
                          <option title="+509">Haiti</option>
                          <option title="+504">Honduras</option>
                          <option title="+852">Hong Kong</option>
                          <option title="+36">Hungary</option>
                          <option title="+354">Iceland</option>
                          <option title="+91">India</option>
                          <option title="+62">Indonesia</option>
                          <option title="+98">Iran</option>
                          <option title="+964">Iraq</option>
                          <option title="+353">Ireland</option>
                          <option title="+972">Israel</option>
                          <option title="+39">Italy</option>
                          <option title="+1876">Jamaica</option>
                          <option title="+81">Japan</option>
                          <option title="+962">Jordan</option>
                          <option title="+7">Kazakhstan</option>
                          <option title="+254">Kenya</option>
                          <option title="+686">Kiribati</option>
                          <option title="+850">Korea North</option>
                          <option title="+82">Korea South</option>
                          <option title="+965">Kuwait</option>
                          <option title="+996">Kyrgyzstan</option>
                          <option title="+856">Laos</option>
                          <option title="+371">Latvia</option>
                          <option title="+961">Lebanon</option>
                          <option title="+266">Lesotho</option>
                          <option title="+231">Liberia</option>
                          <option title="+218">Libya</option>
                          <option title="+417">Liechtenstein</option>
                          <option title="+370">Lithuania</option>
                          <option title="+352">Luxembourg</option>
                          <option title="+853">Macao</option>
                          <option title="+389">Macedonia</option>
                          <option title="+261">Madagascar</option>
                          <option title="+265">Malawi</option>
                          <option title="+60">Malaysia</option>
                          <option title="+960">Maldives</option>
                          <option title="+223">Mali</option>
                          <option title="+356">Malta</option>
                          <option title="+692">Marshall Islands</option>
                          <option title="+596">Martinique</option>
                          <option title="+222">Mauritania</option>
                          <option title="+269">Mayotte</option>
                          <option title="+52">Mexico</option>
                          <option title="+691">Micronesia</option>
                          <option title="+373">Moldova</option>
                          <option title="+377">Monaco</option>
                          <option title="+976">Mongolia</option>
                          <option title="+1664">Montserrat</option>
                          <option title="+212">Morocco</option>
                          <option title="+258">Mozambique</option>
                          <option title="+95">Myanmar</option>
                          <option title="+264">Namibia</option>
                          <option title="+674">Nauru</option>
                          <option title="+977">Nepal</option>
                          <option title="+31">Netherlands</option>
                          <option title="+687">New Caledonia</option>
                          <option title="+64">New Zealand</option>
                          <option title="+505">Nicaragua</option>
                          <option title="+227">Niger</option>
                          <option title="+234">Nigeria</option>
                          <option title="+683">Niue</option>
                          <option title="+672">Norfolk Islands</option>
                          <option title="+670">Northern Marianas</option>
                          <option title="+47">Norway</option>
                          <option title="+968">Oman</option>
                          <option title="+680">Palau</option>
                          <option title="+507">Panama</option>
                          <option title="+675">Papua New Guinea</option>
                          <option title="+595">Paraguay</option>
                          <option title="+51">Peru</option>
                          <option title="+63">Philippines</option>
                          <option title="+48">Poland</option>
                          <option title="+351">Portugal</option>
                          <option title="+1787">Puerto Rico</option>
                          <option title="+974">Qatar</option>
                          <option title="+262">Reunion</option>
                          <option title="+40">Romania</option>
                          <option title="+7">Russia</option>
                          <option title="+250">Rwanda</option>
                          <option title="+378">San Marino</option>
                          <option title="+239">Sao Tome &amp; Principe</option>
                          <option title="+966">Saudi Arabia</option>
                          <option title="+221">Senegal</option>
                          <option title="+381">Serbia</option>
                          <option title="+248">Seychelles</option>
                          <option title="+232">Sierra Leone</option>
                          <option title="+65">Singapore</option>
                          <option title="+421">Slovak Republic</option>
                          <option title="+386">Slovenia</option>
                          <option title="+677">Solomon Islands</option>
                          <option title="+252">Somalia</option>
                          <option title="+27">South Africa</option>
                          <option title="+34">Spain</option>
                          <option title="+94">Sri Lanka</option>
                          <option title="+290">St. Helena</option>
                          <option title="+1869">St. Kitts</option>
                          <option title="+1758">St. Lucia</option>
                          <option title="+249">Sudan</option>
                          <option title="+597">Suriname</option>
                          <option title="+268">Swaziland</option>
                          <option title="+46">Sweden</option>
                          <option title="+41">Switzerland</option>
                          <option title="+963">Syria</option>
                          <option title="+886">Taiwan</option>
                          <option title="+7">Tajikstan</option>
                          <option title="+66">Thailand</option>
                          <option title="+228">Togo</option>
                          <option title="+676">Tonga</option>
                          <option title="+1868">Trinidad &amp; Tobago</option>
                          <option title="+216">Tunisia</option>
                          <option title="+90">Turkey</option>
                          <option title="+7">Turkmenistan</option>
                          <option title="+993">Turkmenistan</option>
                          <option title="+1649">
                            Turks &amp; Caicos Islands
                          </option>
                          <option title="+688">Tuvalu</option>
                          <option title="+256">Uganda</option>
                          <option title="+44">UK</option>
                          <option title="+380">Ukraine</option>
                          <option title="+971">United Arab Emirates</option>
                          <option title="+598">Uruguay</option>
                          <option title="+1">USA</option>
                          <option title="+7">Uzbekistan</option>
                          <option title="+678">Vanuatu</option>
                          <option title="+379">Vatican City</option>
                          <option title="+58">Venezuela</option>
                          <option title="+84">Vietnam</option>
                          <option title="+84">Virgin Islands - British</option>
                          <option title="+84">Virgin Islands - US</option>
                          <option title="+681">Wallis &amp; Futuna</option>
                          <option title="+969">Yemen</option>
                          <option title="+967">Yemen</option>
                          <option title="+260">Zambia</option>
                          <option title="+263">Zimbabwe</option>
                        </SelectInput>
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup>
                        <label>
                          <FormattedMessage {...messages.popup8} />*
                        </label>
                        <TextInput
                          type="email"
                          name="email"
                          autoFocus
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col cW="20%" mR="2%">
                      <FormGroup>
                        <TextInput
                          type="text"
                          name="ccode"
                          readOnly
                          value={this.state.ccode}
                          onChange={this.handleInputChange}
                          required
                          autoFocus
                        />
                      </FormGroup>
                    </Col>
                    <Col cW="78%">
                      <FormGroup>
                        <label>
                          <FormattedMessage {...messages.popup7} />*
                        </label>
                        <TextInput
                          type="text"
                          // pattern="[0-9]{10}"
                          title="Mobile"
                          name="mobile"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.mobile}
                          onChange={this.handleInputChange}
                          required
                          autoFocus
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <label>Working Hours</label>
                  <Row>
                    <Col cW="49%" mR="2%">

                      <FormGroup>
                        <label>From*</label>
                        <TextInput
                          type="time"
                          name="eworking_from"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          min="00:00" max="12:00"
                          autoFocus
                          value={this.state.eworking_from}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                    </Col>
                    <Col cW="49%">
                      <FormGroup>
                        <label>To*</label>
                        <TextInput
                          type="time"
                          autoFocus
                          min="12:01" max="23:00"
                          name="eworking_to"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.eworking_to}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                    </Col>
                  </Row>

                  {this.state.editBranchLoading ? (
                    <Button filledBtn marginTop="10px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                      <Button filledBtn marginTop="10px">
                        <span>Update Branch</span>
                      </Button>
                    )}
                </form>
              </div>
            )}
          </Popup>
        ) : null}
         <Footer bankname={this.state.bankName} banklogo={this.state.bankLogo}/>
      </Wrapper>
    );
  }
}
