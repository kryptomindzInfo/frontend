import React, { Component } from 'react';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import messages from './messages';
import Row from 'components/Row';
import Col from 'components/Col';


import Card from 'components/Card';
const token = localStorage.getItem("bankLogged");
const bname = localStorage.getItem("bankName");
class EscrowWallet extends Component {
constructor() {
    super();
    this.state = {
      balance: 0,
      token: localStorage.getItem('bankLogged'),
      admin: localStorage.getItem('admin'),
      bname: localStorage.getItem("bankName"),
    };
  }
  getBalance = () => {
    let user = '';
    if(this.state.admin === false || this.state.admin === 'false' ){
      user='bank'
    }else{
      user='bankuser'
    }
    axios
      .post(`${API_URL}/${user}/getWalletBalance?page=escrow&wallet_id=BAM@${this.state.bname}@${this.state.bname}`,
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
                balance: res.data.balance ? res.data.balance.toFixed(2) : 0
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
        <Row style={{ height: '30px'}}>
          <Col style={{ width: '100%', marginTop: '30px'}} cw="100%">
          <A href={'/bank/masterHistory'}>
            <span className="history">History</span>
          </A>
          </Col>
        </Row>
        {/* } */}
      </Card>
    );
  }
}

export default EscrowWallet;
