import React, { Component } from 'react';
import styled from 'styled-components';
import A from 'components/A';
import OperationalWallet from './OperationalWallet';
import MasterWallet from './MasterWallet';
import Card from '../Card';

const Sidebar = styled.aside`
  width: 260px;
  float: left;
  margin-right: ${props => (props.marginRight ? '33px' : '0')};
  .anchor {
    display: block;
  }
`;

const H3 = styled.h3`
  font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

class SidebarTwo extends Component {
  render() {
    const info = this.props.active == 'info';
    const documents = this.props.active == 'documents';
    const fees = this.props.active == 'fees';
    const merchant = this.props.active == 'merchant';

    return (
      <Sidebar marginRight>
        <H3>SETTINGS</H3>
        <A href={`/info/${this.props.bankId}`}>
          <Card rounded selected={info} className="sideNav">
            <i className="material-icons">person_add</i>
            <h3>Bank Info</h3>
          </Card>
        </A>
        <A href={`/documents/${this.props.bankId}`}>
          <Card rounded selected={documents} className="sideNav">
            <i className="material-icons">folder</i>
            <h3>Documents</h3>
          </Card>
        </A>
        <A href={`/fees/${this.props.bankId}`}>
          <Card selected={fees} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Fees</h3>
          </Card>
        </A>
        <A href={`/merchants/${this.props.bankId}`}>
          <Card selected={merchant} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Merchants</h3>
          </Card>
        </A>
        <OperationalWallet historyLink={this.props.bankId} />
        <MasterWallet historyLink={this.props.bankId} />
      </Sidebar>
    );
  }
}

export default SidebarTwo;
