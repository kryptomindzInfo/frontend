import React, { Component } from "react";

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Card from 'components/Card';

class EscrowWallet extends Component {
  render() {
    return (
        <Card marginBottom="54px"  buttonMarginTop="32px" bigPadding>
            <h3><FormattedMessage {...messages.escrow} /></h3>
            <h5><FormattedMessage {...messages.available} /></h5>
            <div className="cardValue">$0.00</div>
            {
              this.props.activateNeeded ?
              <button className="fullWidth">
            <FormattedMessage {...messages.activate} />
            </button>
              :
              <button>
            <i className="material-icons">send</i> <FormattedMessage {...messages.sendmoney} />
            </button>
            }
        </Card>
    );
  }
}
 
export default EscrowWallet;

