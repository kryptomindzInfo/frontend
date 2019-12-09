import React, { Component } from "react";

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Card from 'components/Card';

class MasterWallet extends Component {
  render() {
    return (
        <Card buttonMarginTop="32px" bigPadding>
            <h3><FormattedMessage {...messages.master} /></h3>
            <h5><FormattedMessage {...messages.available} /></h5>
            <div className="cardValue">$0.00</div>
            <button>
            <i className="material-icons">send</i> <FormattedMessage {...messages.sendmoney} />
            </button>
        </Card>
    );
  }
}
 
export default MasterWallet;

