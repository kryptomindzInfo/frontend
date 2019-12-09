import React, { Component } from "react";
import OperationalWallet from './OperationalWallet';
import MasterWallet from './MasterWallet';
import styled from 'styled-components';

const Sidebar = styled.aside `
width: 260px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
`;

class SidebarOne extends Component {
  render() {
    return (
        <Sidebar marginRight>
            <OperationalWallet />
            <MasterWallet />
        </Sidebar>
    );
  }
}
 
export default SidebarOne;