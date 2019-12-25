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
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import A from 'components/A';

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
var permissions = localStorage.getItem('permissions');
if(permissions != 'all' && permissions != ''){
permissions = JSON.parse(permissions);
}

export default class FeeList extends Component {
  constructor() {
    super();
    this.state = {
      bank: '',
      name: '',
      address1: '',
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
      user_id: token,
      banks: [],
      rules: [],
      otp: '',
      permissions,
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
    //this.setState({ popup: true });
    this.props.history.push('/createfee/'+this.props.match.params.bank);
  };

  goEdit = (a, b) => {
    //this.setState({ popup: true });
    localStorage.setItem("feeid", b);
    this.props.history.push('/editfee/'+a);
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
        mobile: this.state.mobile,
        page: 'addBank',
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
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
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  }

  getBanks = () => {
    axios
      .post(`${API_URL  }/getBank`, { token:token, bank_id: this.props.match.params.bank })
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          this.setState({ loading: false, banks: res.data.banks, logo: res.data.banks.logo });
        }
      })
      .catch(err => {
        
      });
  };

  getRules = () => {
    axios
      .post(`${API_URL  }/getRules`, { token:token, bank_id: this.props.match.params.bank })
      .then(res => {
        if(res.status == 200){
          
          this.setState({ loading: false, rules: res.data.rules });
        }
      })
      .catch(err => {
        
      });
  };
  

  componentDidMount() {
    this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      this.setState({ loading: false });
      this.getBanks();
      this.getRules();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
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
    const ep = this;
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <TopBar>
        <Welcome infraNav/>
          <Container>
            <A href="/dashboard" float="left">
            <div  className="headerNavDash">
              Main Dashboard
            </div>
            </A>
            <div className="bankLogo">
            <img src={STATIC_URL+this.state.logo}/>
              </div>

    <h2>{this.state.banks.name}</h2>
            
          </Container>
        </TopBar>
        <Container verticalMargin>
          <SidebarTwo bankId={this.state.bank} active="fees"/>
          <Main big>
            <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search" />
              </div>
              {
                (this.state.permissions == "all" || this.state.permissions.create_fee) ?
              <Button className="fr" flex onClick={this.showPopup}>
                <i className="material-icons">add</i>
                <span>Create Rules</span>
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
                  <h3>Revenue Sharing Rules</h3>
                  <h5>Fees created by the infra</h5>
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                     <th>Name</th>
                     <th>Transaction Type</th>
                     <th>Ranges</th>
                     <th></th>
                      </tr>
                  </thead>
                  <tbody>
                  {
                      this.state.rules && this.state.rules.length > 0 
                        ? this.state.rules.map(function(b) {
                          var r = JSON.parse(b.ranges);
                          return <tr key={b._id} ><td>{b.name}</td><td className="tac">{b.trans_type}</td>
                          {/* <td className="tac green">{CURRENCY} {b.trans_from} - {CURRENCY} {b.trans_to}</td>
                          <td  className="tac"> {b.transcount_from} -  {b.transcount_to}</td><td  className="tac">{b.fixed_amount}</td> */}
                          <td>
                            {
                            r.map(function(v){
                            return <div>Count: <span className="green">{v.trans_from} -  {v.trans_to}</span>, Fixed: <span className="green">{CURRENCY+" "+v.fixed_amount}</span>, Percentage: <span className="green">{v.percentage}</span></div>
                            })
                            }
                          </td>
                          <td className="tac bold">
                            {
                              b.status == 0 ?
                              <span className="material-icons">block</span>
                              :
                              <span onClick={ () => ep.goEdit(ep.state.bank, b._id)} className="pointer">Edit</span>
                            }
                            
                            </td></tr>
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
          <Popup close={this.closePopup.bind(this)}>
            {
              this.state.showOtp ?
              <div>
              <h1><FormattedMessage {...messages.verify} /></h1>
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
            <h1><FormattedMessage {...messages.addbank} /></h1>
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
                    <label><FormattedMessage {...messages.popup9} /> </label>
                    </div>
                  </UploadArea>
                
              </FormGroup>

              <FormGroup>
              <UploadArea  bgImg={STATIC_URL+ 'main/pdf-icon.png'}>
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
                    
                    <label><FormattedMessage {...messages.popup10} /> </label>
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
      </Wrapper>
    );
  }
}
