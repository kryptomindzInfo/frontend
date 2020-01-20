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
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from 'components/Wrapper';
import A from 'components/A';
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Nav from 'components/Header/Nav';
import Welcome from 'components/Header/Welcome';
import BankSidebarThree from 'components/Sidebar/BankSidebarThree';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import MiniPopUp from 'components/MiniPopUp';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import Popup from 'components/Popup';
import SelectInput from 'components/SelectInput';
import BranchWallets from 'components/Sidebar/BranchWallets';

import { API_URL, STATIC_URL, CURRENCY } from '../App/constants';

import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});


const token = localStorage.getItem('bankLogged');
const bid = localStorage.getItem('bankId');
export default class BankCashierList extends Component {
  constructor() {
    super();
    this.state = {
      token,
      loading: true,
      otp: '',
      popup: false,
      showOtp: false,
      
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);


    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
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
    this.setState({ popup: true });
  };
  showEditPopup = (v) => {
    this.setState({ editPopup: true, name: v.name, bcode: v.bcode, working_from: v.working_from, working_to: v.working_to, per_trans_amt: v.per_trans_amt, max_trans_amt: v.max_trans_amt, max_trans_count: v.max_trans_count, cashier_id: v._id});
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
      name: '',
      bcode: '',
      working_from: '',
      working_to: '',
      per_trans_amt: '',
      max_trans_amt: '',
      max_trans_count: '',
      mobile: '',
      credit_limit: '',
      otp: '',
      showOtp: false,
      showEditOtp: false
    });
  };

  countryChange = event => {
    const { value, name } = event.target;
    const title = event.target.options[event.target.selectedIndex].title;

    this.setState({
      [name]: value,
      ccode: title
    });
  };

  addBranch = event => {
    event.preventDefault();

    this.setState({
      addBranchLoading: true
    });

    axios
      .post(`${API_URL  }/addCashier`, this.state)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Cashier added successfully!",
            });
            this.success();
            this.closePopup();
            this.getBranches();
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          addBranchLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          addBranchLoading: false
        });
        this.error();
      });

  };
  editCashier = event => {
    event.preventDefault();

      this.setState(
        {
          showEditOtp: true,
          otpOpt: 'editCashier',
          otpTxt: 'Your OTP to edit Cashier is '
        },
        () => {
          this.generateOTP();
        },
      );
    
  };
  startTimer = () => {
    var dis = this;
    var timer = setInterval(function() {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        var time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };

  generateOTP = () => {
    this.setState({ resend: false, timer: 30 });

    axios
      .post(`${API_URL}/sendOTP`, {
        email: this.state.otpEmail,
        mobile: this.state.otpMobile,
        page: this.state.otpOpt,
        type: 'bank',
        txt: this.state.otpTxt,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              otpId: res.data.id,
              showEditOtp: true,
              notification: 'OTP Sent',
            });
            this.startTimer();
            this.success();
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };
  verifyEditOTP = event => {
    this.setState({
      verifyEditOTPLoading: false
    });
    event.preventDefault();
    axios
      .post(`${API_URL  }/editCashier`, this.state)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Cashier updated successfully!",
            }, function(){
              this.success();
              this.closePopup();
              this.getBranches();
            });
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          verifyEditOTPLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          verifyEditOTPLoading:false
        });
        this.error();
      });
  };

  blockBranch = (e, s) =>{
    var dis = this;
    axios
    .post(`${API_URL  }/updateStatus`, {
      token,
      type_id: e,
      status : s,
      page: 'cashier',
      type: 'bank'
    })
    .then(res => {
      if(res.status == 200){
        if(res.data.error){
          throw res.data.error;
        }else{
          var n = (s == 1) ? 'Unblocked' : 'Blocked';
          this.setState({
            notification: 'Cashier ' + n
          });
          this.success();
          this.getBranches();
        }
      }else{
        const error = new Error(res.data.error);
        throw error;
      }
    })
    .catch(err => {
      this.setState({
        notification: (err.response) ? err.response.data.error : err.toString()
      });
      this.error();
    });

  };

  approve = event => {
    this.setState({
      approveLoading: true
    });
    event.preventDefault();
    axios
      .post(`${API_URL  }/approveFee`, {
        id: this.state.sid,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: 'Approved'
            }, () => {
              this.success();
              this.closeMiniPopUp();
              this.getBranches();
            });
          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          approveLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          approveLoading: false
        });
        this.error();

      });
  };

  decline = event => {
    this.setState({
      declineLoading: true
    });
    event.preventDefault();
    axios
      .post(`${API_URL  }/declineFee`, {
        id: this.state.sid,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: 'Declined'
            }, () => {
              this.success();
              this.closeMiniPopUp();
              this.getBranches();
            });

          }
        }else{
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          declineLoading: false
        });
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString(),
          declineLoading: false
        });
        this.error();
      });
  };


  showWallet = event => {
    event.preventDefault();

  };

  removeFile = key => {
    this.setState({
      [key]: null,
    });
  };

  triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };

  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute("data-key"));
    }
  }

  fileUpload(file, key) {
    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };

    axios
      .post(`${API_URL  }/fileUpload?token=${  token}`, formData, config)
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              [key] : res.data.name
            });
          }
        }else{
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: (err.response) ? err.response.data.error : err.toString()
        });
        this.error();
      });
  }

  getBanks = () => {
    axios
    .post(`${API_URL  }/getOne`, { page: 'branch', type: 'bank', token: token, page_id : this.state.branch_id})
    .then(res => {
      if(res.status == 200){
        console.log(res.data);
        this.setState({ otpEmail: res.data.row.email, otpMobile: res.data.row.mobile, bankName: res.data.row.name });
      }
    })
    .catch(err => {

    });
  };

  getBranches = () => {
    axios
      .post(`${API_URL  }/getAll`, { page: 'cashier', type: 'bank', token: token})
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          this.setState({ loading: false, branches: res.data.rows });
        }
      })
      .catch(err => {

      });
  };


  componentDidMount() {
    console.log(this.props.match.params.branch);
    this.setState({ branch_id: this.props.match.params.branch },() =>{
      this.getBanks();
      this.getBranches();
    })
   
     

  }

  render() {
    console.log(this.props);
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector("label").classList.add("focused");
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

      <Wrapper  from="bank">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cashiers | BANK | E-WALLET</title>
        </Helmet>
        <BankHeader page="branch" middleTitle={this.state.bankName} goto="/bank/branches/"  />
        <Container verticalMargin>
        <BankSidebarThree active="cashier" branchId={this.props.match.params.branch} bankName={this.state.name}/>
          <Main>
          <BranchWallets />
            <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search Branches" />
              </div>


                <Button className="addBankButton" flex onClick={this.showPopup}>
                <i className="material-icons">add</i>
                <span>Create Cashier</span>
                </Button>

            </ActionBar>
            <Card bigPadding>
              <div className="cardHeader" >
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Cashier List</h3>
                  <h5>List of your cahsier</h5>
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                    <th>Cashier Name</th>
                    <th>Cash in Hand</th>
                    <th>Wallet Balance ({CURRENCY})</th>
                    <th>Transaction limit ({CURRENCY})</th>
                    <th>Transaction Count</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      this.state.branches && this.state.branches.length > 0
                        ? this.state.branches.map(function(b) {

                          return <tr key={b._id} ><td>{b.name}</td><td className="tac">0</td><td className="tac">0</td><td className="tac">{b.credit_limit}</td>

                          <td className="tac bold green" >
                            0
                            <span className="absoluteMiddleRight primary popMenuTrigger">
                            <i className="material-icons ">more_vert</i>
                            <div className="popMenu">
                              <A href={"/bank/cashier/"+dis.props.match.params.branch+"/"+b._id}>Cashier Info</A>
                              <span onClick={() => dis.showEditPopup(b)}>Edit</span>
                              {
                                b.status == -1 ?
                                <span onClick={() => dis.blockBranch(b._id, 1)}>Unblock</span>
                                :
                                <span onClick={() => dis.blockBranch(b._id, -1)}>Block</span>
                              }
                            </div>
                            </span>
                          </td></tr>
                        })
                        :
                        null
                    }
                  </tbody>
                </Table>
              </div>
            </Card>
          </Main>
        </Container>
        { this.state.popup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showOtp ?
              <div>
              <h1 ><FormattedMessage {...messages.verify} /></h1>
            <form action="" method="post" onSubmit={this.verifyOTP} >
              <FormGroup>
                <label><FormattedMessage {...messages.otp} />*</label>
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
              {
                this.state.verifyOTPLoading ?
                <Button filledBtn marginTop="50px" disabled>
                <Loader />
              </Button>
                :
                <Button filledBtn marginTop="50px">
                <span><FormattedMessage {...messages.verify} /></span>
              </Button>
              }


              <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to { this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span> }</p>


              </form>
              </div>
              :
              <div>
            <h1>Create Cashier</h1>
            <form action="" method="post" onSubmit={this.addBranch}>
              <FormGroup>
                <label>Cashier Name*</label>
                <TextInput
                  type="text"
                  name="name"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Cashier Code*</label>
                <TextInput
                  type="text"
                  name="bcode"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.bcode}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <label>Working Hours</label>
              <Row>
              
                <Col  cW="30%" mR="2%">

                <FormGroup>
                <label>From*</label>
                  <TextInput
                    type="text"
                    name="working_from"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.working_from}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>

                </Col>
                <Col cW="68%">
                <FormGroup>
                  <label>To*</label>
                  <TextInput
                    type="text"
                    title="10 Digit numeric value"
                    name="working_to"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.working_to}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>

                </Col>
                </Row>
              <FormGroup>
                <label>Maximum per transaction amount*</label>
                <TextInput
                  type="text"
                  name="per_trans_amt"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.per_trans_amt}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Maximum daily transaction amount*</label>
                <TextInput
                  type="text"
                  name="max_trans_amt"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.max_trans_amt}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Maximum daily transaction count*</label>
                <TextInput
                  type="text"
                  name="max_trans_count"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.max_trans_count}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              


                {
                  this.state.addBranchLoading ?
                  <Button filledBtn marginTop="50px" disabled>
                  <Loader />
                  </Button>
                  :
                  <Button filledBtn marginTop="50px">
                  <span>Create Cashier</span>
                  </Button>
                }


            </form>


            </div>
            }
          </Popup>
          : null }

