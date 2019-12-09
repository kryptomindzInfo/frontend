/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React from 'react';
import {Helmet} from 'react-helmet';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

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

export default function OTPPage() {

  function inputFocus(e) {
    let target = e.target;
   target.parentElement.querySelector("label").classList.add("focused");
  }
  
  function inputBlur(e) {
    let target = e.target;
    if(target.value == ''){
      target.parentElement.querySelector("label").classList.remove("focused");
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
            <BackBtn href="/forgot-password" className="material-icons">keyboard_backspace</BackBtn> <FormattedMessage {...messages.pagetitle} />
          </LoginHeader>
          <FrontFormTitle>
          <FormattedMessage {...messages.title} /> 0741600000
          </FrontFormTitle>
          <form action="" method="get">
          <InputsWrap>
          <FormGroup>
              <label><FormattedMessage {...messages.pagetitle} /></label>
              <TextInput type="text"  required onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
          </InputsWrap>
          <PrimaryBtn>
          <FormattedMessage {...messages.submit} />
          </PrimaryBtn>
          </form>
        </FrontRightSection>
      </Wrapper>
  );
}
