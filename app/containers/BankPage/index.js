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
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import Popup from 'components/Popup';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import A from 'components/A';

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

export default class BankPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address1: '',
      state: '',
      zip: '',
      country: '',
      ccode: '',
      mobile: '',
      bank_id: '',
      email: '',
      logo: '',
      contract: '',
      loading: true,
      redirect: false,
      totalBanks: 0,
      notification: 'Welcome',
      popup: false,
      username: '',
      editPopup: false,
      edit: false,
      user_id: token,
      otpId: '',
      banks: [],
      otp: '',
      showOtp: false,
      showEditOtp: false,
      permissions
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

  startTimer = () => {
    var dis = this;
    var timer = setInterval(function(){
      if(dis.state.timer <= 0){
        clearInterval(timer);
        dis.setState({ resend: true });
      }else{
      var time = Number(dis.state.timer) - 1;
      dis.setState({ timer: time});
      }
    }, 1000);
  };

  showEditPopup = (v) => {
    this.setState({ editPopup: true, name: v.name, address1: v.address1, state: v.state, zip: v.zip, country: v.country, ccode: v.ccode, mobile: v.mobile, email: v.email, logo: v.logo, contract: v.contract, username: v.username, bank_id: v._id });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      editPopup: false,
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
      showEditOtp: false
    });
  };

  logout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("name");
    this.setState({ redirect: true });
  };

  generateOTP = () => {
    this.setState({ resend: false, timer: 30});
    this.startTimer();
    axios
      .post(`${API_URL  }/generateOTP`, {
        name: this.state.name,
        page: this.state.otpOpt,
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

      
  }

  addBank = event => {
    event.preventDefault();
    if(this.state.logo == null || this.state.logo == ''){
      this.setState({
        notification: "You need to upload a logo"
      }, () =>{
        this.error();
      });
    }
    else if(this.state.contract == null || this.state.contract == ''){
      this.setState({
        notification: "You need to upload a contract"
      }, () =>{
        this.error();
      });
    }
    else{
      this.setState({
        otpOpt: 'addBank'
      }, () => {
        this.generateOTP();
      });
      
    }
  };
blockBank = (e, s) =>{
  console.log(e);
  var dis = this;
  axios
  .post(`${API_URL  }/bankStatus`, {
    token,
    bank_id: e,
    status : s
  })
  .then(res => {
    if(res.status == 200){
      if(res.data.error){
        throw res.data.error;
      }else{
        var n = (s == 1) ? 'Unblocked' : 'Blocked';
        this.setState({
          notification: 'Bank ' + n
        });
        this.success();
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

  editBank = event => {
    event.preventDefault();
    if(this.state.logo == null || this.state.logo == ''){
      this.setState({
        notification: "You need to upload a logo"
      }, () =>{
        this.error();
      });
    }
    else if(this.state.contract == null || this.state.contract == ''){
      this.setState({
        notification: "You need to upload a contract"
      }, () =>{
        this.error();
      });
    }
    else{
      this.setState({
        otpOpt: 'editBank'
      }, () => {
        this.generateOTP();
      });
    }
  };

  verifyOTP = event => {
    event.preventDefault();
    axios
      .post(`${API_URL  }/addBank`, {
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
        otp_id: this.state.otpId,
        token,
      })
      .then(res => {
        if(res.status == 200){
          if(res.data.error){
            throw res.data.error;
          }else{
            this.setState({
              notification: "Bank added successfully!",
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
            }, function(){
              this.success();
              this.closePopup();
              this.getBanks();
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

  fileUpload(file, key) {

    const formData = new FormData();
    //  formData.append('token',token);
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };
    var method = "fileUpload";
    
    if(key == 'contract'){
      method = "ipfsUpload";
    }
    
    axios
      .post(`${API_URL  }/${method}?token=${  token}`, formData, config)
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
      .post(`${API_URL  }/getBanks`, { token })
      .then(res => {
        if(res.status == 200){
          this.setState({ loading: false, banks: res.data.banks });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (token !== undefined && token !== null) {
      this.setState({ loading: false });
      this.getBanks();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
    console.log(this.state.permissions);
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
    const perms = this.state.permissions;
    const ep = this;
    return (
      
      <Wrapper from="infra">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="bank" />
        <Container verticalMargin>
          <Main fullWidth>
            <ActionBar marginBottom="33px" inputWidth="calc(100% - 241px)" className="clr">
              <div className="iconedInput fl">
                <i className="material-icons">search</i>
                <input type="text" placeholder="Search" />
              </div>
             
                {
                (this.state.permissions == "all" || this.state.permissions.create_bank) ?
                <Button className="fr" flex onClick={this.showPopup}>
                <i className="material-icons">add</i>
                <span><FormattedMessage {...messages.addbank} /></span>
                </Button>
                :
                null
                }
              
            </ActionBar>
            <Card bigPadding>
              <div className="cardHeader" >
                <div className="cardHeaderLeft">
                  <i className="material-icons">supervised_user_circle</i>
                </div>
                <div className="cardHeaderRight">
                  <h3><FormattedMessage {...messages.title} /></h3>
                  <h5><FormattedMessage {...messages.subtitle} /></h5>
                </div>
              </div>
              <div className="cardBody">
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th><FormattedMessage {...messages.th1} /></th>
                      <th><FormattedMessage {...messages.th2} /></th>
                      <th><FormattedMessage {...messages.th3} /></th>
                      <th><FormattedMessage {...messages.th4} /></th>
                      <th><FormattedMessage {...messages.th5} /></th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      
                      this.state.banks && this.state.banks.length > 0
                        ? this.state.banks.map(function(b) {
                          return <tr key={b._id} ><td>{b.name}</td><td className="tac">0</td><td className="tac">0</td><td  className="tac">0</td>
                          <td className="tac bold">{b.total_trans}
                            { 
                            b.status != 0
                            ?
                          <span className="absoluteRight primary popMenuTrigger">
                          <i className="material-icons ">more_vert</i>
                          <div className="popMenu">
                          {
                            (perms == "all" || perms.edit_bank ) ?
                            <span onClick={() => ep.showEditPopup(b)}>Edit</span>
                            :
                            null
                          }
                            <A href={"/info/"+b._id}><FormattedMessage {...messages.menu1} /></A>
                            <A href={"/documents/"+b._id}><FormattedMessage {...messages.menu2} /></A>
                            <A href={"/fees/"+b._id}><FormattedMessage {...messages.menu3} /></A>
                            {
                              b.status == -1 ?
                              <span onClick={() => ep.blockBank(b._id, 1)}>Unblock</span>
                              :
                              <span onClick={() => ep.blockBank(b._id, -1)}>Block</span>
                            }
                            
                          </div>
                          </span>
                           :
                           <span className="absoluteRight primary popMenuTrigger">
                          <i className="material-icons ">block</i>
                          </span>
                           }
                          
                          </td>
                          </tr>
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
                <label><FormattedMessage {...messages.otp} /></label>
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
                <span><FormattedMessage {...messages.verify} /></span>
              </Button>

              <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to { this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span> }</p>
              
                
              </form>
              </div>
              :
              <div>
            <h1 ><FormattedMessage {...messages.addbank} /></h1>
            <form action="" method="post" onSubmit={this.addBank}>
              <FormGroup>
                <label><FormattedMessage {...messages.popup1} /></label>
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
                <label><FormattedMessage {...messages.popup2} /></label>
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
                  <label><FormattedMessage {...messages.popup3} /></label>
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
                  <label><FormattedMessage {...messages.popup4} /></label>
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
                  <label><FormattedMessage {...messages.popup5} /></label>
                  <TextInput
                    type="text"
                    name="country"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  {/* <label><FormattedMessage {...messages.popup6} /></label> */}
                  {/* <TextInput
                    type="text"
                    name="ccode"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.ccode}
                    onChange={this.handleInputChange}
                    required
                  /> */}
                  <SelectInput
                  type="text"
                  name="ccode"
                  value={this.state.ccode}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="">Country Code</option>
                	    <option value="213">+213</option>
		<option value="376">+376</option>
		<option value="244">+244</option>
		<option value="1264">+1264</option>
		<option value="1268">+1268</option>
		<option value="54">+54</option>
		<option value="374">+374</option>
		<option value="297">+297</option>
		<option value="61">+61</option>
		<option value="43">+43</option>
		<option value="994">+994</option>
		<option value="1242">+1242</option>
		<option value="973">+973</option>
		<option value="880">+880</option>
		<option value="1246">+1246</option>
		<option value="375">+375</option>
		<option value="32">+32</option>
		<option value="501">+501</option>
		<option value="229">+229</option>
		<option value="1441">+1441</option>
		<option value="975">+975</option>
		<option value="591">+591</option>
		<option value="387">+387</option>
		<option value="267">+267</option>
		<option value="55">+55</option>
		<option value="673">+673</option>
		<option value="359">+359</option>
		<option value="226">+226</option>
		<option value="257">+257</option>
		<option value="855">+855</option>
		<option value="237">+237</option>
		<option value="1">+1</option>
		<option value="238">+238</option>
		<option value="1345">+1345</option>
		<option value="236">+236</option>
		<option value="56">+56</option>
		<option value="86">+86</option>
		<option value="57">+57</option>
		<option value="269">+269</option>
		<option value="242">+242</option>
		<option value="682">+682</option>
		<option value="506">+506</option>
		<option value="385">+385</option>
		<option value="53">+53</option>
		<option value="90392">+90392</option>
		<option value="357">+357</option>
		<option value="42">+42</option>
		<option value="45">+45</option>
		<option value="253">+253</option>
		<option value="1809">+1809</option>
		<option value="1809">+1809</option>
		<option value="593">+593</option>
		<option value="20">+20</option>
		<option value="503">+503</option>
		<option value="240">+240</option>
		<option value="291">+291</option>
		<option value="372">+372</option>
		<option value="251">+251</option>
		<option value="500">+500</option>
		<option value="298">+298</option>
		<option value="679">+679</option>
		<option value="358">+358</option>
		<option value="33">+33</option>
		<option value="594">+594</option>
		<option value="689">+689</option>
		<option value="241">+241</option>
		<option value="220">+220</option>
		<option value="7880">+7880</option>
		<option value="49">+49</option>
		<option value="233">+233</option>
		<option value="350">+350</option>
		<option value="30">+30</option>
		<option value="299">+299</option>
		<option value="1473">+1473</option>
		<option value="590">+590</option>
		<option value="671">+671</option>
		<option value="502">+502</option>
		<option value="224">+224</option>
		<option value="245">+245</option>
		<option value="592">+592</option>
		<option value="509">+509</option>
		<option value="504">+504</option>
		<option value="852">+852</option>
		<option value="36">+36</option>
		<option value="354">+354</option>
		<option value="91">+91</option>
		<option value="62">+62</option>
		<option value="98">+98</option>
		<option value="964">+964</option>
		<option value="353">+353</option>
		<option value="972">+972</option>
		<option value="39">+39</option>
		<option value="1876">+1876</option>
		<option value="81">+81</option>
		<option value="962">+962</option>
		<option value="7">+7</option>
		<option value="254">+254</option>
		<option value="686">+686</option>
		<option value="850">+850</option>
		<option value="82">+82</option>
		<option value="965">+965</option>
		<option value="996">+996</option>
		<option value="856">+856</option>
		<option value="371">+371</option>
		<option value="961">+961</option>
		<option value="266">+266</option>
		<option value="231">+231</option>
		<option value="218">+218</option>
		<option value="417">+417</option>
		<option value="370">+370</option>
		<option value="352">+352</option>
		<option value="853">+853</option>
		<option value="389">+389</option>
		<option value="261">+261</option>
		<option value="265">+265</option>
		<option value="60">+60</option>
		<option value="960">+960</option>
		<option value="223">+223</option>
		<option value="356">+356</option>
		<option value="692">+692</option>
		<option value="596">+596</option>
		<option value="222">+222</option>
		<option value="269">+269</option>
		<option value="52">+52</option>
		<option value="691">+691</option>
		<option value="373">+373</option>
		<option value="377">+377</option>
		<option value="976">+976</option>
		<option value="1664">+1664</option>
		<option value="212">+212</option>
		<option value="258">+258</option>
		<option value="95">+95</option>
		<option value="264">+264</option>
		<option value="674">+674</option>
		<option value="977">+977</option>
		<option value="31">+31</option>
		<option value="687">+687</option>
		<option value="64">+64</option>
		<option value="505">+505</option>
		<option value="227">+227</option>
		<option value="234">+234</option>
		<option value="683">+683</option>
		<option value="672">+672</option>
		<option value="670">+670</option>
		<option value="47">+47</option>
		<option value="968">+968</option>
		<option value="680">+680</option>
		<option value="507">+507</option>
		<option value="675">+675</option>
		<option value="595">+595</option>
		<option value="51">+51</option>
		<option value="63">+63</option>
		<option value="48">+48</option>
		<option value="351">+351</option>
		<option value="1787">+1787</option>
		<option value="974">+974</option>
		<option value="262">+262</option>
		<option value="40">+40</option>
		<option value="7">+7</option>
		<option value="250">+250</option>
		<option value="378">+378</option>
		<option value="239">+239</option>
		<option value="966">+966</option>
		<option value="221">+221</option>
		<option value="381">+381</option>
		<option value="248">+248</option>
		<option value="232">+232</option>
		<option value="65">+65</option>
		<option value="421">+421</option>
		<option value="386">+386</option>
		<option value="677">+677</option>
		<option value="252">+252</option>
		<option value="27">+27</option>
		<option value="34">+34</option>
		<option value="94">+94</option>
		<option value="290">+290</option>
		<option value="1869">+1869</option>
		<option value="1758">+1758</option>
		<option value="249">+249</option>
		<option value="597">+597</option>
		<option value="268">+268</option>
		<option value="46">+46</option>
		<option value="41">+41</option>
		<option value="963">+963</option>
		<option value="886">+886</option>
		<option value="7">+7</option>
		<option value="66">+66</option>
		<option value="228">+228</option>
		<option value="676">+676</option>
		<option value="1868">+1868</option>
		<option value="216">+216</option>
		<option value="90">+90</option>
		<option value="7">+7</option>
		<option value="993">+993</option>
		<option value="1649">+1649</option>
		<option value="688">+688</option>
		<option value="256">+256</option>
		 <option value="44">+44</option>
		<option value="380">+380</option>
		<option value="971">+971</option>
		<option value="598">+598</option>
		<option value="1">+1</option>
		<option value="7">+7</option>
		<option value="678">+678</option>
		<option value="379">+379</option>
		<option value="58">+58</option>
		<option value="84">+84</option>
		<option value="84">+1284</option>
		<option value="84">+1340</option>
		<option value="681">+681</option>
		<option value="969">+969</option>
		<option value="967">+967</option>
		<option value="260">+260</option>
		<option value="263">+263</option>
                </SelectInput>
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup7} /></label>
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
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup8} /></label>
                  <TextInput
                    type="email"
                    name="email"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                </Row>


              <FormGroup>

                  {/* <UploadedFile>

                      <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i>
                    </UploadedFile>
                  : */}
                  <UploadArea  bgImg={STATIC_URL+ this.state.logo}>
                    {
                    this.state.logo ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.logo } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('logo')}>
                    <input type="file" id="logo" onChange={this.onChange} data-key="logo"/>
                    {
                    !this.state.logo ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }
                    <label>
                      {
                      this.state.logo == '' ? 
                      <FormattedMessage {...messages.popup9} /> 
                      :
                      <span>Change Logo</span>
                      }
                      
                      </label>
                    </div>
                  </UploadArea>

              </FormGroup>

              <FormGroup>
              <UploadArea  bgImg={STATIC_URL+ 'main/pdf-icon.png'}>
                    {
                    this.state.contract ?
                    <a className="uploadedImg" href={CONTRACT_URL+ this.state.contract } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('contract')}>
                    <input type="file" id="contract" onChange={this.onChange} data-key="contract"/>
                    {
                    !this.state.contract ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }

                    <label>
                    {
                      this.state.contract == '' ? 
                      <FormattedMessage {...messages.popup10} /> 
                      :
                      <span>Change Contract</span>
                      }
                      </label>
                    </div>
                  </UploadArea>
              </FormGroup>
              <p className="note">Please create the revenue policy or otherwise by default 0 fee will be debited for all transctions</p>
              <Button filledBtn marginTop="50px">
                <span><FormattedMessage {...messages.addbank} /></span>
              </Button>
              <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to { this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span> }</p>
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
                <label><FormattedMessage {...messages.otp} /></label>
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
                <span><FormattedMessage {...messages.verify} /></span>
              </Button>
              <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to { this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span> }</p>
              </form>
              </div>
              :
              <div>
            <h1 >Edit Bank</h1>
            <form action="" method="post" onSubmit={this.editBank}>
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
                <label><FormattedMessage {...messages.popup2} /></label>
                <TextInput
                  type="text"
                  name="address1"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  autoFocus
                  value={this.state.address1}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

                <Row>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup3} /></label>
                  <TextInput
                    type="text"
                    name="state"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    autoFocus
                    value={this.state.state}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup4} /></label>
                  <TextInput
                    type="text"
                    name="zip"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    autoFocus
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
                  <label><FormattedMessage {...messages.popup5} /></label>
                  <TextInput
                    type="text"
                    name="country"
                    onFocus={inputFocus}
                    autoFocus
                    onBlur={inputBlur}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <SelectInput
                  type="text"
                  name="ccode"
                  value={this.state.ccode}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="">Country Code</option>
                	    <option value="213">+213</option>
		<option value="376">+376</option>
		<option value="244">+244</option>
		<option value="1264">+1264</option>
		<option value="1268">+1268</option>
		<option value="54">+54</option>
		<option value="374">+374</option>
		<option value="297">+297</option>
		<option value="61">+61</option>
		<option value="43">+43</option>
		<option value="994">+994</option>
		<option value="1242">+1242</option>
		<option value="973">+973</option>
		<option value="880">+880</option>
		<option value="1246">+1246</option>
		<option value="375">+375</option>
		<option value="32">+32</option>
		<option value="501">+501</option>
		<option value="229">+229</option>
		<option value="1441">+1441</option>
		<option value="975">+975</option>
		<option value="591">+591</option>
		<option value="387">+387</option>
		<option value="267">+267</option>
		<option value="55">+55</option>
		<option value="673">+673</option>
		<option value="359">+359</option>
		<option value="226">+226</option>
		<option value="257">+257</option>
		<option value="855">+855</option>
		<option value="237">+237</option>
		<option value="1">+1</option>
		<option value="238">+238</option>
		<option value="1345">+1345</option>
		<option value="236">+236</option>
		<option value="56">+56</option>
		<option value="86">+86</option>
		<option value="57">+57</option>
		<option value="269">+269</option>
		<option value="242">+242</option>
		<option value="682">+682</option>
		<option value="506">+506</option>
		<option value="385">+385</option>
		<option value="53">+53</option>
		<option value="90392">+90392</option>
		<option value="357">+357</option>
		<option value="42">+42</option>
		<option value="45">+45</option>
		<option value="253">+253</option>
		<option value="1809">+1809</option>
		<option value="1809">+1809</option>
		<option value="593">+593</option>
		<option value="20">+20</option>
		<option value="503">+503</option>
		<option value="240">+240</option>
		<option value="291">+291</option>
		<option value="372">+372</option>
		<option value="251">+251</option>
		<option value="500">+500</option>
		<option value="298">+298</option>
		<option value="679">+679</option>
		<option value="358">+358</option>
		<option value="33">+33</option>
		<option value="594">+594</option>
		<option value="689">+689</option>
		<option value="241">+241</option>
		<option value="220">+220</option>
		<option value="7880">+7880</option>
		<option value="49">+49</option>
		<option value="233">+233</option>
		<option value="350">+350</option>
		<option value="30">+30</option>
		<option value="299">+299</option>
		<option value="1473">+1473</option>
		<option value="590">+590</option>
		<option value="671">+671</option>
		<option value="502">+502</option>
		<option value="224">+224</option>
		<option value="245">+245</option>
		<option value="592">+592</option>
		<option value="509">+509</option>
		<option value="504">+504</option>
		<option value="852">+852</option>
		<option value="36">+36</option>
		<option value="354">+354</option>
		<option value="91">+91</option>
		<option value="62">+62</option>
		<option value="98">+98</option>
		<option value="964">+964</option>
		<option value="353">+353</option>
		<option value="972">+972</option>
		<option value="39">+39</option>
		<option value="1876">+1876</option>
		<option value="81">+81</option>
		<option value="962">+962</option>
		<option value="7">+7</option>
		<option value="254">+254</option>
		<option value="686">+686</option>
		<option value="850">+850</option>
		<option value="82">+82</option>
		<option value="965">+965</option>
		<option value="996">+996</option>
		<option value="856">+856</option>
		<option value="371">+371</option>
		<option value="961">+961</option>
		<option value="266">+266</option>
		<option value="231">+231</option>
		<option value="218">+218</option>
		<option value="417">+417</option>
		<option value="370">+370</option>
		<option value="352">+352</option>
		<option value="853">+853</option>
		<option value="389">+389</option>
		<option value="261">+261</option>
		<option value="265">+265</option>
		<option value="60">+60</option>
		<option value="960">+960</option>
		<option value="223">+223</option>
		<option value="356">+356</option>
		<option value="692">+692</option>
		<option value="596">+596</option>
		<option value="222">+222</option>
		<option value="269">+269</option>
		<option value="52">+52</option>
		<option value="691">+691</option>
		<option value="373">+373</option>
		<option value="377">+377</option>
		<option value="976">+976</option>
		<option value="1664">+1664</option>
		<option value="212">+212</option>
		<option value="258">+258</option>
		<option value="95">+95</option>
		<option value="264">+264</option>
		<option value="674">+674</option>
		<option value="977">+977</option>
		<option value="31">+31</option>
		<option value="687">+687</option>
		<option value="64">+64</option>
		<option value="505">+505</option>
		<option value="227">+227</option>
		<option value="234">+234</option>
		<option value="683">+683</option>
		<option value="672">+672</option>
		<option value="670">+670</option>
		<option value="47">+47</option>
		<option value="968">+968</option>
		<option value="680">+680</option>
		<option value="507">+507</option>
		<option value="675">+675</option>
		<option value="595">+595</option>
		<option value="51">+51</option>
		<option value="63">+63</option>
		<option value="48">+48</option>
		<option value="351">+351</option>
		<option value="1787">+1787</option>
		<option value="974">+974</option>
		<option value="262">+262</option>
		<option value="40">+40</option>
		<option value="7">+7</option>
		<option value="250">+250</option>
		<option value="378">+378</option>
		<option value="239">+239</option>
		<option value="966">+966</option>
		<option value="221">+221</option>
		<option value="381">+381</option>
		<option value="248">+248</option>
		<option value="232">+232</option>
		<option value="65">+65</option>
		<option value="421">+421</option>
		<option value="386">+386</option>
		<option value="677">+677</option>
		<option value="252">+252</option>
		<option value="27">+27</option>
		<option value="34">+34</option>
		<option value="94">+94</option>
		<option value="290">+290</option>
		<option value="1869">+1869</option>
		<option value="1758">+1758</option>
		<option value="249">+249</option>
		<option value="597">+597</option>
		<option value="268">+268</option>
		<option value="46">+46</option>
		<option value="41">+41</option>
		<option value="963">+963</option>
		<option value="886">+886</option>
		<option value="7">+7</option>
		<option value="66">+66</option>
		<option value="228">+228</option>
		<option value="676">+676</option>
		<option value="1868">+1868</option>
		<option value="216">+216</option>
		<option value="90">+90</option>
		<option value="7">+7</option>
		<option value="993">+993</option>
		<option value="1649">+1649</option>
		<option value="688">+688</option>
		<option value="256">+256</option>
		 <option value="44">+44</option>
		<option value="380">+380</option>
		<option value="971">+971</option>
		<option value="598">+598</option>
		<option value="1">+1</option>
		<option value="7">+7</option>
		<option value="678">+678</option>
		<option value="379">+379</option>
		<option value="58">+58</option>
		<option value="84">+84</option>
		<option value="84">+1284</option>
		<option value="84">+1340</option>
		<option value="681">+681</option>
		<option value="969">+969</option>
		<option value="967">+967</option>
		<option value="260">+260</option>
		<option value="263">+263</option>
                </SelectInput>
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup7} /></label>
                  <TextInput
                    	  type="text"
                        pattern="[0-9]{10}"
                        title="10 Digit numeric value"
                    name="mobile"
                    autoFocus
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={this.state.mobile}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <label><FormattedMessage {...messages.popup8} /></label>
                  <TextInput
                    type="email"
                    name="email"
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  </FormGroup>
                  </Col>
                </Row>


              <FormGroup>

                  {/* <UploadedFile>

                      <i className="material-icons" onClick={() => this.removeFile('logo')}>close</i>
                    </UploadedFile>
                  : */}
                  <UploadArea  bgImg={STATIC_URL+ this.state.logo}>
                    {
                    this.state.logo ?
                    <a className="uploadedImg" href={STATIC_URL+ this.state.logo } target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('logo')}>
                    <input type="file" id="logo" onChange={this.onChange} data-key="logo" />
                    {
                    !this.state.logo ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }
                    <label>
                      {
                      this.state.logo == '' ? 
                      <FormattedMessage {...messages.popup9} /> 
                      :
                      <span>Change Logo</span>
                      }
                      
                      </label>
                    </div>
                  </UploadArea>

              </FormGroup>

              <FormGroup>
              <UploadArea  bgImg={STATIC_URL+ 'main/pdf-icon.png'}>
                    {
                    this.state.contract ?
                    <a className="uploadedImg" href={CONTRACT_URL+ this.state.contract} target="_BLANK">
                    </a>
                    :
                    ' '
                    }
                    <div className="uploadTrigger" onClick={() => this.triggerBrowse('contract')}>
                    <input type="file" id="contract" onChange={this.onChange} data-key="contract" />
                    {
                    !this.state.contract ?
                    <i className="material-icons">cloud_upload</i>
                    :
                    ' '
                    }

                    <label>
                    {
                      this.state.contract == '' ? 
                      <FormattedMessage {...messages.popup10} /> 
                      :
                      <span>Change Contract</span>
                      }
                      </label>
                    </div>
                  </UploadArea>
              </FormGroup>

              <Button filledBtn marginTop="50px">
                <span>Update Bank</span>
              </Button>
            </form>
            </div>
            }
          </Popup>
          : null }
      </Wrapper>
    );
  }
}
