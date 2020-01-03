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

import Wrapper from 'components/Wrapper';
import TopBar from 'components/Header/TopBar';
import Container from 'components/Container';
import A from 'components/A';
import Nav from 'components/Header/Nav';
import Welcome from 'components/Header/Welcome';
import SidebarTwo from 'components/Sidebar/SidebarTwo';
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
import styled from 'styled-components';

const H4 = styled.h4`
  > span {
    font-size: 13px;
    color: #666;
  }
`;

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

var isAdmin = localStorage.getItem('isAdmin');
export default class CreateFee extends Component {
  constructor() {
    super();
    this.state = {
      bank_id: '',
      logo: null,
      contract: null,
      loading: true,
      redirect: false,
      name: '',
      ranges: [
        {
          trans_from: '',
          trans_to: '',
          fixed_amount: '',
          percentage: '',
        },
      ],
      trans_type: '',
      active: 'Active',
      trans_from: '',
      trans_to: '',
      transcount_from: '',
      transcount_to: '',
      fixed_amount: '',
      percentage: '',
      notification: '',
      popup: false,
      user_id: token,
      banks: [],
      otp: '',
      showOtp: false,
      token: token,
      permissions: {},
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

  handleInputChange2 = event => {
    // console.log(k);

    const { value, name } = event.target;
    var temp = this.state.ranges;
    var k = event.target.getAttribute('data-key');

    temp[k][name] = value;
    console.log(temp[k]);
    this.setState({
      ranges: temp,
    });

    // this.setState({
    //   [name]: value,
    // });
  };

  showPopup = () => {
    //this.setState({ popup: true });
    this.props.history.push('/createfee/' + this.props.match.params.bank);
  };

  closePopup = () => {
    this.setState({
      popup: false,
      name: '',
      address1: '',
      state: '',
      zip: '',
      ccode: '',
      country: '',
      email: '',
      mobile: '',
      logo: null,
      contract: null,
      otp: '',
      showOtp: false,
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

  addBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/generateOTP`, {
        name: this.state.name,
        mobile: this.state.mobile,
        page: 'addBank',
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              showOtp: true,
              notification: 'OTP Sent',
            });
            this.success();
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

  createRules = event => {
    event.preventDefault();
    // if((this.state.fixed_amount == '' && this.state.percentage == '') || this.state.fixed_amount != '' && this.state.percentage != ''){
    //   this.setState({
    //     notification: 'Fill either fixed amount or percentage'
    //   }, () => {
    //     this.error();
    // });
    // }else{
    var temp = this.state.ranges;
    var l = temp.length;
    var last = temp[l - 1].trans_to;
    if (last <= temp[l - 1].trans_from) {
      this.setState(
        {
          notification:
            'To value has to be greater than From value in all ranges',
        },
        () => {
          this.error();
        },
      );
    } else {
      axios
        .post(`${API_URL}/createRules`, this.state)
        .then(res => {
          if (res.status == 200) {
            if (res.data.error) {
              throw res.data.error;
            } else {
              this.setState(
                {
                  notification: 'Rule added',
                },
                () => {
                  this.success();
                  let ba = this.state.bank;
                  let history = this.props.history;
                  setTimeout(function() {
                    history.push('/fees/' + ba);
                  }, 1000);
                },
              );
            }
          } else {
            const error = new Error(res.data.error);
            throw error;
          }
        })
        .catch(err => {
          this.setState({
            notification: err.response
              ? err.response.data.error
              : err.toString(),
          });
          this.error();
        });
    }
  };

  verifyOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/addBank`, {
        name: this.state.name,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        ccode: this.state.ccode,
        email: this.state.email,
        mobile: this.state.mobile,
        logo: this.state.logo,
        contract: this.state.contract,
        otp: this.state.otp,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              notification: 'Bank added successfully!',
            });
            this.success();
            this.closePopup();
            this.getBanks();
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

  removeFile = key => {
    this.setState({
      [key]: null,
    });
  };

  addRange = () => {
    var temp = this.state.ranges;
    var l = temp.length;
    var last = temp[l - 1].trans_to;
    if (last == '') {
      this.setState(
        {
          notification: 'Fill previous range first',
        },
        () => {
          this.error();
        },
      );
    } else if (last <= temp[l - 1].trans_from) {
      this.setState(
        {
          notification:
            'To value has to be greater than From value in all ranges',
        },
        () => {
          this.error();
        },
      );
    } else {
      last = Number(last) + 1;
      temp.push({
        trans_from: last,
        trans_to: '',
        fixed_amount: '',
        percentage: '',
      });
      this.setState({
        ranges: temp,
      });
    }
  };

  removeRange = k => {
    console.log(k);
    // var dis = this;
    var temp = this.state.ranges;
    // delete temp[k];
    temp.splice(k, 1);
    this.setState({
      ranges: temp,
    });
    // console.log(temp);
    // var out = [];

    // for(var i = 0; i < temp.length; i++){
    //   if(i != k){
    //     out.push(temp[i]);
    //   }
    //   if(i == (temp.length)-1){
    //     dis.setState({
    //       ranges : out
    //     });
    //   }
    // }
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
      .post(`${API_URL}/fileUpload?token=${token}`, formData, config)
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

  getBanks = () => {
    axios
      .post(`${API_URL}/getBank`, {
        token: token,
        bank_id: this.props.match.params.bank,
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            loading: false,
            banks: res.data.banks,
            logo: res.data.banks.logo,
            bank_id: this.props.match.params.bank,
          });
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      if (isAdmin == 'true') {
        this.setState({ permissions: 'all', loading: false });
      } else {
        axios
          .post(`${API_URL}/getPermission`, { token })
          .then(res => {
            if (res.status == 200) {
              this.setState(
                { permissions: res.data.permissions, loading: false },
                () => {
                  console.log(this.state.permissions);
                },
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.getBanks();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
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

    function onChange(event) {
      // this.setState({
      //   trans_type: event.target.value
      // });
    }

    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    const dis = this;
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create Fee | INFRA | E-WALLET</title>
        </Helmet>
        <TopBar>
          <Welcome infraNav />
          <Container>
            <A href="/dashboard" float="left">
              <div className="headerNavDash">Main Dashboard</div>
            </A>
            {/* <div className="bankLogo">
              <img src={STATIC_URL + this.state.logo} />
            </div>
            <h2>{this.state.banks.name}</h2> */}
          </Container>
        </TopBar>
        <Container verticalMargin>
          <div
            className="bankLogo"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '16px',
              marginBottom: '1.2rem',
              boxShadow: '0 0 1px black',
              paddingTop: '16px',
              backgroundColor: 'white',
            }}
          >
            <img
              src={STATIC_URL + this.state.logo}
              style={{
                width: '75px',
              }}
            />
            <div
              style={{
                paddingLeft: '5px',
                paddingTop: '7px',
              }}
            >
              <h2>{this.state.banks && this.state.banks.name}</h2>
            </div>
          </div>
          <SidebarTwo bankId={this.state.bank} active="fees" />
          <Main>
            <Card bigPadding centerSmall>
              <div className="cardHeader">
                <div className="cardHeaderLeft flex">
                  <A href={'/fees/' + this.props.match.params.bank}>
                    <i className="material-icons">arrow_back</i>
                  </A>
                  <h3>Create Revenue sharing Rules</h3>
                </div>
              </div>
              <div className="cardBody">
                <form action="" method="post" onSubmit={this.createRules}>
                  <FormGroup>
                    <label>Name*</label>
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

                  <Row>
                    <Col>
                      <FormGroup>
                        <SelectInput
                          type="text"
                          name="trans_type"
                          value={this.state.trans_type}
                          onChange={this.handleInputChange.bind(this)}
                          required
                          list="ttype"
                        >
                          <option value="">Transaction Type*</option>
                          <option>Wallet to Wallet </option>
                          <option>Sending Non Wallet to Non Wallet </option>
                          <option>Receiving Non Wallet from Non Wallet</option>
                          <option>Non Wallet to Wallet</option>
                          <option>Wallet to Non Wallet</option>
                          <option>Wallet to merchant</option>
                          <option>Non Wallet to Merchant</option>
                          <option>Wallet to Bank Account</option>
                          <option>Bank Account to Wallet Request</option>
                        </SelectInput>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <SelectInput
                          type="text"
                          name="active"
                          value={this.state.active}
                          onChange={this.handleInputChange}
                          required
                          list="act"
                        >
                          <option>Active</option>
                          <option>Inactive </option>
                        </SelectInput>
                      </FormGroup>
                    </Col>
                  </Row>

                  <H4>Transaction Count</H4>
                  {this.state.ranges.map(function(v, i) {
                    return (
                      <Row key={i}>
                        <Col cW="20%" mR="2%">
                          <FormGroup>
                            <label>From*</label>
                            {i > 0 ? (
                              <TextInput
                                type="number"
                                min="0"
                                name="trans_from"
                                onFocus={inputFocus}
                                onBlur={inputBlur}
                                value={v.trans_from}
                                onChange={dis.handleInputChange2}
                                data-key={i}
                                autoFocus
                                readOnly
                                required
                              />
                            ) : (
                              <TextInput
                                type="text"
                                pattern="[0-9]{1,}"
                                title="Greater than or equal to 0"
                                name="trans_from"
                                onFocus={inputFocus}
                                onBlur={inputBlur}
                                value={v.trans_from}
                                onChange={dis.handleInputChange2}
                                data-key={i}
                                autoFocus
                                required
                              />
                            )}
                          </FormGroup>
                        </Col>
                        <Col cW="20%" mR="2%">
                          <FormGroup>
                            <label>To*</label>
                            <TextInput
                              type="text"
                              pattern="[0-9]{1,}"
                              title="Greater than or equal to 0"
                              name="trans_to"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={v.trans_to}
                              onChange={dis.handleInputChange2}
                              data-key={i}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col cW="26%" mR="2%">
                          <FormGroup>
                            <label>Fixed Amount*</label>
                            <TextInput
                              type="text"
                              name="fixed_amount"
                              onFocus={inputFocus}
                              required
                              onBlur={inputBlur}
                              value={v.fixed_amount}
                              onChange={dis.handleInputChange2}
                              data-key={i}
                            />
                          </FormGroup>
                        </Col>
                        <Col cW="28%" mR="0">
                          <FormGroup>
                            <label>Percentage*</label>
                            <TextInput
                              required
                              type="text"
                              name="percentage"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={v.percentage}
                              onChange={dis.handleInputChange2}
                              data-key={i}
                            />
                          </FormGroup>
                          {i > 0 ? (
                            <span
                              onClick={() => dis.removeRange(i)}
                              className="material-icons removeBtn pointer"
                            >
                              cancel
                            </span>
                          ) : null}
                        </Col>
                      </Row>
                    );
                  })}
                  <Button
                    type="button"
                    accentedBtn
                    marginTop="10px"
                    onClick={this.addRange}
                  >
                    <span>Add Another Range</span>
                  </Button>

                  <Button filledBtn marginTop="100px">
                    <span>Create Rules</span>
                  </Button>
                </form>
              </div>
            </Card>
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
