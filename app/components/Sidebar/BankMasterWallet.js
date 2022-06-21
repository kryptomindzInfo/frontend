import React, { Component } from 'react';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import messages from './messages';
import axios from 'axios';
import A from 'components/A';
import SendToOperationalPopup from './SendToOperationalPopup';
import Button from 'components/Button';
import Row from 'components/Row';
import Col from 'components/Col';
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
      token: localStorage.getItem('bankLogged'),
      admin: localStorage.getItem('admin'),
      bname: localStorage.getItem("bankName"),
      bcode: localStorage.getItem("bankCode"),
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
    let user = '';
    if(this.state.admin === false || this.state.admin === 'false' ){
      user='bank'
    }else{
      user='bankuser'
    }
    axios
      .post(
        `${API_URL}/${user}/getWalletBalance?page=master&wallet_id=BAM@${this.state.bcode}@${this.state.bcode}`,
        { 
          page: 'master',
          token:this.state.token,
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
                balance: res.data.balance ? res.data.balance.toFixed(2) : 0,
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
      <Card buttonMarginTop="12px" bigPadding>
        <h3>
          <FormattedMessage {...messages.master} />
        </h3>

          <div className="cardValue">{CURRENCY} {this.state.balance}</div>
        { this.state.admin === false || this.state.admin === 'false' ? (
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
            <Button
              dashBtn
              onClick={this.handlePopupOpen}
            >
              Transfer from Master to Operational
            </Button>
          </Col>
        </Row>
        ):""}
        <Row style={{ marginLeft: '30px'}}>
          <Col style={{ width: '100%', marginTop: '30px'}} cw="100%">
          <A href={'/bank/masterHistory'}>
            <span className="history">History</span>
          </A>
          </Col>
        </Row>
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
