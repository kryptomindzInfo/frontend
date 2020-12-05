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

import Wrapper from 'components/Wrapper';
import TopBar from 'components/Header/TopBar';
import Container from 'components/Container';
import Welcome from 'components/Header/Welcome';
import SidebarTwo from 'components/Sidebar/SidebarTwo';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import Popup from 'components/Popup';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import A from 'components/A';
import Loader from 'components/Loader';
import MiniPopUp from 'components/MiniPopUp';
import messages from './messages';

import { API_URL, CURRENCY, STATIC_URL } from '../App/constants';
import { postRequest, getRequest } from '../App/ApiCall';

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
const isAdmin = localStorage.getItem('isAdmin');

export default class FeeList extends Component {
  constructor() {
    super();
    this.state = {
      bank: '',
      name: '',
      address1: '',
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
      otp: '',
      permissions: {},
      showOtp: false,
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

  showPopup = () => {
    this.props.history.push(`/createfee/${this.props.match.params.bank}`);
  };

  goEdit = (a, b) => {
    localStorage.setItem('feeid', b);
    this.props.history.push(`/editfee/${a}`);
  };

  closePopup = () => {
    this.setState({
      popup: false,
      name: '',
      address1: '',
      state: '',
      zip: '',
      ccode: '',
      country: '',
      email: '',
      mobile: '',
      logo: null,
      contract: null,
      otp: '',
      showOtp: false,
    });
  };

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

  getBanks = async() => {
    const res = await postRequest("getBank", token, {bank_id: this.props.match.params.bank})
    if(res.data.data.status === 0) {
      toast.error(res.data.data.message);
    } else {
      this.setState({ banks: res.data.data.banks, logo: res.data.data.banks.logo });
    }
  };

  getRules = async() => {
    const res = await postRequest("getRules", token, {bank_id: this.props.match.params.bank})
    if(res.data.data.status === 0) {
      toast.error(res.data.data.message);
    } else {
      this.setState({ loading: false, rules: res.data.data.rules });
    }
  };

  componentDidMount() {
    this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      if (isAdmin == 'true') {
        this.setState({ permissions: 'all' });
      } else {
        axios
          .post(`${API_URL}/getPermission`, { token })
          .then(res => {
            if (res.status == 200) {
              this.setState({ permissions: res.data.permissions }, () => {});
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.getBanks();
      this.getRules();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  showMiniPopUp = (b, r) => {
    this.setState({
      popname: b.name,
      poptype: b.trans_type,
      sid: b._id,
      popupMini: true,
      html: r,
    });
    // this.props.history.push('/createfee/'+this.state.bank_id);
  };

  closeMiniPopUp = () => {
    this.setState({
      popupMini: false,
    });
  };

  approve = event => {
    this.setState({
      approveLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/approveFee`, {
        id: this.state.sid,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Approved',
              },
              () => {
                this.success();
                this.closeMiniPopUp();
                this.getRules();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          approveLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          approveLoading: false,
        });
        this.error();
      });
  };

  decline = event => {
    this.setState({
      declineLoading: true,
    });
    event.preventDefault();
    axios
      .post(`${API_URL}/declineFee`, {
        id: this.state.sid,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState(
              {
                notification: 'Declined',
              },
              () => {
                this.success();
                this.closeMiniPopUp();
                this.getRules();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          declineLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          declineLoading: false,
        });
        this.error();
      });
  };

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

    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    const ep = this;
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <TopBar>
          <Welcome infraNav />
          <Container>
            <A href="/dashboard" float="left">
              <div className="headerNavDash">Main Dashboard</div>
            </A>
          </Container>
        </TopBar>
        <Container verticalMargin>
          <div
            className="bankLogo"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '16px',
              marginBottom: '1.2rem',
              boxShadow: '0 0 1px black',
              paddingTop: '16px',
              backgroundColor: 'white',
            }}
          >
            <img
              src={STATIC_URL + this.state.logo}
              style={{
                width: '75px',
              }}
            />
            <div
              style={{
                paddingLeft: '5px',
                paddingTop: '7px',
              }}
            >
              <h2>{this.state.banks && this.state.banks.name}</h2>
            </div>
          </div>

          <SidebarTwo bankId={this.state.bank} active="fees" />
          <Main big>
            <ActionBar
              marginBottom="33px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search Revenue Sharing Rule" />
              </div>
              {this.state.permissions == 'all' ||
              this.state.permissions.create_fee ? (
                <Button
                  style={{ display: 'none' }}
                  className="addBankButton"
                  flex
                  onClick={this.showPopup}
                >
                  <i className="material-icons">add</i>
                  <span>Create Rules</span>
                </Button>
              ) : null}
            </ActionBar>
            <Card bigPadding>
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
                      ? this.state.rules.map(b => {
                          var r = b.revenue_sharing_rule.infra_share;
                          return (
                            <tr key={b._id}>
                              <td>
                                {b.status === 0 ? (
                                  <span>{b.name}</span>
                                ) : (
                                  <span>{b.name}</span>
                                )}
                              </td>
                              <td className="tac">
                                {b.status === 0 ? (
                                  <span>{b.trans_type}</span>
                                ) : (
                                  <span>{b.trans_type}</span>
                                )}
                              </td>
                              <td>
                                <div>
                                  Fixed:{' '}
                                <span className="green">
                                  {`${CURRENCY} ${r.fixed}`}
                                  </span>
                                  , Percentage:{' '}
                                  <span className="green">{r.percentage}</span>
                                </div>
                              </td>
                              <td className="tac bold">
                                {b.status === 2 ? (
                                  <Button
                                    onClick={() => this.showMiniPopUp(b, r)}
                                    className="addBankButton"
                                  >
                                    <span>Approve</span>
                                  </Button>
                                ) : b.status === 1 ? (
                                  <span>Approved</span>
                                ) : (
                                  <span>Declined</span>
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
          </Main>
        </Container>

        {this.state.popupMini ? (
          <MiniPopUp close={this.closeMiniPopUp.bind(this)}>
            {this.state.showOtp ? (
              <div>
                <h1>
                  <FormattedMessage {...messages.verify} />
                </h1>
                <form>
                  <FormGroup>
                    <label>
                      <FormattedMessage {...messages.otp} />*
                    </label>
                    <TextInput
                      type="text"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.otp}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                  <Button filledBtn marginTop="50px">
                    <span>
                      <FormattedMessage {...messages.verify} />
                    </span>
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <form>
                  <p>
                    <span id="popname">{this.state.popname}</span>
                  </p>
                  <p>
                    {' '}
                    Sending from <span id="poptype">{this.state.poptype}</span>
                  </p>
                  <div>
                    Fixed:{' '}
                    <span className="green">
                      {`${CURRENCY} ${this.state.html.fixed}`}
                    </span>
                    , Percentage:{' '}
                    <span className="green">{this.state.html.percentage}</span>
                  </div>

                  <Row>
                    <Col>
                      <FormGroup>
                        {this.state.declineLoading ? (
                          <Button
                            filledBtn
                            marginTop="50px"
                            accentedBtn
                            onClick={this.decline}
                            disabled
                            type="button"
                          >
                            <Loader />
                          </Button>
                        ) : (
                          <Button
                            filledBtn
                            marginTop="50px"
                            accentedBtn
                            onClick={this.decline}
                            type="button"
                          >
                            <span>Decline</span>
                          </Button>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        {this.state.approveLoading ? (
                          <Button
                            filledBtn
                            marginTop="50px"
                            onClick={this.approve}
                            disabled
                            type="button"
                          >
                            <Loader />
                          </Button>
                        ) : (
                          <Button
                            filledBtn
                            marginTop="50px"
                            onClick={this.approve}
                            type="button"
                          >
                            <span>Approve</span>
                          </Button>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </div>
            )}
          </MiniPopUp>
        ) : null}
      </Wrapper>
    );
  }
}
