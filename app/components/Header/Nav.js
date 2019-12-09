import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const NavTag = styled.nav`
  float: left;
  margin: 8px 27px;
`;

const Link = styled.a`
  color: #fff;
  font-size: 18px;
  margin: 0 12px;
  padding-bottom: 7px;
  font-weight: normal;
  border-bottom: ${props => (props.active == 'true' ? '1px solid white' : '0')};
`;

class Nav extends Component {
  render() {
    const dashboard = this.props.active == 'dashboard' ? 'true' : '';
    const bank = this.props.active == 'bank' ? 'true' : '';
    const merchants = this.props.active == 'merchants' ? 'true' : '';
    const reports = this.props.active == 'reports' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <Link href="/dashboard" active={dashboard}>
          <FormattedMessage {...messages.menu1} /> 
          </Link>
          <Link href="/banks" active={bank}>
          <FormattedMessage {...messages.menu2} /> 
          </Link>
          <Link href="/merchants" active={merchants}>
          <FormattedMessage {...messages.menu3} /> 
          </Link>
          <Link href="/reports" active={reports}>
          <FormattedMessage {...messages.menu4} /> 
          </Link>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default Nav;
