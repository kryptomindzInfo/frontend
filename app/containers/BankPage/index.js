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
import Container from 'components/Container';
import Logo from 'components/Header/Logo';
import Nav from 'components/Header/Nav';
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
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';

import { API_URL, STATIC_URL } from '../App/constants';

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
var permissions = localStorage.getItem('permissions');
if(permissions != 'all' && permissions != ''){
permissions = JSON.parse(permissions);
}

export default class BankPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address1: '',
      state: '',
      zip: '',
      country: '',
      ccode: '',
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
      permissions
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
    

    this.setState({ editPopup: true, name: v.name, address1: v.address1, state: v.state, zip: v.zip, country: v.country, ccode: v.ccode, mobile: v.mobile, email: v.email, logo: v.logo, contract: v.contract, username: v.username, bank_id: v._id });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
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

  addBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/generateOTP`, {
        name: this.state.name,
        page: 'addBank',
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              otpId: res.data.id,
              showOtp: true,
              notification: 'OTP Sent'
            });
            this.success();
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  };
blockBank = (e, s) =>{
  console.log(e);
  var dis = this;
  axios
  .post(`${API_URL  }/bankStatus`, {
    token,
    bank_id: e,
    status : s
  })
  .then(res => {
    if(res.status == 200){
      if(res.data.error){
        throw res.data.error;
      }else{
        var n = (s == 1) ? 'Unblocked' : 'Blocked';
        this.setState({
          notification: 'Bank ' + n
        });
        this.success();
        this.getBanks();
      }
    }else{
      const error = new Error(res.data.error);
      throw error;
    }
  })
  .catch(err => {
    this.setState({
      notification: (err.response) ? err.response.data.error : err.toString()
    });
    this.error();
  });
  
};

  editBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/generateOTP`, {
        name: this.state.name,
        page: 'editBank',
        username: this.state.username,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              otpId: res.data.id,
              showEditOtp: true,
              notification: 'OTP Sent'
            });
            this.success();
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  };

  verifyOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/addBank`, {
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
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank added successfully!",
            });
            this.success();
            this.closePopup();
            this.getBanks();
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  };


  verifyEditOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/editBank`, {
        name: this.state.name,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        bank_id: this.state.bank_id,
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
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank updated successfully!",
            }, function(){
              window.location.reload();
            });
            this.success();
            this.closePopup();
            this.getBanks();
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString()
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
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };

    axios
      .post(`${API_URL  }/fileUpload?token=${  token}`, formData, config)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw "File upload error";
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
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  }

  getBanks = () => {
    axios
      .post(`${API_URL  }/getBanks`, { token })
      .then(res => {
        if(res.status == 200){
          this.setState({ loading: false, banks: res.data.banks });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.setState({ loading: false });
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
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />
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
            <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search" />
              </div>
             
                {
                (this.state.permissions == "all" || this.state.permissions.create_bank) ?
                <Button className="fr" flex onClick={this.showPopup}>
                <i className="material-icons">add</i>
                <span><FormattedMessage {...messages.addbank} /></span>
                </Button>
                :
                null
                }
              
            </ActionBar>
            <Card bigPadding>
              <div className="cardHeader" >
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3><FormattedMessage {...messages.title} /></h3>
                  <h5><FormattedMessage {...messages.subtitle} /></h5>
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th><FormattedMessage {...messages.th1} /></th>
                      <th><FormattedMessage {...messages.th2} /></th>
                      <th><FormattedMessage {...messages.th3} /></th>
                      <th><FormattedMessage {...messages.th4} /></th>
                      <th><FormattedMessage {...messages.th5} /></th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      
                      this.state.banks && this.state.banks.length > 0
                        ? this.state.banks.map(function(b) {
                          return <tr key={b._id} ><td>{b.name}</td><td className="tac">0</td><td className="tac">0</td><td  className="tac">0</td>
                          <td className="tac bold">0 
                            { 
                            b.status != 0
                            ?
                          <span className="absoluteRight primary popMenuTrigger">
                          <i className="material-icons ">more_vert</i>
                          <div className="popMenu">
                          {
                            (perms == "all" || perms.edit_bank ) ?
                            <a href="#" onClick={() => ep.showEditPopup(b)}>Edit</a>
                            :
                            null
                          }
                            <a href={"/info/"+b._id}><FormattedMessage {...messages.menu1} /></a>
                            <a href={"/documents/"+b._id}><FormattedMessage {...messages.menu2} /></a>
                            <a href={"/fees/"+b._id}><FormattedMessage {...messages.menu3} /></a>
                            {
                              b.status == -1 ?
                              <a href="#" onClick={() => ep.blockBank(b._id, 1)}>Unblock</a>
                              :
                              <a href="#" onClick={() => ep.blockBank(b._id, -1)}>Block</a>
                            }
                            
                          </div>
                          </span>
                           :
                           <span className="absoluteRight primary popMenuTrigger">
                          <i className="material-icons ">block</i>
                          </span>
                           }
                          
                          </td>
                          </tr>
                        })
                        :
                        null
                    }
                  </tbody>
                </Table>
              </div>
            </Card>
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
                <label><FormattedMessage {...messages.otp} /></label>
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
            <h1 ><FormattedMessage {...messages.addbank} /></h1>
            <form action="" method="post" onSubmit={this.addBank}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} /></label>
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
                <label><FormattedMessage {...messages.popup2} /></label>
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
                  <label><FormattedMessage {...messages.popup3} /></label>
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
                  <label><FormattedMessage {...messages.popup4} /></label>
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
                  <label><FormattedMessage {...messages.popup5} /></label>
                  <TextInput
                    type="text"
                    name="country"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup6} /></label>
                  <TextInput
                    type="text"
                    name="ccode"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.ccode}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup7} /></label>
                  <TextInput
                    type="text"
                    name="mobile"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.mobile}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup8} /></label>
                  <TextInput
                    type="text"
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
                      <FormattedMessage {...messages.popup9} /> 
                      :
                      <span>Change Logo</span>
                      }
                      
                      </label>
                    </div>
                  </UploadArea>

              </FormGroup>

              <FormGroup>
              <UploadArea  bgImg={STATIC_URL+ 'QmQvj1En6YeiyxKT8JHkhB9UH3ynyeE3WHpKbGEpNdzfy4'}>
                    {
                    this.state.contract ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.contract } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('contract')}>
                    <input type="file" id="contract" onChange={this.onChange} data-key="contract"/>
                    {
                    !this.state.contract ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }

                    <label>
                    {
                      this.state.contract == '' ? 
                      <FormattedMessage {...messages.popup10} /> 
                      :
                      <span>Change Contract</span>
                      }
                      </label>
                    </div>
                  </UploadArea>
              </FormGroup>

              <Button filledBtn marginTop="50px">
                <span><FormattedMessage {...messages.addbank} /></span>
              </Button>
            </form>
            </div>
            }
          </Popup>
          : null }

