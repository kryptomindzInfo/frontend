import React, { Component } from "react";
import Logo from './Logo';
import BankNav from './BankNav';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class BankHeader extends Component {
  render() {
      const name = localStorage.getItem("name");
    return (
        <TopBar >
          <Welcome from="bank" />
          <Container>
            <a href="/dashboard">
              <Logo><FormattedMessage {...messages.logo} /></Logo>
            </a>
            <BankNav active="dashboard" />
          </Container>
        </TopBar>
    );
  }
}
 
export default BankHeader;