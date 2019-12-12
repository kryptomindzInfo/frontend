/*
 * SetupPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from 'components/Wrapper';
import FrontLeftSection from 'components/FrontLeftSection';
import FrontRightSection from 'components/FrontRightSection';
import LoginHeader from 'components/LoginHeader';
import FrontFormTitle from 'components/FrontFormTitle';
import FrontFormSubTitle from 'components/FrontFormSubTitle';
import InputsWrap from 'components/InputsWrap';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import PrimaryBtn from 'components/PrimaryBtn';
import Row from 'components/Row';
import Col from 'components/Col';
import { API_URL } from '../App/constants';

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
const username = localStorage.getItem('name');
export default class SetupPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirm: '',
      email: '',
      mobile: '',
      notification: '',
      loading: true,
      redirect: false,
      token: token
    };
    this.error = this.error.bind(this);
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

  setupUpdate = event => {
    event.preventDefault();
    if(this.state.password != this.state.confirm){
      this.setState({
        notification: 'Passwords do not match'
      }, () => {
        this.error();
    });
      
    }else{
    axios
      .post(`${API_URL}/setupUpdate`, this.state )
      .then(res => {
        if (res.status == 200) {
            localStorage.removeItem('logged');
            localStorage.removeItem('name');
            this.setState({
              notification: 'Details updated, you will be redirected to the login screen'
            }, () => {
              this.success();
              let history = this.props.history;
              setTimeout(function(){
                history.push('/');
              }, 3000);
          });
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        }, () => {
          this.error();
      });
      });
    }
  };

  componentDidMount() {
    // if (token !== undefined && token !== null) {
    //   this.setState({ loading: false, redirect: true });
    // } else {
    this.setState({ loading: false });
    // }
    //document.getElementById('username').focus();
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
    }
    if (redirect) {
      return <Redirect to="/bank/dashboard" />;
    }
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>E-WALLET | BANK | HOME</title>
        </Helmet>
        <FrontLeftSection from="infra">
        </FrontLeftSection>
        <FrontRightSection>
          <LoginHeader>
          {/* <FormattedMessage {...messages.pagetitle} /> */}
          </LoginHeader>
          <FrontFormTitle>Setup your account</FrontFormTitle>
          <FrontFormSubTitle>Please fil the below information to begin witht th ewallet system</FrontFormSubTitle>
          <form action="" method="POST" onSubmit={this.setupUpdate}>
            <InputsWrap>
              <FormGroup>
                <label><FormattedMessage {...messages.userid} /></label>
                <TextInput
                  id="username"
                  type="text"
                  name="username"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label><FormattedMessage {...messages.newpass} /></label>
                <TextInput
                  type="password"
                  name="password"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label><FormattedMessage {...messages.confirm} /></label>
                <TextInput
                  type="password"
                  name="confirm"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.confirm}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Authorized Email ID</label>
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
                <label>Authorized Phone Number</label>
                <TextInput
                  type="number"
                  name="mobile"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.mobile}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              
            </InputsWrap>
            <PrimaryBtn><FormattedMessage {...messages.update} /></PrimaryBtn>
          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <a href="/bank/forgot-password"><FormattedMessage {...messages.forgotpassword} /></a>
            </Col>
          </Row>
        </FrontRightSection>
      </Wrapper>
    );
  }
}
