import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Row from 'components/Row';
import Col from 'components/Col';
import Popup from 'components/Popup';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
import A from 'components/A';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';


class BranchWallets extends Component {

  render() {

    return (
      <Row>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding bordered>
        <h3>
          <FormattedMessage {...messages.operational} />
        </h3>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div>
        <A href={'/branch/'+this.props.bankName+'/operationalHistory/' } float="right">
          <span className="history">History</span>
        </A>
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding bordered>
        <h3>
          Master Wallet
        </h3>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div>
        {/*<A href={'/operationalHistory/' + this.props.historyLink} float="right">
          <span className="history">History</span>
        </A>*/}
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding  bordered>
        <h3>
          Credit Limit
        </h3>
        <Row>
        <Col><h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div></Col>
        <Col><h5>
          Total
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div></Col>
        </Row>

        <A href={'/operationalHistory/' + this.props.historyLink} float="right">
          &nbsp;
        </A>
      </Card>
      </Col>
      </Row>

    );
  }
}

export default BranchWallets
