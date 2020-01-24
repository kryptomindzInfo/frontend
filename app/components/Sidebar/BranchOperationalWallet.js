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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UploadArea from 'components/UploadArea';
import PopupClaimMoney from 'components/PopupClaimMoney';
import PopupSendMoney from 'components/PopupSendMoney';
import SelectInput from 'components/SelectInput';

import history from 'utils/history.js';

import {
  API_URL,
  STATIC_URL,
  CURRENCY,
  CONTRACT_URL,
} from 'containers/App/constants';

import 'react-toastify/dist/ReactToastify.css';
// import Container from 'react-bootstrap/Container';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const token = localStorage.getItem('bankLogged');

class BranchOperationalWallet extends Component {
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
      token,
      contract: '',
      popupSendMoney: false,
      popupClaimMoney: false,
      name: '',
      givenname: '',
      familyname: '',
      note: '',
      senderIdentificationCountry: '',
      senderIdentificationType: '',
      address1: '',
      state: '',
      zip: '',
      bcode: '',
      country: '',
      email: '',
      mobile: '',
      logo: null,
      contract: null,
      otp: '',
      showOtp: false,
      showEditOtp: false,
      receiverMobile: '',
      receiverccode: '+91',
      receiverGivenName: '',
      receiverFamilyName: '',
      receiverCountry: '',
      receiverEmail: '',
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.fileUpload = this.fileUpload.bind(this);
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
            document.getElementById('popfrom').focus();
            document.getElementById('popto').focus();
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
  getData = () => {
    fetch(`http://localhost:4000/restaurants`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData,
        });
      });
  };

  countryChange = event => {
    const { value, name } = event.target;
    const title = event.target.options[event.target.selectedIndex].title;

    this.setState({
      [name]: value,
      ccode: title,
    });
  };

  showPopupSendMoney = () => {
    this.setState({ popupSendMoney: true });
  };
  showEditPopupSendMoney = v => {
    this.setState({
      editPopup: true,
      name: v.name,
      bcode: v.bcode,
      address1: v.address1,
      state: v.state,
      zip: v.zip,
      country: v.country,
      ccode: v.ccode,
      mobile: v.mobile,
      email: v.email,
      logo: v.logo,
      contract: v.contract,
      username: v.username,
      bank_id: v._id,
      receiverMobile: v.receiverMobile,
      receiverccode: v.receiverccode,
      receiverGivenName: v.receiverGivenName,
      receiverFamilyName: v.receiverFamilyName,
      receiverCountry: v.receiverCountry,
      receiverEmail: v.receiverEmail,
    });
  };

  closePopupSendMoney = () => {
    this.setState({
      popupSendMoney: false,
      editPopupSendMoney: false,
      name: '',
      givenname: '',
      familyname: '',
      note: '',
      senderIdentificationCountry: '',
      senderIdentificationType: '',
      address1: '',
      state: '',
      zip: '',
      bcode: '',
      country: '',
      email: '',
      mobile: '',
      logo: null,
      contract: null,
      otp: '',
      showOtp: false,
      showEditOtp: false,
      receiverMobile: '',
      receiverccode: '+91',
      receiverGivenName: '',
      receiverFamilyName: '',
      receiverCountry: '',
      receiverEmail: '',
    });
  };

  closePopup = () => {
    this.setState({
      popup: false,
    });
  };
  closePopupClaimMoney = () => {
    this.setState({
      popupClaimMoney: false,
    });
  };

  addBank = event => {
    event.preventDefault();
    // axios
    //   .post(`${API_URL  }/generateOTP`, {
    //     name: this.state.name,
    //     mobile: this.state.mobile,
    //     page: 'addBank',
    //     token,
    //   })
    //   .then(res => {
    //     if(res.status == 200){
    //       if(res.data.error){
    //         throw res.data.error;
    //       }else{
    //         this.setState({
    //           showOtp: true,
    //           notification: 'OTP Sent'
    //         });
    //         this.success();
    //       }
    //     }else{
    //       const error = new Error(res.data.error);
    //       throw error;
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({
    //       notification: (err.response) ? err.response.data.error : err.toString()
    //     });
    //     this.error();
    //   });
  };

  verifyOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/addBank`, {
        name: this.state.name,
        address1: this.state.address1,
        state: this.state.state,

        zip: this.state.zip,
        country: this.state.country,
        ccode: this.state.ccode,
        email: this.state.email,
        mobile: this.state.mobile,
        logo: this.state.logo,
        contract: this.state.contract,
        otp: this.state.otp,
        token,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              notification: 'Bank added successfully!',
            });
            this.success();
            this.closePopup();
            this.getBanks();
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

  submitMoney = e => {
    e.preventDefault();
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
              this.setState(
                {
                  notification:
                    'Transfer Initiated, You will be notified once done',
                },
                function() {
                  this.success();
                  setTimeout(function() {}, 1000);
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
  showClaimMoneyPopup = () => {
    this.setState({ popupClaimMoney: true });
  };

  componentDidMount() {
    this.setState({
      bank: this.props.historyLink,
    });
  }
  try = () => {
    history.push('/send-money');
  };
  triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };
  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
    }
  }
  saveClaimMoneyDetails = event => {
    event.preventDefault();
    if (this.state.contract == null || this.state.contract == '') {
      this.setState(
        {
          notification: 'You need to upload a contract',
        },
        () => {
          this.error();
        },
      );
    }
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

        <Row>
          <Col>
            <Button className="sendMoneybutton" onClick={this.showPopupSendMoney}>
              <i className="material-icons">send</i> {/* Send Money */}
              <FormattedMessage {...messages.sendmoney} />
            </Button>
          </Col>
          <Col>
            <Button className="sendMoneybutton" onClick={this.showClaimMoneyPopup}>
              <i className="material-icons">send</i> Claim Money
            </Button>
          </Col>
        </Row>

        {this.state.popup ? (
          <Popup close={this.closePopup.bind(this)} roundedCorner>
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
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <p className="note">
                Total available {CURRENCY} {this.state.balance}
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
                * I have read the <a>Terms and Conditions</a>
              </p>

              <Button filledBtn marginTop="50px">
                <span>Proceed</span>
              </Button>
              {/* <p className="note">Total Fee {CURRENCY}200 will be charges</p> */}
            </form>
          </Popup>
        ) : null}

        {this.state.popupClaimMoney ? (
          <PopupClaimMoney
            close={this.closePopupClaimMoney.bind(this)}
            accentedH1
          >
            <h1>
              {/* <FormattedMessage {...messages.addbank} /> */}
              Claim Money
            </h1>
            <form action="" method="post" onSubmit={this.saveClaimMoneyDetails}>
              <Container>
                <Row>
                  <Col sm="12" md="12">
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            Enter the transfer code
                            {/* <FormattedMessage {...messages.popup1} />* */}
                          </label>
                          <TextInput
                            type="text"
                            name="transferCode"
                            pattern=".{3,12}"
                            // title="Minimum 3 characters"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.transferCode}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            ID number
                            {/* <FormattedMessage {...messages.popup1} />* */}
                          </label>
                          <TextInput
                            type="text"
                            name="IDNumber"
                            // pattern="[0-9]"
                            title="Minimum 3 characters"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.IDNumber}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            Amount
                            {/* <FormattedMessage {...messages.popup1} />* */}
                          </label>
                          <TextInput
                            type="text"
                            name="amount"
                            pattern="[0-9]"
                            // title="Minimum 3 characters"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            Note
                            {/* <FormattedMessage {...messages.popup1} />* */}
                          </label>
                          <TextInput
                            type="text"
                            name="note"
                            pattern=".{3,12}"
                            title="Minimum 3 characters"
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                            value={this.state.note}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <p className="note">
                      <span style={{ color: 'red' }}>*</span> I have read the{' '}
                      <a onClick={() => window.open('/termsConditions')}>
                        Terms and Conditions
                      </a>
                    </p>

                    <FormGroup>
                      <UploadArea bgImg={STATIC_URL + 'main/pdf-icon.png'}>
                        {this.state.contract ? (
                          <a
                            className="uploadedImg"
                            href={CONTRACT_URL + this.state.contract}
                            target="_BLANK"
                          />
                        ) : (
                          ' '
                        )}
                        <div
                          className="uploadTrigger"
                          onClick={() => this.triggerBrowse('contract')}
                        >
                          <input
                            type="file"
                            id="contract"
                            onChange={this.onChange}
                            data-key="contract"
                            accept=".pdf"
                          />
                          {!this.state.contract ? (
                            <i className="material-icons">cloud_upload</i>
                          ) : (
                            ' '
                          )}

                          <label>
                            <div className="tooltip">
                              <i
                                className="fa fa-info-circle"
                                style={{ margin: '5px' }}
                              />
                              <span className="tooltiptext">
                                This contract will be uploaded on Blockchain.
                              </span>
                            </div>
                            {!this.state.contract ? (
                              <span>Upload</span>
                            ) : (
                              // <FormattedMessage {...messages.popup10} />
                              <span>Change Contract</span>
                            )}
                            *
                            <p>
                              <span style={{ color: 'red' }}>* </span>Only PDF
                              allowed{' '}
                            </p>
                          </label>
                        </div>
                      </UploadArea>
                    </FormGroup>

                    <Button filledBtn marginTop="20px">
                      <span>
                        Proceed
                        {/* <FormattedMessage {...messages.addbank} /> */}
                      </span>
                    </Button>
                    <br />
                    <p className="note">
                      <span style={{ color: 'red' }}>* </span>
                      Total fee $200 will be charged
                    </p>
                  </Col>
                </Row>
              </Container>
            </form>
          </PopupClaimMoney>
        ) : null}

        {this.state.popupSendMoney ? (
          <PopupSendMoney
            close={this.closePopupSendMoney.bind(this)}
            accentedH1
          >
            <div>
              <h1>
                {/* <FormattedMessage {...messages.addbank} /> */}
                Send Money
              </h1>
              <form
                action=""
                method="post"
                onSubmit={this.saveSendMoneyDetails}
              >
                <Container>
                  <Row>
                    <Col sm="12" md="5">
                      <div
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '20px 0px',
                          color: '#417505',
                        }}
                      >
                        Sender's Info
                      </div>

                      <Row>
                        <Col cW="20%" mR="2%">
                          <FormGroup>
                            <TextInput
                              type="text"
                              name="ccode"
                              readOnly
                              value={this.state.ccode}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col cW="78%">
                          <FormGroup>
                            <label>
                              Mobile Number*
                              {/* <FormattedMessage {...messages.popup7} />* */}
                            </label>
                            <TextInput
                              type="text"
                              pattern="[0-9]{10}"
                              title="10 Digit numeric value"
                              name="mobile"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.mobile}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              Given Name*
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="givenname"
                              pattern=".{3,12}"
                              title="Minimum 3 characters"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.givenname}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Family Name*
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="familyname"
                              pattern=".{3,12}"
                              title="Minimum 3 characters"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.familyname}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <label>
                          Address*
                          {/* <FormattedMessage {...messages.popup2} />* */}
                        </label>
                        <TextInput
                          type="text"
                          name="address1"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.address1}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>

                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              State
                              {/* <FormattedMessage {...messages.popup3} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="state"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.state}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Zip Code
                              {/* <FormattedMessage {...messages.popup4} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="zip"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.zip}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <SelectInput
                              type="text"
                              name="country"
                              value={this.state.country}
                              onChange={this.countryChange}
                              required
                            >
                              <option title="" value="">
                                Select Country*
                              </option>
                              <option title="+213">Algeria</option>
                              <option title="+376">Andorra</option>
                              <option title="+244">Angola</option>
                              <option title="+1264">Anguilla</option>
                              <option title="+1268">
                                Antigua &amp; Barbuda
                              </option>
                              <option title="+54">Argentina</option>
                              <option title="+374">Armenia</option>
                              <option title="+297">Aruba</option>
                              <option title="+61">Australia</option>
                              <option title="+43">Austria</option>
                              <option title="+994">Azerbaijan</option>
                              <option title="+1242">Bahamas</option>
                              <option title="+973">Bahrain</option>
                              <option title="+880">Bangladesh</option>
                              <option title="+1246">Barbados</option>
                              <option title="+375">Belarus</option>
                              <option title="+32">Belgium</option>
                              <option title="+501">Belize</option>
                              <option title="+229">Benin</option>
                              <option title="+1441">Bermuda</option>
                              <option title="+975">Bhutan</option>
                              <option title="+591">Bolivia</option>
                              <option title="+387">Bosnia Herzegovina</option>
                              <option title="+267">Botswana</option>
                              <option title="+55">Brazil</option>
                              <option title="+673">Brunei</option>
                              <option title="+359">Bulgaria</option>
                              <option title="+226">Burkina Faso</option>
                              <option title="+257">Burundi</option>
                              <option title="+855">Cambodia</option>
                              <option title="+237">Cameroon</option>
                              <option title="+1">Canada</option>
                              <option title="+238">Cape Verde Islands</option>
                              <option title="+1345">Cayman Islands</option>
                              <option title="+236">
                                Central African Republic
                              </option>
                              <option title="+56">Chile</option>
                              <option title="+86">China</option>
                              <option title="+57">Colombia</option>
                              <option title="+269">Comoros</option>
                              <option title="+242">Congo</option>
                              <option title="+682">Cook Islands</option>
                              <option title="+506">Costa Rica</option>
                              <option title="+385">Croatia</option>
                              <option title="+53">Cuba</option>
                              <option title="+90392">Cyprus North</option>
                              <option title="+357">Cyprus South</option>
                              <option title="+42">Czech Republic</option>
                              <option title="+45">Denmark</option>
                              <option title="+253">Djibouti</option>
                              <option title="+1809">Dominica</option>
                              <option title="+1809">Dominican Republic</option>
                              <option title="+593">Ecuador</option>
                              <option title="+20">Egypt</option>
                              <option title="+503">El Salvador</option>
                              <option title="+240">Equatorial Guinea</option>
                              <option title="+291">Eritrea</option>
                              <option title="+372">Estonia</option>
                              <option title="+251">Ethiopia</option>
                              <option title="+500">Falkland Islands</option>
                              <option title="+298">Faroe Islands</option>
                              <option title="+679">Fiji</option>
                              <option title="+358">Finland</option>
                              <option title="+33">France</option>
                              <option title="+594">French Guiana</option>
                              <option title="+689">French Polynesia</option>
                              <option title="+241">Gabon</option>
                              <option title="+220">Gambia</option>
                              <option title="+7880">Georgia</option>
                              <option title="+49">Germany</option>
                              <option title="+233">Ghana</option>
                              <option title="+350">Gibraltar</option>
                              <option title="+30">Greece</option>
                              <option title="+299">Greenland</option>
                              <option title="+1473">Grenada</option>
                              <option title="+590">Guadeloupe</option>
                              <option title="+671">Guam</option>
                              <option title="+502">Guatemala</option>
                              <option title="+224">Guinea</option>
                              <option title="+245">Guinea - Bissau</option>
                              <option title="+592">Guyana</option>
                              <option title="+509">Haiti</option>
                              <option title="+504">Honduras</option>
                              <option title="+852">Hong Kong</option>
                              <option title="+36">Hungary</option>
                              <option title="+354">Iceland</option>
                              <option title="+91">India</option>
                              <option title="+62">Indonesia</option>
                              <option title="+98">Iran</option>
                              <option title="+964">Iraq</option>
                              <option title="+353">Ireland</option>
                              <option title="+972">Israel</option>
                              <option title="+39">Italy</option>
                              <option title="+1876">Jamaica</option>
                              <option title="+81">Japan</option>
                              <option title="+962">Jordan</option>
                              <option title="+7">Kazakhstan</option>
                              <option title="+254">Kenya</option>
                              <option title="+686">Kiribati</option>
                              <option title="+850">Korea North</option>
                              <option title="+82">Korea South</option>
                              <option title="+965">Kuwait</option>
                              <option title="+996">Kyrgyzstan</option>
                              <option title="+856">Laos</option>
                              <option title="+371">Latvia</option>
                              <option title="+961">Lebanon</option>
                              <option title="+266">Lesotho</option>
                              <option title="+231">Liberia</option>
                              <option title="+218">Libya</option>
                              <option title="+417">Liechtenstein</option>
                              <option title="+370">Lithuania</option>
                              <option title="+352">Luxembourg</option>
                              <option title="+853">Macao</option>
                              <option title="+389">Macedonia</option>
                              <option title="+261">Madagascar</option>
                              <option title="+265">Malawi</option>
                              <option title="+60">Malaysia</option>
                              <option title="+960">Maldives</option>
                              <option title="+223">Mali</option>
                              <option title="+356">Malta</option>
                              <option title="+692">Marshall Islands</option>
                              <option title="+596">Martinique</option>
                              <option title="+222">Mauritania</option>
                              <option title="+269">Mayotte</option>
                              <option title="+52">Mexico</option>
                              <option title="+691">Micronesia</option>
                              <option title="+373">Moldova</option>
                              <option title="+377">Monaco</option>
                              <option title="+976">Mongolia</option>
                              <option title="+1664">Montserrat</option>
                              <option title="+212">Morocco</option>
                              <option title="+258">Mozambique</option>
                              <option title="+95">Myanmar</option>
                              <option title="+264">Namibia</option>
                              <option title="+674">Nauru</option>
                              <option title="+977">Nepal</option>
                              <option title="+31">Netherlands</option>
                              <option title="+687">New Caledonia</option>
                              <option title="+64">New Zealand</option>
                              <option title="+505">Nicaragua</option>
                              <option title="+227">Niger</option>
                              <option title="+234">Nigeria</option>
                              <option title="+683">Niue</option>
                              <option title="+672">Norfolk Islands</option>
                              <option title="+670">Northern Marianas</option>
                              <option title="+47">Norway</option>
                              <option title="+968">Oman</option>
                              <option title="+680">Palau</option>
                              <option title="+507">Panama</option>
                              <option title="+675">Papua New Guinea</option>
                              <option title="+595">Paraguay</option>
                              <option title="+51">Peru</option>
                              <option title="+63">Philippines</option>
                              <option title="+48">Poland</option>
                              <option title="+351">Portugal</option>
                              <option title="+1787">Puerto Rico</option>
                              <option title="+974">Qatar</option>
                              <option title="+262">Reunion</option>
                              <option title="+40">Romania</option>
                              <option title="+7">Russia</option>
                              <option title="+250">Rwanda</option>
                              <option title="+378">San Marino</option>
                              <option title="+239">
                                Sao Tome &amp; Principe
                              </option>
                              <option title="+966">Saudi Arabia</option>
                              <option title="+221">Senegal</option>
                              <option title="+381">Serbia</option>
                              <option title="+248">Seychelles</option>
                              <option title="+232">Sierra Leone</option>
                              <option title="+65">Singapore</option>
                              <option title="+421">Slovak Republic</option>
                              <option title="+386">Slovenia</option>
                              <option title="+677">Solomon Islands</option>
                              <option title="+252">Somalia</option>
                              <option title="+27">South Africa</option>
                              <option title="+34">Spain</option>
                              <option title="+94">Sri Lanka</option>
                              <option title="+290">St. Helena</option>
                              <option title="+1869">St. Kitts</option>
                              <option title="+1758">St. Lucia</option>
                              <option title="+249">Sudan</option>
                              <option title="+597">Suriname</option>
                              <option title="+268">Swaziland</option>
                              <option title="+46">Sweden</option>
                              <option title="+41">Switzerland</option>
                              <option title="+963">Syria</option>
                              <option title="+886">Taiwan</option>
                              <option title="+7">Tajikstan</option>
                              <option title="+66">Thailand</option>
                              <option title="+228">Togo</option>
                              <option title="+676">Tonga</option>
                              <option title="+1868">
                                Trinidad &amp; Tobago
                              </option>
                              <option title="+216">Tunisia</option>
                              <option title="+90">Turkey</option>
                              <option title="+7">Turkmenistan</option>
                              <option title="+993">Turkmenistan</option>
                              <option title="+1649">
                                Turks &amp; Caicos Islands
                              </option>
                              <option title="+688">Tuvalu</option>
                              <option title="+256">Uganda</option>
                              <option title="+44">UK</option>
                              <option title="+380">Ukraine</option>
                              <option title="+971">United Arab Emirates</option>
                              <option title="+598">Uruguay</option>
                              <option title="+1">USA</option>
                              <option title="+7">Uzbekistan</option>
                              <option title="+678">Vanuatu</option>
                              <option title="+379">Vatican City</option>
                              <option title="+58">Venezuela</option>
                              <option title="+84">Vietnam</option>
                              <option title="+84">
                                Virgin Islands - British
                              </option>
                              <option title="+84">Virgin Islands - US</option>
                              <option title="+681">Wallis &amp; Futuna</option>
                              <option title="+969">Yemen</option>
                              <option title="+967">Yemen</option>
                              <option title="+260">Zambia</option>
                              <option title="+263">Zimbabwe</option>
                            </SelectInput>
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <label>
                              Authorised Email*
                              {/* <FormattedMessage {...messages.popup8} />* */}
                            </label>
                            <TextInput
                              type="email"
                              name="email"
                              pattern="(^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$)"
                              onInput={e => e.target.setCustomValidity('')}
                              onInvalid={e =>
                                e.target.setCustomValidity(
                                  'Enter a valid email address',
                                )
                              }
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.email}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        {/* <form.Group controlId="exampleForm.ControlTextarea1">
                        <form.Label>Example textarea</form.Label>
                        <form.Control as="textarea" rows="3" />
                      </form.Group> */}
                      </Row>
                      <FormGroup>
                        <label>
                          Note
                          {/* <FormattedMessage {...messages.popup2} />* */}
                        </label>
                        <TextInput
                          multiline={true}
                          numberOfLines={3}
                          type="text"
                          name="note"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.note}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                      <div
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '10px 0px',
                        }}
                      >
                        Sender's Identification
                      </div>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              Country
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="senderIdentificationCountry"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.senderIdentificationCountry}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Type
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="senderIdentificationType"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.senderIdentificationType}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              Number
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="senderIdentificationNumber"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.senderIdentificationNumber}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Valid till
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="senderIdentificationValidTill"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.senderIdentificationValidTill}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" md="2" />
                    <Col sm="12" md="5">
                      <div
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '25px 0px',
                          color: '#417505',
                        }}
                      >
                        Receiver's Info
                      </div>
                      <Row>
                        <Col cW="20%" mR="2%">
                          <FormGroup>
                            <TextInput
                              type="text"
                              name="receiverccode"
                              readOnly
                              value={this.state.receiverccode}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col cW="78%">
                          <FormGroup>
                            <label>
                              Mobile Number*
                              {/* <FormattedMessage {...messages.popup7} />* */}
                            </label>
                            <TextInput
                              type="text"
                              pattern="[0-9]{10}"
                              title="10 Digit numeric value"
                              name="receiverMobile"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverMobile}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              Given Name*
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="receiverGivenName"
                              pattern=".{3,12}"
                              title="Minimum 3 characters"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverGivenName}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Family Name*
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="receiverFamilyName"
                              pattern=".{3,12}"
                              title="Minimum 3 characters"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverFamilyName}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <SelectInput
                              type="text"
                              name="receiverCountry"
                              value={this.state.receiverCountry}
                              onChange={this.countryChange}
                              required
                            >
                              <option title="" value="">
                                Select Country*
                              </option>
                              <option title="+213">Algeria</option>
                              <option title="+376">Andorra</option>
                              <option title="+244">Angola</option>
                              <option title="+1264">Anguilla</option>
                              <option title="+1268">
                                Antigua &amp; Barbuda
                              </option>
                              <option title="+54">Argentina</option>
                              <option title="+374">Armenia</option>
                              <option title="+297">Aruba</option>
                              <option title="+61">Australia</option>
                              <option title="+43">Austria</option>
                              <option title="+994">Azerbaijan</option>
                              <option title="+1242">Bahamas</option>
                              <option title="+973">Bahrain</option>
                              <option title="+880">Bangladesh</option>
                              <option title="+1246">Barbados</option>
                              <option title="+375">Belarus</option>
                              <option title="+32">Belgium</option>
                              <option title="+501">Belize</option>
                              <option title="+229">Benin</option>
                              <option title="+1441">Bermuda</option>
                              <option title="+975">Bhutan</option>
                              <option title="+591">Bolivia</option>
                              <option title="+387">Bosnia Herzegovina</option>
                              <option title="+267">Botswana</option>
                              <option title="+55">Brazil</option>
                              <option title="+673">Brunei</option>
                              <option title="+359">Bulgaria</option>
                              <option title="+226">Burkina Faso</option>
                              <option title="+257">Burundi</option>
                              <option title="+855">Cambodia</option>
                              <option title="+237">Cameroon</option>
                              <option title="+1">Canada</option>
                              <option title="+238">Cape Verde Islands</option>
                              <option title="+1345">Cayman Islands</option>
                              <option title="+236">
                                Central African Republic
                              </option>
                              <option title="+56">Chile</option>
                              <option title="+86">China</option>
                              <option title="+57">Colombia</option>
                              <option title="+269">Comoros</option>
                              <option title="+242">Congo</option>
                              <option title="+682">Cook Islands</option>
                              <option title="+506">Costa Rica</option>
                              <option title="+385">Croatia</option>
                              <option title="+53">Cuba</option>
                              <option title="+90392">Cyprus North</option>
                              <option title="+357">Cyprus South</option>
                              <option title="+42">Czech Republic</option>
                              <option title="+45">Denmark</option>
                              <option title="+253">Djibouti</option>
                              <option title="+1809">Dominica</option>
                              <option title="+1809">Dominican Republic</option>
                              <option title="+593">Ecuador</option>
                              <option title="+20">Egypt</option>
                              <option title="+503">El Salvador</option>
                              <option title="+240">Equatorial Guinea</option>
                              <option title="+291">Eritrea</option>
                              <option title="+372">Estonia</option>
                              <option title="+251">Ethiopia</option>
                              <option title="+500">Falkland Islands</option>
                              <option title="+298">Faroe Islands</option>
                              <option title="+679">Fiji</option>
                              <option title="+358">Finland</option>
                              <option title="+33">France</option>
                              <option title="+594">French Guiana</option>
                              <option title="+689">French Polynesia</option>
                              <option title="+241">Gabon</option>
                              <option title="+220">Gambia</option>
                              <option title="+7880">Georgia</option>
                              <option title="+49">Germany</option>
                              <option title="+233">Ghana</option>
                              <option title="+350">Gibraltar</option>
                              <option title="+30">Greece</option>
                              <option title="+299">Greenland</option>
                              <option title="+1473">Grenada</option>
                              <option title="+590">Guadeloupe</option>
                              <option title="+671">Guam</option>
                              <option title="+502">Guatemala</option>
                              <option title="+224">Guinea</option>
                              <option title="+245">Guinea - Bissau</option>
                              <option title="+592">Guyana</option>
                              <option title="+509">Haiti</option>
                              <option title="+504">Honduras</option>
                              <option title="+852">Hong Kong</option>
                              <option title="+36">Hungary</option>
                              <option title="+354">Iceland</option>
                              <option title="+91">India</option>
                              <option title="+62">Indonesia</option>
                              <option title="+98">Iran</option>
                              <option title="+964">Iraq</option>
                              <option title="+353">Ireland</option>
                              <option title="+972">Israel</option>
                              <option title="+39">Italy</option>
                              <option title="+1876">Jamaica</option>
                              <option title="+81">Japan</option>
                              <option title="+962">Jordan</option>
                              <option title="+7">Kazakhstan</option>
                              <option title="+254">Kenya</option>
                              <option title="+686">Kiribati</option>
                              <option title="+850">Korea North</option>
                              <option title="+82">Korea South</option>
                              <option title="+965">Kuwait</option>
                              <option title="+996">Kyrgyzstan</option>
                              <option title="+856">Laos</option>
                              <option title="+371">Latvia</option>
                              <option title="+961">Lebanon</option>
                              <option title="+266">Lesotho</option>
                              <option title="+231">Liberia</option>
                              <option title="+218">Libya</option>
                              <option title="+417">Liechtenstein</option>
                              <option title="+370">Lithuania</option>
                              <option title="+352">Luxembourg</option>
                              <option title="+853">Macao</option>
                              <option title="+389">Macedonia</option>
                              <option title="+261">Madagascar</option>
                              <option title="+265">Malawi</option>
                              <option title="+60">Malaysia</option>
                              <option title="+960">Maldives</option>
                              <option title="+223">Mali</option>
                              <option title="+356">Malta</option>
                              <option title="+692">Marshall Islands</option>
                              <option title="+596">Martinique</option>
                              <option title="+222">Mauritania</option>
                              <option title="+269">Mayotte</option>
                              <option title="+52">Mexico</option>
                              <option title="+691">Micronesia</option>
                              <option title="+373">Moldova</option>
                              <option title="+377">Monaco</option>
                              <option title="+976">Mongolia</option>
                              <option title="+1664">Montserrat</option>
                              <option title="+212">Morocco</option>
                              <option title="+258">Mozambique</option>
                              <option title="+95">Myanmar</option>
                              <option title="+264">Namibia</option>
                              <option title="+674">Nauru</option>
                              <option title="+977">Nepal</option>
                              <option title="+31">Netherlands</option>
                              <option title="+687">New Caledonia</option>
                              <option title="+64">New Zealand</option>
                              <option title="+505">Nicaragua</option>
                              <option title="+227">Niger</option>
                              <option title="+234">Nigeria</option>
                              <option title="+683">Niue</option>
                              <option title="+672">Norfolk Islands</option>
                              <option title="+670">Northern Marianas</option>
                              <option title="+47">Norway</option>
                              <option title="+968">Oman</option>
                              <option title="+680">Palau</option>
                              <option title="+507">Panama</option>
                              <option title="+675">Papua New Guinea</option>
                              <option title="+595">Paraguay</option>
                              <option title="+51">Peru</option>
                              <option title="+63">Philippines</option>
                              <option title="+48">Poland</option>
                              <option title="+351">Portugal</option>
                              <option title="+1787">Puerto Rico</option>
                              <option title="+974">Qatar</option>
                              <option title="+262">Reunion</option>
                              <option title="+40">Romania</option>
                              <option title="+7">Russia</option>
                              <option title="+250">Rwanda</option>
                              <option title="+378">San Marino</option>
                              <option title="+239">
                                Sao Tome &amp; Principe
                              </option>
                              <option title="+966">Saudi Arabia</option>
                              <option title="+221">Senegal</option>
                              <option title="+381">Serbia</option>
                              <option title="+248">Seychelles</option>
                              <option title="+232">Sierra Leone</option>
                              <option title="+65">Singapore</option>
                              <option title="+421">Slovak Republic</option>
                              <option title="+386">Slovenia</option>
                              <option title="+677">Solomon Islands</option>
                              <option title="+252">Somalia</option>
                              <option title="+27">South Africa</option>
                              <option title="+34">Spain</option>
                              <option title="+94">Sri Lanka</option>
                              <option title="+290">St. Helena</option>
                              <option title="+1869">St. Kitts</option>
                              <option title="+1758">St. Lucia</option>
                              <option title="+249">Sudan</option>
                              <option title="+597">Suriname</option>
                              <option title="+268">Swaziland</option>
                              <option title="+46">Sweden</option>
                              <option title="+41">Switzerland</option>
                              <option title="+963">Syria</option>
                              <option title="+886">Taiwan</option>
                              <option title="+7">Tajikstan</option>
                              <option title="+66">Thailand</option>
                              <option title="+228">Togo</option>
                              <option title="+676">Tonga</option>
                              <option title="+1868">
                                Trinidad &amp; Tobago
                              </option>
                              <option title="+216">Tunisia</option>
                              <option title="+90">Turkey</option>
                              <option title="+7">Turkmenistan</option>
                              <option title="+993">Turkmenistan</option>
                              <option title="+1649">
                                Turks &amp; Caicos Islands
                              </option>
                              <option title="+688">Tuvalu</option>
                              <option title="+256">Uganda</option>
                              <option title="+44">UK</option>
                              <option title="+380">Ukraine</option>
                              <option title="+971">United Arab Emirates</option>
                              <option title="+598">Uruguay</option>
                              <option title="+1">USA</option>
                              <option title="+7">Uzbekistan</option>
                              <option title="+678">Vanuatu</option>
                              <option title="+379">Vatican City</option>
                              <option title="+58">Venezuela</option>
                              <option title="+84">Vietnam</option>
                              <option title="+84">
                                Virgin Islands - British
                              </option>
                              <option title="+84">Virgin Islands - US</option>
                              <option title="+681">Wallis &amp; Futuna</option>
                              <option title="+969">Yemen</option>
                              <option title="+967">Yemen</option>
                              <option title="+260">Zambia</option>
                              <option title="+263">Zimbabwe</option>
                            </SelectInput>
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <label>
                              Authorised Email*
                              {/* <FormattedMessage {...messages.popup8} />* */}
                            </label>
                            <TextInput
                              type="email"
                              name="receiverEmail"
                              pattern="(^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$)"
                              onInput={e => e.target.setCustomValidity('')}
                              onInvalid={e =>
                                e.target.setCustomValidity(
                                  'Enter a valid email address',
                                )
                              }
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverEmail}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        {/* <form.Group controlId="exampleForm.ControlTextarea1">
                        <form.Label>Example textarea</form.Label>
                        <form.Control as="textarea" rows="3" />
                      </form.Group> */}
                      </Row>
                      <div
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '20px 0px',
                        }}
                      >
                        Receiver's Identification
                      </div>
                      <Row>
                        <Col>
                        <FormGroup>
                            <SelectInput
                              type="text"
                              name="receiverIdentificationCountry"
                              value={this.state.receiverIdentificationCountry}
                              onChange={this.countryChange}
                              required
                            >
                              <option title="" value="">
                                Select Country*
                              </option>
                              <option title="+213">Algeria</option>
                              <option title="+376">Andorra</option>
                              <option title="+244">Angola</option>
                              <option title="+1264">Anguilla</option>
                              <option title="+1268">
                                Antigua &amp; Barbuda
                              </option>
                              <option title="+54">Argentina</option>
                              <option title="+374">Armenia</option>
                              <option title="+297">Aruba</option>
                              <option title="+61">Australia</option>
                              <option title="+43">Austria</option>
                              <option title="+994">Azerbaijan</option>
                              <option title="+1242">Bahamas</option>
                              <option title="+973">Bahrain</option>
                              <option title="+880">Bangladesh</option>
                              <option title="+1246">Barbados</option>
                              <option title="+375">Belarus</option>
                              <option title="+32">Belgium</option>
                              <option title="+501">Belize</option>
                              <option title="+229">Benin</option>
                              <option title="+1441">Bermuda</option>
                              <option title="+975">Bhutan</option>
                              <option title="+591">Bolivia</option>
                              <option title="+387">Bosnia Herzegovina</option>
                              <option title="+267">Botswana</option>
                              <option title="+55">Brazil</option>
                              <option title="+673">Brunei</option>
                              <option title="+359">Bulgaria</option>
                              <option title="+226">Burkina Faso</option>
                              <option title="+257">Burundi</option>
                              <option title="+855">Cambodia</option>
                              <option title="+237">Cameroon</option>
                              <option title="+1">Canada</option>
                              <option title="+238">Cape Verde Islands</option>
                              <option title="+1345">Cayman Islands</option>
                              <option title="+236">
                                Central African Republic
                              </option>
                              <option title="+56">Chile</option>
                              <option title="+86">China</option>
                              <option title="+57">Colombia</option>
                              <option title="+269">Comoros</option>
                              <option title="+242">Congo</option>
                              <option title="+682">Cook Islands</option>
                              <option title="+506">Costa Rica</option>
                              <option title="+385">Croatia</option>
                              <option title="+53">Cuba</option>
                              <option title="+90392">Cyprus North</option>
                              <option title="+357">Cyprus South</option>
                              <option title="+42">Czech Republic</option>
                              <option title="+45">Denmark</option>
                              <option title="+253">Djibouti</option>
                              <option title="+1809">Dominica</option>
                              <option title="+1809">Dominican Republic</option>
                              <option title="+593">Ecuador</option>
                              <option title="+20">Egypt</option>
                              <option title="+503">El Salvador</option>
                              <option title="+240">Equatorial Guinea</option>
                              <option title="+291">Eritrea</option>
                              <option title="+372">Estonia</option>
                              <option title="+251">Ethiopia</option>
                              <option title="+500">Falkland Islands</option>
                              <option title="+298">Faroe Islands</option>
                              <option title="+679">Fiji</option>
                              <option title="+358">Finland</option>
                              <option title="+33">France</option>
                              <option title="+594">French Guiana</option>
                              <option title="+689">French Polynesia</option>
                              <option title="+241">Gabon</option>
                              <option title="+220">Gambia</option>
                              <option title="+7880">Georgia</option>
                              <option title="+49">Germany</option>
                              <option title="+233">Ghana</option>
                              <option title="+350">Gibraltar</option>
                              <option title="+30">Greece</option>
                              <option title="+299">Greenland</option>
                              <option title="+1473">Grenada</option>
                              <option title="+590">Guadeloupe</option>
                              <option title="+671">Guam</option>
                              <option title="+502">Guatemala</option>
                              <option title="+224">Guinea</option>
                              <option title="+245">Guinea - Bissau</option>
                              <option title="+592">Guyana</option>
                              <option title="+509">Haiti</option>
                              <option title="+504">Honduras</option>
                              <option title="+852">Hong Kong</option>
                              <option title="+36">Hungary</option>
                              <option title="+354">Iceland</option>
                              <option title="+91">India</option>
                              <option title="+62">Indonesia</option>
                              <option title="+98">Iran</option>
                              <option title="+964">Iraq</option>
                              <option title="+353">Ireland</option>
                              <option title="+972">Israel</option>
                              <option title="+39">Italy</option>
                              <option title="+1876">Jamaica</option>
                              <option title="+81">Japan</option>
                              <option title="+962">Jordan</option>
                              <option title="+7">Kazakhstan</option>
                              <option title="+254">Kenya</option>
                              <option title="+686">Kiribati</option>
                              <option title="+850">Korea North</option>
                              <option title="+82">Korea South</option>
                              <option title="+965">Kuwait</option>
                              <option title="+996">Kyrgyzstan</option>
                              <option title="+856">Laos</option>
                              <option title="+371">Latvia</option>
                              <option title="+961">Lebanon</option>
                              <option title="+266">Lesotho</option>
                              <option title="+231">Liberia</option>
                              <option title="+218">Libya</option>
                              <option title="+417">Liechtenstein</option>
                              <option title="+370">Lithuania</option>
                              <option title="+352">Luxembourg</option>
                              <option title="+853">Macao</option>
                              <option title="+389">Macedonia</option>
                              <option title="+261">Madagascar</option>
                              <option title="+265">Malawi</option>
                              <option title="+60">Malaysia</option>
                              <option title="+960">Maldives</option>
                              <option title="+223">Mali</option>
                              <option title="+356">Malta</option>
                              <option title="+692">Marshall Islands</option>
                              <option title="+596">Martinique</option>
                              <option title="+222">Mauritania</option>
                              <option title="+269">Mayotte</option>
                              <option title="+52">Mexico</option>
                              <option title="+691">Micronesia</option>
                              <option title="+373">Moldova</option>
                              <option title="+377">Monaco</option>
                              <option title="+976">Mongolia</option>
                              <option title="+1664">Montserrat</option>
                              <option title="+212">Morocco</option>
                              <option title="+258">Mozambique</option>
                              <option title="+95">Myanmar</option>
                              <option title="+264">Namibia</option>
                              <option title="+674">Nauru</option>
                              <option title="+977">Nepal</option>
                              <option title="+31">Netherlands</option>
                              <option title="+687">New Caledonia</option>
                              <option title="+64">New Zealand</option>
                              <option title="+505">Nicaragua</option>
                              <option title="+227">Niger</option>
                              <option title="+234">Nigeria</option>
                              <option title="+683">Niue</option>
                              <option title="+672">Norfolk Islands</option>
                              <option title="+670">Northern Marianas</option>
                              <option title="+47">Norway</option>
                              <option title="+968">Oman</option>
                              <option title="+680">Palau</option>
                              <option title="+507">Panama</option>
                              <option title="+675">Papua New Guinea</option>
                              <option title="+595">Paraguay</option>
                              <option title="+51">Peru</option>
                              <option title="+63">Philippines</option>
                              <option title="+48">Poland</option>
                              <option title="+351">Portugal</option>
                              <option title="+1787">Puerto Rico</option>
                              <option title="+974">Qatar</option>
                              <option title="+262">Reunion</option>
                              <option title="+40">Romania</option>
                              <option title="+7">Russia</option>
                              <option title="+250">Rwanda</option>
                              <option title="+378">San Marino</option>
                              <option title="+239">
                                Sao Tome &amp; Principe
                              </option>
                              <option title="+966">Saudi Arabia</option>
                              <option title="+221">Senegal</option>
                              <option title="+381">Serbia</option>
                              <option title="+248">Seychelles</option>
                              <option title="+232">Sierra Leone</option>
                              <option title="+65">Singapore</option>
                              <option title="+421">Slovak Republic</option>
                              <option title="+386">Slovenia</option>
                              <option title="+677">Solomon Islands</option>
                              <option title="+252">Somalia</option>
                              <option title="+27">South Africa</option>
                              <option title="+34">Spain</option>
                              <option title="+94">Sri Lanka</option>
                              <option title="+290">St. Helena</option>
                              <option title="+1869">St. Kitts</option>
                              <option title="+1758">St. Lucia</option>
                              <option title="+249">Sudan</option>
                              <option title="+597">Suriname</option>
                              <option title="+268">Swaziland</option>
                              <option title="+46">Sweden</option>
                              <option title="+41">Switzerland</option>
                              <option title="+963">Syria</option>
                              <option title="+886">Taiwan</option>
                              <option title="+7">Tajikstan</option>
                              <option title="+66">Thailand</option>
                              <option title="+228">Togo</option>
                              <option title="+676">Tonga</option>
                              <option title="+1868">
                                Trinidad &amp; Tobago
                              </option>
                              <option title="+216">Tunisia</option>
                              <option title="+90">Turkey</option>
                              <option title="+7">Turkmenistan</option>
                              <option title="+993">Turkmenistan</option>
                              <option title="+1649">
                                Turks &amp; Caicos Islands
                              </option>
                              <option title="+688">Tuvalu</option>
                              <option title="+256">Uganda</option>
                              <option title="+44">UK</option>
                              <option title="+380">Ukraine</option>
                              <option title="+971">United Arab Emirates</option>
                              <option title="+598">Uruguay</option>
                              <option title="+1">USA</option>
                              <option title="+7">Uzbekistan</option>
                              <option title="+678">Vanuatu</option>
                              <option title="+379">Vatican City</option>
                              <option title="+58">Venezuela</option>
                              <option title="+84">Vietnam</option>
                              <option title="+84">
                                Virgin Islands - British
                              </option>
                              <option title="+84">Virgin Islands - US</option>
                              <option title="+681">Wallis &amp; Futuna</option>
                              <option title="+969">Yemen</option>
                              <option title="+967">Yemen</option>
                              <option title="+260">Zambia</option>
                              <option title="+263">Zimbabwe</option>
                            </SelectInput>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Type
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="receiverIdentificationType"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverIdentificationType}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>
                              Number
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="receiverIdentificationNumber"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverIdentificationNumber}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label>
                              Valid till
                              {/* <FormattedMessage {...messages.popup1} />* */}
                            </label>
                            <TextInput
                              type="text"
                              name="receiverIdentificationValidTill"
                              onFocus={inputFocus}
                              onBlur={inputBlur}
                              value={this.state.receiverIdentificationValidTill}
                              onChange={this.handleInputChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label>
                          Amount
                          {/* <FormattedMessage {...messages.popup1} />* */}
                        </label>
                        <TextInput
                          type="text"
                          // pattern="[0-9]"
                          name="receiverIdentificationAmount"
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                          value={this.state.receiverIdentificationAmount}
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                      <p className="note">
                        <span style={{ color: 'red' }}>* </span>
                        Pay without requiring physical ID
                      </p>
                      <Button filledBtn marginTop="20px">
                        <span>
                          Proceed
                          {/* <FormattedMessage {...messages.addbank} /> */}
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </div>
          </PopupSendMoney>
        ) : null}
      </Card>
    );
  }
}

export default BranchOperationalWallet;
