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
import SelectInput from 'components/SelectInput';
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

import { API_URL, STATIC_URL, CONTRACT_URL } from '../App/constants';

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


var permissions = localStorage.getItem('permissions');
if(permissions != 'all' && permissions != ''){
permissions = JSON.parse(permissions);
}

export default class InfraProfile extends Component {
  constructor() {
    super();
    this.state = {
      bank: '',
      name: '',
      username: '',
      password: '',
      mobile: '',
      email: '',
      ccode: '',
      loading: true,
      redirect: false,      
      notification: 'Welcome',
      popup: false,
      user_id: token,
      banks: [],
      rules: [],
      otp: '',
      profile: [],
      permissions,
      showOtp: false
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.onChange = this.onChange.bind(this);

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
    //, name: v.name, address1: v.address1, state: v.state, zip: v.zip, country: v.country, ccode: v.ccode, mobile: v.mobile, email: v.email, logo: v.logo, contract: v.contract, username: v.username, bank_id: v._id
    this.setState({ popup: true});
  };

  editBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/generateOTP`, {
        name: this.state.name,
        page: 'editBank',
        username: this.state.username,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              otpId: res.data.id,
              showEditOtp: true,
              notification: 'OTP Sent'
            });
            this.success();
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

  verifyEditOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/editBank`, {
        name: this.state.name,
        address1: this.state.address1,
        state: this.state.state,
        zip: this.state.zip,
        bank_id: this.state.bank_id,
        country: this.state.country,
        ccode: this.state.ccode,
        email: this.state.email,
        mobile: this.state.mobile,
        logo: this.state.logo,
        contract: this.state.contract,
        otp: this.state.otp,
        otp_id: this.state.otpId,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank updated successfully!",
            });
            this.success();
            this.closePopup();
            this.getBanks();
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



