import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Button from 'components/Button';
import Row from 'components/Row';
import Col from 'components/Col';
import Popup from 'components/Popup';
import A from 'components/A';
import Loader from 'components/Loader';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';

import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

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
const email = localStorage.getItem('cashierEmail');
const mobile = localStorage.getItem('cashierMobile');

class CashierClosingBalance extends Component {
  constructor() {
    super();
       this.state = {
      loading: true,
      otp: '',
      balance1: 0,
      balance2: 0,
      total:0,
      popup: false,
      showOtp: false,
      assignPop:false,
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

    showOpeningPopup = (v) => {
    this.setState({ openingPopup: true, cashier_id: v._id});
  };

    handleAmountChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.calculateTotal();
    });
  };

    calculateTotal = () => {
    var total = 0;
    this.state.denom10 ? this.state.denom10 : 0

    total += Number(this.state.denom10 ? this.state.denom10 : 0) * 10;
    total += Number(this.state.denom20 ? this.state.denom20 : 0) * 20;
    total += Number(this.state.denom50 ? this.state.denom50 : 0) * 50;
    total += Number(this.state.denom100 ? this.state.denom100 : 0) * 100;
    total += Number(this.state.denom1000 ? this.state.denom1000 : 0) * 1000;
    total += Number(this.state.denom2000 ? this.state.denom2000 : 0) * 2000;

    this.setState({
      total: total
    });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
      assignPop: false,
      openingPopup: false,
      name: '',
      bcode: '',
      working_from: '',
      working_to: '',
      per_trans_amt: '',
      max_trans_amt: '',
      max_trans_count: '',
      mobile: '',
      credit_limit: '',
      otp: '',
      showOtp: false,
      showEditOtp: false,
      showOpeningOTP: false
    });
  };

addOpeningBalance = event => {
    event.preventDefault();
    if(this.state.total == '' || this.state.total == 0){
      this.setState({
          notification: "You need to enter atleast one denomination"
        }, () => {
          this.error();
        });
        
    }else{
      this.setState(
        {
          showOpeningOTP: true,
          otpOpt: 'closingBalance',
          otpTxt: 'Your OTP to add closing balance is '
        },
        () => {
          this.generateOTP();

        },
      );
}
  };
  startTimer = () => {
    var dis = this;
    var timer = setInterval(function() {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        var time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };
  getStats = () => {
    axios
      .post(`${API_URL}/getClosingBalance`, {
        token: token
      })
      .then(res => {
        if (res.status == 200) {
          let b1 = res.data.balance1 == null ? 0 : res.data.balance1;
          let b2 = res.data.balance2 == null ? 0 : res.data.balance2;
          this.setState({ 
            balance1: b1,
            balance2: b2,
          }, () => {
            var dis  = this;
            setTimeout(function(){
              dis.getStats();
            }, 2700);
          });
        }
      })
      .catch(err => {});
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
    this.setState({
      verifyEditOTPLoading: false
    });
    event.preventDefault();
    axios
      .post(`${API_URL  }/addClosingBalance`, this.state)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Closing balance submitted successfully!",
            }, function(){
              this.success();
              this.closePopup();
              this.getStats();
            });
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          verifyEditOTPLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          verifyEditOTPLoading:false
        });
        this.error();
      });
  };
  componentDidMount() {
    this.setState({
      bank: this.props.historyLink
    });
    this.getStats();
  }

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
    return (
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h3>
          Closing Balance
          <A className="absoluteMiddleRight">view</A>
        </h3>
        
    
        <Row>
        <Col><h5>
          <FormattedMessage {...messages.available} />
        </h5><div className="cardValue">
          {CURRENCY} {this.state.balance1.toFixed(2)}
        </div></Col>
        <Col><h5>
          <FormattedMessage {...messages.available} />
        </h5><div className="cardValue">
          {CURRENCY} {this.state.balance2.toFixed(2)}
        </div></Col>
        </Row>
        {
          this.state.balance1 > 0 ?
        <button className="sendMoneyButton" disabled>
          <i className="material-icons">send</i>
          Enter closing balance
        </button>
        
        :
        <button className="sendMoneyButton" onClick={this.showOpeningPopup}>
          <i className="material-icons">send</i>
          Enter closing balance
        </button>
      }
        { this.state.openingPopup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showOpeningOTP ?
              <div>
              <h1 >Verify OTP</h1>
            <form action="" method="post" onSubmit={this.verifyOpeningOTP} >
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
              {
                this.verifyEditOTPLoading ?
                <Button filledBtn marginTop="50px" disabled>
                  <Loader />
                </Button>
                :
                <Button filledBtn marginTop="50px">
                  <span>Verify</span>
                </Button>
              }

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
              :
              <div>
            <h1 >Enter your closing balance</h1>
            <form action="" method="post" onSubmit={this.addOpeningBalance}>
              <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 10</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom10"
                  autoFocus
                  value={this.state.denom10}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

               <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 20</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom20"
                  autoFocus
                  value={this.state.denom20}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

                         <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 50</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom50"
                  autoFocus
                  value={this.state.denom50}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

                         <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 100</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom100"
                  autoFocus
                  value={this.state.denom100}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

                         <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 1000</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom1000"
                  autoFocus
                  value={this.state.denom1000}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

                         <FormGroup>
              <Row>
              <Col cW="15%" textAlign="right"><strong>{CURRENCY} 2000</strong></Col>
              <Col cW="20%" textAlign="center">X</Col>
              <Col cW="35%">
              <TextInput
                  marginTop
                  type="text"
                  name="denom2000"
                  autoFocus
                  value={this.state.denom2000}
                  onChange={this.handleAmountChange}
                />
              </Col>
              </Row>
              </FormGroup>

              <Row>
              <Col cW="15%" textAlign="right"><strong>TOTAL</strong></Col>
              <Col cW="20%" textAlign="center">=</Col>
              <Col cW="35%">
              {this.state.total}
              </Col>
              </Row>
               
                    {
                      this.state.editBranchLoading ?
                      <Button filledBtn marginTop="50px" disabled>
                        <Loader />
                      </Button>
                      :
                      <Button filledBtn marginTop="50px">
                      <span>Submit</span>
                    </Button>
                    }

            </form>
            </div>
            }
          </Popup>
          : null }
      </Card>
    );
  }
}

export default CashierClosingBalance;
