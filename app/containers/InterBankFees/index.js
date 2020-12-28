/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { withStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Wrapper from 'components/Wrapper';
import BankHeader from 'components/Header/BankHeader';
import BankSidebarTwo from 'components/Sidebar/BankSidebarTwo';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import A from 'components/A';
import MiniPopUp from 'components/MiniPopUp';
import Row from 'components/Row';
import Col from 'components/Col';
import FormGroup from 'components/FormGroup';

import { API_URL, CURRENCY } from '../App/constants';
import RevenueRuleDistubutionPage from './RevenueRuleDistributionPage';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const Tab = styled.div`
  background: ${props => props.theme.primary};
  width: 194px;
  padding: 15px;
  float: left;
  border: 1px solid ${props => props.theme.primary};
  color: #fff;
  font-size: 20px;
`;
const Tab2 = styled.div`
  float: left;
  width: 194px;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 20px;
  padding: 15px;
`;

const token = localStorage.getItem('bankLogged');
const bid = localStorage.getItem('bankId');

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  table: {
    minWidth: 700,
  },
  bankBranches: {
    padding: '3%',
    fontWeight: 600,
  },
});

export class InterBankFees extends Component {
  constructor() {
    super();
    this.state = {
      sid: '',
      bank: bid,
      name: '',
      address1: '',
      html: '',
      popname: '',
      poprange: '',
      poptype: '',
      poppercent: '',
      state: '',
      zip: '',
      country: '',
      ccode: '',
      mobile: '',
      email: '',
      logo: null,
      contract: null,
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: 'Welcome',
      popup: false,
      user_id: token,
      banks: [],
      rules: [],
      copyrules: [],
      otp: '',
      showOtp: false,
      isInfraFeeVisible: false,
      revenueRuleDistributionPage: false,
      percentage: '',
      bankBranchesTable: true,
      bankPartnersTable: false,
      bankMerchantsTable: false,
      bankFeeDetails: '',
      selectedBankFeeId: '',
      revenueData: '',
      shares: '',
    };
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

  goBankEdit = b => {
    this.props.history.push(`/bank/edit-inter-bank-fee/${b}`);
  };

  logout = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
  };


