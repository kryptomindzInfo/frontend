import React, { Component } from "react";
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

class BankSidebarTwo extends Component {
  render() {

    const security = this.props.active == 'security' ? true : false;
    const info = this.props.active == 'info' ? true : false;
    const documents = this.props.active == 'documents' ? true : false;
    const fees = this.props.active == 'fees' ? true : false;
    return (
        <Sidebar marginRight>
            <H3>SETTINGS</H3>
            <a href="/bank/info">
            <Card rounded selected={info} className="sideNav">
                <i className="material-icons">person_add</i>
                <h3>Personal Info</h3>
            </Card >
            </a>
            <a href="/bank/security">
            <Card rounded selected={security} className="sideNav">
            <i className="material-icons">security</i>
                <h3>Login and Security</h3>
            </Card>
            </a>
            <a href="/bank/documents">
            <Card rounded selected={documents} className="sideNav">
            <i className="material-icons">folder</i>
                <h3>Documents</h3>
            </Card>
            </a>
            <a href="/bank/fees">
            <Card rounded selected={fees} className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
                <h3>Fees</h3>
            </Card>
            </a>
        </Sidebar>
    );
  }
}
 
export default BankSidebarTwo;