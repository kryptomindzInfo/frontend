import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Row from 'components/Row';
import Col from 'components/Col';
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
const token = localStorage.getItem('cashierLogged');

class CashierClosingBalance extends Component {
  constructor() {
    super();
    this.state = {
        balance: 0,
    }
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  closePopup = () => {
    this.setState({
      popup: false,
    });
  };


  componentDidMount() {
    this.setState({
      bank: this.props.historyLink
    });

  }

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
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h3>
          Closing Balance
          <A className="absoluteMiddleRight">view</A>
        </h3>
        
    
        <Row>
        <Col><h5>
          <FormattedMessage {...messages.available} />
        </h5><div className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div></Col>
        <Col><h5>
          <FormattedMessage {...messages.available} />
        </h5><div className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div></Col>
        </Row>

        <button className="sendMoneyButton">
          <i className="material-icons">send</i>
          Enter closing balance
        </button>
      </Card>
    );
  }
}

export default CashierClosingBalance;
