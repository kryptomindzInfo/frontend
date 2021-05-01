import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import messages from './messages';

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

class Nav extends Component {
  render() {
    const dashboard = this.props.active == 'dashboard' ? 'true' : '';
    const bank = this.props.active == 'bank' ? 'true' : '';
    const user = this.props.active == 'user' ? 'true' : '';
    const merchants = this.props.active == 'merchants' ? 'true' : '';
    const reports = this.props.active == 'reports' ? 'true' : '';
    const name = localStorage.getItem('name');
    const isAdmin = localStorage.getItem('isAdmin');

    return (
      <React.Fragment>
        <NavTag>
          <A href="/dashboard">
            <Link active={dashboard}>
              Global Dash
            </Link>
          </A>
         
          <A href="/banks">
            <Link active={bank}>
              Bank Dash
              {/* <FormattedMessage {...messages.menu2} />  */}
            </Link>
          </A>
          <A href="/merchantlist">
            <Link active={merchants}>
              Infra Merchant Dash
              {/* <FormattedMessage {...messages.menu3} /> */}
            </Link>
          </A>
          {isAdmin != 'false' ? (
            <A href="/user">
              <Link active={user}>Infra User</Link>
            </A>
          ) : null}
          <A href="/reports">
            <Link active={reports}>
              <FormattedMessage {...messages.menu4} />
            </Link>
          </A>
        </NavTag>
      </React.Fragment>
    );
  }
}

export default Nav;
