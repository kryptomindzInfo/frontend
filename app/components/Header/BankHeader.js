import React, { Component } from "react";
import Logo from './Logo';
import BankNav from './BankNav';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';
import A from 'components/A';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class BankHeader extends Component {
  render() {
      const name = localStorage.getItem("name");
    return (
        <TopBar >
          <Welcome from="bank" />
          <Container>
            <A href="/dashboard" float="left">
              <Logo><FormattedMessage {...messages.logo} /></Logo>
            </A>
            <BankNav active={this.props.active} />
          </Container>
        </TopBar>
    );
  }
}
 
export default BankHeader;