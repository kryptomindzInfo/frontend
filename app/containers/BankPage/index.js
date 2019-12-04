/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import {Helmet} from "react-helmet";
import { toast } from 'react-toastify';

import Wrapper from 'components/Wrapper';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Nav from 'components/Nav';
import Welcome from 'components/Welcome';
import Sidebar from 'components/Sidebar';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import Popup from 'components/Popup';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import UploadArea from 'components/UploadArea';
import UploadedFile from 'components/UploadedFile';
import {API_URL, STATIC_URL} from '../App/constants';

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

export default class BankPage extends Component {
  constructor() {
    super();
    this.state = {
      name : '',
      address1 : '',
      address2 : '',
      mobile : '',
      email : '',
      logo: null,
      contract: null,
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: "Welcome",
      popup: false,
      user_id: token,
      banks : []
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this)

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

  closePopup = () => {
    this.setState({
      popup: false,
      name: '',
      address1: '',
      address2: '',
      email: '',
      mobile: '',
      logo: null,
      contract: null,
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
      .post(API_URL + '/addBank', {
        name: this.state.name,
        address1: this.state.address1,
        address2: this.state.address2,
        email: this.state.email,
        mobile: this.state.mobile,
        logo: this.state.logo,
        contract: this.state.contract,
        token: token,
      })
      .then(res => {
      if(res.status == 200){
        if(res.data.error){
            console.log(res.data.error);
          throw "Mobile number / email id already exist!";
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
    let input = document.getElementById(inp);
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
      .post(API_URL + '/fileUpload?token=' + token, formData, config)
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
      .post(API_URL + '/getBanks', { token: token })
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
      alert('Login to continue');
      this.setState({ redirect: true });
    }
  }

  render() {
    function inputFocus(e) {
      const {target} = e;
    target.parentElement.querySelector("label").classList.add("focused");
    }

    function inputBlur(e) {
      let {target} = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }

    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
    <Wrapper>
      <Helmet>
          <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
        <TopBar>
        <Container>
            <a href="/dashboard">
              <Logo>E-WALLET</Logo>
          </a>
          <Nav active="bank"></Nav>
          <Welcome></Welcome>
          </Container>
        </TopBar>
      <Container verticalMargin>
        <Sidebar marginRight>
          <Card marginBottom="68px" buttonMarginTop="36px" bigPadding>
            <h3>Operational Wallet</h3>
              <h5>Available</h5>
            <div className="cardValue">$0.00</div>
            <button><i className="material-icons">send</i> Send Money</button>
          </Card>
          <Card buttonMarginTop="36px" bigPadding> 
            <h3>Master Wallet</h3>
              <h5>Available</h5>
            <div className="cardValue">$0.00</div>
            <button><i className="material-icons">send</i> Send Money</button>
          </Card>
        </Sidebar>
          <Main>
          <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">
            <div className="iconedInput fl">
                <i className="material-icons">search</i>
              <input type="text" placeholder="Search" />
              </div>
            <Button className="fr" flex onClick={this.showPopup}>
              <i className="material-icons">add</i>
                <span>Add Bank</span>
            </Button>
            </ActionBar>
            <Card bigPadding>
            <div className="cardHeader" >
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
              </div>
                <div className="cardHeaderRight">
                <h3>Bank List</h3>
                  <h5>Your friends and family</h5>
              </div>
            </div>
              <div className="cardBody">
              <Table marginTop="38px">
                  <thead>
                  <tr><th>Bank Name</th><th>Total Branches</th><th>Total Partners</th><th>Total Cashier</th><th>Transaction Count</th></tr>
                </thead>
                <tbody>
                  {
                    this.state.banks && this.state.banks.length > 0 ?
                      ? this.state.banks.map(function(b) {
                        return <tr key={b._id} ><td>{b.name}</td><td className="tac">0</td><td className="tac">0</td><td  className="tac">0</td><td className="tac bold">0 <a href="javascript: ;" className="material-icons absoluteRight primary">more_vert</a></td></tr>
                      })
                      :
                      null
                  }
                        })
                </tbody>
              </Table>
            </div>
            </Card>
        </Main>
        </Container>
      { this.state.popup ? 
        <Popup close={this.closePopup.bind(this)}>
          <h1>Add Bank</h1>
          <form action="" method="post" onSubmit={this.addBank}>
              <FormGroup>
                <label>Name</label>
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
                <label>Address line - 1</label>
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
              <FormGroup>
                <label>Address line - 2</label>
                <TextInput
                  type="text"
                  name="address2"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.address2}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Authorized mobile number</label>
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
              <FormGroup>
                <label>Authorized email id</label>
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

              <FormGroup>
              { this.state.logo ? 
                <UploadedFile><a href={STATIC_URL+ this.state.logo } target="_BLANK">{this.state.logo}</a> <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i></UploadedFile>
                :
                  <UploadArea onClick={() => this.triggerBrowse('logo')}>
                  <input type="file" id="logo" onChange={this.onChange} data-key="logo"/>
                    <i className="material-icons">cloud_upload</i>
                    <label>Upload Logo </label>
                  </UploadArea>
                )}
              </FormGroup>

              <FormGroup>
              { this.state.contract ? 
                <UploadedFile><a href={STATIC_URL+ this.state.contract } target="_BLANK">{this.state.contract}</a> <i className="material-icons" onClick={() => this.removeFile('contract')}>close</i></UploadedFile>
                :
                  <UploadArea onClick={() => this.triggerBrowse('contract')}>
                  <input type="file" id="contract" onChange={this.onChange} data-key="contract"/>
                  <i className="material-icons">cloud_upload</i>
                    <label>Contract </label>
                </UploadArea>
                )}
              </FormGroup>

              <Button filledBtn marginTop="50px">
                <span>Add Bank</span>
              </Button>
          </form>
        </Popup>
        : null }
      </Wrapper>
    );
  }
}
