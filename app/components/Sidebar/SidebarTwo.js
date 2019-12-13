import React, { Component } from "react";
import OperationalWallet from './OperationalWallet';
import MasterWallet from './MasterWallet';
import Card from '../Card';
import styled from 'styled-components';

const Sidebar = styled.aside `
width: 260px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
`;

const H3 = styled.h3 `
font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

class SidebarTwo extends Component {

  render() {
    
    return (
        <Sidebar marginRight>
            <H3>SETTINGS</H3>
            <Card rounded className="sideNav">
                <i className="material-icons">person_add</i>
                <h3>Bank Info</h3>
            </Card >
            <Card rounded className="sideNav">
            <i className="material-icons">folder</i>
                <h3>Documents</h3>
            </Card>
            <Card selected rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
                <h3>Fees</h3>
            </Card>
            <OperationalWallet historyLink={this.props.bankId } />
            <MasterWallet historyLink={this.props.bankId }  />
        </Sidebar>
    );
  }
}
 
export default SidebarTwo;