{ this.state.editPopup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {
              this.state.showEditOtp ?
              <div>
              <h1 ><FormattedMessage {...messages.verify} /></h1>
            <form action="" method="post" onSubmit={this.verifyEditOTP} >
              <FormGroup>
                <label><FormattedMessage {...messages.otp} />*</label>
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
              {
                this.verifyEditOTPLoading ?
                <Button filledBtn marginTop="50px" disabled>
                  <Loader />
                </Button>
                :
                <Button filledBtn marginTop="50px">
                  <span><FormattedMessage {...messages.verify} /></span>
                </Button>
              }

              <p className="resend">
                Wait for <span className="timer">{this.state.timer}</span>{' '}
                to{' '}
                {this.state.resend ? (
                  <span className="go" onClick={this.generateOTP}>
                    Resend
                  </span>
                ) : (
                  <span>Resend</span>
                )}
              </p>
              </form>
              </div>
              :
              <div>
            <h1 >Edit Cashier</h1>
            <form action="" method="post" onSubmit={this.editCashier}>
            <FormGroup>
                <label>Cashier Name*</label>
                <TextInput
                  type="text"
                  name="name"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Cashier Code*</label>
                <TextInput
                  type="text"
                  autoFocus
                  name="bcode"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.bcode}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <label>Working Hours</label>
              <Row>
              
                <Col  cW="30%" mR="2%">

                <FormGroup>
                <label>From*</label>
                  <TextInput
                    type="text"
                    autoFocus
                    name="working_from"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.working_from}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>

                </Col>
                <Col cW="68%">
                <FormGroup>
                  <label>To*</label>
                  <TextInput
                    type="text"
                    autoFocus
                    title="10 Digit numeric value"
                    name="working_to"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.working_to}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>

                </Col>
                </Row>
              <FormGroup>
                <label>Maximum per transaction amount*</label>
                <TextInput
                  type="text"
                  name="per_trans_amt"
                  autoFocus
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.per_trans_amt}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Maximum daily transaction amount*</label>
                <TextInput
                  type="text"
                  name="max_trans_amt"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.max_trans_amt}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Maximum daily transaction count*</label>
                <TextInput
                  type="text"
                  name="max_trans_count"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.max_trans_count}
                  autoFocus
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
                    {
                      this.state.editBranchLoading ?
                      <Button filledBtn marginTop="50px" disabled>
                        <Loader />
                      </Button>
                      :
                      <Button filledBtn marginTop="50px">
                      <span>Update Cashier</span>
                    </Button>
                    }

            </form>
            </div>
            }
          </Popup>
          : null }
      </Wrapper>
    );
  }
}
