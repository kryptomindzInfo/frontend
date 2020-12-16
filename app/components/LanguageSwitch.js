import React, { Component } from 'react';
import styled from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';

const LanguageWrap = styled.div`
    float:right;
    margin-left: 10px;
    padding: 3px 0;
    > select{
        background: transparent;
        color: ${props => props.theme.accent};
        font-weight: bold;
        padding-top: 0 !important;
        padding-left: 0 !important;
        padding-bottom: 0 !important;
        padding-right: 10px;
        line-height: 18px;
        font-size: 18px;
        border: 0;
        float:left;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        margin: 3px 0;
        outline:0;
        width: 2.5rem;
    }
    >select option{
        background: #1e3d1d;
    }
    }
`;

const Icon = styled.i`
  float: left;
  color: ${props => props.theme.accent};
  font-size: 24px;
`;

class LanguageSwitch extends Component {
  render() {
    return (
      <LanguageWrap className="clr">
        <LocaleToggle />
        <Icon className="material-icons fl" onClick={() => {
          // console.log("click")
          window.open("https://translate.google.co.in/?sl=auto&tl=en&op=translate")
        }}>g_translate</Icon>
      </LanguageWrap>
    );
  }
}

export default LanguageSwitch;