  closePopup = () => {
    this.setState({
      popup: false,
      showEditOtp: false,
      name: '',
      mobile: '',
      email: '',
      username: '',
      ccode: '',
      password: ''
    });
  };

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
  };

  addBank = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/generateOTP`, {
        name: this.state.name,
        mobile: this.state.mobile,
        page: 'addBank',
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              showOtp: true,
              notification: 'OTP Sent'
            });
            this.success();
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

  editProfile = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/editInfraProfile`, {
        name: this.state.name,
        mobile: this.state.mobile,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        ccode: this.state.ccode,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Profile updated successfully!",
            }, () => {
              this.success();
              this.closePopup();
              this.getProfile();
            });
            
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

 

  getBanks = () => {
    axios
      .post(`${API_URL  }/getBank`, { token:token, bank_id: this.props.match.params.bank })
      .then(res => {
        if(res.status == 200){
          this.setState({ loading: false, banks: res.data.banks, logo: res.data.banks.logo, name: res.data.banks.name, address1: res.data.banks.address1, state: res.data.banks.state, zip: res.data.banks.zip, country: res.data.banks.country, ccode: res.data.banks.ccode, mobile: res.data.banks.mobile, email: res.data.banks.email, logo: res.data.banks.logo, contract: res.data.banks.contract, username: res.data.banks.contract, bank_id: res.data.banks._id, username: res.data.banks.username  });
        }
      })
      .catch(err => {

      });
  };


  getProfile = () => {
    axios
      .post(`${API_URL  }/getProfile`, { token:token })
      .then(res => {
        if(res.status == 200){
          this.setState({ loading: false, profile: res.data.users, name: res.data.users.name,  username: res.data.users.username,  email: res.data.users.email,  mobile: res.data.users.mobile,  ccode: res.data.users.ccode }, () => {
            console.log(this.state.profile);
          });
        }
      })
      .catch(err => {

      });
  };



  componentDidMount() {
    this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      this.setState({ loading: false });
      this.getProfile();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  render() {

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
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />
    }

    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="" />
        <Container verticalMargin>
          {/* <SidebarTwo bankId={this.state.bank}/> */}
          <Main fullWidth >
            {
              (this.state.permissions == "all" || this.state.permissions.create_fee) ?
            <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">

              <Button className="fr" flex onClick={this.showPopup}>
                <span>Edit</span>
              </Button>
            </ActionBar>
            :
            null
}

            <Card bigPadding bordered>

              <div className="cardBody">
                <Row>
                  <Col className="infoLeft">
                  Name
                  </Col>
                  <Col className="infoRight">
                  {this.state.profile.name}
                  </Col>
                </Row>

                <Row>
                  <Col className="infoLeft">
                  User Id
                  </Col>
                  <Col className="infoRight">
                  {this.state.profile.username}
                  </Col>
                </Row>

                <Row>
                  <Col className="infoLeft">
                  Password
                  </Col>
                  <Col className="infoRight">
                  Change Only
                  </Col>
                </Row>

                <Row>
                  <Col className="infoLeft">
                  Mobile
                  </Col>
                  <Col className="infoRight">
                  {this.state.profile.mobile}
                  </Col>
                </Row>

                <Row>
                  <Col className="infoLeft">
                Country Code
                  </Col>
                  <Col className="infoRight">
                  {this.state.profile.ccode}
                  </Col>
                </Row>

                <Row>
                  <Col className="infoLeft">
                  Email
                  </Col>
                  <Col className="infoRight">
                  {this.state.profile.email}
                  </Col>
                </Row>



              </div>
            </Card>
          </Main>
        </Container>
        { this.state.popup ?
          <Popup close={this.closePopup.bind(this)} accentedH1>
            <h1 >Edit Profile</h1>
            <form action="" method="post" onSubmit={this.editProfile}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} /></label>
                <TextInput
                  type="text"
                  name="name"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  value={this.state.name}
                  autoFocus
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>User Id</label>
                <TextInput
                  type="text"
                  name="username"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Password <small className="small">(Leave blank if you don't want to change)</small></label>
                <TextInput
                  type="password"
                  name="password"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  
                />
              </FormGroup>

              <FormGroup>
                <label>Email</label>
                <TextInput
                  type="text"
                  name="email"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              <Row>
                <Col  cW="20%" mR="2%">
                <FormGroup>
                <SelectInput
                  type="text"
                  autoFocus
                  name="ccode"
                  value={this.state.ccode}
                  onChange={this.handleInputChange}
                  required
                >
                	    <option data-countryCode="DZ" value="213">+213</option>
		<option data-countryCode="AD" value="376">+376</option>
		<option data-countryCode="AO" value="244">+244</option>
		<option data-countryCode="AI" value="1264">+1264</option>
		<option data-countryCode="AG" value="1268">+1268</option>
		<option data-countryCode="AR" value="54">+54</option>
		<option data-countryCode="AM" value="374">+374</option>
		<option data-countryCode="AW" value="297">+297</option>
		<option data-countryCode="AU" value="61">+61</option>
		<option data-countryCode="AT" value="43">+43</option>
		<option data-countryCode="AZ" value="994">+994</option>
		<option data-countryCode="BS" value="1242">+1242</option>
		<option data-countryCode="BH" value="973">+973</option>
		<option data-countryCode="BD" value="880">+880</option>
		<option data-countryCode="BB" value="1246">+1246</option>
		<option data-countryCode="BY" value="375">+375</option>
		<option data-countryCode="BE" value="32">+32</option>
		<option data-countryCode="BZ" value="501">+501</option>
		<option data-countryCode="BJ" value="229">+229</option>
		<option data-countryCode="BM" value="1441">+1441</option>
		<option data-countryCode="BT" value="975">+975</option>
		<option data-countryCode="BO" value="591">+591</option>
		<option data-countryCode="BA" value="387">+387</option>
		<option data-countryCode="BW" value="267">+267</option>
		<option data-countryCode="BR" value="55">+55</option>
		<option data-countryCode="BN" value="673">+673</option>
		<option data-countryCode="BG" value="359">+359</option>
		<option data-countryCode="BF" value="226">+226</option>
		<option data-countryCode="BI" value="257">+257</option>
		<option data-countryCode="KH" value="855">+855</option>
		<option data-countryCode="CM" value="237">+237</option>
		<option data-countryCode="CA" value="1">+1</option>
		<option data-countryCode="CV" value="238">+238</option>
		<option data-countryCode="KY" value="1345">+1345</option>
		<option data-countryCode="CF" value="236">+236</option>
		<option data-countryCode="CL" value="56">+56</option>
		<option data-countryCode="CN" value="86">+86</option>
		<option data-countryCode="CO" value="57">+57</option>
		<option data-countryCode="KM" value="269">+269</option>
		<option data-countryCode="CG" value="242">+242</option>
		<option data-countryCode="CK" value="682">+682</option>
		<option data-countryCode="CR" value="506">+506</option>
		<option data-countryCode="HR" value="385">+385</option>
		<option data-countryCode="CU" value="53">+53</option>
		<option data-countryCode="CY" value="90392">+90392</option>
		<option data-countryCode="CY" value="357">+357</option>
		<option data-countryCode="CZ" value="42">+42</option>
		<option data-countryCode="DK" value="45">+45</option>
		<option data-countryCode="DJ" value="253">+253</option>
		<option data-countryCode="DM" value="1809">+1809</option>
		<option data-countryCode="DO" value="1809">+1809</option>
		<option data-countryCode="EC" value="593">+593</option>
		<option data-countryCode="EG" value="20">+20</option>
		<option data-countryCode="SV" value="503">+503</option>
		<option data-countryCode="GQ" value="240">+240</option>
		<option data-countryCode="ER" value="291">+291</option>
		<option data-countryCode="EE" value="372">+372</option>
		<option data-countryCode="ET" value="251">+251</option>
		<option data-countryCode="FK" value="500">+500</option>
		<option data-countryCode="FO" value="298">+298</option>
		<option data-countryCode="FJ" value="679">+679</option>
		<option data-countryCode="FI" value="358">+358</option>
		<option data-countryCode="FR" value="33">+33</option>
		<option data-countryCode="GF" value="594">+594</option>
		<option data-countryCode="PF" value="689">+689</option>
		<option data-countryCode="GA" value="241">+241</option>
		<option data-countryCode="GM" value="220">+220</option>
		<option data-countryCode="GE" value="7880">+7880</option>
		<option data-countryCode="DE" value="49">+49</option>
		<option data-countryCode="GH" value="233">+233</option>
		<option data-countryCode="GI" value="350">+350</option>
		<option data-countryCode="GR" value="30">+30</option>
		<option data-countryCode="GL" value="299">+299</option>
		<option data-countryCode="GD" value="1473">+1473</option>
		<option data-countryCode="GP" value="590">+590</option>
		<option data-countryCode="GU" value="671">+671</option>
		<option data-countryCode="GT" value="502">+502</option>
		<option data-countryCode="GN" value="224">+224</option>
		<option data-countryCode="GW" value="245">+245</option>
		<option data-countryCode="GY" value="592">+592</option>
		<option data-countryCode="HT" value="509">+509</option>
		<option data-countryCode="HN" value="504">+504</option>
		<option data-countryCode="HK" value="852">+852</option>
		<option data-countryCode="HU" value="36">+36</option>
		<option data-countryCode="IS" value="354">+354</option>
		<option data-countryCode="IN" value="91">+91</option>
		<option data-countryCode="ID" value="62">+62</option>
		<option data-countryCode="IR" value="98">+98</option>
		<option data-countryCode="IQ" value="964">+964</option>
		<option data-countryCode="IE" value="353">+353</option>
		<option data-countryCode="IL" value="972">+972</option>
		<option data-countryCode="IT" value="39">+39</option>
		<option data-countryCode="JM" value="1876">+1876</option>
		<option data-countryCode="JP" value="81">+81</option>
		<option data-countryCode="JO" value="962">+962</option>
		<option data-countryCode="KZ" value="7">+7</option>
		<option data-countryCode="KE" value="254">+254</option>
		<option data-countryCode="KI" value="686">+686</option>
		<option data-countryCode="KP" value="850">+850</option>
		<option data-countryCode="KR" value="82">+82</option>
		<option data-countryCode="KW" value="965">+965</option>
		<option data-countryCode="KG" value="996">+996</option>
		<option data-countryCode="LA" value="856">+856</option>
		<option data-countryCode="LV" value="371">+371</option>
		<option data-countryCode="LB" value="961">+961</option>
		<option data-countryCode="LS" value="266">+266</option>
		<option data-countryCode="LR" value="231">+231</option>
		<option data-countryCode="LY" value="218">+218</option>
		<option data-countryCode="LI" value="417">+417</option>
		<option data-countryCode="LT" value="370">+370</option>
		<option data-countryCode="LU" value="352">+352</option>
		<option data-countryCode="MO" value="853">+853</option>
		<option data-countryCode="MK" value="389">+389</option>
		<option data-countryCode="MG" value="261">+261</option>
		<option data-countryCode="MW" value="265">+265</option>
		<option data-countryCode="MY" value="60">+60</option>
		<option data-countryCode="MV" value="960">+960</option>
		<option data-countryCode="ML" value="223">+223</option>
		<option data-countryCode="MT" value="356">+356</option>
		<option data-countryCode="MH" value="692">+692</option>
		<option data-countryCode="MQ" value="596">+596</option>
		<option data-countryCode="MR" value="222">+222</option>
		<option data-countryCode="YT" value="269">+269</option>
		<option data-countryCode="MX" value="52">+52</option>
		<option data-countryCode="FM" value="691">+691</option>
		<option data-countryCode="MD" value="373">+373</option>
		<option data-countryCode="MC" value="377">+377</option>
		<option data-countryCode="MN" value="976">+976</option>
		<option data-countryCode="MS" value="1664">+1664</option>
		<option data-countryCode="MA" value="212">+212</option>
		<option data-countryCode="MZ" value="258">+258</option>
		<option data-countryCode="MN" value="95">+95</option>
		<option data-countryCode="NA" value="264">+264</option>
		<option data-countryCode="NR" value="674">+674</option>
		<option data-countryCode="NP" value="977">+977</option>
		<option data-countryCode="NL" value="31">+31</option>
		<option data-countryCode="NC" value="687">+687</option>
		<option data-countryCode="NZ" value="64">+64</option>
		<option data-countryCode="NI" value="505">+505</option>
		<option data-countryCode="NE" value="227">+227</option>
		<option data-countryCode="NG" value="234">+234</option>
		<option data-countryCode="NU" value="683">+683</option>
		<option data-countryCode="NF" value="672">+672</option>
		<option data-countryCode="NP" value="670">+670</option>
		<option data-countryCode="NO" value="47">+47</option>
		<option data-countryCode="OM" value="968">+968</option>
		<option data-countryCode="PW" value="680">+680</option>
		<option data-countryCode="PA" value="507">+507</option>
		<option data-countryCode="PG" value="675">+675</option>
		<option data-countryCode="PY" value="595">+595</option>
		<option data-countryCode="PE" value="51">+51</option>
		<option data-countryCode="PH" value="63">+63</option>
		<option data-countryCode="PL" value="48">+48</option>
		<option data-countryCode="PT" value="351">+351</option>
		<option data-countryCode="PR" value="1787">+1787</option>
		<option data-countryCode="QA" value="974">+974</option>
		<option data-countryCode="RE" value="262">+262</option>
		<option data-countryCode="RO" value="40">+40</option>
		<option data-countryCode="RU" value="7">+7</option>
		<option data-countryCode="RW" value="250">+250</option>
		<option data-countryCode="SM" value="378">+378</option>
		<option data-countryCode="ST" value="239">+239</option>
		<option data-countryCode="SA" value="966">+966</option>
		<option data-countryCode="SN" value="221">+221</option>
		<option data-countryCode="CS" value="381">+381</option>
		<option data-countryCode="SC" value="248">+248</option>
		<option data-countryCode="SL" value="232">+232</option>
		<option data-countryCode="SG" value="65">+65</option>
		<option data-countryCode="SK" value="421">+421</option>
		<option data-countryCode="SI" value="386">+386</option>
		<option data-countryCode="SB" value="677">+677</option>
		<option data-countryCode="SO" value="252">+252</option>
		<option data-countryCode="ZA" value="27">+27</option>
		<option data-countryCode="ES" value="34">+34</option>
		<option data-countryCode="LK" value="94">+94</option>
		<option data-countryCode="SH" value="290">+290</option>
		<option data-countryCode="KN" value="1869">+1869</option>
		<option data-countryCode="SC" value="1758">+1758</option>
		<option data-countryCode="SD" value="249">+249</option>
		<option data-countryCode="SR" value="597">+597</option>
		<option data-countryCode="SZ" value="268">+268</option>
		<option data-countryCode="SE" value="46">+46</option>
		<option data-countryCode="CH" value="41">+41</option>
		<option data-countryCode="SI" value="963">+963</option>
		<option data-countryCode="TW" value="886">+886</option>
		<option data-countryCode="TJ" value="7">+7</option>
		<option data-countryCode="TH" value="66">+66</option>
		<option data-countryCode="TG" value="228">+228</option>
		<option data-countryCode="TO" value="676">+676</option>
		<option data-countryCode="TT" value="1868">+1868</option>
		<option data-countryCode="TN" value="216">+216</option>
		<option data-countryCode="TR" value="90">+90</option>
		<option data-countryCode="TM" value="7">+7</option>
		<option data-countryCode="TM" value="993">+993</option>
		<option data-countryCode="TC" value="1649">+1649</option>
		<option data-countryCode="TV" value="688">+688</option>
		<option data-countryCode="UG" value="256">+256</option>
		 <option data-countryCode="GB" value="44">+44</option>
		<option data-countryCode="UA" value="380">+380</option>
		<option data-countryCode="AE" value="971">+971</option>
		<option data-countryCode="UY" value="598">+598</option>
		<option data-countryCode="US" value="1">+1</option>
		<option data-countryCode="UZ" value="7">+7</option>
		<option data-countryCode="VU" value="678">+678</option>
		<option data-countryCode="VA" value="379">+379</option>
		<option data-countryCode="VE" value="58">+58</option>
		<option data-countryCode="VN" value="84">+84</option>
		<option data-countryCode="VG" value="84">+1284</option>
		<option data-countryCode="VI" value="84">+1340</option>
		<option data-countryCode="WF" value="681">+681</option>
		<option data-countryCode="YE" value="969">+969</option>
		<option data-countryCode="YE" value="967">+967</option>
		<option data-countryCode="ZM" value="260">+260</option>
		<option data-countryCode="ZW" value="263">+263</option>
                </SelectInput>
              </FormGroup>
                </Col>
                <Col cW="78%">
                <FormGroup>
                <label>Authorized Phone Number</label>
                <TextInput
                  type="number"
                  name="mobile"
                  onFocus={inputFocus}
                  autoFocus
                  onBlur={inputBlur}
                  value={this.state.mobile}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
                </Col>
              </Row>

              <Button filledBtn marginTop="50px">
                <span>Update Profile</span>
              </Button>
            </form>
          </Popup>
          : null }
      </Wrapper>
    );
  }
}
