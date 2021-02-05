import React, { Component } from 'react';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import messages from './messages';
import axios from 'axios';
import A from 'components/A';
import SendToOperationalPopup from './SendToOperationalPopup';

import Card from 'components/Card';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const token = localStorage.getItem('bankLogged');

class BankMasterWallet extends Component {
  constructor() {
    super();
    this.state = {
      popup: false,
      balance: 0,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  };

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handlePopupOpen = () => {
    this.setState({
      popup: true,
    });
  };

  handlePopupClose = () => {
    this.setState({
      popup: false,
    });
  };

  getBalance = () => {
    axios
      .post(
        `${API_URL}/bank/getWalletBalance?page=master`,
        { 
          page: 'master',
          token,
        }
      )
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.message;
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
  };

  componentDidMount() {
    this.getBalance();
  };

  render() {
    return (
      <Card buttonMarginTop="32px" bigPadding>
        <h3>
          <FormattedMessage {...messages.master} />
        </h3>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">{CURRENCY} {this.state.balance}</div>
        <A href={'/bank/masterHistory'}>
          <span className="history">History</span>
        </A>
        <button
          onClick={this.handlePopupOpen}
          className="sendMoneyButton"
        >
          <i className="material-icons">send</i>{' '}
          <FormattedMessage {...messages.sendmoney} />
        </button>
        {this.state.popup ? (
          <SendToOperationalPopup
            close={this.handlePopupClose}
            token={token}
            type='bank'
          />
        ) : null}
      </Card>
    );
  }
}

export default BankMasterWallet;