  getRules = () => {
    axios
      .post(`${API_URL}/bank/interBank/getRules`, { token })
      .then(res => {
        if (res.status == 200) {
          this.setState({ loading: false, rules: res.data.rules, copyrules: res.data.rules });
        }
      })
      .catch(err => { });
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.getRules();
    }
  }

  showRevenueRuleDistributionPage = async bankFee => {
    console.log("to");
    this.setState({
      revenueRuleDistributionPage: 'true',
      selectedBankFeeId: bankFee._id,
      bankFeeDetails: bankFee,
    });
    try {
      const res1 = await axios.post(`${API_URL}/getOne`, { token: token, page_id: bankFee._id, type: 'bank', page: 'interbankrule' });
      const res2 = await axios.post(`${API_URL}/bank/getRevenueFeeForInterBank`, { token: token, type: bankFee.type, bank_id: bid });
      console.log(res2);
      this.setState({
        revenueData: res1.data.row,
        share: res2.data.fee,
      });
    } catch (e) {
      console.log(e);
    }
  };

  searchlistfunction = (value) => {
    // console.log(value)
    // console.log(this.state.copyusers)
    // console.log(this.state.users)
    const newfilterdata = this.state.copyrules.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );

    this.setState({ rules: newfilterdata })


  }


  render() {
    const { classes } = this.props;

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


    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return null;
    }
    const dis = this;
    return (
      <Wrapper from="bank">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <BankHeader />
        <Container verticalMargin>
          <BankSidebarTwo active="interbankfees" />
          <Main
            style={{
              display: `${this.state.revenueRuleDistributionPage ? 'none' : 'block'
                }`,
            }}
          >
            <Card
              bigPadding
              style={{
                display: `${this.state.isInfraFeeVisible ? 'block' : 'none'}`,
              }}
            >
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Revenue Sharing Rules</h3>
                  <h5>Fees created by the infra</h5>
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Transaction Type</th>
                      <th>Ranges</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rules && this.state.rules.length > 0
                      ? this.state.rules.map((b, i) => {
                        var r = b.ranges;
                        return (
                          <tr key={b._id}>
                            <td>
                              {b.status == 0 ? (
                                <span>{b.name}</span>
                              ) : (
                                  <span>{b.name}</span>
                                )}
                            </td>
                            <td className="tac">
                              {b.status == 0 ? (
                                <span>{b.trans_type}</span>
                              ) : (
                                  <span>{b.trans_type}</span>
                                )}
                            </td>

                            <td>
                              {r.map(v => (
                                <div>
                                  Count:{' '}
                                  <span className="green">
                                    {v.trans_from} - {v.trans_to}
                                  </span>
                                    , Fixed:{' '}
                                  <span className="green">
                                    {`${CURRENCY} ${v.fixed_amount}`}
                                  </span>
                                    , Percentage:{' '}
                                  <span className="green">
                                    {v.percentage}
                                  </span>
                                </div>
                              ))}
                            </td>
                            <td className="tac bold">
                              {b.active == 'Inactive' ? (
                                <span className="absoluteMiddleRight primary popMenuTrigger">
                                  <i className="material-icons ">block</i>
                                </span>
                              ) : (
                                  <Button
                                    className="addBankButton"
                                    onClick={() =>
                                      dis.goBankEdit(
                                        // this.state.bankRules[i]._id,
                                        b._id,
                                      )
                                    }
                                  >
                                    {b.status == 0
                                      ? 'Pending'
                                      : b.status == 2
                                        ? 'Declined'
                                        : 'Approved'}
                                  </Button>
                                )
                              }
                            </td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </Table>
              </div>
            </Card>
            <div
              style={{
                display: `${this.state.isInfraFeeVisible ? 'none' : 'block'}`,
              }}
            >
              <ActionBar
                marginBottom="33px"
                inputWidth="calc(100% - 241px)"
                className="clr"
              >
                <div className="iconedInput fl">
                  <i className="material-icons">search</i>
                  <input type="text" placeholder="Search" onChange={(e) => {
                    this.searchlistfunction(e.target.value)
                  }} />
                </div>

                <A href="/bank/create-inter-bank-fee" float="right">
                  <Button className="addBankButton" flex onClick={this.try}>
                    <i className="material-icons">add</i>
                    <span>
                      <span>Create Fee</span>
                    </span>
                  </Button>
                </A>
              </ActionBar>
              <Card bigPadding>
                <div className="cardHeader">
                  <div className="cardHeaderLeft">
                    <i className="material-icons">supervised_user_circle</i>
                  </div>
                  <div className="cardHeaderRight">
                    <h3>Inter Bank Fee Rules</h3>
                    <h5>Fees created by the bank</h5>
                  </div>
                </div>
                <div className="cardBody">
                  <Table marginTop="34px" smallTd>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th style={{ width: '10rem' }}>Transaction Type</th>
                        {/* <th>Transaction Range</th> */}
                        <th>Transaction Range</th>
                        <th />
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rules && this.state.rules.length > 0
                        ? this.state.rules.map((b, i) => {
                          var r = b.ranges;

                          return (
                            <tr key={b._id}>
                              <td>{b.name}</td>
                              <td className="tac">
                                {b.type}
                              </td>
                              <td>
                                {r.map(v => (
                                  <div>
                                    Range:{' '}
                                    <span className="green">
                                      {v.trans_from} - {v.trans_to}
                                    </span>
                                      , Fixed:{' '}
                                    <span className="green">
                                      {`${CURRENCY} ${v.fixed}`}
                                    </span>
                                      , Percentage:{' '}
                                    <span className="green">
                                      {v.percentage}
                                    </span>
                                  </div>
                                ))}
                              </td>
                              <td className="tac bold">
                                <Button
                                  className="addBankButton"
                                  onClick={() =>
                                    dis.goBankEdit(
                                      b._id,
                                      // this.state.rules[i]._id,
                                    )
                                  }
                                  className="pointer"
                                >
                                  Edit
                                </Button>
                              </td>
                              <td>
                                <Button
                                  onClick={() =>
                                    this.showRevenueRuleDistributionPage(b)
                                  }
                                >
                                  Revenue Sharing Rule
                                  </Button>
                              </td>
                            </tr>
                          );
                        })
                        : null}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </div>
          </Main>

          {this.state.revenueRuleDistributionPage ? (
            // <div style={{ border: '1px solid grey' }}>
            <RevenueRuleDistubutionPage
              showRevenueRuleDistributionPage={
                this.showRevenueRuleDistributionPage
              }
              close={() =>
                this.setState({ revenueRuleDistributionPage: false })
              }
              revenueData={this.state.revenueData}
              share={this.state.share}
              selectedBankFeeId={this.state.selectedBankFeeId}
              bankFeeDetails={this.state.bankFeeDetails}
            />
          ) : null}
        </Container>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(InterBankFees);
