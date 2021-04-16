import React, { Component } from 'react';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import messages from './messages';


import Card from 'components/Card';
const token = localStorage.getItem("bankLogged");
const bname = localStorage.getItem("bankName");
class EscrowWallet extends Component {
constructor() {
    super();
    this.state = {
      balance: 0
    };
  }
  getBalance = () => {
    axios
      .post(`${API_URL}/bank/getWalletBalance?page=escrow`,
        { 
          page: 'escrow',
          token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                balance: res.data.balance.toFixed(2),
              },
              () => {
                var dis = this;
                setTimeout(function() {
                  dis.getBalance();
                }, 3000);
              },
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getBalance();
  };

  render() {
    return (
      <Card marginBottom="12px" buttonMarginTop="12px" bigPadding>
        <h3>
          <FormattedMessage {...messages.escrow} />
        </h3>
        <div className="cardValue">{CURRENCY} {this.state.balance}</div>
        {/* {
              this.props.activateNeeded ?
              <button className="fullWidth">
            <FormattedMessage {...messages.activate} />
            </button>
              : */}
                <A href={'/bank/escrowHistory'}>
          <span className="history">History</span>
        </A>
        <button className="sendMoneyButton">
          <i className="material-icons">send</i>{' '}
          <FormattedMessage {...messages.sendmoney} />
        </button>
        {/* } */}
      </Card>
    );
  }
}

export default EscrowWallet;
