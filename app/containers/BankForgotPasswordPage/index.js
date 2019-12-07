/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import Wrapper from 'components/Wrapper';
import CircularLogo from 'components/CircularLogo';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import BigLeftSection from 'components/BigLeftSection';
import BigRightSection from 'components/BigRightSection';
import LoginHeader from 'components/LoginHeader';
import FrontFormTitle from 'components/FrontFormTitle';
import InputsWrap from 'components/InputsWrap';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import PrimaryBtn from 'components/PrimaryBtn';
import BackBtn from 'components/BackBtn';

export default function BankForgotPasswordPage() {
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
          <BackBtn href="/bank" className="material-icons">
            keyboard_backspace
          </BackBtn>{' '}
          Forgot Password
        </LoginHeader>
        <FrontFormTitle>Enter your mobile number</FrontFormTitle>
        <form action="/bank/otp" method="get">
          <InputsWrap>
            <FormGroup>
              <label>Mobile Number</label>
              <TextInput
                type="text"
                required
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </FormGroup>
          </InputsWrap>
          <PrimaryBtn>Get OTP</PrimaryBtn>
        </form>
      </BigRightSection>
    </Wrapper>
  );
}
