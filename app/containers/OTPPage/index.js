/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';

import { FormattedMessage } from 'react-intl';
import messages from '../OTPPage/messages';

import Wrapper from 'components/Wrapper';
import FrontLeftSection from 'components/FrontLeftSection';
import FrontRightSection from 'components/FrontRightSection';
import LoginHeader from 'components/LoginHeader';
import FrontFormTitle from 'components/FrontFormTitle';
import InputsWrap from 'components/InputsWrap';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import PrimaryBtn from 'components/PrimaryBtn';
import BackBtn from 'components/BackBtn';


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

const mobile =  localStorage.getItem('bankPhone');

export default class TPPage extends Component {

  constructor() {
    super();
    this.state = {
      mobile: mobile,
      otp : '',
      notification: ''
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

  otpVerify = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/infraVrifyOTP`, this.state)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('logged', res.data.token);
          
          this.setState({
            notification: 'OTP Verified!'
          }, () => {
            this.success();
            let history = this.props.history;
            setTimeout(function(){
              history.push('/forgot-setup');
            }, 1000);
        });
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
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify OTP | INFRA | E-WALLET</title>
      </Helmet>
      <FrontLeftSection from="infra">
        
      </FrontLeftSection>
      <FrontRightSection>
        <LoginHeader>
          <BackBtn href="/forgot-password" className="material-icons">
            keyboard_backspace
          </BackBtn>
          <FormattedMessage {...messages.pagetitle} />
        </LoginHeader>
        <FrontFormTitle><FormattedMessage {...messages.title} /> {this.state.mobile}</FrontFormTitle>
        <form action="" method="POST" onSubmit={this.otpVerify}>
          <InputsWrap>
            <FormGroup>
              <label><FormattedMessage {...messages.pagetitle} /></label>
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
          </InputsWrap>
          <PrimaryBtn><FormattedMessage {...messages.submit} /></PrimaryBtn>
        </form>
      </FrontRightSection>
    </Wrapper>
  );
}
}
