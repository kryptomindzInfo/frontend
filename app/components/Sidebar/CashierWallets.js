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


const token = localStorage.getItem('cashierLogged');
class BranchWallets extends Component {
   constructor() {
    super();
    this.state = {
        balance: 0,
        token
    }
    
  }
 componentDidMount() {
    axios
    .post(`${API_URL}/getCashierTransLimit`,  {token: token})
    .then(res => {
      if (res.status == 200) {
        if (res.data.error) {
          throw res.data.error;
        } else {
          console.log(res.data.row);
          this.setState({
            balance: Number(res.data.limit)
          });
        }
      } else {
        const error = new Error(res.data.error);
        throw error;
      }
    })
    .catch(err => {
      this.setState({
        notification: err.response ? err.response.data.error : err.toString()
      });
      this.error();
    });
  }
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
          {CURRENCY} {this.state.balance.toFixed(2)}
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
       
      </Card>
      </Col>

      </Row>

    );
  }
}

export default BranchWallets
