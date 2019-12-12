import React, { Component } from "react";
import styled from 'styled-components';
import LanguageSwitch from 'components/LanguageSwitch';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import SubNav from './SubNav';

const WelcomeWrap = styled.div `
    float: right;
    margin: 7px 0;
    display: block;
    color: #fff;
    font-size: 18px;
    font-weight: normal;
    line-height: 26px;
    .infraSubNav{
      display: ${props => props.from == 'infra' ? 'block' : 'none'};
    }
    .bankSubNav{
      display: ${props => props.from == 'bank' ? 'block' : 'none'};
    }
`;

const Name = styled.div `
    float: left;
    margin-left:10px;
    margin-right: 50px;
`;

const Icon = styled.i `
    float: left;
    margin-left:10px;
`;

class Welcome extends Component {


  logoutInfra = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  logoutBank = () => {
    localStorage.removeItem('bankLogged');
    localStorage.removeItem('bankName');
    window.location.href = '/bank';
  };

  render() {
    let name = '';
      if( this.props.from == 'bank'){
        name = localStorage.getItem("bankName");
      }else{
        name = localStorage.getItem("name");
      }


    return (

        <WelcomeWrap className="clr" href="#">
            <div className="dropdown fl">
              <Icon className="material-icons fl">
                  settings
              </Icon>
              <Name>
                  <FormattedMessage {...messages.welcome} /> {name}
              </Name>

                <SubNav className="infraSubNav">
                    <a onClick={this.logoutInfra}>Logout</a>
                </SubNav>

                <SubNav className="bankSubNav">
                    <a href="/bank/info">Settings</a>
                    <a onClick={this.logoutBank}>Logout</a>
                </SubNav>

              </div>
            <LanguageSwitch></LanguageSwitch>
        </WelcomeWrap>
    );
  }
}

export default Welcome;
