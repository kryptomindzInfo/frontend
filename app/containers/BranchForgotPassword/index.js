/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
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
import A from 'components/A';
import Loader from 'components/Loader';

import { API_URL, STATIC_URL } from '../App/constants';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export default class BranchForgotPassword extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
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
    this.setState({
      forgotLoading: true
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/branchForgotPassword`, this.state)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('branchPhone', res.data.mobile);
          localStorage.setItem('branchUserName', res.data.username);

          this.props.history.push('/branch/'+this.props.match.params.bank+'/otp');

        } else {
          throw res.data.error;
        }
        this.setState({
          forgotLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          forgotLoading: false
        });
        this.error();
      });
  };
  componentDidMount() {
    axios
      .post(`${API_URL}/getBankByName`, {name: this.props.match.params.bank})
      .then(res => {
        if (res.status == 200) {
          this.setState({ bank: res.data.banks, loading:false });
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.history.push("/");
      });
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
  const bankName = this.props.match.params.bank;
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
        <title>Forgot Password | BANK | E-WALLET</title>
      </Helmet>
      <FrontLeftSection from="branch" title={this.state.bank.name} logo={STATIC_URL+this.state.bank.logo}></FrontLeftSection>
      <FrontRightSection>
        <LoginHeader>
        <A href={"/branch/"+bankName} float="left">
          <BackBtn  className="material-icons">
            keyboard_backspace
          </BackBtn>
          </A>
          <FormattedMessage {...messages.pagetitle} />
        </LoginHeader>
        <FrontFormTitle><FormattedMessage {...messages.title} /></FrontFormTitle>
        <form action="" method="POST" onSubmit={this.forgotRequest}>
          <InputsWrap>
            <FormGroup>
              <label><FormattedMessage {...messages.mobile} />*</label>
              <TextInput
                  type="text"
                 // pattern="[0-9]{10}"
                 title="Mobile"
                  name="mobile"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.mobile}
                  onChange={this.handleInputChange}
                  required
                />
            </FormGroup>
          </InputsWrap>
          {
            this.state.forgotLoading ?
            <PrimaryBtn disabled><Loader /></PrimaryBtn>
            :
            <PrimaryBtn><FormattedMessage {...messages.getotp} /></PrimaryBtn>
          }

        </form>
      </FrontRightSection>
    </Wrapper>
  );
  }
}
