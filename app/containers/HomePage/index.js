/*
 * HomePage
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

  loginRequest = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/login`, this.state)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('logged', res.data.token);
          localStorage.setItem('name', res.data.name);
          
            localStorage.setItem('permissions', res.data.permissions);
                    
          
            this.props.history.push('/dashboard');
            
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
      axios
      .get(`${API_URL}/checkInfra`, {})
      .then(res => {
        if (res.status == 200) {
          
          if(res.data.infras <= 0){
            console.log(res.data.infras);
            this.props.history.push('/setup');
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
          <title>E-WALLET | INFRA | HOME</title>
        </Helmet>
        <FrontLeftSection from="infra">
        </FrontLeftSection>
        <FrontRightSection>
          <LoginHeader>
            <FormattedMessage {...messages.pagetitle} />
          </LoginHeader>
          <FrontFormTitle><FormattedMessage {...messages.title} /></FrontFormTitle>
          <FrontFormSubTitle><FormattedMessage {...messages.subtitle} /></FrontFormSubTitle>
          <form action="" method="POST" onSubmit={this.loginRequest}>
            <InputsWrap>
              <FormGroup>
                <label><FormattedMessage {...messages.userid} /></label>
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
                <label><FormattedMessage {...messages.password} /></label>
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
            <PrimaryBtn>
              <FormattedMessage {...messages.pagetitle} />
            </PrimaryBtn>
          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <a href="/forgot-password"><FormattedMessage {...messages.forgotpassword} /></a>
            </Col>
          </Row>
        </FrontRightSection>
      </Wrapper>
    );
  }
}
