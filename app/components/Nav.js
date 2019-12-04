import React, { Component } from "react";
import styled from 'styled-components';

const NavTag = styled.nav `
    float: left;
    margin: 8px 27px;
`;

const Link = styled.a `
    color: #fff;
    font-size: 20px;
    margin: 0 12px;
    padding-bottom: 7px;
    font-weight: normal;
    border-bottom: ${props => props.active == 'true' ? '1px solid white' : '0' };
`;

class Nav extends Component {
  render() {
    const dashboard = (this.props.active == 'dashboard')  ? 'true' : '';
    const bank = (this.props.active == 'bank')  ? 'true' : '';
    const merchants = (this.props.active == 'merchants')  ? 'true' : '';
    const reports = (this.props.active == 'reports')  ? 'true' : '';

    return (
      <React.Fragment>
        <NavTag>
          <Link href="/dashboard"  active={dashboard} > Dashboard </Link>
          <Link href="/banks" active={bank}> Bank </Link>
          <Link href="/merchants" active={merchants}> Merchants </Link>
          <Link href="/reports" active={reports}> Reports </Link>
        </NavTag>
      </React.Fragment>
    );
  }
}
 
export default Nav;