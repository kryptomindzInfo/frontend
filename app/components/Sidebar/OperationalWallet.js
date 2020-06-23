import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import Card from 'components/Card';
import Popup from 'components/Popup';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import FormGroup from 'components/FormGroup';
import Button from 'components/Button';
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
const token = localStorage.getItem('logged');

class OperationalWallet extends Component {
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
      livefee: 0,
      token,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.getBalance = this.getBalance.bind(this);
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
  amountChange = event => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (this.state.amount != '') {
          axios
            .post(`${API_URL}/checkFee`, {
              from: this.state.from,
              to: this.state.to,
              amount: this.state.amount,
              auth: 'infra',
              token,
            })
            .then(res => {
              if (res.status == 200) {
                if (res.data.error) {
                } else {
                  this.setState(
                    {
                      livefee: res.data.fee,
                    },
                    function() {},
                  );
                }
              }
            });
        } else {
          this.setState({
            livefee: 0,
          });
        }
      },
    );
  };
  sendMoney = e => {
    e.preventDefault();
    axios
      .post(`${API_URL}/getWalletsOperational`, {
        bank_id: this.props.historyLink,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              from: res.data.from,
              to: res.data.to,
              popup: true,
            });
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      amount: '',
      note: '',
    });
  };

  getBalance = () => {
    axios
      .get(
        `${API_URL}/getInfraOperationalBalance?bank=${this.props.historyLink}&token=${this.state.token}`,
      )
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              balance: res.data.balance,
            });
          }
        }
      })
      .catch(err => {

      });
  };

  submitMoney = e => {
    e.preventDefault();
    console.log(this.state.balance + ' : ' + this.state.amount);
    if (this.state.amount > this.state.balance) {
      this.setState(
        {
          notification: 'Insufficient Balance',
        },
        function() {
          this.error();
        },
      );
    } else if (this.state.amount == '') {
      this.setState(
        {
          notification: 'Invalid Amount',
        },
        function() {
          this.error();
        },
      );
    } else {
      axios
        .post(`${API_URL}/transferMoney`, {
          from: this.state.from,
          to: this.state.to,
          amount: this.state.amount,
          note: this.state.note,
          auth: 'infra',
          token,
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.error) {
              throw res.data.error;
            } else {
              var tis = this;
              this.setState(
                {
                  notification:
                    'Transfer Initiated, You will be notified once done',
                },
                function() {
                  this.success();
                  setTimeout(function() {
                    tis.closePopup();
                    // tis.getBalance();
                    // tis.props.reload();
                  }, 1000);
                },
              );
            }
          } else {
            const error = new Error(res.data.error);
            throw error;
          }
        })
        .catch(err => {
          this.setState({
            notification: err.response
              ? err.response.data.error
              : err.toString(),
          });
          this.error();
        });
    }
  };

  componentDidMount() {
    this.setState({
      bank: this.props.historyLink,
    });

    let dis = this;
      setInterval(function(){
        dis.getBalance();
      }, 10000);
  }

  render() {
    var termsConditions;
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
          <FormattedMessage {...messages.operational} />
        </h3>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div>
        {this.props.activateNeeded ? (
          <button className="fullWidth">
            <FormattedMessage {...messages.activate} />
          </button>
        ) : (
          <button  className="sendMoneyButton" onClick={this.sendMoney}>
            <i className="material-icons">send</i>{' '}
            <FormattedMessage {...messages.sendmoney} />
          </button>
        )}
        <A href={'/operationalHistory/' + this.props.historyLink}>
          <span className="history">History</span>
        </A>

        {this.state.popup ? (
          <Popup className="modal-dialog modal-dialog-centered" close={this.closePopup.bind(this)} roundedCorner>
            <h1 className="normalH1">Transfer the amount</h1>
            <form action="" method="post" onSubmit={this.submitMoney}>
              <FormGroup>
                <label>From*</label>
                <TextInput
                  readOnly
                  id="popfrom"
                  type="text"
                  name="from"
                  onFocus={inputFocus}
                  autoFocus
                  onBlur={inputBlur}
                  value={this.state.from}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>To*</label>
                <TextInput
                  readOnly
                  id="popto"
                  type="text"
                  name="to"
                  autoFocus
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.to}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Amount*</label>
                <TextInput
                  type="text"
                  name="amount"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.amount}
                  onChange={this.amountChange}
                  required
                />
              </FormGroup>
              <p className="note">
                <span style={{ color: 'red', paddingRight: '3px' }}>*</span>
                Total available {CURRENCY} {this.state.balance.toFixed(2)}
              </p>
              <FormGroup>
                <label>Note*</label>
                <TextArea
                  type="text"
                  name="note"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.note}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <p className="note">
                <span style={{ color: 'red' }}>*</span> I have read the{' '}
                <a onClick={() => window.open('/termsConditions')}>
                  Terms and Conditions
                </a>
                <div className="tooltip">
                  <i className="fa fa-info-circle" style={{ margin: '6px', color: '#43434a' }} />
                  <span className="tooltiptext">
                    This transaction will be uploaded on Blockchain.
                  </span>
                </div>
              </p>

              <Button filledBtn marginTop="50px">
                <span>Proceed</span>
              </Button>
              <p className="note">
                <span style={{ color: 'red' }}>*</span> Total Fee {CURRENCY}0
                will be charged and receiver will get {CURRENCY}{' '}
                {this.state.amount}{' '}
              </p>
            </form>
          </Popup>
        ) : null}
      </Card>
    );
  }
}

export default OperationalWallet;
