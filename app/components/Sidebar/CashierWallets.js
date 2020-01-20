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
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered>
        <h4>
          Transaction Limit
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} {this.props.limit}
        </div>
   
      </Card>
      </Col>

      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered>
        <h4>
          Cash in Hand
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div>
   
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered>
        <h4>
          Money Paid Today
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div>
        <A href={'/#/' + this.props.historyLink} float="right">
          <span className="history">History</span>
        </A>
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered>
        <h4>
         Money Claimed Today
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} 0
        </div>
        <A href={'/#/' + this.props.historyLink} float="right">
          <span className="history">History</span>
        </A>
      </Card>
      </Col>

      </Row>

    );
  }
}

export default BranchWallets
