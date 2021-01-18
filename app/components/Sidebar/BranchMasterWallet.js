import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Popup from 'components/Popup';
import Row from 'components/Row';
import Col from 'components/Col';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
import SendToOperationalPopup from './SendToOperationalPopup';
import A from 'components/A';

import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const token = localStorage.getItem('branchLogged');

class BranchMasterWallet extends Component {
  constructor() {
    super();
    this.state = {
      bank: '',
      popup: false,
      from: '',
      to: '',
      amount: '',
      notification: '',
      balance: 0,
      note: '',
      token,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

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

  getBalanceForBank = () => {
    axios
      .post(
        `${API_URL}/bank/getBranchWalletBalance`,
        {
          token: localStorage.getItem('bankLogged'),
          branch_id: this.props.branchId,
          wallet_type: 'master',
        }
      )
      .then(res => {
        if (res.status == 200) {
          console.log(res);
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                balance: res.data.balance,
              },
              () => {
                var dis = this;
                setTimeout(function () {
                  dis.getBalanceForBank();
                }, 3000);
              },
            );
          }
        }
      })
      .catch(err => { });
  };

  getBalance = () => {
    axios
      .post(
        `${API_URL}/branch/getWalletBalance?page=master`,
        {
          token: localStorage.getItem('branchLogged'),
        }
      )
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                balance: res.data.balance,
              },
              () => {
                var dis = this;
                setTimeout(function () {
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
    if (this.props.branchId) {
      this.getBalanceForBank();
    } else {
      this.getBalance();
    }
  };

  render() {
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }

    function inputBlur(e) {
      const { target } = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }
    return (
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
        <h3>
          <FormattedMessage {...messages.master} />
        </h3>
        <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormattedMessage {...messages.available} />
          <A href={`/branch/${this.props.bankName}/masterHistory`}>
            <span className="history" style={{ position: 'inherit' }}>
              History
            </span>
          </A>
        </h5>

        <div className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
            <Button
              dashBtn
              onClick={this.handlePopupOpen}
            >
              <FormattedMessage {...messages.sendmoney} />
            </Button>
          </Col>
        </Row>
        {this.state.popup ? (
          <SendToOperationalPopup
            close={this.handlePopupClose}
            token={token}
            type='branch'
          />
        ) : null}
      </Card>
    );
  }
}

export default BranchMasterWallet;
