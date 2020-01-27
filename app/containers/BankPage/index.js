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
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';

import { API_URL, STATIC_URL, CONTRACT_URL } from '../App/constants';

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
// var permissions = localStorage.getItem('permissions');
// if(permissions != 'all' && permissions != ''){
// permissions = JSON.parse(permissions);
// }
var isAdmin = localStorage.getItem('isAdmin');

export default class BankPage extends Component {
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

  handleSearchInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    fetch(`http://localhost:4000/restaurants`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
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

  showPopup = () => {
    this.setState({ popup: true });
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

  blockBank = (e, s) => {
    console.log(e);
    var dis = this;
    axios
      .post(`${API_URL}/bankStatus`, {
        token,
        bank_id: e,
        status: s,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            var n = s == 1 ? 'Unblocked' : 'Blocked';
            this.setState({
              notification: 'Bank ' + n,
            });
            this.success();
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

  verifyOTP = event => {
    this.setState({
      verifyOTPLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/addBank`, {
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
        this.setState({
          verifyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          verifyOTPLoading: false,
        });
        this.error();
      });
  };

  verifyEditOTP = event => {
    this.setState({
      verifyEditOTPLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/editBank`, {
        name: this.state.name,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        bank_id: this.state.bank_id,
        country: this.state.country,
        ccode: this.state.ccode,
        bcode: this.state.bcode,
        email: this.state.email,
        mobile: this.state.mobile,
        logo: this.state.logo,
        contract: this.state.contract,
        otp: this.state.otp,
        otp_id: this.state.otpId,
        token,
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
              function() {
                this.success();
                this.closePopup();
                this.getBanks();
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

    if (key == 'contract') {
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

  getBanks = () => {
    axios
      .post(`${API_URL}/getBanks`, { token })
      .then(res => {
        if (res.status == 200) {
          this.setState({ loading: false, banks: res.data.banks });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
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
    console.log(this.state.permissions);
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

    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    const perms = this.state.permissions;
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
            <ActionBar
              marginBottom="33px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input
                  type="text"
                  placeholder="Search Bank"
                  value={this.state.query}
                  onChange={this.handleSearchInputChange}
                />
              </div>

              {this.state.permissions == 'all' ||
              this.state.permissions.create_bank ? (
                <Button className="addBankButton" flex onClick={this.showPopup}>
                  <i className="material-icons">add</i>
                  <span>
                    <FormattedMessage {...messages.addbank} />
                  </span>
                </Button>
              ) : null}
            </ActionBar>
            <Card bigPadding>
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>
                    <FormattedMessage {...messages.title} />
                  </h3>
                  {/* <h5>
                    <FormattedMessage {...messages.subtitle} />
                  </h5> */}
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage {...messages.th1} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.th2} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.th3} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.th4} />
                      </th>
                      <th>
                        <FormattedMessage {...messages.th5} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.banks && this.state.banks.length > 0
                      ? this.state.banks.map(function(b) {
                          return (
                            <tr key={b._id}>
                              <td>{b.name}</td>
                              <td className="tac">0</td>
                              <td className="tac">0</td>
                              <td className="tac">0</td>
                              <td className="tac bold">
                                {b.total_trans}
                                {b.status != 0 ? (
                                  <span className="absoluteRight primary popMenuTrigger">
                                    <i className="material-icons ">more_vert</i>
                                    <div className="popMenu">
                                      {perms == 'all' || perms.edit_bank ? (
                                        <span
                                          onClick={() => ep.showEditPopup(b)}
                                        >
                                          Edit
                                        </span>
                                      ) : null}
                                      <A href={'/info/' + b._id}>
                                        <FormattedMessage {...messages.menu1} />
                                      </A>
                                      <A href={'/documents/' + b._id}>
                                        <FormattedMessage {...messages.menu2} />
                                      </A>
                                      <A href={'/fees/' + b._id}>
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
                      pattern=".{3,12}"
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
                    <UploadArea bgImg={STATIC_URL + 'main/pdf-icon.png'}>
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
                          ' '
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
                      value={this.state.name.slice(' ', -1)}
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
                    <UploadArea bgImg={STATIC_URL + 'main/pdf-icon.png'}>
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
                          ' '
                        )}

                        <label>
                          {/* <div className="tooltip">
                            <i
                              className="fa fa-info-circle"
                              style={{ margin: '5px' }}
                            />
                            <span className="tooltiptext">
                              This contract will be uploaded on Blockchain.
                            </span>
                          </div> */}
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
      </Wrapper>
    );
  }
}
