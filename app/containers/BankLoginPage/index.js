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
      [name]: value,
    });
  };

  loginRequest = event => {
    event.preventDefault();
    this.setState({
      loginLoading: true,
    }, () => {
      axios
        .post(`${API_URL}/bankLogin`, this.state)
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.token);
            localStorage.setItem('bankLogged', res.data.token);
            localStorage.setItem('bankName', res.data.name);
            localStorage.setItem('bankUserName', res.data.username);
            localStorage.setItem('bankContract', res.data.contract);
            localStorage.setItem('bankLogo', res.data.logo);
            localStorage.setItem('bankId', res.data.id);
            console.log(localStorage.getItem('bankLogged'));
            if (!res.data.initial_setup) {
              window.location.href ='/bank/setup';
            } else if (
              !res.data.status ||
              res.data.status == 0 ||
              res.data.status == ''
            ) {
              window.location.href ='/bank/activate';
            } else {
              window.location.href ='/bank/dashboard';
            }
          } else {
            throw res.data.error;

          }

        })
        .catch(err => {
          this.setState({
            notification: err.response ? err.response.data.error : err.toString(),
            loginLoading: false,
          });
          this.error();
        });
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
