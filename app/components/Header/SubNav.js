import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const NavTag = styled.div`
  position: absolute;
  top: 35px;
  z-index: 99;
  width: 151px;
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  left: 15px;
  display: none;

  .anchor,
  span {
    color: #000;
    font-size: 18px;
    cursor: pointer;
    padding: 8px 0;
    display: block;
    font-weight: normal;
    text-align: center;
    border-bottom: solid 0.5px rgba(155, 155, 155, 0.7);
    :hover {
      background-color: #b8b8b8;
      border-radius: 4px;
    }
  }
`;

class SubNav extends Component {
  render() {
    const dashboard = this.props.active == 'dashboard' ? 'true' : '';
    const bank = this.props.active == 'bank' ? 'true' : '';
    const merchants = this.props.active == 'merchants' ? 'true' : '';
    const reports = this.props.active == 'reports' ? 'true' : '';

    return <NavTag className="subNav">{this.props.children}</NavTag>;
  }
}

export default SubNav;
