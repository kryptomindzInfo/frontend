import React, { Component } from "react";
import styled from 'styled-components';
import LanguageSwitch from 'components/LanguageSwitch';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SubNav from './SubNav';
import A from 'components/A';
import history from 'utils/history';


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
    history.push('/');
    //this.props.history.push('/');
  };

  logoutBank = () => {
    localStorage.removeItem('bankLogged');
    localStorage.removeItem('bankName');
    history.push('/bank');
    //this.props.history.push('/bank');
  };

  logoutBranch = () => {
    localStorage.removeItem('branchLogged');
    localStorage.removeItem('branchName');
    history.push('/branch/'+this.props.bankName);
    //this.props.history.push('/bank');
  };

  render() {
    let name = '';
    let isAdmin = false;
      if( this.props.from == 'bank'){
        name = localStorage.getItem("bankName");
      }
      else if( this.props.from == 'branch'){
        name = localStorage.getItem("branchName");
      }
      else{
        isAdmin = localStorage.getItem("isAdmin");
        name = localStorage.getItem("name");
      }

      const bankName = this.props.bankName;
    return (

        <WelcomeWrap className="clr" >
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
                    {/* { isAdmin ?  */}
                    <A href="/profile">Profile</A>
                    {/* //  : null } */}
                    <span onClick={this.logoutInfra} >Logout</span>
                </SubNav>
                :
                this.props.from == 'branch'?
                <SubNav className="infraSubNav">
                    {/* { isAdmin ?  */}
                    <A href={"/branch/"+bankName+"/info"}>Profile</A>
                    {/* //  : null } */}
                    <span onClick={this.logoutBranch} >Logout</span>
                </SubNav>
                :
                <SubNav className="bankSubNav">
                    <A href="/bank/info">Settings</A>
                    <span onClick={this.logoutBank} >Logout</span>
                </SubNav>
              }


              </div>
            <LanguageSwitch></LanguageSwitch>
        </WelcomeWrap>
    );
  }
}

export default Welcome;
