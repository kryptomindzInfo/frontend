import React, { Component } from 'react';
import styled from 'styled-components';
import A from 'components/A';
import Card from '../../components/Card';
import Row from '../../components/Row';
import Col from '../../components/Col';
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
    const fee = this.props.active == 'fee';
    const interbankrevenue = this.props.active == 'interbankrevenue';
    const interbankcommission = this.props.active == 'interbankcommission';
    const commission = this.props.active == 'commission';

    return (
      <Sidebar marginRight>
        <H3>SETTINGS</H3>
        <Card rounded className="containerNav">
          <h3>Intra Bank Rules</h3>
          <Card display="flex">
            <Row style={{width:'-webkit-fill-available'}}>
              <Col cW="50%">
                <A href={`/infra/merchant/fees/${this.props.merchantId}`}>
                  <Card rounded selected={fee} className="sideNav">
                    <h3>Revenue Sharing</h3>
                  </Card>
                </A>
              </Col>
              <Col cW="50%">
                <A href={`/infra/merchant/commission/${this.props.merchantId}`}>
                  <Card rounded selected={commission} className="sideNav">
                    <h3>Commission Sharing</h3>
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
                <A href={`/infra/merchant/inter-bank-fees/${this.props.merchantId}`}>
                  <Card rounded selected={interbankrevenue} className="sideNav">
                    <h3>Revenue Sharing</h3>
                  </Card>
                </A>
              </Col>
              <Col cW="50%">
                <A href={`/infra/merchant/inter-bank-commission/${this.props.merchantId}`}>
                  <Card rounded selected={interbankcommission} className="sideNav">
                    <h3>Commission Sharing</h3>
                  </Card>
                </A>
              </Col>
            </Row>
          </Card>
        </Card>
        {/* <A href={`/infra/merchant/fees/${this.props.merchantId}`}>
          <Card selected={revenue} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Revenue Sharing</h3>
          </Card>
        </A>
        <A href={`/infra/merchant/commission/${this.props.merchantId}`}>
          <Card selected={commission} rounded className="sideNav">
            <i className="material-icons">mobile_screen_share</i>
            <h3>Commission Sharing</h3>
          </Card>
        </A> */}
        <OperationalWallet historyLink={this.props.bankId} />
        <MasterWallet historyLink={this.props.bankId} />
      </Sidebar>
    );
  }
}

export default InfraMerchantSidebar;
