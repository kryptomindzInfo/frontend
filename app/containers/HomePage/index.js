/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Wrapper';
import Loader from 'components/Loader';
import FrontLeftSection from 'components/FrontLeftSection/index';
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
import messages from './messages';
import { postRequest, getRequest } from '../App/ApiCall';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

localStorage.removeItem('logged');
const token = localStorage.getItem('logged');

export default class HomePage extends Component {
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

  loginRequest = async (event) => {
    event.preventDefault();
    this.setState({
      loginLoading: true,
    });
    const res = await postRequest("login", token, this.state)
          if(res.data.data.status === 0 && res.data.data.message === "Incorrect username or password") {
            toast.error(res.data.data.message);
          } else {
            localStorage.setItem('logged', res.data.data.token);
            localStorage.setItem('name', res.data.data.name);
            localStorage.setItem('isAdmin', res.data.data.isAdmin);
            window.location.href = '/dashboard';
          }
        this.setState({
          loginLoading: false,
        });
  };

  async componentDidMount() {
    if (token !== undefined && token !== null) {
      this.setState({ loading: false, redirect: true });
    } else {
      const res = await getRequest("checkInfra",token,{})
      console.log(res);
        if (res.data.infras <= 0) {
          this.props.history.push('/setup');
        }
      this.setState({ loading: false });
    }
  };

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
          <title>E-WALLET | INFRA | SIGNIN</title>
        </Helmet>
        <FrontLeftSection from="infra" />
        <FrontRightSection>
          <LoginHeader>
            <FormattedMessage {...messages.pagetitle} />
          </LoginHeader>
          <FrontFormTitle>
            <FormattedMessage {...messages.title} />
          </FrontFormTitle>
          <FrontFormSubTitle>
            <FormattedMessage {...messages.subtitle} />
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
                  value={this.state.username.trim().toLowerCase()}
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
            {/* {this.loginLoading ? (
              <PrimaryBtn disabled>
                <Loader /> */}
            { this.loginLoading ? (
                <PrimaryBtn disabled>
                  <Loader />
              </PrimaryBtn>
            ) : (
              <PrimaryBtn>
                <FormattedMessage {...messages.pagetitle} />
              </PrimaryBtn>
            )}
                {/* </PrimaryBtn>
             } */}
          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <A href="/forgot-password">
                <FormattedMessage {...messages.forgotpassword} />
              </A>
            </Col>
          </Row>
        </FrontRightSection>
      </Wrapper>
    );
  }
}
