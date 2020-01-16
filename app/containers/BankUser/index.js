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
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import Welcome from 'components/Header/Welcome';
import SidebarBank from 'components/Sidebar/SidebarBank';
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


var options = {
  'First': false,
  'Second': false,
  'Third': true
};
const token = localStorage.getItem('bankLogged');

export default class BankUser extends Component {
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
        'create_bank' : false,
        'edit_bank' : false,
        'create_fee' : false
      },
      create_bank: false,
      edit_bank: false,
      create_fee: false,
      user_id: token,
      otpId: '',
      banks: [],
      users: [],
roles:[],
      profiles: [],
      otp: '',
      showOtp: false
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

  showPopup = () => {
    this.setState({ popup: true });
  };
  showEditPopup = (v) => {
    this.setState({ editPopup: true, name: v.name, email: v.email, mobile: v.mobile, user_id:v._id, username: v.username, password: v.password, profile_id: v.profile_id, logo: v.logo });
  };

  showEditProfilePopup = (v) => {

    if(v.permissions && v.permissions != ""){
      var p = JSON.parse(v.permissions);
      console.log(p.edit_bank);
      if(p.create_bank){
        this.setState({ create_bank: true});
      }else{
        this.setState({ create_bank: false});
      }
      if(p.edit_bank){
        this.setState({ edit_bank: true});
      }else{
        this.setState({ edit_bank: false});
      }
      if(p.create_fee){
        this.setState({ create_fee: true});
      }else{
        this.setState({ create_fee: false});
      }
      }

    this.setState({ profile_popup_edit: true, pro_name: v.name, pro_description: v.description, profile_id : v._id });

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
      password:'',
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
      showOtp: false
    });
  };

  logout = () => {
    // event.preventDefault();
    // axios.post(API_URL+'/logout', {token: token})
    // .then(res => {
    //    if(res.status == 200){
    localStorage.removeItem("logged");
    localStorage.removeItem("name");
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

  addBankUser = event => {

    event.preventDefault();
    if(this.state.logo == null || this.state.logo == ''){
      this.setState({
        notification: "You need to upload a profile photo"
      }, () =>{
        this.error();
      });
    }else{
      this.setState({
        addUserLoading: true
      });
      console.log(this.state.branch_id);
    axios
      .post(`${API_URL  }/addBankUser`, {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        username: this.state.username,
        password: this.state.password,
        branch_id: this.state.branch_id,
        logo: this.state.logo,
        token
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank User added successfully!",
            }, () => {
              this.success();
              this.closePopup();
              this.getUsers();
            });

          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          addUserLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          addUserLoading: false
        });
        this.error();
      });
    // event.preventDefault();
    // axios
    //   .post(`${API_URL  }/generateOTP`, {
    //     name: this.state.name,
    //     page: 'addBankUser',
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
    if(this.state.logo == null || this.state.logo == ''){
      this.setState({
        notification: "You need to upload a profile photo"
      }, () =>{
        this.error();
      });
    }
    else{
      this.setState({
        editUserLoading: true
      });
    axios
      .post(`${API_URL  }/editBankUser`, {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        username: this.state.username,
        password: this.state.password,
        branch_id: this.state.branch_id,
        user_id: this.state.user_id,
        logo: this.state.logo,
        token
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank User updated successfully!",
            }, function(){
              this.success();
              this.closePopup();
              this.getUsers();
            });

          }

        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          editUserLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          editUserLoading: false
        });
        this.error();
      });
    }
  };

  

  addProfile = event => {
    event.preventDefault();
    if(!this.state.create_bank && !this.state.edit_bank && !this.state.create_fee){
      this.setState({
        notification: "You need to select at least one role"
      }, () => {
        this.error();
      });

    }else{
      this.setState({
        addProfileLoading: true
      });
    axios
      .post(`${API_URL  }/addProfile`, {
        pro_name: this.state.pro_name,
        pro_description: this.state.pro_description,
        create_bank: this.state.create_bank,
        edit_bank: this.state.edit_bank,
        create_fee: this.state.create_fee,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Profile added successfully!",
            }, () => {
              this.success();
              this.closePopup();
              this.getRoles();
            });


          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          addProfileLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          addProfileLoading: true
        });
        this.error();
      });
    }
  };

  editProfile = event => {
    event.preventDefault();
    this.setState({
      editProfileLoading: true
    });
    axios
      .post(`${API_URL  }/editProfile`, {
        pro_name: this.state.pro_name,
        pro_description: this.state.pro_description,
        create_bank: this.state.create_bank,
        edit_bank: this.state.edit_bank,
        create_fee: this.state.create_fee,
        profile_id: this.state.profile_id,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Profile updated successfully!",
            }, () => {
              this.success();
              this.closePopup();
              this.getRoles();
            });


          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          editProfileLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          editProfileLoading: false
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
      this.fileUpload(e.target.files[0], e.target.getAttribute("data-key"));
    }
  }

  fileUpload(file, key) {
    this.setState({
      [key] : 'main/loader.gif'
    });
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };

    axios
      .post(`${API_URL  }/fileUpload?token=${token}&from=bank`, formData, config)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              [key] : res.data.name
            });
          }
        }else{
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          [key] : ''
        });
        this.error();
      });
  }



  getUsers = () => {
    axios
      .post(`${API_URL  }/getBankUsers`, { token })
      .then(res => {
        if(res.status == 200){
          this.setState({ loading: false, users: res.data.users });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBranches = () => {
    axios
      .post(`${API_URL  }/getBranches`, { token })
      .then(res => {
        if(res.status == 200){
          this.setState({ branches: res.data.branches });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkBtn = (event) => {
    const target = event.target;
    const tid = target.getAttribute("data-id");
    if(target.classList.contains("active")){
      target.classList.remove("active");
      this.setState({
        [tid] : false
      });
    }else{
      target.classList.add("active");
      this.setState({
        [tid] : true
      });
    }

    console.log();
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.getUsers();
      this.getBranches();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  render() {
    const ep = this;
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector("label").classList.add("focused");
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
      return <Redirect to="/" />
    }

    return (
      <Wrapper from="bank">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bank Users | BANK | E-WALLET</title>
        </Helmet>
        <BankHeader active="users" />
        <Container verticalMargin>
          <SidebarBank />
          <Main>

                <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">


                      <div className="iconedInput fl">
                      <i className="material-icons">search</i>
                      <input type="text" placeholder="Search" />
                    </div>


              <Button className="fr" flex onClick={this.showPopup}>
                <i className="material-icons">add</i>
                <span>Add Bank User</span>
              </Button>
            </ActionBar>
            <div className="cardBody clr">
            {
                      this.state.users && this.state.users.length > 0
                        ? this.state.users.map(function(b) {
                          if(!b.isAdmin){
                            var pic = (b.logo && b.logo != '' && b.logo != undefined) ?  STATIC_URL+b.logo  : CONTRACT_URL+"main/default-profile.png";
                          return <Card key={b._id} col horizontalMargin="10px" cardWidth="192px">
                            <div className="profile">
                              <img src={pic} />
                              </div>
                            <Row>
                              <Col cW="80%">
                              <h4 className="hh">{b.name}</h4>
                              </Col>
                              <Col cW="20%">
                              <Button noMin className="fr" onClick={() => ep.showEditPopup(b)} >Edit</Button>
                              </Col>
                            </Row>
                          </Card>
                          }
                        })
                        :
                        null
                    }

            </div>

          </Main>
        </Container>
        { this.state.popup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showOtp ?
              <div>
              <h1 ><FormattedMessage {...messages.verify} /></h1>
            <form action="" method="post" onSubmit={this.verifyOTP} >
              <FormGroup>
                <label><FormattedMessage {...messages.otp} />*</label>
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
                <span><FormattedMessage {...messages.verify} /></span>
              </Button>
              </form>
              </div>
              :
              <div>
            <h1 >Create Bank User</h1>
            <form action="" method="post" onSubmit={this.addBankUser}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} />*</label>
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

                  <FormGroup>
                  <label>User Id*</label>
                  <TextInput
                    type="text"
                    name="username"
                    pattern=".{8,}"
                    title= "Minimum 8 Characters"
                    onFocus={inputFocus}
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
                    title= "Minimum 8 Characters"
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
                    name="branch_id"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.branch_id}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Branch*</option>
                    {
                      this.state.branches && this.state.branches.length > 0
                        ? this.state.branches.map(function(b) {
                          return  <option value={b._id}>{b.name}</option>
                        })
                        :
                        null
                    }
                    </SelectInput>
                  </FormGroup>



              <FormGroup>

                  {/* <UploadedFile>

                      <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i>
                    </UploadedFile>
                  : */}
                  <UploadArea  bgImg={STATIC_URL+ this.state.logo}>
                    {
                    this.state.logo ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.logo } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('logo')}>
                    <input type="file" id="logo" onChange={this.onChange} data-key="logo"/>
                    {
                    !this.state.logo ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }
                    <label>
                      {
                      this.state.logo == '' ?
                      <span>Profile Photo</span>
                      :
                      <span>Change Profile Photo</span>
                      }

                      *</label>
                    </div>
                  </UploadArea>
                   
              </FormGroup>
              <Icon className="material-icons">fingerprint</Icon>
                {
                  this.state.addUserLoading ?
                  <Button filledBtn marginTop="20px" disabled>
                <Loader />
              </Button>
                  :
                  <Button filledBtn marginTop="20px">
                <span>Add User</span>
              </Button>
                }

            </form>
            </div>
            }
          </Popup>
          : null }

{ this.state.editPopup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showOtp ?
              <div>
              <h1 ><FormattedMessage {...messages.verify} /></h1>
            <form action="" method="post" onSubmit={this.verifyOTP} >
              <FormGroup>
                <label><FormattedMessage {...messages.otp} />*</label>
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
                <span><FormattedMessage {...messages.verify} /></span>
              </Button>
              </form>
              </div>
              :
              <div>
            <h1 >Edit Bank User</h1>
            <form action="" method="post" onSubmit={this.editUser}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} />*</label>
                <TextInput
                  type="text"
                  name="name"
                    pattern=".{8,}"
                    title= "Minimum 8 Characters"
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

                  <FormGroup>
                  <label>User Id*</label>
                  <TextInput
                    type="text"
                    pattern=".{8,}"
                    title= "Minimum 8 Characters"
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
                    title= "Minimum 8 Characters"
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
                    name="branch_id"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.branch_id}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Branch*</option>
                    {
                      this.state.branches && this.state.branches.length > 0
                        ? this.state.branches.map(function(b) {
                          return  <option value={b._id}>{b.name}</option>
                        })
                        :
                        null
                    }
                    </SelectInput>
                  </FormGroup>



              <FormGroup>

                  {/* <UploadedFile>

                      <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i>
                    </UploadedFile>
                  : */}
                  <UploadArea  bgImg={STATIC_URL+ this.state.logo}>
                    {
                    this.state.logo ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.logo } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('logo')}>
                    <input type="file" id="logo" onChange={this.onChange} data-key="logo"/>
                    {
                    !this.state.logo ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }
                    <label>
                      {
                      this.state.logo == '' ?
                      <span>Profile Photo</span>
                      :
                      <span>Change Profile Photo</span>
                      }

                      *</label>
                    </div>
                  </UploadArea>

              </FormGroup>
              <Icon className="material-icons">fingerprint</Icon>
                    {
                      this.state.editUserLoading ?
                      <Button filledBtn marginTop="20px" disabled>
                <Loader />
              </Button>
                      :
                      <Button filledBtn marginTop="20px">
                <span>Update User</span>
              </Button>
                    }

            </form>
            </div>
            }
          </Popup>
          : null }

{ this.state.profile_popup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>

            <h1 >Create Profile</h1>
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
                  required
                />
              </FormGroup>

                <Row>
                  <Col cW="33%">
                  <Button type="button" className="toggle" onClick={this.checkBtn} data-id="create_bank">Create Bank</Button>
                  </Col>
                  <Col cW="33%">
                  <Button  type="button" className="toggle" onClick={this.checkBtn} data-id="edit_bank">Edit Bank</Button>
                  </Col>
                  <Col cW="33%">
                  <Button  type="button" className="toggle" onClick={this.checkBtn} data-id="create_fee">Create Fee</Button>
                  </Col>
                </Row>

                {
                  this.state.addProfileLoading ?
                  <Button filledBtn marginTop="50px" disabled>
                <Loader />
              </Button>
                  :
                  <Button filledBtn marginTop="50px">
                <span>Add Profile</span>
              </Button>
                }

            </form>

          </Popup>
          : null }

{ this.state.profile_popup_edit ?
          <Popup close={this.closePopup.bind(this)} accentedH1>

            <h1 >Edit Profile</h1>
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
                  <Button type="button" className={"toggle "+ (this.state.create_bank ? 'active' : '')} onClick={this.checkBtn} data-id="create_bank" id="edit_create_bank">Create Bank</Button>
                  </Col>
                  <Col cW="33%">
                  <Button  type="button" className={"toggle "+ (this.state.edit_bank ? 'active' : '')} onClick={this.checkBtn} data-id="edit_bank" id="edit_edit_bank">Edit Bank</Button>
                  </Col>
                  <Col cW="33%">
                  <Button  type="button" className={"toggle "+ (this.state.create_fee ? 'active' : '')} onClick={this.checkBtn} data-id="create_fee" id="edit_create_fee">Create Fee</Button>
                  </Col>
                </Row>
                {
                  this.editProfileLoading ?
                  <Button filledBtn marginTop="50px" disabled>
                <Loader />
              </Button>
                  :
                  <Button filledBtn marginTop="50px">
                <span>Update Profile</span>
              </Button>
                }


            </form>

          </Popup>
          : null }


      </Wrapper>
    );
  }
}
