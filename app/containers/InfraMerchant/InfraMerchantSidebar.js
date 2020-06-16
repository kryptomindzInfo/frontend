import React, { Component } from 'react';
import styled from 'styled-components';
import A from 'components/A';
import Card from '../../components/Card';
import OperationalWallet from '../../components/Sidebar/OperationalWallet';
import MasterWallet from '../../components/Sidebar/MasterWallet';

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

class InfraMerchantSidebar extends Component {
  render() {
    const revenue = this.props.active == 'Revenue';
    const commission = this.props.active == 'Commission';

    return (
      <Sidebar marginRight>
        <H3>SETTINGS</H3>
        <A href={`/merchant/fees/${this.props.merchantId}`}>
          <Card selected={revenue} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Revenue Sharing</h3>
          </Card>
        </A>
        <A href={`/merchant/commission/${this.props.merchantId}`}>
          <Card selected={commission} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Commission Sharing</h3>
          </Card>
        </A>
        <OperationalWallet historyLink={this.props.bankId} />
        <MasterWallet historyLink={this.props.bankId} />
      </Sidebar>
    );
  }
}

export default InfraMerchantSidebar;
