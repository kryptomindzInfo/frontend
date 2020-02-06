import React, { Component } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';
import A from 'components/A';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Header extends Component {
  render() {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate() +
      ' ' +
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    const currDate = '' + date;
    const name = localStorage.getItem('name');
    return (
      <TopBar>
        <Welcome infraNav />
        <Container>
          <A href="/dashboard" float="left">
            <Logo>
              <FormattedMessage {...messages.logo} />
            </Logo>
          </A>
          <Nav active={this.props.active} />
          {/* <span>{currDate}</span> */}
        </Container>
      </TopBar>
    );
  }
}

export default Header;
