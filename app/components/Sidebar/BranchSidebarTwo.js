import React, { Component } from "react";
import Card from '../Card';
import styled from 'styled-components';
import A from 'components/A';
const Sidebar = styled.aside `
width: 260px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
.anchor{
  display:block;
}
`;

const H3 = styled.h3 `
font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

const H1 = styled.h1 `
font-size: 28px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: #417505;
text-align: center;
`;

class BranchSidebarTwo extends Component {
  editSignal = event => {
      this.props.edit();
  };
  blockSignal = event => {
      this.props.block();
  };
  render() {
    const cashier = this.props.active == 'cashier' ? true : false;
    const info = this.props.active == 'info' ? true : false;
    const reports = this.props.active == 'reports' ? true : false;
    const edit = this.props.active == 'edit' ? true : false;
    const block = this.props.active == 'block' ? true : false;
    const bt = this.props.blockTxt == 1 ? 'Block' : 'Unblock';
    return (
        <Sidebar marginRight>

            <A href={"/branch/"+this.props.bankName+"/info"}>
            <Card rounded selected={info} className="sideNav">
                <i className="material-icons">person_add</i>
                <h3>Branch Info</h3>
            </Card >
            </A>
            <A href={"/branch/"+this.props.bankName+"/reports"}>
            <Card rounded selected={reports} className="sideNav">
            <i className="material-icons">insert_chart_outlined</i>
                <h3>Reports</h3>
            </Card>
            </A>

          

        </Sidebar>
    );
  }
}

export default BranchSidebarTwo;
