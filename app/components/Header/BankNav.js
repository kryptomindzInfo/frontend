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

class BankNav extends Component {
  render() {
    const dashboard = this.props.active == 'dashboard' ? 'true' : '';
    const branches = this.props.active == 'branches' ? 'true' : '';
    const partners = this.props.active == 'partners' ? 'true' : '';
    const merchants = this.props.active == 'merchants' ? 'true' : '';
    const users = this.props.active == 'users' ? 'true' : '';
    const reports = this.props.active == 'reports' ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <Link href="/bank/dashboard" active={dashboard}>
          <FormattedMessage {...messages.menu1} /> 
          </Link>
          <Link href="/bank/branches" active={branches}>
          <FormattedMessage {...messages.bmenu1} /> 
          </Link>
          <Link href="/bank/partners" active={partners}>
          <FormattedMessage {...messages.bmenu2} /> 
          </Link>
          <Link href="/bank/merchants" active={merchants}>
          <FormattedMessage {...messages.menu3} /> 
          </Link>
          <Link href="/bank/users" active={users}>
          <FormattedMessage {...messages.bmenu3} /> 
          </Link>
          <Link href="/bank/reports" active={reports}>
          <FormattedMessage {...messages.menu4} /> 
          </Link>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default BankNav;
