/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, {Component} from 'react';
import {API_URL} from '../App/constants';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import {Helmet} from "react-helmet";
import { toast } from 'react-toastify';

import Wrapper from 'components/Wrapper';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Nav from 'components/Nav';
import Welcome from 'components/Welcome';
import Sidebar from 'components/Sidebar';
import Main from 'components/Main';
import Card from 'components/Card';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: "bottom-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
});

const token = localStorage.getItem("logged");

export default class DashboardPage extends Component {
constructor() {
  super();
  this.state = {
    loading: true,
    redirect: false,
    totalBanks: 0,
    notification: "",
    popup: false
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
       localStorage.removeItem("logged");
       localStorage.removeItem("name");
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
}

componentDidMount() {
  if(token !== undefined && token !== null){
    axios.post(API_URL+'/getDashStats', {token: token})
    .then(res => {
       if(res.status == 200){
          this.setState({ loading: false, totalBanks: res.data.totalBanks });
        }else{
          this.setState({ loading: false, redirect: true });
        }
    })
    .catch(err => {
      this.setState({
        notification:  (err.response) ? err.response.data.error : err.toString()
      });
      this.error();
    });
  }else{
    alert('Login to continue');
    this.setState({ loading:false, redirect: true });
  }  
}

render(){
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
          <TopBar>
            <Container>
              <a href="/dashboard">
                <Logo>E-WALLET</Logo>
              </a>
              <Nav active="dashboard"></Nav>
              <Welcome></Welcome>
            </Container>
          </TopBar>
          <Container verticalMargin>
            <Sidebar marginRight>
              <Card marginBottom="68px" buttonMarginTop="36px" bigPadding>
                <h3>Operational Wallet</h3>
                <h5>Available</h5>
                <div className="cardValue">$0.00</div>
                <button><i className="material-icons">send</i> Send Money</button>
              </Card>
              <Card buttonMarginTop="36px" bigPadding> 
                <h3>Master Wallet</h3>
                <h5>Available</h5>
                <div className="cardValue">$0.00</div>
                <button><i className="material-icons">send</i> Send Money</button>
              </Card>
            </Sidebar>
            <Main>
              <div className="clr">
                <a href="/bank">
                <Card horizontalMargin="7px" cardWidth="160px" textAlign="center" col >
                  <h4>Total Banks</h4>
                  <div className="cardValue">{this.state.totalBanks}</div>
                </Card>
                </a>
                <Card horizontalMargin="7px" cardWidth="160px" textAlign="center" col>
                  <h4>Total Merchants</h4>
                  <div className="cardValue">0</div>
                </Card>
                <Card horizontalMargin="7px" cardWidth="160px" textAlign="center" col>
                  <h4>Total Users</h4>
                  <div className="cardValue">0</div>
                </Card>
                <Card horizontalMargin="7px" cardWidth="160px" textAlign="center" col>
                  <h4>Total Cashier</h4>
                  <div className="cardValue">0</div>
                </Card>
              </div>

              <div className="clr mt10">
                <Card horizontalMargin="7px" cardWidth="160px" h4FontSize="16px" textAlign="center" col >
                  <h4>Total Bank<br />Branches</h4>
                  <div className="cardValue">0</div>
                </Card>
                <Card horizontalMargin="7px" cardWidth="160px" h4FontSize="16px" textAlign="center" col>
                  <h4>Total Merchant<br />Branches</h4>
                  <div className="cardValue">0</div>
                </Card>
                <Card horizontalMargin="7px" cardWidth="160px" h4FontSize="16px" textAlign="center" col>
                  <h4>Total Bank<br />Partners</h4>
                  <div className="cardValue">0</div>
                </Card>
                <Card horizontalMargin="7px" cardWidth="160px" h4FontSize="16px" textAlign="center" col>
                  <h4>Total Merchant<br />Partners</h4>
                  <div className="cardValue">0</div>
                </Card>
              </div>
            </Main>
          </Container>
         
      </Wrapper>
  );
}
}
