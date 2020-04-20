import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Popup from 'components/Popup';
import TextInput from 'components/TextInput';
import Label from 'components/Label';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
import CountrySelectBox from 'components/Form/CountrySelectBox';
import Row from 'components/Row';
import Col from 'components/Col';
import Container from 'components/Container';
import UploadArea from 'components/UploadArea';
import Loader from 'components/Loader';

import { API_URL, CONTRACT_URL, CURRENCY, STATIC_URL } from 'containers/App/constants';

import 'react-toastify/dist/ReactToastify.css';

import CashierPopupToggle from './CashierPopupToggle';
import CashierToWalletForm from './CashierToWalletForm';

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

class CashierTransactionLimit extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      closingTime: null,
      withoutID: false,
      requireOTP: false,
      token,
      proceed:false,
      livefee: 0,
      showSendMoneyOTP: false,
      isWallet: false,
      toWalletFormValues: {}
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
    this.setState({
      [name]: value,
    });
  };

proceed = (items) => {
console.log(items);

    var dis = this;
    for (var key in items) {
    if (items.hasOwnProperty(key)) {
        console.log(key + " -> " + items[key]);
        this.setState({
          [key] : items[key]
        });

    }
}

 this.setState(
        {
          proceed:true,
          popupSendMoney: true
        }
      );
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
    var method = 'fileUpload';

    if (key == 'proof') {
      method = 'ipfsUpload';
    }

    axios
      .post(`${API_URL}/${method}?token=${token}`, formData, config)
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

  closePopup = () => {
    this.setState({
      popup: false,
    });
  };

  showPopupSendMoney = () => {
    if (this.state.balance > 0) {
      this.setState({ popupSendMoney: true, proceed: false });
    } else {
      this.setState(
        {
          notification: 'You have already used your limit for today',
        },
        () => {
          this.error();
        },
      );
    }
  };

  setToWalletFormValues = (values) => {
    this.setState(
      {
        toWalletFormValues: values,
        isWallet: false,
        showSendMoneyToWalletOTP: true,
        popupSendMoney: true
      }
    );
  };

  showClaimMoneyPopup = () => {
    //if (this.state.cashInHand >= this.state.receiverIdentificationAmount) {
      this.setState({ popupClaimMoney: true });
    // } else {
    //   this.setState(
    //     {
    //       notification: 'You do not have enough cash in hand to claim this amount',
    //     },
    //     () => {
    //       this.error();
    //     },
    //   );
    // }
  };

  toggleIdentificationBlock = () => {
    if (!this.state.withoutID) {
      this.setState({
        withoutID: true,
      });
    } else {
      this.setState({
        withoutID: false,
      });
    }
  };

  checkboxChange = () => {
    if (!this.state.requireOTP) {
      this.setState({
        requireOTP: true,
      });
    } else {
      this.setState({
        requireOTP: false,
      });
    }
  };

  showEditPopupSendMoney = v => {
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
      proof: v.proof,
      username: v.username,
      bank_id: v._id,
      receiverMobile: v.receiverMobile,
      receiverccode: v.receiverccode,
      receiverGivenName: v.receiverGivenName,
      receiverFamilyName: v.receiverFamilyName,
      receiverCountry: v.receiverCountry,
      receiverEmail: v.receiverEmail,
    });
  };

  closePopupSendMoney = () => {
    this.setState({
      proceed:false,
      popupSendMoney: false,
      showSendMoneyOTP: false,
      showConfirmPending:false,
      showClaimMoneyDetails: false,
      popupClaimMoney: false,
      showVerifyClaimMoney: false,
      showVerifyClaimOTPMoney: false,
      showClaimMoneyDetails: false,
      transferCode: '',
      givenname: '',
      familyname: '',
      note: '',
      senderIdentificationCountry: '',
      senderIdentificationType: '',
      senderIdentificationNumber: '',
      senderIdentificationValidTill: '',
      address1: '',
      state: '',
      zip: '',
      ccode: '',
      country: '',
      email: '',
      mobile: '',
      otp: '',
      withoutID: false,
      requireOTP: false,
      receiverMobile: '',
      receiverccode: '',
      receiverGivenName: '',
      receiverFamilyName: '',
      receiverCountry: '',
      receiverEmail: '',
      receiverIdentificationCountry: '',
      receiverIdentificationType: '',
      receiverIdentificationNumber: '',
      receiverIdentificationValidTill: '',
      receiverIdentificationAmount: '',
      isWallet: false,
      showSendMoneyToWalletOTP: false,
      verifySendMoneyOTPLoading: false,
    });
  };

  closePopupClaimMoney = () => {
    this.setState({
      popupClaimMoney: false,
    });
  };

  countryChange = event => {
    const { value, name } = event.target;
    const title = event.target.options[event.target.selectedIndex].title;
    const ccode = event.target.getAttribute('data-change');
    this.setState({
      [name]: value,
      [ccode]: title,
    });
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

  amountChange = event => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (this.state.receiverIdentificationAmount != '') {
          axios
            .post(`${API_URL}/checkCashierFee`, {
              amount: this.state.receiverIdentificationAmount,
              token,
            })
            .then(res => {
              if (res.status == 200) {
                if (res.data.error) {
                } else {
                  this.setState(
                    {
                      livefee: res.data.fee,
                    },
                    function() {},
                  );
                }
              }
            });
        } else {
          this.setState({
            livefee: 0,
          });
        }
      },
    );
  };

  getClaimMoney = event => {
    event.preventDefault();
    this.setState({
      claimMoneyLoading: true,
    });
    axios
      .post(`${API_URL}/getClaimMoney`, {
        transferCode: this.state.transferCode,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            let o = res.data.row;
            if(o.sender_id){
              let senderid = JSON.parse(o.sender_id);
              this.setState({
                sender_id: senderid,
                senderIdentificationCountry: senderid.country || '',
                senderIdentificationType: senderid.type || '',
                senderIdentificationNumber: senderid.number || '',
                senderIdentificationValidTill: senderid.valid || '',
              });
            }
            let sender = JSON.parse(o.sender_info);
            let receiver = JSON.parse(o.receiver_info);
            let receiverid = JSON.parse(o.receiver_id);

            o.without_id = o.without_id == 1 ? true : false;
            o.require_otp = o.require_otp == 1 ? true : false;
            this.setState({
              mobile: sender.mobile,
              email: sender.email,
              givenname: sender.givenname,
              familyname: sender.familyname,
              address1: sender.address1,
              state: sender.state,
              zip: sender.zip,
              country: sender.country,
              note: sender.note,

              receiverMobile: receiver.mobile,
              receiverEmail: receiver.email,
              receiverGivenName: receiver.givenname,
              receiverFamilyName: receiver.familyname,
              receiverCountry: receiver.country,

              receiverIdentificationCountry: receiverid.country,
              receiverIdentificationType: receiverid.type,
              receiverIdentificationNumber: receiverid.number,
              receiverIdentificationValidTill: receiverid.valid,

              receiverIdentificationAmount: o.amount,
              withoutID: o.without_id,
              requireOTP: o.require_otp,
              dateClaimMoney: o.created_at.toString(),

              showClaimMoneyDetails: true,
            });
          }
        } else {
          const error = res.data.error;
        }
        this.setState({
          claimMoneyLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response
            ? err.response.data.error.toString()
            : err.toString(),
          verifySendMoneyOTPLoading: false,
        });
        this.error();
        this.setState({
          claimMoneyLoading: false,
        });
      });
  };

  cancelPending = event => {
    event.preventDefault();
     this.setState(
        {
          showConfirmPending: false,
        }
      );
  };

   confirmPending = event => {
    event.preventDefault();
    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    axios
      .post(`${API_URL}/cashierSendMoneyPending`, this.state)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            this.setState({
              notification: 'Transaction Successfully Submitted for Aproval',
            });
            this.success();
            this.closePopupSendMoney();
            this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState(
          {
            notification: err.response
              ? err.response.data.error.toString()
              : err.toString(),
            verifySendMoneyOTPLoading: false,
          },
          () => {
            this.error();
          },
        );
      });
  };

  sendMoney = event => {
      event.preventDefault();
    if (!this.state.proceed && this.state.receiverIdentificationAmount > this.state.balance) {
      // this.setState({
      //   notification: 'Amount has to be lesser than transaction limit',
      // });
      // this.error();
      this.setState(
        {
          showConfirmPending: true,
        }
      );

    } else {
      this.setState(
        {
          showSendMoneyOTP: true,
          otpOpt: 'cashierSendMoney',
          otpEmail: email,
          otpMobile: mobile,
          otpTxt: 'Your OTP to add send money is ',
        },
        () => {
          this.generateOTP();
        },
      );
    }
  };

  claimMoney = event => {
    event.preventDefault();
     if (this.state.cashInHand >= this.state.receiverIdentificationAmount) {
         this.setState(
      {
        showVerifyClaimMoney: true,
        otpOpt: 'cashierClaimMoney',
        otpEmail: email,
        otpMobile: mobile,
        otpTxt: 'Your OTP to add claim money is ',
      },
      () => {
        this.generateOTP();
      },
    );
    } else {
      this.setState(
        {
          notification: 'You do not have enough cash in hand to claim this amount',
        },
        () => {
          this.error();
        },
      );
    }

  };

  verifyClaimMoney = event => {
    event.preventDefault();
    this.setState({
      claimMoneyLoading: true,
    });
    axios
      .post(`${API_URL}/cashierVerifyClaim`, {
        token: token,
        otp: this.state.otp,
        otpId: this.state.otpId,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            if (this.state.requireOTP) {
              this.setState({
                showOTPClaimMoney: true,
                otp: '',
                notification: 'OTP verified successfully',
              });
              this.success();
              this.startClaiming();
            } else {
              this.startClaiming();
            }
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

  verifyOTPClaimMoney = event => {
    event.preventDefault();
    this.setState({
      claimMoneyLoading: true,
    });
    axios
      .post(`${API_URL}/cashierVerifyOTPClaim`, {
        token: token,
        otp: this.state.otp,
        transferCode: this.state.transferCode,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              notification: 'OTP verified successfully',
            });
            this.success();
            this.startClaiming();
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

  startClaiming = event => {
    this.setState({
      claimMoneyLoading: true,
    });
    axios
      .post(`${API_URL}/cashierClaimMoney`, this.state)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            this.setState({
              notification: 'Transaction Successfully Done',
              showVerifyClaimMoney: false,
              popupClaimMoney: false,
            });
            this.success();
            this.props.refresh();
          }
        } else {
          this.closePopupSendMoney();
          this.props.refresh();
          throw res.data.error;
        }
        this.setState({
          claimMoneyLoading: false,
        });
      })
      .catch(err => {
        this.closePopupSendMoney();
        this.props.refresh();
        this.setState(
          {
            notification: err.response
              ? err.response.data.error.toString()
              : err.toString(),
            claimMoneyLoading: false,
          },
          () => {
            this.error();
          },
        );
      });
  };

  verifySendMoney = event => {
    event.preventDefault();
    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    axios
      .post(`${API_URL}/cashierSendMoney`, this.state)
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            this.setState({
              notification: 'Transaction Successfully Done',
            });
            this.success();
            this.closePopupSendMoney();
            this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState(
          {
            notification: err.response
              ? err.response.data.error.toString()
              : err.toString(),
            verifySendMoneyOTPLoading: false,
          },
          () => {
            this.error();
          },
        );
      });
  };

  verifySendMoneyToWallet = event => {
    event.preventDefault();
    const { toWalletFormValues } = this.state;
    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    toWalletFormValues.token = token;
    axios
      .post(`${API_URL}/cashier/sendMoneyToWallet`, toWalletFormValues )
      .then(res => {
        if (res.status === 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            this.setState({
              notification: 'Transaction Successfully Done',
            });
            this.success();
            this.closePopupSendMoney();
            this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState(
          {
            notification: err.response
              ? err.response.data.error.toString()
              : err.toString(),
            verifySendMoneyOTPLoading: false,
          },
          () => {
            this.error();
          },
        );
      });
  };

  getTransLimit = () => {
    axios
      .post(`${API_URL}/getCashierTransLimit`, { token: token })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                balance: Number(res.data.limit),
                closingTime: res.data.closingTime,
                cashInHand: res.data.cashInHand,
                transactionStarted: res.data.transactionStarted,
              },
              () => {
                var dis = this;
                setTimeout(function() {
                  dis.getTransLimit();
                }, 3000);
              },
            );
          }
        } else {
          this.setState({
            balance: Number(res.data.limit),
            closingTime: res.data.closingTime,
            transactionStarted: res.data.transactionStarted,
            isClosed: res.data.isClosed
          }, () => {
            var dis  = this;
            setTimeout(function(){
              dis.getTransLimit();
            }, 3000);
          });
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function() {
          dis.getTransLimit();
        }, 3000);
      });
  };

  componentDidMount() {
    this.getTransLimit();
  }

  handleToggleChange = (value) => {
    this.setState({
      isWallet: value,
    });
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
    return (
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
        <h3>Max. Daily Cash Out Amount</h3>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div>

        <Row>
          <Col>
          {
            this.state.transactionStarted && !this.state.isClosed ?
            <Button
              className="sendMoneybutton"
              noMin
              onClick={this.showPopupSendMoney}

            >
              <i className="material-icons">send</i> {/* Send Money */}
              <FormattedMessage {...messages.sendmoney} />
            </Button>
            :
            <Button
              className="sendMoneybutton"
              noMin
              disabled
            >
              <i className="material-icons">send</i> {/* Send Money */}
              <FormattedMessage {...messages.sendmoney} />
            </Button>
          }

          </Col>
          <Col>
          {
             this.state.transactionStarted && !this.state.isClosed ?
            <Button
            noMin
              className="sendMoneybutton"
              onClick={this.showClaimMoneyPopup}
            >
              <i className="material-icons">send</i> Claim Money
            </Button>
            :
            <Button
            noMin
              className="sendMoneybutton"
              disabled
            >
              <i className="material-icons">send</i> Claim Money
            </Button>
          }
          </Col>
        </Row>

        {this.state.popupClaimMoney ? (
          <Popup bigBody close={this.closePopupSendMoney.bind(this)} accentedH1>
            {this.state.showClaimMoneyDetails ? (
              this.state.showVerifyClaimMoney ? (
                this.state.showOTPClaimMoney ? (
                  <div>
                    <h1>Verify OTP</h1>
                    <form
                      action=""
                      method="post"
                      onSubmit={this.verifyOTPClaimMoney}
                    >
                      <p>&nbsp;</p>
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
                      {this.state.claimMoneyLoading ? (
                        <Button
                          filledBtn
                          marginTop="50px"
                          marginBottom="50px"
                          disabled
                        >
                          <Loader />
                        </Button>
                      ) : (
                        <Button filledBtn marginTop="50px" marginBottom="50px">
                          <span>Verify</span>
                        </Button>
                      )}
                    </form>
                  </div>
                ) : (
                  <div>
                    <h1>Verify OTP</h1>
                    <form
                      action=""
                      method="post"
                      onSubmit={this.verifyClaimMoney}
                    >
                      <p>&nbsp;</p>
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
                      {this.state.claimMoneyLoading ? (
                        <Button
                          filledBtn
                          marginTop="50px"
                          marginBottom="50px"
                          disabled
                        >
                          <Loader />
                        </Button>
                      ) : (
                        <Button filledBtn marginTop="50px" marginBottom="50px">
                          <span>Verify</span>
                        </Button>
                      )}

                      <p className="resend">
                        Wait for{' '}
                        <span className="timer">{this.state.timer}</span> to{' '}
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
                )
              ) : (
                <div>
                  <h1>Claim Money</h1>
                  <form action="" method="post" onSubmit={this.claimMoney}>
                    <Container>
                      <Row>
                        <Col md="4" />
                        <Col sm="12" md="4">
                          <FormGroup>
                            <label>
                              Enter the transfer code
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="transferCode"
                              pattern=".{3,12}"
                              // title="Minimum 3 characters"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.transferCode}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4" />
                      </Row>
                    </Container>
                    <Container>
                      <Row vAlign="flex-start">
                        <Col sm="12" md="4" style={{display: this.state.sender_id ? 'block' : 'none'}}>
                          <div
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                              color: '#417505',
                            }}
                          >
                            Sender's Info
                          </div>
                          <Row>
                            <Col className="popInfoLeft">Mobile Number</Col>
                            <Col className="popInfoRight">
                              {this.state.mobile}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Given Name</Col>
                            <Col className="popInfoRight">
                              {this.state.givenname}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Family Name</Col>
                            <Col className="popInfoRight">
                              {this.state.familyname}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Address</Col>
                            <Col className="popInfoRight">
                              {this.state.address1}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">State</Col>
                            <Col className="popInfoRight">
                              {this.state.state}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Zip Code</Col>
                            <Col className="popInfoRight">{this.state.zip}</Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Country</Col>
                            <Col className="popInfoRight">
                              {this.state.country}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Email ID</Col>
                            <Col className="popInfoRight">
                              {this.state.email}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Notes</Col>
                            <Col className="popInfoRight">
                              {this.state.note}
                            </Col>
                          </Row>
                        </Col>
                        <Col sm="12" md="4">
                          <div
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                              color: '#417505',
                            }}
                          >
                            Receiver's Info
                          </div>
                          <Row>
                            <Col className="popInfoLeft">Mobile Number</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverMobile}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Given Name</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverGivenName}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Family Name</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverFamilyName}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Country</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverCountry}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Email ID</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverEmail}
                            </Col>
                          </Row>
                          <Row /> <Row /> <Row />
                        </Col>
                        <Col sm="12" md="4">
                          <div
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                              color: '#417505',
                            }}
                          >
                            &nbsp;
                          </div>
                          <Row>
                            <Col className="popInfoLeft">Amount</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverIdentificationAmount}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Date</Col>
                            <Col className="popInfoRight">
                              {this.state.dateClaimMoney}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Transaction ID</Col>
                            <Col className="popInfoRight">
                              {this.state.transferCode}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">ID required</Col>
                            <Col className="popInfoRight">
                              {this.state.withoutID ? 'No' : 'Yes'}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">OTP required</Col>
                            <Col className="popInfoRight">
                              {this.state.requireOTP ? 'Yes' : 'No'}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row vAlign="flex-start">
                        <Col style={{display: this.state.sender_id ? 'block' : 'none'}}>
                          <div
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                            }}
                          >
                            Sender's Identification
                          </div>
                          <Row>
                            <Col className="popInfoLeft">Country</Col>
                            <Col className="popInfoRight">
                              {this.state.senderIdentificationCountry}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Type</Col>
                            <Col className="popInfoRight">
                              {this.state.senderIdentificationType}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Number</Col>
                            <Col className="popInfoRight">
                              {this.state.senderIdentificationNumber}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Valid till</Col>
                            <Col className="popInfoRight">
                              {this.state.senderIdentificationValidTill}
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <div
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                            }}
                          >
                            Receiver's Identification
                          </div>
                          <Row>
                            <Col className="popInfoLeft">Country</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverIdentificationCountry}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Type</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverIdentificationType}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Number</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverIdentificationNumber}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="popInfoLeft">Valid till</Col>
                            <Col className="popInfoRight">
                              {this.state.receiverIdentificationValidTill}
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <p className="note">
                            <span style={{ color: 'red' }}>
                              <input type="checkbox" required value="1" />
                            </span>{' '}
                            I have read the
                            <a onClick={() => window.open('/termsConditions')}>
                              Terms and Conditions
                            </a>
                          </p>
                          {this.state.withoutID ? null : (
                            <FormGroup>
                              <UploadArea
                                bgImg={STATIC_URL + 'main/pdf-icon.png'}
                              >
                                {this.state.proof ? (
                                  <a
                                    className="uploadedImg"
                                    href={CONTRACT_URL + this.state.proof}
                                    target="_BLANK"
                                  />
                                ) : (
                                  ' '
                                )}
                                <div
                                  className="uploadTrigger"
                                  onClick={() => this.triggerBrowse('proof')}
                                >
                                  <input
                                    type="file"
                                    id="proof"
                                    onChange={this.onChange}
                                    data-key="proof"
                                    accept=".pdf"
                                  />
                                  {!this.state.proof ? (
                                    <i className="material-icons">
                                      cloud_upload
                                    </i>
                                  ) : (
                                    ' '
                                  )}

                                  <label>
                                    <div className="tooltip">
                                      <i
                                        className="fa fa-info-circle"
                                        style={{ margin: '5px' }}
                                      />
                                      <span className="tooltiptext">
                                        This proof will be uploaded on
                                        Blockchain.
                                      </span>
                                    </div>
                                    {!this.state.proof ? (
                                      <span>Upload</span>
                                    ) : (
                                      // <FormattedMessage {...messages.popup10} />
                                      <span>Change Proof</span>
                                    )}
                                    *
                                    <p>
                                      <span style={{ color: 'red' }}>* </span>
                                      Only PDF allowed
                                    </p>
                                  </label>
                                </div>
                              </UploadArea>
                            </FormGroup>
                          )}
                          {this.state.claimMoneyLoading ? (
                            <Button filledBtn marginTop="20px" disabled>
                              <Loader />
                            </Button>
                          ) : (
                            <Button filledBtn marginTop="20px">
                              <span>
                                Proceed
                                {/* <FormattedMessage {...messages.addbank} /> */}
                              </span>
                            </Button>
                          )}

                          <br />
                          {/* <p className="note">
                      <span style={{ color: 'red' }}>* </span>
                      Total fee $200 will be charged
                    </p> */}
                        </Col>
                      </Row>
                    </Container>
                  </form>
                </div>
              )
            ) : (
              <div>
                <h1>Claim Money</h1>
                <form
                  action=""
                  method="post"
                  onSubmit={this.getClaimMoney}
                  style={{ marginTop: '20px' }}
                >
                  <Container>
                    <Row>
                      <Col md="4" />
                      <Col sm="12" md="4">
                        <FormGroup>
                          <label>
                            Enter the transfer code
                            {/* <FormattedMessage {...messages.popup1} />* */}
                          </label>
                          <TextInput
                            type="text"
                            name="transferCode"
                            pattern=".{3,12}"
                            // title="Minimum 3 characters"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.transferCode}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4" />
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <Col md="4" />
                      <Col sm="12" md="4">
                        <FormGroup>
                          {this.state.claimMoneyLoading ? (
                            <Button filledBtn marginTop="20px" disabled>
                              <Loader />
                            </Button>
                          ) : (
                            <Button filledBtn marginTop="20px">
                              <span>Proceed</span>
                            </Button>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="4" />
                    </Row>
                  </Container>
                </form>
              </div>
            )}
          </Popup>
        ) : null}

        {this.state.popupSendMoney ? (
          <Popup bigBody close={this.closePopupSendMoney.bind(this)} accentedH1>
            {this.state.showSendMoneyOTP ? (
              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifySendMoney}>
                  <p>&nbsp;</p>
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
                  {this.state.verifySendMoneyOTPLoading ? (
                    <Button
                      filledBtn
                      marginTop="50px"
                      marginBottom="50px"
                      disabled
                    >
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px" marginBottom="50px">
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
            ) :  this.state.showSendMoneyToWalletOTP ? (
              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifySendMoneyToWallet}>
                  <p>&nbsp;</p>
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
                  {this.state.verifySendMoneyOTPLoading ? (
                    <Button
                      filledBtn
                      marginTop="50px"
                      marginBottom="50px"
                      disabled
                    >
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px" marginBottom="50px">
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
            ) : this.state.showConfirmPending ? (
                <div>
                  <h1>Confirm </h1>

                  <p>&nbsp;</p>
                  <FormGroup>
                    <p style={{textAlign: 'center', fontSize: '20px'}}>You need Manager approval for execute this transaction. Do you want to send for approval ?</p>
                  </FormGroup>
                  <Row>
                    <Col cW="49%" mR="2%">
                      {this.state.verifySendMoneyOTPLoading ? (
                        <Button
                          filledBtn
                          marginTop="50px"
                          marginBottom="50px"
                          disabled
                        >
                          <Loader />
                        </Button>
                      ) : (
                        <Button filledBtn marginTop="50px" marginBottom="50px" onClick={this.confirmPending}>
                          <span>Yes</span>
                        </Button>
                      )}
                    </Col><Col cW="49%">
                    <Button  style={{ backgroundColor: '#111111'}} filledBtn marginTop="50px" marginBottom="50px"  onClick={this.cancelPending}>
                      <span>No</span>
                    </Button>
                  </Col>
                  </Row>
                </div>
              )
              :
              (
                <div>
                  <h1>Send Money</h1>
                  <form action="" method="post" onSubmit={this.sendMoney}>
                    {
                      this.state.proceed ?
                        <div>

                          <Container>
                            <Row vAlign="flex-start">
                              <Col sm="12" md="4">
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                    color: '#417505',
                                  }}
                                >
                                  Sender's Info
                                </div>
                                <Row>
                                  <Col className="popInfoLeft">Mobile Number</Col>
                                  <Col className="popInfoRight">
                                    {this.state.mobile}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Given Name</Col>
                                  <Col className="popInfoRight">
                                    {this.state.givenname}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Family Name</Col>
                                  <Col className="popInfoRight">
                                    {this.state.familyname}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Address</Col>
                                  <Col className="popInfoRight">
                                    {this.state.address1}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">State</Col>
                                  <Col className="popInfoRight">
                                    {this.state.state}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Zip Code</Col>
                                  <Col className="popInfoRight">{this.state.zip}</Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Country</Col>
                                  <Col className="popInfoRight">
                                    {this.state.country}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Email ID</Col>
                                  <Col className="popInfoRight">
                                    {this.state.email}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Notes</Col>
                                  <Col className="popInfoRight">
                                    {this.state.note}
                                  </Col>
                                </Row>
                              </Col>
                              <Col sm="12" md="4">
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                    color: '#417505',
                                  }}
                                >
                                  Receiver's Info
                                </div>
                                <Row>
                                  <Col className="popInfoLeft">Mobile Number</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverMobile}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Given Name</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverGivenName}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Family Name</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverFamilyName}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Country</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverCountry}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Email ID</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverEmail}
                                  </Col>
                                </Row>
                                <Row /> <Row /> <Row />
                              </Col>
                              <Col sm="12" md="4">
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                    color: '#417505',
                                  }}
                                >
                                  &nbsp;
                                </div>
                                <Row>
                                  <Col className="popInfoLeft">Amount</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverIdentificationAmount}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Date</Col>
                                  <Col className="popInfoRight">
                                    {this.state.dateClaimMoney}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Transaction ID</Col>
                                  <Col className="popInfoRight">
                                    {this.state.transferCode}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">ID required</Col>
                                  <Col className="popInfoRight">
                                    {this.state.withoutID ? 'No' : 'Yes'}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">OTP required</Col>
                                  <Col className="popInfoRight">
                                    {this.state.requireOTP ? 'Yes' : 'No'}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row vAlign="flex-start">
                              <Col>
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                  }}
                                >
                                  Sender's Identification
                                </div>
                                <Row>
                                  <Col className="popInfoLeft">Country</Col>
                                  <Col className="popInfoRight">
                                    {this.state.senderIdentificationCountry}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Type</Col>
                                  <Col className="popInfoRight">
                                    {this.state.senderIdentificationType}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Number</Col>
                                  <Col className="popInfoRight">
                                    {this.state.senderIdentificationNumber}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Valid till</Col>
                                  <Col className="popInfoRight">
                                    {this.state.senderIdentificationValidTill}
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                  }}
                                >
                                  Receiver's Identification
                                </div>
                                <Row>
                                  <Col className="popInfoLeft">Country</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverIdentificationCountry}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Type</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverIdentificationType}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Number</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverIdentificationNumber}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="popInfoLeft">Valid till</Col>
                                  <Col className="popInfoRight">
                                    {this.state.receiverIdentificationValidTill}
                                  </Col>
                                </Row>
                              </Col>
                              <Col>


                                {this.state.claimMoneyLoading ? (
                                  <Button filledBtn marginTop="20px" disabled>
                                    <Loader />
                                  </Button>
                                ) : (
                                  <Button filledBtn marginTop="20px">
                              <span>
                                Proceed
                                {/* <FormattedMessage {...messages.addbank} /> */}
                              </span>
                                  </Button>
                                )}

                                <br />
                                {/* <p className="note">
                      <span style={{ color: 'red' }}>* </span>
                      Total fee $200 will be charged
                    </p> */}
                              </Col>
                            </Row>
                          </Container>
                        </div>
                        :
                        <div>
                          <CashierPopupToggle handleToggleChange={(value) => this.handleToggleChange(value)}/>
                          {this.state.isWallet ? (<CashierToWalletForm onClose={() => this.closePopupSendMoney()} formValues={(values) => this.setToWalletFormValues(values)} />) :(<Container>
                            <Row>
                              <Col sm="12" md="5" cW="49%">
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                    color: '#417505',
                                  }}
                                >
                                  Sender's Info
                                </div>

                                <Row>
                                  <Col cW="20%" mR="2%">
                                    <FormGroup>

                                      <TextInput
                                        type="text"
                                        name="ccode"
                                        readOnly
                                        placeholder="+000"
                                        value={this.state.ccode}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col cW="78%">
                                    <FormGroup>
                                      <label>
                                        Mobile Number
                                        <span style={{ color: 'red' }}>*</span>
                                        {/* <FormattedMessage {...messages.popup7} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        pattern="[0-9]{10}"
                                        title="10 Digit numeric value"
                                        name="mobile"
                                        autoFocus
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.mobile}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Given Name
                                        <span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="givenname"
                                        pattern=".{3,12}"
                                        autoFocus
                                        title="Minimum 3 characters"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.givenname}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Family Name
                                        <span style={{ color: 'red' }}>*</span>
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="familyname"
                                        autoFocus
                                        pattern=".{3,12}"
                                        title="Minimum 3 characters"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.familyname}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <FormGroup>
                                  <label>
                                    Address<span style={{ color: 'red' }}>*</span>
                                    {/* <FormattedMessage {...messages.popup2} />* */}
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
                                        State
                                        {/* <FormattedMessage {...messages.popup3} />* */}
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
                                        Zip Code
                                        {/* <FormattedMessage {...messages.popup4} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="zip"
                                        autoFocus
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
                                      <CountrySelectBox
                                        type="text"
                                        autoFocus
                                        name="country"
                                        value={this.state.country}
                                        onChange={this.countryChange}
                                        data-change="ccode"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Authorised Email
                                        {/* <FormattedMessage {...messages.popup8} />* */}
                                      </label>
                                      <TextInput
                                        type="email"
                                        name="email"
                                        autoFocus
                                        pattern="(^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$)"
                                        onInput={e => e.target.setCustomValidity('')}
                                        onInvalid={e =>
                                          e.target.setCustomValidity(
                                            'Enter a valid email address',
                                          )
                                        }
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  {/* <form.Group controlId="exampleForm.ControlTextarea1">
                        <form.Label>Example textarea</form.Label>
                        <form.Control as="textarea" rows="3" />
                      </form.Group> */}
                                </Row>
                                <FormGroup>
                                  <label>
                                    Note
                                    {/* <FormattedMessage {...messages.popup2} />* */}
                                  </label>
                                  <TextInput
                                    multiline={true}
                                    numberOfLines={3}
                                    type="text"
                                    autoFocus
                                    name="note"
                                    onFocus={inputFocus}
                                    onBlur={inputBlur}
                                    value={this.state.note}
                                    onChange={this.handleInputChange}
                                    required
                                  />
                                </FormGroup>
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '10px 0px',
                                  }}
                                >
                                  Sender's Identification
                                </div>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <CountrySelectBox
                                        type="text"
                                        autoFocus
                                        name="senderIdentificationCountry"
                                        value={this.state.senderIdentificationCountry}
                                        onChange={this.countryChange}
                                        data-change="ccc"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Type
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        autoFocus
                                        name="senderIdentificationType"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.senderIdentificationType}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Number
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        autoFocus
                                        type="text"
                                        name="senderIdentificationNumber"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.senderIdentificationNumber}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Valid till
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="senderIdentificationValidTill"
                                        autoFocus
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.senderIdentificationValidTill}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                              <Col sm="12" md="2" cW="2%" />
                              <Col sm="12" md="5" cW="49%">
                                <div
                                  style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    padding: '13px 0px',
                                    color: '#417505',
                                  }}
                                >
                                  Receiver's Info
                                </div>
                                <Row>
                                  <Col cW="20%" mR="2%">
                                    <FormGroup>
                                      <TextInput
                                        type="text"
                                        placeholder="+000"
                                        autoFocus
                                        name="receiverccode"
                                        readOnly
                                        value={this.state.receiverccode}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col cW="78%">
                                    <FormGroup>
                                      <label>
                                        Mobile Number
                                        <span style={{ color: 'red' }}>*</span>
                                        {/* <FormattedMessage {...messages.popup7} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        pattern="[0-9]{10}"
                                        autoFocus
                                        title="10 Digit numeric value"
                                        name="receiverMobile"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.receiverMobile}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Given Name
                                        <span style={{ color: 'red' }}>*</span>
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="receiverGivenName"
                                        pattern=".{3,12}"
                                        autoFocus
                                        title="Minimum 3 characters"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.receiverGivenName}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Family Name
                                        <span style={{ color: 'red' }}>*</span>
                                        {/* <FormattedMessage {...messages.popup1} />* */}
                                      </label>
                                      <TextInput
                                        type="text"
                                        name="receiverFamilyName"
                                        pattern=".{3,12}"
                                        autoFocus
                                        title="Minimum 3 characters"
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.receiverFamilyName}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <CountrySelectBox
                                        type="text"
                                        name="receiverCountry"
                                        autoFocus
                                        value={this.state.receiverCountry}
                                        onChange={this.countryChange}
                                        data-change="receiverccode"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col>
                                    <FormGroup>
                                      <label>
                                        Authorised Email
                                        {/* <FormattedMessage {...messages.popup8} />* */}
                                      </label>
                                      <TextInput
                                        type="email"
                                        name="receiverEmail"
                                        autoFocus
                                        pattern="(^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$)"
                                        onInput={e => e.target.setCustomValidity('')}
                                        onInvalid={e =>
                                          e.target.setCustomValidity(
                                            'Enter a valid email address',
                                          )
                                        }
                                        onFocus={inputFocus}
                                        onBlur={inputBlur}
                                        value={this.state.receiverEmail}
                                        onChange={this.handleInputChange}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  {/* <form.Group controlId="exampleForm.ControlTextarea1">
                        <form.Label>Example textarea</form.Label>
                        <form.Control as="textarea" rows="3" />
                      </form.Group> */}
                                </Row>
                                <Label mT="20px">
                                  <input
                                    type="checkbox"
                                    onChange={this.toggleIdentificationBlock}
                                    value="1"
                                    checked={this.state.withoutID}
                                  />{' '}
                                  Pay without requesting physical id
                                  <input
                                    style={{ marginLeft: '20px' }}
                                    type="checkbox"
                                    onChange={this.checkboxChange}
                                    value="1"
                                    checked={this.state.requireOTP}
                                  />{' '}
                                  Require OTP
                                </Label>
                                {this.state.withoutID ? null : (
                                  <div>
                                    <div
                                      style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        padding: '13px 0px',
                                      }}
                                    >
                                      Receiver's Identification
                                    </div>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <CountrySelectBox
                                            type="text"
                                            name="receiverIdentificationCountry"
                                            value={
                                              this.state.receiverIdentificationCountry
                                            }
                                            autoFocus
                                            onChange={this.countryChange}
                                            data-change="ccc"
                                            required
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col>
                                        <FormGroup>
                                          <label>
                                            Type
                                            {/* <FormattedMessage {...messages.popup1} />* */}
                                          </label>
                                          <TextInput
                                            type="text"
                                            autoFocus
                                            name="receiverIdentificationType"
                                            onFocus={inputFocus}
                                            onBlur={inputBlur}
                                            value={
                                              this.state.receiverIdentificationType
                                            }
                                            onChange={this.handleInputChange}
                                            required
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <label>
                                            Number
                                            {/* <FormattedMessage {...messages.popup1} />* */}
                                          </label>
                                          <TextInput
                                            type="text"
                                            autoFocus
                                            name="receiverIdentificationNumber"
                                            onFocus={inputFocus}
                                            onBlur={inputBlur}
                                            value={
                                              this.state.receiverIdentificationNumber
                                            }
                                            onChange={this.handleInputChange}
                                            required
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col>
                                        <FormGroup>
                                          <label>
                                            Valid till
                                            {/* <FormattedMessage {...messages.popup1} />* */}
                                          </label>
                                          <TextInput
                                            type="text"
                                            autoFocus
                                            name="receiverIdentificationValidTill"
                                            onFocus={inputFocus}
                                            onBlur={inputBlur}
                                            value={
                                              this.state.receiverIdentificationValidTill
                                            }
                                            onChange={this.handleInputChange}
                                            required
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </div>
                                )}
                                <FormGroup>
                                  <label>
                                    Amount
                                    {/* <FormattedMessage {...messages.popup1} />* */}
                                  </label>
                                  <TextInput
                                    type="text"
                                    // pattern="[0-9]"
                                    name="receiverIdentificationAmount"
                                    onFocus={inputFocus}
                                    autoFocus
                                    onBlur={inputBlur}
                                    value={this.state.receiverIdentificationAmount}
                                    onChange={this.amountChange}
                                    required
                                  />
                                </FormGroup>

                                <Button filledBtn marginTop="20px">
                                  <span>Proceed</span>
                                </Button>
                                <p className="note">
                                  <span style={{ color: 'red' }}>*</span> Total Fee{' '}
                                  {CURRENCY} {this.state.livefee} will be charged
                                </p>
                              </Col>
                            </Row>
                          </Container>)}
                        </div>
                    }

                  </form>
                </div>)}
          </Popup>
        ) : null}

      </Card>
    );
  }
}

export default CashierTransactionLimit;
