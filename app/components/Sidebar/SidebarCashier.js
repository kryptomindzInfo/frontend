import React, { Component } from "react";
import CashierTransactionLimit from './CashierTransactionLimit';
import CashierClosingBalance from './CashierClosingBalance';
import CashierCashInHand from './CashierCashInHand';
import PopupClaimMoney from 'components/PopupClaimMoney';
import styled from 'styled-components';

const Sidebar = styled.aside `
width: 260px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
`;

class SidebarCashier extends Component {
  render() {
    return (
        <Sidebar marginRight>
            <CashierTransactionLimit refresh={this.props.refresh.bind(this)} />
            <CashierCashInHand refresh={this.props.refresh.bind(this)}/>
            <CashierClosingBalance branchName={this.props.branchName}/>
        </Sidebar>
    );
  }
}
 
export default SidebarCashier;