import React, { Component } from "react";
import styled from 'styled-components';

const WelcomeWrap = styled.a `
    float: right;
    margin: 7px 0;
    display: block;
    color: #fff;
    font-size: 20px;
    font-weight: normal;
    line-height: 26px;
`;

const Name = styled.div `
    float: left;
    margin-left:10px;
`;

const Icon = styled.i `
    float: left;
    margin-left:10px;
`;

class Welcome extends Component {
  render() {
      const name = localStorage.getItem("name");
    return (
        <WelcomeWrap className="clr" href="#">
            <Icon className="material-icons fl">settings</Icon>
            <Name>Welcome {name}</Name>
        </WelcomeWrap>
    );
  }
}
 
export default Welcome;