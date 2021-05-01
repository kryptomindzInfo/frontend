
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import Footer from 'components/Footer';
import Wrapper from 'components/Wrapper';
import Header from 'components/Header/index';
import Loader from 'components/Loader';
import Container from 'components/Container';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import Popup from 'components/Popup';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import A from 'components/A';
import classNames from 'classnames';
import messages from './messages';
import { postRequest, getRequest } from '../App/ApiCall';
import documentFileIcon from '../../images/pdf_icon.png';
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import pdfIcon from '../../images/pdf_icon.png'
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import {
  API_URL,
  CONTRACT_URL,
  SERVER_URL,
  STATIC_URL,
  CURRENCY,
} from '../App/constants';

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
const isAdmin = localStorage.getItem('isAdmin');

const styles = () => ({
  root: {
    display: 'block',
    marginTop: '20px',
  },
  appBar: {
    backgroundColor:'goldenrod',
    padding:'15px',
    color: "white",
    fontSize:'30px',
  },
  drawer: {
    zIndex: 0,
    position: "relative",
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: "relative",

  }
});



class BankPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address1: '',
      state: '',
      zip: '',
      country: '',
      ccode: '+91',
      mobile: '',
      bank_id: '',
      email: '',
      logo: '',
      contract: '',
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: 'Welcome',
      popup: false,
      username: '',
      editPopup: false,
      bankstats: [],
      edit: false,
      user_id: token,
      otpId: '',
      banks: [],
      otp: '',
      showOtp: false,
      showEditOtp: false,
      permissions: {},
      query: '',
      data: [],
      filteredData: [],
      banksforfilter: [],
      openingBalance: 0,

      totalBranches: 0,
      totalCashiers:0,
      bankTrans:0,
      feeGenerated: 0,
      commissionGenerated: 0,
      cashReceived: 0,
      crfeeGenerated: 0,
      crcommissionGenerated: 0,
      cashPaid: 0,
      cpfeeGenerated: 0,
      cpcommissionGenerated: 0,
      cashInHand: 0,
      
      totalPartners: 0,
      totalPartnerBranches: 0,
      totalPartnerCashiers:0,
      partnerTrans:0,
      partnerFee:0,
      partnerCommission:0,
      pcashReceived: 0,
      pcrfeeGenerated: 0,
      pcrcommissionGenerated: 0,
      pcashPaid: 0,
      pcpfeeGenerated: 0,
      pcpcommissionGenerated: 0,
      
      totalBankMerchants:0,
      totalMerchantBranches:0,
      totalMerchantStaff:0,
      totalMerchantCashier:0,
      merchantFee:0,
      merchantCommission:0,
      merchantInvoiceCreated:0,
      invoicePaid: 0,
      amountPaid: 0,
      totalAgencies:0,
      
      drawer:{
        drawer0: true,
        drawer1: true,
        drawer2: true,
        drawer3: true,
        drawer4: true,
      },
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

  handleDrawerOpen = (number) => {
    const obj = {...this.state.drawer}
    if (obj[`drawer${number}`] === false){
      obj[`drawer${number}`] = true;
    }else{
      obj[`drawer${number}`] = false;
    }
    console.log(obj);
    this.setState({
      drawer:obj,
    });
  };

  handleSearchInputChange = event => {
    const query = event.target.value;
    console.log(this.state.banks);
    // const newdata = this.state.banksforfilter
    const newfilterdata = this.state.banksforfilter.filter(element =>
      element.bcode.toLowerCase().includes(query.toLowerCase()),
    );
    console.log(newfilterdata);
    this.setState({ banks: newfilterdata, query });

    // this.setState(prevState => {
    //   const filteredData = prevState.data.filter(element =>
    //     element.name.toLowerCase().includes(query.toLowerCase()),
    //   );

    //   console.log(query)
    //   console.log(filteredData)

    //   return {
    //     query,
    //     filteredData,
    //   };
    // });
  };


  countryChange = event => {
    const { value, name } = event.target;
    const { title } = event.target.options[event.target.selectedIndex];

    this.setState({
      [name]: value,
      ccode: title,
    });
  };

  showPopup = () => {
    this.setState({ popup: true });
  };

  startTimer = () => {
    const dis = this;
    var timer = setInterval(function () {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        const time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };

  showEditPopup = v => {
    this.setState({
      editPopup: true,
      name: v.name,
      bcode: v.bcode,
      address1: v.address1,
      state: v.state,
      zip: v.zip,
      country: v.country,
      ccode: v.ccode,
      mobile: v.mobile,
      email: v.email,
      logo: v.logo,
      contract: v.contract,
      username: v.username,
      bank_id: v._id,
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
      logo: null,
      contract: null,
      otp: '',
      showOtp: false,
      showEditOtp: false,
    });
  };

  logout = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
  };


  generateOTP = () => {
    this.setState({ resend: false, timer: 30 });
    axios
      .post(`${API_URL}/generateOTP`, {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        bcode: this.state.bcode,
        page: this.state.otpOpt,
        username: this.state.username,
        token,
      })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.status === 0) {
            throw res.data.message;
          } else {
            this.setState({
              otpId: res.data.id,
              showEditOtp: true,
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

  addBank = event => {
    event.preventDefault();
    if (this.state.logo == null || this.state.logo == '') {
      this.setState(
        {
          notification: 'You need to upload a logo',
        },
        () => {
          this.error();
        },
      );
    } else if (this.state.contract == null || this.state.contract == '') {
      this.setState(
        {
          notification: 'You need to upload a contract',
        },
        () => {
          this.error();
        },
      );
    } else {
      this.setState(
        {
          otpOpt: 'addBank',
        },
        () => {
          this.setState(
            {
              showOtp: true,
            },
            () => {
              this.generateOTP();
            },
          );
        },
      );
    }
  };

  blockBank = async (e, s) => {
    const values = {
      bank_id: e,
      status: s,
    }
    const res = await postRequest("bankStatus", token, values)
    if (res.data.status === 200) {
      const n = s == 1 ? 'Unblocked' : 'Blocked';
      this.setState({
        notification: `Bank ${n}`,
      });
      this.success();
      this.getBanks();
    }
  };

  editBank = event => {
    event.preventDefault();
    if (this.state.logo == null || this.state.logo == '') {
      this.setState(
        {
          notification: 'You need to upload a logo',
        },
        () => {
          this.error();
        },
      );
    } else if (this.state.contract == null || this.state.contract == '') {
      this.setState(
        {
          notification: 'You need to upload a contract',
        },
        () => {
          this.error();
        },
      );
    } else {
      this.setState(
        {
          showEditOtp: true,
          otpOpt: 'editBank',
        },
        () => {
          this.generateOTP();
        },
      );
    }
  };

  verifyOTP = async (event) => {
    this.setState({
      verifyOTPLoading: true,
    });
    const values = {
      name: this.state.name,
      address1: this.state.address1,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
      ccode: this.state.ccode,
      bcode: this.state.bcode,
      email: this.state.email,
      mobile: this.state.mobile,
      logo: this.state.logo,
      contract: this.state.contract,
      otp: this.state.otp,
      otp_id: this.state.otpId,
    }
    event.preventDefault();
    const res = await postRequest("addBank", token, values)
    if (res.data.data.status === 0) {
      toast.error(res.data.data.message);
    } else {
      this.setState({
        notification: 'Bank added successfully!',
      });
      this.success();
      this.closePopup();
      this.getBanks();
    }
  };

  verifyEditOTP = async (event) => {
    this.setState({
      verifyEditOTPLoading: true,
    });
    const values = {
      bank_id: this.state.bank_id,
      name: this.state.name,
      address1: this.state.address1,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
      ccode: this.state.ccode,
      bcode: this.state.bcode,
      email: this.state.email,
      mobile: this.state.mobile,
      logo: this.state.logo,
      contract: this.state.contract,
      otp: this.state.otp,
      otp_id: this.state.otpId,
    }
    event.preventDefault();
    const res = await postRequest("editBank", token, values)
    console.log(res);
    console.log(res.data.data.status)
    if (res.data.data.mobile) {
      this.setState({
        notification: 'Bank edited successfully!',
      });
      this.success();
      this.closePopup();
      this.getBanks();
    } else {
      console.log(res.data.data)
      toast.error(res.data.data.message);
    }
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
    let method = 'fileUpload';

    if (key == 'contract') {
      method = 'ipfsUpload';
    }

    axios
      .post(`${API_URL}/${method}?token=${token}`, formData, config)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else if (key === 'contract') {
            this.setState({
              [key]: res.data.hash,
            });
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

  getBanks = async () => {
    const res = await postRequest("getBanks", token, {})
    return({ loading: false, banks: res.data.data.banks, banksforfilter: res.data.data.banks });
  };

  getBankDashStats = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/infra/getBankDashStats`, { token,bank_id:id });
      if (res.status == 200) {
        return (res.data);
      }
    } catch(err){
      console.log(err);
    }
  }

  getBankStats = async(plist) => {
    const stats = plist.map(async (bank) => {
      const partnerstats = await this.getBankDashStats(bank._id);
      return (partnerstats);
    });
    const result= await Promise.all(stats);
    return({res:result,loading:false});
  }

  getData = async () => {
    this.setState({
      loading: true,
    });
    const banks = await this.getBanks();
    const bankstats = await this.getBankStats(banks.banks);
    console.log(bankstats);
    this.setState({
      banks: banks.banks,
      loading: bankstats.loading,
      bankstats: bankstats.res,
      bankTrans: bankstats.res.reduce((a, b) => a + b.totalTrans, 0),
      totalAgencies:  banks.banks.reduce((a, b) => a + b.total_branches, 0),
      totalCashiers:  banks.banks.reduce((a, b) => a + b.total_cashiers, 0),
      cashReceived: bankstats.res.reduce((a, b) => a + b.cashReceived, 0).toFixed(2),
      cashPaid: bankstats.res.reduce((a, b) => a + b.cashPaid, 0).toFixed(2),
      feeGenerated: bankstats.res.reduce((a, b) => a + b.feeGenerated, 0).toFixed(2),
      commissionGenerated: bankstats.res.reduce((a, b) => a + b.commissionGenerated, 0).toFixed(2),
      crfeeGenerated: bankstats.res.reduce((a, b) => a + b.cashReceivedFee, 0).toFixed(2),
      crcommissionGenerated: bankstats.res.reduce((a, b) => a + b.cashReceivedComm, 0).toFixed(2),
      cpfeeGenerated: bankstats.res.reduce((a, b) => a + b.cashPaidFee, 0).toFixed(2),
      cpcommissionGenerated: bankstats.res.reduce((a, b) => a + b.cashPaidComm, 0).toFixed(2),

      pcrfeeGenerated: bankstats.res.reduce((a, b) => a + b.partnerCashReceivedFee, 0).toFixed(2),
      pcrcommissionGenerated: bankstats.res.reduce((a, b) => a + b.partnerCashReceivedComm, 0).toFixed(2),
      pcpfeeGenerated: bankstats.res.reduce((a, b) => a + b.partnerCashPaidFee, 0).toFixed(2),
      pcpcommissionGenerated: bankstats.res.reduce((a, b) => a + b.partnerCashPaidComm, 0).toFixed(2),
      pcashReceived: bankstats.res.reduce((a, b) => a + b.partnerCashReceived, 0).toFixed(2),
      pcashPaid: bankstats.res.reduce((a, b) => a + b.partnerCashPaid, 0).toFixed(2),

      cashInHand: bankstats.res.reduce((a, b) => a + b.cashInHand, 0).toFixed(2),
      closingBalance: bankstats.res.reduce((a, b) => a + b.closingBalance, 0).toFixed(2),
      invoicePaid: bankstats.res.reduce((a, b) => a + b.invoicePaid, 0).toFixed(2),
      amountPaid: bankstats.res.reduce((a, b) => a + b.amountPaid, 0),
      merchantInvoiceCreated:bankstats.res.reduce((a, b) => a + b.invoiceCreated, 0),
      totalPartners: banks.banks.reduce((a, b) => a + b.total_partners, 0),
      totalPartnerBranches: bankstats.res.reduce((a, b) => a + b.partnerBranch, 0),
      totalBankMerchants: bankstats.res.reduce((a, b) => a + b.totalMerchant, 0),
      totalMerchantBranches: bankstats.res.reduce((a, b) => a + b.merchantBranch, 0),
      totalMerchantStaff: bankstats.res.reduce((a, b) => a + b.merchantStaff, 0),
      totalMerchantCashier: bankstats.res.reduce((a, b) => a + b.merchantCashiers, 0),
      totalPartnerCashiers: bankstats.res.reduce((a, b) => a + b.partnerCashier, 0),
      partnerTrans: bankstats.res.reduce((a, b) => a + b.partnerTotalTrans, 0),
      partnerFee : bankstats.res.reduce((a, b) => a + b.partnerFeeGenerated, 0).toFixed(2),
      partnerCommission : bankstats.res.reduce((a, b) => a + b.partnerCommissionGenerated, 0).toFixed(2),
      merchantFee: bankstats.res.reduce((a, b) => a + b.merchantFeeGenerated, 0).toFixed(2),
      merchantCommission: bankstats.res.reduce((a, b) => a + b.merchantCommissionGenerated, 0).toFixed(2),
    })
  }

  loginRequest = async (username,bankid) => {
    this.setState({
      loading: true,
    }, async () => {
      const res = await await axios.post(`${API_URL}/infra/bankAccess`, {
        token,
        username:username,
        bank_id:bankid,
      });
      localStorage.setItem('bankLogged', res.data.token);
      localStorage.setItem('bankName', res.data.name);
      localStorage.setItem('bankUserName', res.data.username);
      localStorage.setItem('bankContract', res.data.contract);
      localStorage.setItem('bankLogo', res.data.logo);
      localStorage.setItem('bankId', res.data.id);
      localStorage.setItem('bankPhone', res.data.mobile);
      localStorage.setItem('admin', res.data.admin);
      // console.log(res);
      if (res.data.status == 0 && res.data.message === "Incorrect username or password") {
        toast.error(res.data.message);
      }
      else if (!res.data.initial_setup) {
        window.location.href = '/bank/setup';
      }
      else if (
        !res.data.status ||
        res.data.status == 0 ||
        res.data.status == ''
      ) {
        window.location.href = '/bank/activate';
      } else {
        window.open("/bank/dashboard", "_blank")
        // window.location.href = '/bank/dashboard';
      }


    });
    this.setState({
      loading: false,
    })

  };

  async componentDidMount() {
    if (token !== undefined && token !== null) {
      if (isAdmin == 'true') {
        this.setState({ permissions: 'all', loading: false });
      } else {
        const res = await postRequest("getPermission", token, this.state)
        // console.log(res.data)
        if (res.data.status == 200) {
          console.log(res.data.data.permissions)
          this.setState(
            { permissions: res.data.data.permissions, loading: false },
            () => {
              console.log(this.state.permissions);
            },
          );
        }
      }
    }
    this.getData();
  };

  render() {
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }
    const { classes } = this.props;

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
      return <Redirect to="/" />;
    }
    const perms = this.state.permissions;
    console.log(perms)
    const ep = this;
    return (
      <Wrapper from="infra">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="bank" />
        <Container verticalMargin>
          <Main fullWidth>
          <div style={{backgroundColor:"goldenrod", padding:'10px'}}>
              <Row style={{marginTop:'15px'}}>

                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    h4FontSize="16px"
                    textAlign="center"
                    smallValue
                    col
                    style={{height:'120px', marginLeft:'20px'}}
                  >
                    <h4>
                      Bank Agencies
                    </h4>
                    <div className="cardValue">{this.state.totalAgencies}</div>
                  </Card>
                </Col>
                <Col cW='30%'> 
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-3px'}}
                  >
                    <h4>
                      Bank Cashiers
                    </h4>
                    <div className="cardValue">{this.state.totalCashiers}</div>
                  </Card>
                </Col>
                <Col cW='30%'>
                  <Card
                    horizontalMargin="0px"
                    cardWidth="302px"
                    smallValue
                    textAlign="center"
                    col
                    style={{height:'120px', marginLeft:'-3px'}}
                  >
                    <h4>
                      Bank Transactions
                    </h4>
                    <div className="cardValue">{this.state.bankTrans}</div>
                  </Card>
                </Col>
                <Col cW='40%'></Col>
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
                        <div className="cardValue"> {this.state.cashPaid}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.cpfeeGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.cpcommissionGenerated}</div>
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
                        <div className="cardValue"> {this.state.cashReceived}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.crfeeGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.crcommissionGenerated}</div>
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
                        <div className="cardValue">{this.state.feeGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.commissionGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue"> {(parseFloat(this.state.feeGenerated)+parseFloat(this.state.commissionGenerated)).toFixed(2)}</div>
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
                        <div className="cardValue"> {this.state.pcashPaid}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.pcpfeeGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.pcpcommissionGenerated}</div>
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
                        <div className="cardValue"> {this.state.pcashReceived}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Fee</h5>
                        <div className="cardValue">{this.state.pcrfeeGenerated}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.pcrcommissionGenerated}</div>
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
                        <div className="cardValue">{this.state.partnerFee}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.partnerCommission}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue"> {(parseFloat(this.state.partnerFee)+parseFloat(this.state.partnerCommission)).toFixed(2)}</div>
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
                <Col cW='40%'></Col>
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
                        <div className="cardValue">{this.state.merchantFee}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Commission</h5>
                        <div className="cardValue">{this.state.merchantCommission}</div>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <h5>Total</h5>
                        <div className="cardValue">{(parseFloat(this.state.merchantFee)+parseFloat(this.state.merchantCommission)).toFixed(2)}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col cW='10%' style={{marginTop:'50px',marginRight:'10px'}}>
                  <A href='/merchantlist'>
                    <Button
                      style={{
                        padding:'7px',
                        backgroundColor:'green',
                        color:'white',
                        marginRight:'60px'
                        
                      }}
                    >
                      <h4>Add Bank</h4>
                    </Button>
                  </A>
                </Col>
               
              </Row>
            
              
             
            </div> 

            {/* <div>
              {this.state.banks && this.state.banks.length > 0
                ? this.state.banks.map(function (b,i) {
                  return (
                    <div className={classNames(classes.root)} onClick={()=>{ep.handleDrawerOpen(i)}} >
                      <div className={classNames(classes.appBar)} >
                            <Row>
                              <Col cW="5%">
                                <img
                                  style={{ height: '40px' }}
                                  src={`${STATIC_URL}${b.logo}`}
                                />
                              </Col>
                              <Col cW="15%">
                                {b.name}
                              
                              </Col>
                              <Col cW="75%"></Col>
                              <Col cW="5%">
                                <Table style={{marginBottom:'50px'}}>
                                  <span className="absoluteRight primary popMenuTrigger">
                                      <i className="material-icons ">more_vert</i>
                                      <div className="popMenu">
                                        <span
                                            onClick={() => ep.loginRequest(`infra${b.name}admin`,b._id)}
                                          >
                                            Access
                                        </span>
                                      
                                        {perms == 'all' || perms.edit_bank ? (
                                          <span
                                            onClick={() => ep.showEditPopup(b)}
                                          >
                                            Edit
                                          </span>
                                        ) : null}
                                        <A href={`/info/${b._id}`}>
                                          <FormattedMessage {...messages.menu1} />
                                        </A>
                                        <A href={`/documents/${b._id}`}>
                                          <FormattedMessage {...messages.menu2} />
                                        </A>
                                        <A href={`/fees/${b._id}`}>
                                          <FormattedMessage {...messages.menu3} />
                                        </A>
                                        {b.status == -1 ? (
                                          <span
                                            onClick={() => ep.blockBank(b._id, 1)}
                                          >
                                            Unblock
                                          </span>
                                        ) : (
                                            <span
                                              onClick={() =>
                                                ep.blockBank(b._id, -1)
                                              }
                                            >
                                              Block
                                            </span>
                                          )}
                                      </div>
                                    </span>
                                </Table> 
                              </Col>
                            
                            </Row>
                            
                          
                          
                      </div>
                      <Drawer
                        className={classNames(classes.drawer)}
                        transitionDuration={0}
                        variant="persistent"
                        anchor="top"
                        open={ep.state.drawer[`drawer${i}`]}
                        classes={{
                          paper: ep.state.drawer[`drawer${i}`] ? classNames(classes.drawerPaper) : null,
                        }}
                        
                      >
                        <h2 style={{marginTop:'20px'}}>Agencies:</h2>
                        <Row style={{fontSize:'15px'}}>
                          <Col>Number: {b.total_branches}</Col>
                          <Col></Col>
                          <Col>Cashiers: {b.total_cashiers}</Col>
                          <Col>Transactions: {ep.state.bankstats[i].totalTrans}</Col>
                          <Col>Fee: {ep.state.bankstats[i].feeGenerated.toFixed(2)}</Col>
                          <Col>Commission: {ep.state.bankstats[i].commissionGenerated.toFixed(2)}</Col>
                          <Col>Revenue: {(ep.state.bankstats[i].feeGenerated+ep.state.bankstats[i].commissionGenerated).toFixed(2)}</Col>
                        </Row>
                        <h2 style={{marginTop:'20px'}}>Partners:</h2>
                        <Row style={{fontSize:'15px'}}>
                          <Col>Number: {b.total_partners}</Col>
                          <Col>Agencies: {ep.state.bankstats[i].partnerBranch}</Col>
                          <Col>Cashiers: {ep.state.bankstats[i].partnerCashier}</Col>
                          <Col>Transactions: {ep.state.bankstats[i].partnerTotalTrans}</Col>
                          <Col>Fee: {ep.state.bankstats[i].partnerFeeGenerated.toFixed(2)}</Col>
                          <Col>Commission:{ep.state.bankstats[i].partnerCommissionGenerated.toFixed(2)}</Col>
                          <Col>Revenue: {(ep.state.bankstats[i].partnerFeeGenerated+ep.state.bankstats[i].partnerCommissionGenerated).toFixed(2)}</Col>
                        </Row>
                        <h2 style={{marginTop:'20px'}}> Merchants:</h2>
                        <Row style={{fontSize:'15px'}}>
                          <Col>Number:  {ep.state.bankstats[i].totalMerchant}</Col>
                          <Col>Agencies:  {ep.state.bankstats[i].merchantBranch}</Col>
                          <Col>Cashiers: {ep.state.bankstats[i].merchantCashiers}</Col>
                          <Col>Staffs:  {ep.state.bankstats[i].merchantStaff}</Col>
                          <Col>Fee: {ep.state.bankstats[i].merchantFeeGenerated.toFixed(2)}</Col>
                          <Col>Commission: {ep.state.bankstats[i].merchantCommissionGenerated.toFixed(2)}</Col>
                          <Col>Revenue: {(ep.state.bankstats[i].merchantFeeGenerated+ep.state.bankstats[i].merchantCommissionGenerated).toFixed(2)}</Col>
                        </Row>
                        <Row style={{marginTop:'20px', fontSize:'15px'}}>
                          <Col>Invoice Created:{ep.state.bankstats[i].invoiceCreated}</Col>
                          <Col>Invoice Paid: {ep.state.bankstats[i].invoicePaid}</Col>
                          <Col></Col>
                          <Col></Col>
                          <Col></Col>
                          <Col></Col>
                          <Col></Col>
                        </Row>
                      </Drawer>
                  </div>
                  );
                })
              : null}
            </div>
             */}
            <Card bigPadding style={{overflow: 'auto', overflowY: 'hidden'}}>
              <div className="cardBody">
                <Table marginTop="34px">
                <thead>
                    <tr>
                      <th colspan='2'>
                        <span>Bank</span>
                      </th>
                      <th style={{borderLeft:'5px solid white'}} colspan='6'>
                        Agency
                      </th>
                      <th style={{borderLeft:'5px solid white'}} colspan='7'>
                        Partner
                      </th>
                      <th style={{borderLeft:'5px solid white'}} colspan='9'>
                        Merchant
                      </th>
                    </tr>
                  </thead>
                  
                  <thead>
                    <tr>
                      <th>Name</th><th>Logo</th>
                      <th style={{borderLeft:'5px solid white'}}>Number</th><th>Cashier</th><th>Transaction</th><th>Fee</th><th>Commission</th><th>Revenue</th>
                      <th style={{borderLeft:'5px solid white'}}>Number</th><th>Agencies</th><th>Cashier</th><th>Transaction</th><th>Fee</th><th>Commission</th><th>Revenue</th>
                      <th style={{borderLeft:'5px solid white'}}>Number</th><th>Agencies</th><th>Cashier</th><th>Staff</th><th>Fee</th><th>Commission</th><th>Revenue</th><th>Invoice Created</th><th>Invoice Paid</th>
                      
                    </tr>
                  </thead>
                  
                  <tbody>
                    {this.state.banks && this.state.banks.length > 0
                      ? this.state.banks.map(function (b,i) {
                        return (
                          <tr key={b._id}>
                            <td>
                              <img
                                style={{ height: '40px' }}
                                src={`${STATIC_URL}${b.logo}`}
                              />
                            </td>
                            <td>{b.name}</td>
                            <td className="tac">{b.total_branches}</td>
                            <td className="tac">{b.total_cashiers}</td>
                            <td className="tac">{ep.state.bankstats[i].totalTrans}</td>
                            <td className="tac">{ep.state.bankstats[i].feeGenerated.toFixed(2)}</td>
                            <td className="tac">{ep.state.bankstats[i].commissionGenerated.toFixed(2)}</td>
                            <td className="tac">{(ep.state.bankstats[i].feeGenerated+ep.state.bankstats[i].commissionGenerated).toFixed(2)}</td>
                            <td className="tac">{b.total_partners}</td>
                            <td className="tac">{ep.state.bankstats[i].partnerBranch}</td>
                            <td className="tac">{ep.state.bankstats[i].partnerCashier}</td>
                            <td className="tac">{ep.state.bankstats[i].partnerTotalTrans}</td>
                            <td className="tac">{ep.state.bankstats[i].partnerFeeGenerated.toFixed(2)}</td>
                            <td className="tac">{ep.state.bankstats[i].partnerCommissionGenerated.toFixed(2)}</td>
                            <td className="tac">{(ep.state.bankstats[i].partnerFeeGenerated+ep.state.bankstats[i].partnerCommissionGenerated).toFixed(2)}</td>
                            <td className="tac">{ep.state.bankstats[i].totalMerchant}</td>
                            <td className="tac">{ep.state.bankstats[i].merchantBranch}</td>
                            <td className="tac">{ep.state.bankstats[i].merchantCashiers}</td>
                            <td className="tac">{ep.state.bankstats[i].merchantStaff}</td>
                            <td className="tac">{ep.state.bankstats[i].merchantFeeGenerated.toFixed(2)}</td>
                            <td className="tac">{ep.state.bankstats[i].merchantCommissionGenerated.toFixed(2)}</td>
                            <td className="tac">{(ep.state.bankstats[i].merchantFeeGenerated+ep.state.bankstats[i].merchantCommissionGenerated).toFixed(2)}</td>
                            <td className="tac">{ep.state.bankstats[i].invoiceCreated}</td>
                            <td className="tac bold">
                              {ep.state.bankstats[i].invoicePaid}
                              {b.status != 0 ? (
                                <span className="absoluteRight primary popMenuTrigger">
                                  <i className="material-icons ">more_vert</i>
                                  <div className="popMenu">
                                    <span
                                        onClick={() => ep.loginRequest(`infra${b.name}admin`,b._id)}
                                      >
                                        Access
                                    </span>
                                  
                                    {perms == 'all' || perms.edit_bank ? (
                                      <span
                                        onClick={() => ep.showEditPopup(b)}
                                      >
                                        Edit
                                      </span>
                                    ) : null}
                                    <A href={`/info/${b._id}`}>
                                      <FormattedMessage {...messages.menu1} />
                                    </A>
                                    <A href={`/documents/${b._id}`}>
                                      <FormattedMessage {...messages.menu2} />
                                    </A>
                                    <A href={`/fees/${b._id}`}>
                                      <FormattedMessage {...messages.menu3} />
                                    </A>
                                    {b.status == -1 ? (
                                      <span
                                        onClick={() => ep.blockBank(b._id, 1)}
                                      >
                                        Unblock
                                      </span>
                                    ) : (
                                        <span
                                          onClick={() =>
                                            ep.blockBank(b._id, -1)
                                          }
                                        >
                                          Block
                                        </span>
                                      )}
                                  </div>
                                </span>
                              ) : (
                                  <span className="absoluteRight primary popMenuTrigger">
                                    <i className="material-icons ">block</i>
                                  </span>
                                )}
                            </td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </Table>
              </div>
            </Card>
            
            <div>
              {this.state.filteredData.map(i => (
                <p>{i.name}</p>
              ))}
            </div>
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
                      type="password"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.otp}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                  {this.verifyOTPLoading ? (
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
                  <h1>
                    <FormattedMessage {...messages.addbank} />
                  </h1>
                  <form action="" method="post" onSubmit={this.addBank}>
                    <FormGroup>
                      <label>
                        <FormattedMessage {...messages.popup1} />*
                    </label>
                      <TextInput
                        type="text"
                        name="name"
                        title="Minimum 3 characters"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Bank Code*</label>
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
                      <label>
                        <FormattedMessage {...messages.popup2} />*
                    </label>
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
                            pattern="[0-9]{10}"
                            title="10 Digit numeric value"
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

                    <FormGroup>
                      {/* <UploadedFile>

                      <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i>
                    </UploadedFile>
                  : */}
                      <UploadArea bgImg={STATIC_URL + this.state.logo}>
                        {this.state.logo ? (
                          <a
                            className="uploadedImg"
                            href={STATIC_URL + this.state.logo}
                            target="_BLANK"
                          />
                        ) : (
                            ' '
                          )}
                        <div
                          className="uploadTrigger"
                          onClick={() => this.triggerBrowse('logo')}
                        >
                          <input
                            type="file"
                            id="logo"
                            onChange={this.onChange}
                            data-key="logo"
                            accept="image/jpeg, image/png, image/jpg"
                          />
                          {!this.state.logo ? (
                            <i className="material-icons">cloud_upload</i>
                          ) : (
                              ' '
                            )}
                          <label>
                            {!this.state.logo ? (
                              <FormattedMessage {...messages.popup9} />
                            ) : (
                                <span>Change Logo</span>
                              )}
                          *
                        </label>
                        </div>
                      </UploadArea>
                    </FormGroup>

                    <FormGroup>
                      <UploadArea bgImg={`${STATIC_URL}main/pdf-icon.png`}>
                        {this.state.contract ? (
                          <a
                            className="uploadedImg"
                            href={CONTRACT_URL + this.state.contract}
                            target="_BLANK"
                          />
                        ) : (
                            ' '
                          )}
                        <div
                          className="uploadTrigger"
                          onClick={() => this.triggerBrowse('contract')}
                        >
                          <input
                            type="file"
                            id="contract"
                            onChange={this.onChange}
                            data-key="contract"
                            accept=".pdf"
                          />
                          {!this.state.contract ? (
                            <i className="material-icons">cloud_upload</i>

                          ) : (
                              <>

                                <img src={documentFileIcon}
                                  width="50"
                                  height="50" />

                                {/* <span style={{ marginLeft: "1%" }}><strong>Qmevzci8.pdf</strong></span> */}

                              </>


                            )}

                          <label>
                            <div className="tooltip">
                              <i
                                className="fa fa-info-circle"
                                style={{ margin: '5px' }}
                              />
                              <span className="tooltiptext">
                                This contract will be uploaded on Blockchain.
                            </span>
                            </div>
                            {!this.state.contract ? (
                              <FormattedMessage {...messages.popup10} />
                            ) : (
                                <span>Change Contract</span>
                              )}
                          *
                          <p>
                              <span style={{ color: 'red' }}>* </span>Only PDF
                            allowed{' '}
                            </p>
                          </label>
                        </div>
                      </UploadArea>
                    </FormGroup>
                    <p className="note">
                      <span style={{ color: 'red' }}>* </span>Please create the
                    revenue policy or otherwise by default zero fee will be
                    debited for all transactions
                  </p>

                    <Button filledBtn marginTop="10px">
                      <span>
                        <FormattedMessage {...messages.addbank} />
                      </span>
                    </Button>
                  </form>
                </div>
              )}
          </Popup>
        ) : null}

        {this.state.editPopup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showEditOtp ? (
              <div>
                <h1>
                  <FormattedMessage {...messages.verify} />
                </h1>
                <form action="" method="post" onSubmit={this.verifyEditOTP}>
                  <FormGroup>
                    <label>
                      <FormattedMessage {...messages.otp} />*
                    </label>
                    <TextInput
                      type="password"
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
                  <h1>Edit Bank</h1>
                  <form action="" method="post" onSubmit={this.editBank}>
                    <FormGroup>
                      <label>
                        <FormattedMessage {...messages.popup1} />*
                    </label>
                      <TextInput
                        type="text"
                        name="name"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.name}
                        autoFocus
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Bank Code*</label>
                      <TextInput
                        type="text"
                        name="bcode"
                        onFocus={inputFocus}
                        autoFocus
                        onBlur={inputBlur}
                        value={this.state.bcode}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>
                        <FormattedMessage {...messages.popup2} />*
                    </label>
                      <TextInput
                        type="text"
                        name="address1"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            pattern="[0-9]{10}"
                            autoFocus
                            title="10 Digit numeric value"
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
                    <FormGroup>
                      <UploadArea bgImg={STATIC_URL + this.state.logo}>
                        {this.state.logo ? (
                          <a
                            className="uploadedImg"
                            href={STATIC_URL + this.state.logo}
                            target="_BLANK"
                          />
                        ) : (
                            ' '
                          )}
                        <div
                          className="uploadTrigger"
                          onClick={() => this.triggerBrowse('logo')}
                        >
                          <input
                            type="file"
                            id="logo"
                            onChange={this.onChange}
                            data-key="logo"
                          />
                          {!this.state.logo ? (
                            <i className="material-icons">cloud_upload</i>
                          ) : (
                              ' '
                            )}
                          <label>
                            {this.state.logo == '' ? (
                              <FormattedMessage {...messages.popup9} />
                            ) : (
                                <span>Change Logo</span>
                              )}
                          *
                        </label>
                        </div>
                      </UploadArea>
                    </FormGroup>
                    <FormGroup>
                      <UploadArea bgImg={`${STATIC_URL}main/pdf-icon.png`}>
                        {this.state.contract ? (
                          <a
                            className="uploadedImg"
                            href={CONTRACT_URL + this.state.contract}
                            target="_BLANK"
                          />
                        ) : (
                            ' '
                          )}
                        <div
                          className="uploadTrigger"
                          onClick={() => this.triggerBrowse('contract')}
                        >
                          <input
                            type="file"
                            id="contract"
                            onChange={this.onChange}
                            data-key="contract"
                          />
                          {!this.state.contract ? (
                            <i className="material-icons">cloud_upload</i>
                          ) : (
                              <img src={pdfIcon} width="50" height="50" />

                            )}
                          <label>
                            {this.state.contract == '' ? (
                              <FormattedMessage {...messages.popup10} />
                            ) : (
                                <span>Change Contract</span>
                              )}
                          *<p>Only PDF allowed*</p>
                          </label>
                        </div>
                      </UploadArea>
                    </FormGroup>

                    <Button filledBtn marginTop="10px">
                      <span>Update Bank</span>
                    </Button>
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

export default withStyles(styles)(BankPage);
