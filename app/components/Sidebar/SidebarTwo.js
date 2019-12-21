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
    
    const info = this.props.active == 'info' ? true : false;
    const documents = this.props.active == 'documents' ? true : false;
    const fees = this.props.active == 'fees' ? true : false;

        return (
        <Sidebar marginRight>
            <H3>SETTINGS</H3>
            <a href={"/info/"+this.props.bankId }>
            <Card rounded  selected={info} className="sideNav">
                <i className="material-icons">person_add</i>
                <h3>Bank Info</h3>
            </Card >
            </a>
            <a href={"/documents/"+this.props.bankId }>
            <Card rounded selected={documents} className="sideNav">
            <i className="material-icons">folder</i>
                <h3>Documents</h3>
            </Card>
            </a>
            <a href={"/fees/"+this.props.bankId }>
            <Card selected={fees} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
                <h3>Fees</h3>
            </Card>
            </a>
            <OperationalWallet historyLink={this.props.bankId } />
            <MasterWallet historyLink={this.props.bankId }  />
        </Sidebar>
    );
  }
}
 
export default SidebarTwo;