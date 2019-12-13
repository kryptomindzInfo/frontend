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
import messages from '../ForgotPasswordPage/messages';

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

export default class ForgotPasswordPage extends Component {

  constructor() {
    super();
    this.state = {
      mobile: '',
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

  forgotRequest = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/forgotPassword`, this.state)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('phone', res.data.mobile);
          localStorage.setItem('username', res.data.username);
          
            this.props.history.push('/otp');
          
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
        <title>Forgot Password | BANK | E-WALLET</title>
      </Helmet>
      <FrontLeftSection from="infra">
      </FrontLeftSection>
      <FrontRightSection>
        <LoginHeader>
          <BackBtn href="/" className="material-icons">
            keyboard_backspace
          </BackBtn>
          <FormattedMessage {...messages.pagetitle} />
        </LoginHeader>
        <FrontFormTitle><FormattedMessage {...messages.title} /></FrontFormTitle>
        <form action="" method="POST" onSubmit={this.forgotRequest}>
          <InputsWrap>
            <FormGroup>
              <label><FormattedMessage {...messages.mobile} /></label>
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
          </InputsWrap>
          <PrimaryBtn><FormattedMessage {...messages.getotp} /></PrimaryBtn>
        </form>
      </FrontRightSection>
    </Wrapper>
  );
  }
}
