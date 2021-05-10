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

import Wrapper from 'components/Wrapper';
import Header from 'components/Header';
import Container from 'components/Container';
import TabSwitch from 'components/TabSwitch';
import Loader from 'components/Loader';
import Welcome from 'components/Header/Welcome';
import SidebarOne from 'components/Sidebar/SidebarOne';
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
import messages from './messages';

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

const options = {
  First: false,
  Second: false,
  Third: true,
};
const token = localStorage.getItem('logged');

export default class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address1: '',
      state: '',
      zip: '',
      username: '',
      password: '',
      mobile: '',
      email: '',
      logo: '',
      profile_id: '',
      user_id: '',
      contract: '',
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: 'Welcome',
      popup: false,
      editPopup: false,
      profile_popup_edit: false,
      profile_popup: false,
      pro_name: '',
      pro_description: '',
      pro_permissions: {
        create_bank: false,
        edit_bank: false,
        create_fee: false,
      },
      create_bank: false,
      edit_bank: false,
      create_fee: false,
      user_id: token,
      otpId: '',
      banks: [],
      users: [],
      roles: [],
      profiles: [],
      otp: '',
      showOtp: false,
      searchusers: [],
      countryname: "",
      ccode: "+91"
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
    console.log(this.state.pro_description.length);
    // if (event.target.name == "pro_description" && this.state.pro_description.length > 6) {
    //   alert("only 250 character allowed")
    // }

    this.setState({
      [name]: value,
    });
  };

  showPopup = () => {
    this.setState({ popup: true });
  };

  showEditPopup = v => {
    this.setState({
      editPopup: true,
      name: v.name,
      email: v.email,
      mobile: v.mobile,
      user_id: v._id,
      username: v.username,
      password: v.password,
      profile_id: v.profile_id,
      logo: v.logo,
    });
  };

  showEditProfilePopup = v => {
    if (v.permissions && v.permissions != '') {
      const p = JSON.parse(v.permissions);
      console.log(p.edit_bank);
      if (p.create_bank) {
        this.setState({ create_bank: true });
      } else {
        this.setState({ create_bank: false });
      }
      if (p.edit_bank) {
        this.setState({ edit_bank: true });
      } else {
        this.setState({ edit_bank: false });
      }
      if (p.create_fee) {
        this.setState({ create_fee: true });
      } else {
        this.setState({ create_fee: false });
      }
    }

    this.setState({
      profile_popup_edit: true,
      pro_name: v.name,
      pro_description: v.description,
      profile_id: v._id,
    });
  };

  showProfilePopup = () => {
    this.setState({ profile_popup: true });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
      profile_popup: false,
      profile_popup_edit: false,
      pro_name: '',
      pro_description: '',
      pro_permissions: [],
      name: '',
      address1: '',
      username: '',
      password: '',
      state: '',
      zip: '',
      profile_id: '',
      create_bank: false,
      edit_bank: false,
      create_fee: false,
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
    if (this.state.logo == null || this.state.logo == '') {
      this.setState(
        {
          notification: 'You need to upload a logo',
        },
        () => {
          this.error();
        },
      );
    } else {
      this.setState({
        addUserLoading: true,
      });
      axios
        .post(`${API_URL}/addInfraUser`, {
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          username: this.state.username,
          password: this.state.password,
          profile_id: this.state.profile_id,
          logo: this.state.logo,
          country: this.state.countryname,
          ccode: this.state.ccode,
          token,
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.error) {
              throw res.data.error;
            } else {
              this.setState(
                {
                  notification: 'Infra User added successfully!',
                },
                () => {
                  this.success();
                  this.closePopup();
                  this.getUsers();
                },
              );
            }
          } else {
            const error = new Error(res.data.error);
            throw error;
          }
          this.setState({
            addUserLoading: false,
          });
        })
        .catch(err => {
          this.setState({
            notification: err.response
              ? err.response.data.error
              : err.toString(),
            addUserLoading: false,
          });
          this.error();
        });
      // event.preventDefault();
      // axios
      //   .post(`${API_URL  }/generateOTP`, {
      //     name: this.state.name,
      //     page: 'addBank',
      //     token,
      //   })
      //   .then(res => {
      //     if(res.status == 200){
      //       if(res.data.error){
      //         throw res.data.error;
      //       }else{
      //         this.setState({
      //           otpId: res.data.id,
      //           showOtp: true,
      //           notification: 'OTP Sent'
      //         });
      //         this.success();
      //       }
      //     }else{
      //       const error = new Error(res.data.error);
      //       throw error;
      //     }
      //   })
      //   .catch(err => {
      //     this.setState({
      //       notification: (err.response) ? err.response.data.error : err.toString()
      //     });
      //     this.error();
      //   });
    }
  };

  editUser = event => {
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
    } else {
      this.setState({
        editUserLoading: true,
      });
      axios
        .post(`${API_URL}/editInfraUser`, {
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          username: this.state.username,
          password: this.state.password,
          profile_id: this.state.profile_id,
          user_id: this.state.user_id,
          logo: this.state.logo,
          token,
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.error) {
              throw res.data.error;
            } else {
              this.setState(
                {
                  notification: 'Infra User updated successfully!',
                },
                function () {
                  this.success();
                  this.closePopup();
                  this.getUsers();
                },
              );
            }
          } else {
            const error = new Error(res.data.error);
            throw error;
          }
          this.setState({
            editUserLoading: false,
          });
        })
        .catch(err => {
          this.setState({
            notification: err.response
              ? err.response.data.error
              : err.toString(),
            editUserLoading: false,
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
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };

  addProfile = event => {
    event.preventDefault();
    if (
      !this.state.create_bank &&
      !this.state.edit_bank &&
      !this.state.create_fee
    ) {
      this.setState(
        {
          notification: 'You need to select at least one role',
        },
        () => {
          this.error();
        },
      );
    } else {
      this.setState({
        addProfileLoading: true,
      });
      axios
        .post(`${API_URL}/addProfile`, {
          pro_name: this.state.pro_name,
          pro_description: this.state.pro_description,
          create_bank: this.state.create_bank,
          edit_bank: this.state.edit_bank,
          create_fee: this.state.create_fee,
          token,
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.error) {
              throw res.data.error;
            } else {
              this.setState(
                {
                  notification: 'Profile added successfully!',
                },
                () => {
                  this.success();
                  this.closePopup();
                  this.getRoles();
                },
              );
            }
          } else {
            const error = new Error(res.data.error);
            throw error;
          }
          this.setState({
            addProfileLoading: false,
          });
        })
        .catch(err => {
          this.setState({
            notification: err.response
              ? err.response.data.error
              : err.toString(),
            addProfileLoading: true,
          });
          this.error();
        });
    }
  };

  editProfile = event => {
    event.preventDefault();
    this.setState({
      editProfileLoading: true,
    });
    axios
      .post(`${API_URL}/editProfile`, {
        pro_name: this.state.pro_name,
        pro_description: this.state.pro_description,
        create_bank: this.state.create_bank,
        edit_bank: this.state.edit_bank,
        create_fee: this.state.create_fee,
        profile_id: this.state.profile_id,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Profile updated successfully!',
              },
              () => {
                this.success();
                this.closePopup();
                this.getRoles();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          editProfileLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          editProfileLoading: false,
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
    this.setState({
      [key]: 'main/loader.gif',
    });
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
          [key]: '',
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

  getUsers = () => {
    axios
      .post(`${API_URL}/getInfraUsers`, { token })
      .then(res => {
        if (res.status == 200) {
          this.setState({ loading: false, users: res.data.users, searchusers: res.data.users });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRoles = () => {
    axios
      .post(`${API_URL}/getRoles`, { token })
      .then(res => {
        if (res.status == 200) {
          this.setState({ roles: res.data.roles });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkBtn = event => {
    const { target } = event;
    const tid = target.getAttribute('data-id');
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      this.setState({
        [tid]: false,
      });
    } else {
      target.classList.add('active');
      this.setState({
        [tid]: true,
      });
    }

    console.log();
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.getUsers();
      this.getRoles();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  searchlistfunction = (value) => {
    console.log(value)
    console.log(this.state.users)
    // console.log(filterMerchantList)
    console.log(this.state.searchusers)
    const newfilterdata = this.state.searchusers.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );
    // console.log(newfilterdata)
    this.setState({ users: newfilterdata })


  }

  countryChange = event => {
    const { value, name } = event.target;
    const { title } = event.target.options[event.target.selectedIndex];
    console.log(title)
    this.setState({ countryname: value, ccode: title })


  };

  render() {
    const ep = this;
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

    return (
      <Wrapper from="infra">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="user" />
        <Container verticalMargin>
          <Main fullWidth>
            <TabSwitch
              tabs={[
                { name: 'My Users', target: 'box1', active: 'active' },
                { name: 'Profiles', target: 'box2', active: '' },
              ]}
            >
              <div className="tabBody">
                <div id="box1" className="tabContent active">
                  <ActionBar
                    marginBottom="33px"
                    inputWidth="calc(100% - 241px)"
                    className="clr"
                  >
                    {/* {this.state.users.length <= 1 ? ( */}
                    {this.state.users.length < 1 ? (
                      this.state.roles.length <= 0 ? (
                        <h2 className="fl m0">
                          Create Your User Profile First
                        </h2>
                      ) : (
                          <h2 className="fl m0">Create Your First Infra User</h2>
                        )
                    ) : (
                        <div className="iconedInput fl">
                          <i className="material-icons">search</i>
                          <input type="text" placeholder="Search Infra User" onChange={(e) => {
                            ep.searchlistfunction(e.target.value)
                          }} />
                        </div>
                      )}

                    <Button
                      className="addBankButton"
                      flex
                      onClick={this.showPopup}
                    >
                      <i className="material-icons">add</i>
                      <span>Add Infra User</span>
                    </Button>
                  </ActionBar>
                  <div className="cardBody clr">
                    {this.state.users && this.state.users.length > 0
                      ? this.state.users.map(function (b) {
                        if (!b.isAdmin) {
                          const pic =
                            b.logo && b.logo != '' && b.logo != undefined
                              ? STATIC_URL + b.logo
                              : `${CONTRACT_URL}main/default-profile.png`;
                          return (
                            <Card
                              key={b._id}
                              col
                              horizontalMargin="10px"
                              cardWidth="192px"
                            >
                              <div className="profile">
                                <img src={pic} />
                              </div>
                              <Row>
                                <Col cW="80%">
                                  <h4 className="hh">{b.name}</h4>
                                </Col>
                                <Col cW="20%">
                                  <Button
                                    noMin
                                    className="fr"
                                    onClick={() => ep.showEditPopup(b)}
                                  >
                                    Edit
                                    </Button>
                                </Col>
                              </Row>
                            </Card>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
                <div id="box2" className="tabContent">
                  <Card bigPadding>
                    <div className="cardHeader">
                      <div className="cardHeaderLeft">
                        <i className="material-icons">supervised_user_circle</i>
                      </div>
                      <div className="cardHeaderRight">
                        <h3>Profiles</h3>
                        <h5>User Profiles created by Infra</h5>
                      </div>

                      <Button
                        className="addBankButton"
                        flex
                        onClick={this.showProfilePopup}
                      >
                        <i className="material-icons">add</i>
                        <span>Profile</span>
                      </Button>
                    </div>
                    <div className="cardBody">
                      <Table marginTop="34px">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Roles</th>
                            <th>Action</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.roles && this.state.roles.length > 0
                            ? this.state.roles.map(function (b) {
                              let perms = [];
                              if (b.permissions && b.permissions != '') {
                                var p = JSON.parse(b.permissions);
                                console.log(p);
                                if (p.create_bank) {
                                  perms.push('Create Bank');
                                }
                                if (p.edit_bank) {
                                  perms.push('Edit Bank');
                                }
                                if (p.create_fee) {
                                  perms.push('Create Fee');
                                }
                              }
                              return (
                                <tr key={b._id}>
                                  <td>{b.name}</td>
                                  <td className="tac">{b.description}</td>
                                  <td className="tac green">
                                    {perms.toString()}
                                  </td>
                                  <td className="tac bold">
                                    <span className="">
                                      <a
                                        onClick={() =>
                                          ep.showEditProfilePopup(b)
                                        }
                                      >
                                        Edit
                                        </a>
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
                </div>
              </div>
            </TabSwitch>
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
                  <Button filledBtn marginTop="50px">
                    <span>
                      <FormattedMessage {...messages.verify} />
                    </span>
                  </Button>
                </form>
              </div>
            ) : (
                <div>
                  <h1>Create Infra User</h1>
                  <form action="" method="post" onSubmit={this.addBank}>
                    <FormGroup>
                      <label>
                        <FormattedMessage {...messages.popup1} />*
                    </label>
                      <TextInput
                        type="text"
                        name="name"
                        pattern=".{4,12}"
                        title="Minimum 4 characters"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Email*</label>
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

                    <FormGroup>
                      <label>Mobile Number*</label>
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

                    <FormGroup>
                      <label>User Id*</label>
                      <TextInput
                        id="username"
                        type="text"
                        name="username"
                        pattern="(^[a-z][a-z0-9._-]{3,19}$)"
                        // pattern=".{4,8}"
                        // title="Minimum 4 Characters"
                        onInput={e => e.target.setCustomValidity('')}
                        onInvalid={e =>
                          e.target.setCustomValidity(
                            'Username must be minimum 4 characters, should start with an alphabet, can contain number and special character(-_.)',
                          )
                        }
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.username.trim().toLowerCase()}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>
                    <Row>
                      <Col>

                        <FormGroup>

                          <SelectInput
                            type="text"
                            name="country"
                            onChange={this.countryChange}
                            required
                            autoFocus
                          >
                            <option title="" value="">Select Country*</option>
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
                            <option title="+1649">Turks &amp; Caicos Islands</option>
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
                          {/* <label>Country Code*</label>  */}
                          <TextInput
                            type="text"
                            name="ccode"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            readOnly
                            value={this.state.ccode}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <label>Temporary Password*</label>
                      <TextInput
                        type="password"
                        pattern="((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$_!]).{8,16})"
                        title="Minimum 8 Alphanumeric Characters"
                        name="password"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <SelectInput
                        type="text"
                        name="profile_id"
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                        value={this.state.profile_id}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="">Select Profile*</option>
                        {this.state.roles && this.state.roles.length > 0
                          ? this.state.roles.map(function (b) {
                            return <option value={b._id}>{b.name}</option>;
                          })
                          : null}
                      </SelectInput>
                    </FormGroup>

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
                              // <FormattedMessage {...messages.popup9} />
                              <span>Profile Picture</span>
                            ) : (
                                <span>Profile Picture</span>
                              )}
                          *
                        </label>
                        </div>
                      </UploadArea>
                    </FormGroup>

                    {this.state.addUserLoading ? (
                      <Button filledBtn marginTop="50px" disabled>
                        <Loader />
                      </Button>
                    ) : (
                        <Button filledBtn marginTop="50px">
                          <span>Add User</span>
                        </Button>
                      )}
                  </form>
                </div>
              )}
          </Popup>
        ) : null
        }

        {
          this.state.editPopup ? (
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
                    <Button filledBtn marginTop="50px">
                      <span>
                        <FormattedMessage {...messages.verify} />
                      </span>
                    </Button>
                  </form>
                </div>
              ) : (
                  <div>
                    <h1>Edit Infra User</h1>
                    <form action="" method="post" onSubmit={this.editUser}>
                      <FormGroup>
                        <label>
                          <FormattedMessage {...messages.popup1} />*
                    </label>
                        <TextInput
                          type="text"
                          name="name"
                          pattern=".{8,}"
                          title="Minimum 8 Characters"
                          onFocus={inputFocus}
                          autoFocus
                          onBlur={inputBlur}
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Email*</label>
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

                      <FormGroup>
                        <label>Mobile Number*</label>
                        <TextInput
                          type="text"
                          // pattern="[0-9]{10}"
                          title="Mobile"
                          name="mobile"
                          autoFocus
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.mobile}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>User Id*</label>
                        <TextInput
                          type="text"
                          pattern=".{8,}"
                          title="Minimum 8 Characters"
                          name="username"
                          onFocus={inputFocus}
                          autoFocus
                          onBlur={inputBlur}
                          value={this.state.username}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Temporary Password*</label>
                        <TextInput
                          type="password"
                          pattern=".{8,}"
                          title="Minimum 8 Characters"
                          name="password"
                          onFocus={inputFocus}
                          autoFocus
                          onBlur={inputBlur}
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <SelectInput
                          type="text"
                          name="profile_id"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.profile_id}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Select Profile*</option>
                          {this.state.roles && this.state.roles.length > 0
                            ? this.state.roles.map(function (b) {
                              return <option value={b._id}>{b.name}</option>;
                            })
                            : null}
                        </SelectInput>
                      </FormGroup>

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
                              {this.state.logo == '' ? (
                                // <FormattedMessage {...messages.popup9} />
                                <span>Change Profile Picture</span>
                              ) : (
                                  <span>Change Profile Picture</span>
                                )}
                          *
                        </label>
                          </div>
                        </UploadArea>
                      </FormGroup>

                      {this.state.editUserLoading ? (
                        <Button filledBtn marginTop="50px" disabled>
                          <Loader />
                        </Button>
                      ) : (
                          <Button filledBtn marginTop="50px">
                            <span>Update User</span>
                          </Button>
                        )}
                    </form>
                  </div>
                )}
            </Popup>
          ) : null
        }

        {
          this.state.profile_popup ? (
            <Popup close={this.closePopup.bind(this)} accentedH1>
              <h1>Create Profile</h1>
              <form action="" method="post" onSubmit={this.addProfile}>
                <FormGroup>
                  <label>Profile Name*</label>
                  <TextInput
                    type="text"
                    name="pro_name"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.pro_name}
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description*</label>
                  <TextInput
                    type="text"
                    name="pro_description"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.pro_description}
                    onChange={this.handleInputChange}
                    maxLength="250"
                    required
                  />
                </FormGroup>

                <Row>
                  <Col cW="33%">
                    <Button
                      type="button"
                      className="toggle"
                      onClick={this.checkBtn}
                      data-id="create_bank"
                    >
                      Create Bank
                  </Button>
                  </Col>
                  <Col cW="33%">
                    <Button
                      type="button"
                      className="toggle"
                      onClick={this.checkBtn}
                      data-id="edit_bank"
                    >
                      Edit Bank
                  </Button>
                  </Col>
                  {/* <Col cW="33%">
                  <Button
                    type="button"
                    className="toggle"
                    onClick={this.checkBtn}
                    data-id="create_fee"
                  >
                    Create Fee
                  </Button>
                </Col> */}
                </Row>

                {this.state.addProfileLoading ? (
                  <Button filledBtn marginTop="50px" disabled>
                    <Loader />
                  </Button>
                ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Add Profile</span>
                    </Button>
                  )}
              </form>
            </Popup>
          ) : null
        }

        {
          this.state.profile_popup_edit ? (
            <Popup close={this.closePopup.bind(this)} accentedH1>
              <h1>Edit Profile</h1>
              <form action="" method="post" onSubmit={this.editProfile}>
                <FormGroup>
                  <label>Profile Name*</label>
                  <TextInput
                    type="text"
                    name="pro_name"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    autoFocus
                    value={this.state.pro_name}
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description*</label>
                  <TextInput
                    type="text"
                    name="pro_description"
                    onFocus={inputFocus}
                    autoFocus
                    onBlur={inputBlur}
                    value={this.state.pro_description}
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>

                <Row>
                  <Col cW="33%">
                    <Button
                      type="button"
                      className={`toggle ${this.state.create_bank ? 'active' : ''
                        }`}
                      onClick={this.checkBtn}
                      data-id="create_bank"
                      id="edit_create_bank"
                    >
                      Create Bank
                  </Button>
                  </Col>
                  <Col cW="33%">
                    <Button
                      type="button"
                      className={`toggle ${this.state.edit_bank ? 'active' : ''}`}
                      onClick={this.checkBtn}
                      data-id="edit_bank"
                      id="edit_edit_bank"
                    >
                      Edit Bank
                  </Button>
                  </Col>
                  {/* <Col cW="33%">
                  <Button
                    type="button"
                    className={
                      'toggle ' + (this.state.create_fee ? 'active' : '')
                    }
                    onClick={this.checkBtn}
                    data-id="create_fee"
                    id="edit_create_fee"
                  >
                    Create Fee
                  </Button>
                </Col> */}
                </Row>
                {this.editProfileLoading ? (
                  <Button filledBtn marginTop="50px" disabled>
                    <Loader />
                  </Button>
                ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Update Profile</span>
                    </Button>
                  )}
              </form>
            </Popup>
          ) : null
        }
      </Wrapper >
    );
  }
}