{ this.state.editPopup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showEditOtp ?
              <div>
              <h1 ><FormattedMessage {...messages.verify} /></h1>
            <form action="" method="post" onSubmit={this.verifyEditOTP} >
              <FormGroup>
                <label><FormattedMessage {...messages.otp} /></label>
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
            <h1 >Edit Bank</h1>
            <form action="" method="post" onSubmit={this.editBank}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} /></label>
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
                <label><FormattedMessage {...messages.popup2} /></label>
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
                  <label><FormattedMessage {...messages.popup3} /></label>
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
                  <label><FormattedMessage {...messages.popup4} /></label>
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
                  <label><FormattedMessage {...messages.popup5} /></label>
                  <TextInput
                    type="text"
                    name="country"
                    onFocus={inputFocus}
                    autoFocus
                    onBlur={inputBlur}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup6} /></label>
                  <TextInput
                    type="text"
                    name="ccode"
                    autoFocus
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.ccode}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup7} /></label>
                  <TextInput
                    type="text"
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
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup8} /></label>
                  <TextInput
                    type="text"
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
                      <FormattedMessage {...messages.popup9} /> 
                      :
                      <span>Change Logo</span>
                      }
                      
                      </label>
                    </div>
                  </UploadArea>

              </FormGroup>

              <FormGroup>
              <UploadArea  bgImg={STATIC_URL+ 'QmQvj1En6YeiyxKT8JHkhB9UH3ynyeE3WHpKbGEpNdzfy4'}>
                    {
                    this.state.contract ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.contract } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('contract')}>
                    <input type="file" id="contract" onChange={this.onChange} data-key="contract"/>
                    {
                    !this.state.contract ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }

                    <label>
                    {
                      this.state.contract == '' ? 
                      <FormattedMessage {...messages.popup10} /> 
                      :
                      <span>Change Contract</span>
                      }
                      </label>
                    </div>
                  </UploadArea>
              </FormGroup>

              <Button filledBtn marginTop="50px">
                <span>Update Bank</span>
              </Button>
            </form>
            </div>
            }
          </Popup>
          : null }
      </Wrapper>
    );
  }
}
