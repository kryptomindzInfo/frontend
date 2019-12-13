import React, { Component } from "react";
import Logo from './Logo';
import Nav from './Nav';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Header extends Component {
  render() {
      const name = localStorage.getItem("name");
    return (
        <TopBar>
          <Welcome infraNav />
          <Container>
            <a href="/dashboard">
              <Logo><FormattedMessage {...messages.logo} /></Logo>
            </a>
            <Nav active={this.props.active} />
          </Container>
        </TopBar>
    );
  }
}

export default Header;
