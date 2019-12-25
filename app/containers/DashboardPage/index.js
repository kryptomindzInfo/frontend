/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from 'components/Wrapper';
import Header from 'components/Header/index';
import Container from 'components/Container';
import A from 'components/A';
import Main from 'components/Main';
import Card from 'components/Card';
import OperationalWallet from 'components/Sidebar/OperationalWallet';
import MasterWallet from 'components/Sidebar/MasterWallet';
import { API_URL } from '../App/constants';

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
// const token = token;

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: '',
      popup: false,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  logout = () => {
    // event.preventDefault();
    // axios.post(API_URL+'/logout', {token: token})
    // .then(res => {
    //    if(res.status == 200){
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
    //     }else{
    //       const error = new Error(res.data.error);
    //       throw error;
    //     }
    // })
    // .catch(err => {
    //   alert('Login to continue');
    //   this.setState({ redirect: true });
    // });
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      axios
        .post(`${API_URL}/getDashStats`, { token })
        .then(res => {
          if (res.status == 200) {
            this.setState({ loading: false, totalBanks: res.data.totalBanks });
          } else {
            this.setState({ loading: false, redirect: true });
            //this.setState({ loading: false, totalBanks: res.data.totalBanks });
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
    } else {
      alert('Login to continue');
      this.setState({ loading: false, redirect: true });
    }
    //this.setState({ loading: false });
  }

  render() {
    const { loading, redirect, popup } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="dashboard" />
        <Container verticalMargin>
          {/* <Sidebar marginRight>
            <OperationalWallet />
            <MasterWallet />
          </Sidebar> */}
          <Main fullWidth>
            <div className="clr">
              <A href="/banks" float="left">
                <Card
                  horizontalMargin="7px"
                  cardWidth="151px"
                  textAlign="center"
                  col
                >
                  <h4><FormattedMessage {...messages.box1} /></h4>
                  <div className="cardValue">{this.state.totalBanks}</div>
                </Card>
              </A>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4><FormattedMessage {...messages.box2} /></h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4><FormattedMessage {...messages.box3} /></h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                textAlign="center"
                col
              >
                <h4><FormattedMessage {...messages.box4} /></h4>
                <div className="cardValue">0</div>
              </Card>
            </div>

            <div className="clr mt10">
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                <FormattedMessage {...messages.box5} />
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                <FormattedMessage {...messages.box6} />
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                <FormattedMessage {...messages.box7} />
                </h4>
                <div className="cardValue">0</div>
              </Card>
              <Card
                horizontalMargin="7px"
                cardWidth="151px"
                h4FontSize="16px"
                textAlign="center"
                col
              >
                <h4>
                <FormattedMessage {...messages.box8} />
                </h4>
                <div className="cardValue">0</div>
              </Card>
            </div>
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
