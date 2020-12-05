/*
 * BankLoginPage
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
import messages from '../HomePage/messages';

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
import A from 'components/A';
import Loader from 'components/Loader';
import { postRequest, getRequest } from '../App/ApiCall';


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
const token = localStorage.getItem('bankLogged');
export default class BankLoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      notification: '',
      loading: true,
      redirect: false,
    };
    this.error = this.error.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value.trim(),
    });
  };

  loginRequest = async(event) => {
    event.preventDefault();
    this.setState({
      loginLoading: true,
    }, async() => {
      const res = await postRequest("bankLogin", token, this.state)
      if(res.data.data.status === 0) {
        toast.error(res.data.data.message);
      } else {
            localStorage.setItem('bankLogged', res.data.data.token);
            localStorage.setItem('bankName', res.data.data.name);
            localStorage.setItem('bankUserName', res.data.data.username);
            localStorage.setItem('bankContract', res.data.data.contract);
            localStorage.setItem('bankLogo', res.data.data.logo);
            localStorage.setItem('bankId', res.data.data.id);
            localStorage.setItem('bankPhone', res.data.data.mobile);
            console.log(localStorage.getItem('bankLogged'));
            console.log(res);
            if(res.data.data.status == 0 && res.data.data.message === "Incorrect username or password") {
              throw res.data.data.message;
            }
            else if (!res.data.data.initial_setup) {
              window.location.href ='/bank/setup';
            }
            else if (
              !res.data.data.status ||
              res.data.data.status == 0 ||
              res.data.data.status == ''
            ) {
              window.location.href ='/bank/activate';
            } else {
              window.location.href ='/bank/dashboard';
            }

        }
    });

  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      return <Redirect to="/dashboard" />;
    }
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>E-WALLET | BANK | SIGNUP</title>
        </Helmet>
        <FrontLeftSection from="bank" />
        <FrontRightSection>
          <LoginHeader>
            <FormattedMessage {...messages.pagetitle} />
          </LoginHeader>
          <FrontFormTitle>
            <FormattedMessage {...messages.title} />
          </FrontFormTitle>
          <FrontFormSubTitle>
            <FormattedMessage {...messages.subtitle2} />
          </FrontFormSubTitle>
          <form action="" method="POST" onSubmit={this.loginRequest}>
            <InputsWrap>
              <FormGroup>
                <label>
                  <FormattedMessage {...messages.userid} />*
                </label>
                <TextInput
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
                <label>
                  <FormattedMessage {...messages.password} />*
                </label>
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
            </InputsWrap>
            {this.loginLoading ? (
              <PrimaryBtn disabled>
                <Loader />
              </PrimaryBtn>
            ) : (
              <PrimaryBtn>
                <FormattedMessage {...messages.pagetitle} />
              </PrimaryBtn>
            )}
          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <A href="/bank/forgot-password">
                <FormattedMessage {...messages.forgotpassword} />
              </A>
            </Col>
          </Row>
        </FrontRightSection>
      </Wrapper>
    );
  }
}
