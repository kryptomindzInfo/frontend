import React, { Component } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
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

class SidebarThree extends Component {
  render() {
    const profile = this.props.active == 'profile';
    const currency = this.props.active == 'currency';
    const country = this.props.active == 'country';

    return (
      <Sidebar marginRight>
        <H3>SETTINGS</H3>
        <A href={`/profile${this.props.infraID}`}>
          <Card rounded selected={profile} className="sideNav">
            <i className="material-icons">person_add</i>
            <h3>Profile</h3>
          </Card>
        </A>
        <A href={`/currency${this.props.infraID}`}>
          <Card rounded selected={currency} className="sideNav">
            <i className="material-icons">folder</i>
            <h3>Currency</h3>
          </Card>
        </A>
        <A href={`/country${this.props.infraID}`}>
          <Card rounded selected={country} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Country</h3>
          </Card>
        </A>

        {/* <OperationalWallet historyLink={this.props.bankId} />
        <MasterWallet historyLink={this.props.bankId} /> */}
      </Sidebar>
    );
  }
}

export default SidebarThree;
