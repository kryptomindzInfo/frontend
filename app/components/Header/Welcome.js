import React, { Component } from "react";
import styled from 'styled-components';
import LanguageSwitch from 'components/LanguageSwitch';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import SubNav from './SubNav';

const WelcomeWrap = styled.a `
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


  logout = () => {
    // event.preventDefault();
    // axios.post(API_URL+'/logout', {token: token})
    // .then(res => {
    //    if(res.status == 200){
    localStorage.removeItem('bankLogged');
    localStorage.removeItem('bankName');
    window.location.href = '/bank';
    //     }else{
    //       const error = new Error(res.data.error);
    //       throw error;
    //     }
    // })
    // .catch(err => {
    //   alert('Login to continue');
    //   this.setState({ redirect: true });
    // });
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
              <SubNav>
                  <a href="/bank/info">Settings</a>
                  <a onClick={this.logout}>Logout</a>
              </SubNav>
              </div>
            <LanguageSwitch></LanguageSwitch>
        </WelcomeWrap>
    );
  }
}
 
export default Welcome;