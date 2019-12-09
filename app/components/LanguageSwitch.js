import React, { Component } from "react";
import styled from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';

const LanguageWrap = styled.div`
    float:right;
    margin-left: 10px;
    padding: 3px 0;
    > select{
        background: transparent;
        color: #f5a623;
        font-weight: bold;
        padding: 0 !important;
        line-height: 18px;
        font-size: 18px;
        border: 0;
        float:left;
    }
    >select option{
        background: #1e3d1d;
    }
    }
`;

const Icon = styled.i `
    float: left;
    color: #f5a623;
    font-size: 24px;
`;

class LanguageSwitch extends Component {
  render() {
    return (
        <LanguageWrap className="clr" href="#">
            <LocaleToggle />
            <Icon className="material-icons fl">g_translate</Icon>
        </LanguageWrap>
        
    );
  }
}
 
export default LanguageSwitch;