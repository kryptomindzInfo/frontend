/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React from 'react';

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
import BackBtn from 'components/BackBtn';
import CheckBox from 'components/CheckBox';
import A from 'components/A';

export default function SignupPage() {

  function inputFocus(e) {
    let target = e.target;
    target.parentElement.querySelector("label").classList.add("focused");
  }

  function inputBlur(e) {
    let target = e.target;
    if (target.value == '') {
      target.parentElement.querySelector("label").classList.remove("focused");
    }
  }


  return (
    <Wrapper>
      <FrontLeftSection from="user">
      </FrontLeftSection>
      <FrontRightSection>
        <LoginHeader>
          <A href="/" float="left">
            <BackBtn className="material-icons">keyboard_backspace</BackBtn> Sign Up
            </A>
        </LoginHeader>
        <FrontFormTitle>
          Create new account
          </FrontFormTitle>
        <FrontFormSubTitle>
          Use your Mobile number to create new account... it's free.
          </FrontFormSubTitle>
        <form action="" method="get">
          <InputsWrap>
            <FormGroup>
              <label>Name*</label>
              <TextInput type="text" required onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
            <FormGroup>
              <label>Mobile Number*</label>
              <TextInput type="text" required onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
            <FormGroup>
              <label>Email Address <span>(Optional)</span>*</label>
              <TextInput type="text" onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
            <FormGroup>
              <label>Address*</label>
              <TextInput type="text" required onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
            <FormGroup>
              <label>Password*</label>
              <TextInput type="pasword" required onFocus={inputFocus} onBlur={inputBlur}></TextInput>
            </FormGroup>
            <FormGroup>
              <CheckBox><input type="checkbox" required /> I have read the <a>Terms and Conditions</a></CheckBox>
            </FormGroup>
          </InputsWrap>
          <PrimaryBtn>
            Sign Up
          </PrimaryBtn>
        </form>
        <Row marginTop>
          <Col>
            <A href="/"><span>Have an account? </span> Sign In</A>
          </Col>
          <Col textRight>
            <A href="/forgot-password" >Forgot Password?</A>
          </Col>
        </Row>
      </FrontRightSection>
    </Wrapper>
  );
}
