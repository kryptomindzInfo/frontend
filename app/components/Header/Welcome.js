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
    let isAdmin = false;
      if( this.props.from == 'bank'){
        name = localStorage.getItem("bankName");
      }else{
        isAdmin = localStorage.getItem("isAdmin");
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
              {
                this.props.infraNav ?
                <SubNav className="infraSubNav">
                    { isAdmin ? <a href="/profile">Profile</a> : null }
                    <a onClick={this.logoutInfra} href="#">Logout</a>
                </SubNav>
                :
                <SubNav className="bankSubNav">
                    <a href="/bank/info">Settings</a>
                    <a onClick={this.logoutBank} href="#">Logout</a>
                </SubNav>
              }
                

              </div>
            <LanguageSwitch></LanguageSwitch>
        </WelcomeWrap>
    );
  }
}

export default Welcome;
