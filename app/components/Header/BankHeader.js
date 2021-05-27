import React, { Component } from 'react';
// import Logo from './Logo';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';
import A from 'components/A';
import Logo from 'components/Header/Logo';
import axios from 'axios';
import styled from 'styled-components';

import {
  API_URL,
  STATIC_URL,
  CONTRACT_URL,
} from '../../../app/containers/App/constants';

import { FormattedMessage } from 'react-intl';
import BankNav from './BankNav';
import messages from './messages';

const Link = styled.span`
  color: #fff;
  font-size: 18px;
  margin: 0 40px 0 0;
  padding-bottom: 7px;
  display: block;
  font-weight: normal;
  border-radius: 8px;
  border: solid 2px #ffffff;
  padding: 5px 20px;
`;

const token = localStorage.getItem('bankLogged');
const name = localStorage.getItem('bankName');
const logo = localStorage.getItem('bankLogo');

let permissions = localStorage.getItem('permissions');
if (permissions != 'all' && permissions != '') {
  permissions = JSON.parse(permissions);
}

class BankHeader extends Component {
  constructor() {
    super();
    this.state = {
      logo,
      name,
      token
    };
  }

  componentDidMount() {}

  render() {
    const name = localStorage.getItem('name');
    const {page} = this.props;
    return (
      <TopBar>
        {/* <Welcome from={toUpperCase(`${'bank'}`)} /> */}
        <Welcome from="bank" />
        {/* <Container> */}
          {page == 'branch' ? (
              <A href={this.props.goto} float="left">
                <Link>
              Back
                </Link>
            </A>)
              :
              null
          }

          <A href="/bank/dashboard" float="left" style={{marginleft:"20px"}}>
            <div className="bankLogo">
              <img
                src={STATIC_URL + this.state.logo}
                alt="Bank Logo"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h2>{this.state.name.toUpperCase()}</h2>
          </A>
          {this.props.middleTitle ? (
            <div className="middleTitle">{this.props.middleTitle}</div>
          ) : null}
          {page == 'branch' ? null : <BankNav active={this.props.active} />}
        {/* </Container> */}
      </TopBar>
    );
  }
}

export default BankHeader;
