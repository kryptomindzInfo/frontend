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
  getStats = () => {
    axios
      .post(`${API_URL}/getCashierDashStats`, {
        token: token
      })
      .then(res => {
        if (res.status == 200) {
          let received = res.data.cashReceived == null ? 0 : res.data.cashReceived;
          let paid = res.data.cashPaid == null ? 0 : res.data.cashPaid;
          this.setState({ 
            loading: false, 
            openingBalance: res.data.openingBalance, 
            cashReceived: received, 
            cashPaid: paid,
            feeGenerated: res.data.feeGenerated  
          }, () => {
            var dis  = this;
            setTimeout(function(){
              dis.getStats();
            }, 3000);
          });
        }
      })
      .catch(err => {});
  };

  getTransLimit = () =>{
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
          }, () => {
            var dis  = this;
            setTimeout(function(){
              dis.getTransLimit();
            }, 3000);
          });
        }
      } else {
        const error = new Error(res.data.error);
        throw error;
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

 componentDidMount() {
 // this.getTransLimit();
 // this.getStats();
 console.log(this.props);
  }
  render() {
    
    const limit = Number(this.props.limit);
    const inHand = Number(this.props.inHand);
    const received = Number(this.props.received);
    const paid = Number(this.props.paid);
    return (
      <Row>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered smallValue>
        <h4>
          Transaction Limit
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} {limit.toFixed(2)}
        </div>
   
      </Card>
      </Col>

      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered smallValue>
        <h4>
          Cash in Hand
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY}  {inHand.toFixed(2)}
        </div>
   
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered smallValue>
        <h4>
          Money Paid Today
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY} {paid.toFixed(2)}
        </div>
        
      </Card>
      </Col>
      <Col>
      <Card marginBottom="54px" buttonMarginTop="32px"  bordered smallValue>
        <h4>
         Money Recieved Today
        </h4>
        <h5>
          <FormattedMessage {...messages.available} />
        </h5>
        <div className="cardValue">
          {CURRENCY}  {received.toFixed(2)}
        </div>
       
      </Card>
      </Col>

      </Row>

    );
  }
}

export default BranchWallets
