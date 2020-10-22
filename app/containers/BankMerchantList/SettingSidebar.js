import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/PersonAdd';
import FolderIcon from '@material-ui/icons/Folder';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import Card from '../../components/Card';
import Row from '../../components/Row';
import Col from '../../components/Col';
import A from '../../components/A';

const SidebarStyle = styled.aside`
  width: 260px;
  float: left;
  margin-right: ${props => (props.marginRight ? '33px' : '0')};
  .anchor {
    display: block;
  }
  :hover {
    color: #fff;
  }
  .material-icons {
    margin-right: 10px;
    margin-top: 0;
    color: #417505;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
`;

const H3 = styled.h3`
  font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #417505;
  text-align: center;
`;

const SettingSidebar = props => {
  const { active } = props;
  const info = active === 'info';
  const fee = active === 'fee';
  const commission = active === 'commission';
  const interbankcommission = active === 'interbankcommission';
  const interbankfee = active === 'interbankfee';
  const id = localStorage.getItem('currentMerchantId');
  return (
    <SidebarStyle marginRight>
      <A href={`/bank/merchants/info/${id}`}>
        <Card rounded selected={info} className="sideNav">
          <i className="material-icons">
            <PersonIcon />
          </i>
          <h3>Info</h3>
        </Card>
      </A>
      <Card rounded className="containerNav">
        <h3>Intra Bank Rules</h3>
        <Card display="flex">
          <Row style={{width:'-webkit-fill-available'}}>
            <Col cW="50%">
              <A href={`/bank/merchants/fee/${id}`}>
                <Card rounded selected={fee} className="sideNav">
                  <h3>Fee</h3>
                </Card>
              </A>
            </Col>
            <Col cW="50%">
              <A href={`/bank/merchants/commision/${id}`}>
                <Card rounded selected={commission} className="sideNav">
                  <h3>Commission</h3>
                </Card>
              </A>
            </Col>
          </Row>
        </Card>
      </Card>
      <Card rounded className="containerNav">
        <h3>Inter Bank Rules</h3>
        <Card display="flex">
         <Row style={{width:'-webkit-fill-available'}}>
            <Col cW="50%">
              <A href={`/bank/merchants/interbankfee/${id}`}>
                <Card rounded selected={interbankfee} className="sideNav">
                  <h3>Fee</h3>
                </Card>
              </A>
            </Col>
            <Col cW="50%">
              <A href={`/bank/merchants/interbankcommision/${id}`}>
                <Card rounded selected={interbankcommission} className="sideNav">
                  <h3>Commission</h3>
                </Card>
              </A>
            </Col>
          </Row>
        </Card>
      </Card>
    </SidebarStyle>
  );
};

export default SettingSidebar;
