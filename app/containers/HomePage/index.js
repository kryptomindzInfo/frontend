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
import CloseIcon from '@material-ui/icons/Visibility';
import OpenIcon from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';


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
      passwordtype: "password",
      visiblity: false
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
    if (res.data.data.status === 0 && res.data.data.message === "Incorrect username or password") {
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
      const res = await getRequest("checkInfra", token, {})
      console.log(res);
      if (res.data.data.infras <= 0) {
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

    console.log(this.state.passwordtype)
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
                <div style={{ backgroundColor: "" }}>
                  <TextField
                    name="password"
                    label="Password"
                    style={{ width: "100%" }}
                    value={this.state.password}
                    type={this.state.visiblity ? 'text' : 'password'}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    required
                  />
                  <span
                    onClick={() => {
                      this.setState({ visiblity: !this.state.visiblity })
                    }}

                    style={{
                      position: 'relative',
                      top: '-40px',
                      left: "90%",

                    }}
                  >
                    <i>
                      {/* < CloseIcon /> */}
                      {this.state.visiblity ? (
                        < CloseIcon />
                      ) : (
                          <OpenIcon />
                        )}
                    </i>
                  </span>
                </div>
              </FormGroup>
              {/* <FormGroup>

                <label>
                  <FormattedMessage {...messages.password} />*
                </label>
                <div>

                  <TextInput
                    type={this.state.passwordtype}
                    name="password"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required

                  />

                </div>

                <div style={{ marginTop: "", position: "" }}>
                  {this.state.passwordtype == "password" ? (
                    <div style={{ marginLeft: "90%", marginTop: "", fontSize: "" }}>
                      <span onClick={() => {
                        console.log("click")
                        this.setState({ passwordtype: "text" })
                      }}>
                      
                        <strong>Show</strong>

                      </span>
                    </div>
                  ) : (
                      <div style={{ marginLeft: "90%", marginTop: "", fontSize: "" }}>
                        <span onClick={() => {
                          console.log("click")
                          this.setState({ passwordtype: "password" })
                        }}>
                      
                          <strong>Hide</strong>
                        </span>
                      </div>
                    )}
                </div>

              </FormGroup> */}
            </InputsWrap>
            {/* {this.loginLoading ? (
              <PrimaryBtn disabled>
                <Loader /> */}
            {this.loginLoading ? (
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
      </Wrapper >
    );
  }
}
