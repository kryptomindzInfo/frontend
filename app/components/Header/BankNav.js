import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import A from 'components/A';

const NavTag = styled.nav`
  float: left;
  margin: 8px 27px;
`;

const Link = styled.span`
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
          <A href="/bank/dashboard" >
          <Link active={dashboard}>
          <FormattedMessage {...messages.menu1} /> 
          </Link>
          </A>
          <A href="/bank/branches">
          <Link  active={branches}>
          <FormattedMessage {...messages.bmenu1} /> 
          </Link>
          </A>
          <A href="/bank/partners" >
          <Link active={partners}>
          <FormattedMessage {...messages.bmenu2} /> 
          </Link>
          </A>
          <A href="/bank/merchants" >
          <Link active={merchants}>
          <FormattedMessage {...messages.menu3} /> 
          </Link>
          </A>
          <A href="/bank/users" >
          <Link active={users}>
          <FormattedMessage {...messages.bmenu3} /> 
          </Link>
          </A>
          <A href="/bank/reports" >
          <Link active={reports}>
          <FormattedMessage {...messages.menu4} /> 
          </Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default BankNav;
