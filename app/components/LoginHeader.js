import React, { Component } from "react";
import styled from 'styled-components';
import LanguageSwitch from "./LanguageSwitch";

const LoginHeaderWrap =  styled.header `
background:white;
color: ${props => props.theme.primary};
font-size: 28px;
font-weight:bold;
`;

class LoginHeader extends Component {
  render() {
    return (
        <LoginHeaderWrap >
          <LanguageSwitch className="fr"></LanguageSwitch>
            {this.props.children}
        </LoginHeaderWrap>
    );
  }
}
 
export default LoginHeader;