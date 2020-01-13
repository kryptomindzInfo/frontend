import React, { Component } from 'react';
// import Logo from './Logo';
import BankNav from './BankNav';
import TopBar from './TopBar';
import Welcome from './Welcome';
import Container from 'components/Container';
import A from 'components/A';
import Logo from 'components/Header/Logo';
import axios from 'axios';
import styled from 'styled-components';

import {
  API_URL,
  STATIC_URL,
  CONTRACT_URL,
} from '../../../app/containers/App/constants';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Link = styled.span`
    color: #fff;
    font-size: 18px;
    margin: 0 40px 0 0;
    padding-bottom: 7px;
    display: block;
    font-weight: normal;
    border-radius: 8px;
    border: solid 2px #ffffff;
    padding: 9px 20px;
`;

const token = localStorage.getItem('bankLogged');

var permissions = localStorage.getItem('permissions');
if (permissions != 'all' && permissions != '') {
  permissions = JSON.parse(permissions);
}

class BankHeader extends Component {
  constructor() {
    super();
    this.state = {
      logo: null,
      name: '',
    };
  }

  addBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/generateOTP`, {
        name: this.state.name,
        mobile: this.state.mobile,
        page: 'addBank',
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              showOtp: true,
              notification: 'OTP Sent',
            });
            this.success();
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

  getBanks = () => {
    axios
      .post(`${API_URL}/getBank`, {
        token: token,
        bank_id: localStorage.getItem("bankId"),
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            loading: false,
            banks: res.data.banks,
            logo: res.data.banks.logo,
            bcode: res.data.banks.bcode,
            name: res.data.banks.name,
            address1: res.data.banks.address1,
            state: res.data.banks.state,
            zip: res.data.banks.zip,
            country: res.data.banks.country,
            ccode: res.data.banks.ccode,
            mobile: res.data.banks.mobile,
            email: res.data.banks.email,
            // logo: res.data.banks.logo,
            contract: res.data.banks.contract,
            username: res.data.banks.contract,
            bank_id: res.data.banks._id,
            username: res.data.banks.username,
          });
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    // this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      this.setState({ loading: false });
      this.getBanks();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  // componentWillUnmount() {

  // }

  render() {
    const name = localStorage.getItem('name');
    const page = this.props.page;
    return (
      <TopBar>
        <Welcome from="bank" />
        <Container>
          <A href="/bank/branches" float="left">
            <Link>
              Back
            </Link>
          </A>
          <A href="/bank/dashboard" float="left">
            <div className="bankLogo">
              <img src={STATIC_URL + this.state.logo} />
            </div>
            <h2>{this.state.banks && this.state.banks.name}</h2>
            {/* <Logo><FormattedMessage {...messages.logo} /></Logo> */}
          </A>
          {
            page == 'branch' ?
            null
            :
            <BankNav active={this.props.active} />
          }

        </Container>
      </TopBar>
    );
  }
}

export default BankHeader;
