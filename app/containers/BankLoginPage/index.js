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

import Wrapper from 'components/Wrapper';
import CircularLogo from 'components/CircularLogo';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import BigLeftSection from 'components/BigLeftSection';
import BigRightSection from 'components/BigRightSection';
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
localStorage.removeItem('bankLogged');
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
      [name]: value,
    });
  };

  loginRequest = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/bankLogin`, this.state)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('bankLogged', res.data.token);
          localStorage.setItem('bankName', res.data.name);
          localStorage.setItem('bankUserName', res.data.username);
          if (res.data.initial_setup) {
            this.props.history.push('/bank/dashboard');
          } else {
            this.props.history.push('/bank/setup');
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

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.setState({ loading: false, redirect: true });
    } else {
      console.log('2');
      this.setState({ loading: false });
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

    const { loading, redirect } = this.state;
    if (loading) {
      return <p>sdf</p>;
    }
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>E-WALLET | BANK | HOME</title>
        </Helmet>
        <BigLeftSection>
          <CircularLogo>Bank</CircularLogo>
          <Title>E-WALLET</Title>
          <SubTitle>
            Welcome to the E-wallet
            <br />
            Create your wallet for easy transferring
            <br />
            money to your freinds and family
          </SubTitle>
        </BigLeftSection>
        <BigRightSection>
          <LoginHeader>
            Sign In <p>{this.state.message}</p>
          </LoginHeader>
          <FrontFormTitle>Log in to your account</FrontFormTitle>
          <FrontFormSubTitle>Use your username to log in</FrontFormSubTitle>
          <form action="" method="POST" onSubmit={this.loginRequest}>
            <InputsWrap>
              <FormGroup>
                <label>User Id</label>
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
                <label>Password</label>
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
            <PrimaryBtn>Sign In</PrimaryBtn>
          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <a href="/bank/forgot-password">Forgot Password?</a>
            </Col>
          </Row>
        </BigRightSection>
      </Wrapper>
    );
  }
}
