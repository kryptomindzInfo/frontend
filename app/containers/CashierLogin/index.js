/*
 * CashierLogin
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
import history from 'utils/history';

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



export default class CashierLogin extends Component {
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

  loginRequest = event => {
    this.setState({
      loginLoading: true
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/cashierLogin`, this.state)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          if(res.data.status == 0){
            throw res.data.message;
          }
          else{
            localStorage.setItem('cashierLogged', res.data.token);
            localStorage.setItem('cashierName', res.data.name);
            localStorage.setItem('cashierUserName', res.data.username);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('cashierId', res.data.cashier_id);
            localStorage.setItem('bankLogo', this.state.bank.logo);
            localStorage.setItem('cashierEmail', res.data.email);
            localStorage.setItem('cashierBranch', res.data.branch_id);
            localStorage.setItem('cashierMobile', res.data.mobile);
            localStorage.setItem('bankId', res.data.bank_id);
            window.location.href = '/cashier/'+this.props.match.params.bank+'/dashboard';
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          loginLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          loginLoading: false
        });
        this.error();
      });
  };

  componentDidMount() {
    axios
      .post(`${API_URL}/getBranchByName`, {name: this.props.match.params.bank})
      .then(res => {
        if (res.status == 200) {

          this.setState({ bank: res.data.banks, loading:false });
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        history.push("/");
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
          <title>E-WALLET | CASHIER | LOGIN</title>
        </Helmet>
        <FrontLeftSection from="cashier" title={this.state.bank.name} logo={STATIC_URL+this.state.bank.logo}></FrontLeftSection>
        <FrontRightSection>
          <LoginHeader>
          <FormattedMessage {...messages.pagetitle} />
          </LoginHeader>
          <FrontFormTitle><FormattedMessage {...messages.title} /></FrontFormTitle>
          <FrontFormSubTitle><FormattedMessage {...messages.subtitle2} /></FrontFormSubTitle>
          <form action="" method="POST" onSubmit={this.loginRequest}>
            <InputsWrap>
              <FormGroup>
                <label><FormattedMessage {...messages.userid} />*</label>
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
                <label><FormattedMessage {...messages.password} />*</label>
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
            {
              this.loginLoading ?
              <PrimaryBtn disabled><Loader /></PrimaryBtn>
              :
              <PrimaryBtn><FormattedMessage {...messages.pagetitle} /></PrimaryBtn>
            }

          </form>
          <Row marginTop>
            <Col />
            <Col textRight>
              <A href={"/cashier/"+this.props.match.params.bank+"/forgot-password"}><FormattedMessage {...messages.forgotpassword} /></A>
            </Col>
          </Row>
        </FrontRightSection>
      </Wrapper>
    );
  }
}
