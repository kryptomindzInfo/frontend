import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import Main from '../../components/Main';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Footer from '../../components/Footer';
import history from 'utils/history.js';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import CreatePartnerPopup from './CreatePartnerPopup';
import EnterOTPPopup from './EnterOTPPopup';
import { STATIC_URL, API_URL, CURRENCY } from '../App/constants';
import Loader from '../../components/Loader';
import { postRequest, getRequest } from '../App/ApiCall';
import 'react-toastify/dist/ReactToastify.css';
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

function BankPartnerListPage(props) {
  const [addPartnerPopup, setAddPartnerPopup] = React.useState(false);
  const [newPartner, setNewPartner] = React.useState({});
  const [otpPopup, setOtpPopup] = React.useState(false);
  const [otpID, setOtpId] = React.useState('');
  const [openingBalance, setOpeningBalance] = React.useState(0);
  const [totalBranches, setTotalBranches] = React.useState(0);
  const [cashReceived, setCashReceived] = React.useState(0);
  const [cashPaid, setCashPaid] = React.useState(0);
  const [feeGenerated, setFeeGenerated] = React.useState(0);
  const [commissionGenerated, setCommissionGenerated] = React.useState(0);
  const [cashInHand, setCashInHand] = React.useState(0);
  const [closingBalance, setClosingBalance] = React.useState(0);
  const [invoicePaid, setInvoicePaid] = React.useState(0);
  const [amountPaid, setAmountPaid] = React.useState(0);
  const [partnerList, setPartnerList] = React.useState([]);
  const [partnerStats, setPartnerStats] = React.useState([]);
  const [copyPartnerList, setCopyPartnerList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingPartner, setEditingPartner] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const token = localStorage.getItem('bankLogged');
  const bankName = localStorage.getItem('bankName');
  const bankLogo = localStorage.getItem('bankLogo');

  const handlePartnerPopupClick = (type, partner) => {
    setEditingPartner(partner);
    setPopupType(type);
    setAddPartnerPopup(true);
  };

  const onPopupClose = () => {
    setAddPartnerPopup(false);
    setOtpPopup(false);
  };

  const fetchPartnerList = async () => {
    const res = await postRequest("bank/listPartners", token, {})
    if (res.data.data.status === 0) {
      toast.error(res.data.data.message);
      return { list: [], loading: false };
    } else {
      return { list: res.data.data.partners, loading: false };
    }
  };

  const refreshPartnertList = async () => {
    const data = await fetchPartnerList();
    setPartnerList(data.list);
    setLoading(data.loading);
  };

  const block = (id, type) => {
    const token = localStorage.getItem('bankLogged');
    axios
      .post(`${API_URL}/bank/${type}Partner`, {
        token,
        partner_id: id,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.status === 0) {
            throw res.data.message;
          } else {
            const n = type == 'unblock' ? 'Unblocked' : 'Blocked';
            toast.success(`Partner ${n}`);
            refreshPartnertList();
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        toast.error('Something went wrong');
      });
  };


  const partnerAPI = async (values, apiType) => {
    let API = '';
    if (apiType === 'update') {
      API = '/bank/editPartner';
    } else {
      API = '/bank/addPartner';
    }
    try {
      const res = await axios.post(`${API_URL}${API}`, {
        ...values,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          toast.error(res.data.message);
        } else {
          if (apiType === 'update') {
            toast.success("Partner Edited");
            refreshPartnertList();
          } else {
            toast.success("Partner Created");
            refreshPartnertList();
          }
          setOtpPopup(false);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const generateOTP = async (obj) => {
    try {
      const res = await axios.post(`${API_URL}/bank/generateOTP`,
        {
          token: token,
          username: '',
          page: 'addPartner',
          name: obj.name,
          email: obj.email,
          mobile: obj.mobile,
          code: obj.code,
        });
      if (res.status == 200) {
        console.log(res);
        if (res.data.status === 0) {
          throw res.data.message;
        } else {
          setOtpId(res.data.id),
            toast.success("OTP Sent");
          setOtpPopup(true);
        }
      } else {
        throw res.data.error;
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.error : err.toString());
    }
  };

  const handleFormSubmit = (values) => {
    console.log("hi");
    setAddPartnerPopup(false);
    setNewPartner(values);
    generateOTP(values);
  };

  const VerifyOtp = async (values) => {
    console.log(otpID);
    setLoading(true);
    const obj = {
      ...newPartner,
      ...values,
      token: token,
      otp_id: otpID,
    };
    await partnerAPI(obj, popupType);
    setLoading(false);
  };

  const getPartnerDashStats = async(id) => {
    try {
      const res = await axios.post(`${API_URL}/bank/getPartnerDashStats`, { token,partner_id:id });
      if (res.status == 200) {
        return (res.data);
      }
    } catch(err){
      console.log(err);
    }
  }

  const getPartnerStats = async(plist) => {
    const stats = plist.map(async (partner) => {
      const partnerstats = await getPartnerDashStats(partner._id);
      return (partnerstats);
    });
    const result= await Promise.all(stats);
    return({res:result,loading:false});
  }

  const getData = async () => {
    setLoading(true);
    const partners = await fetchPartnerList();
    const partnerstats = await getPartnerStats(partners.list);
    setPartnerStats(partnerstats.res)
    setPartnerList(partners.list);
    setCopyPartnerList(partnerstats.list);
    setOpeningBalance(partnerstats.res.reduce((a, b) => a + b.openingBalance, 0).toFixed(2));
    setTotalBranches(partners.list.reduce((a, b) => a + b.total_branches, 0).toFixed(2));
    setCashReceived(partnerstats.res.reduce((a, b) => a + b.cashReceived, 0).toFixed(2));
    setCashPaid(partnerstats.res.reduce((a, b) => a + b.cashPaid, 0).toFixed(2));
    setFeeGenerated(partnerstats.res.reduce((a, b) => a + b.feeGenerated, 0).toFixed(2));
    setCommissionGenerated(partnerstats.res.reduce((a, b) => a + b.commissionGenerated, 0).toFixed(2));
    setCashInHand(partnerstats.res.reduce((a, b) => a + b.cashInHand, 0).toFixed(2));
    setClosingBalance(partnerstats.res.reduce((a, b) => a + b.closingBalance, 0).toFixed(2));
    setInvoicePaid(partnerstats.res.reduce((a, b) => a + b.invoicePaid, 0).toFixed(2));
    setAmountPaid(partnerstats.res.reduce((a, b) => a + b.amountPaid, 0).toFixed(2))
    setLoading(partnerstats.loading);
  };

  useEffect(() => {
    getData();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const partners = partnerList.map((partner,i) => (
    <tr key={partner._id}>
      <td className="tac">
        <img
          style={{ height: '60px', width: '60px' }}
          src={`${STATIC_URL}${partner.logo}`}
        />
      </td>
      <td className="tac">{partner.name}</td>
      <td className="tac">{partner.total_branches}</td>
      <td className="tac">{partnerStats[i].openingBalance.toFixed(2)}</td>
      <td className="tac">{partnerStats[i].cashReceived.toFixed(2)}</td>
      <td className="tac">{partnerStats[i].cashPaid.toFixed(2)}</td>
      <td className="tac">{partnerStats[i].invoicePaid}</td>
      <td className="tac">{partnerStats[i].amountPaid}</td>
      <td className="tac">{partnerStats[i].feeGenerated.toFixed(2)}</td>
      <td className="tac">{partnerStats[i].commissionGenerated.toFixed(2)}</td>
      <td className="tac">{(partnerStats[i].feeGenerated+partnerStats[i].commissionGenerated).toFixed(2)}</td>
      <td className="tac">{partnerStats[i].cashInHand.toFixed(2)}</td>
      <td className="tac">{partnerStats[i].closingBalance.toFixed(2)}</td>
     
      <td className="tac">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
         <td className="tac"> <Button
                                style={{minWidth:'90%', marginRight:'5px'}}
                                onClick={() => {
                                  localStorage.setItem(
                                    'selectedPartner',
                                    JSON.stringify(partner),
                                  );
                                history.push(`/bank/partnerreports/${partner._id}`);
                                }}
                              >                    
                                Reports                  
                              </Button>
          </td>
          <span
            style={{ top: 'inherit' }}
            className="absoluteMiddleRight primary popMenuTrigger"
          >
            <i className="material-icons ">more_vert</i>
            <div className="popMenu">
              <span
                onClick={() => handlePartnerPopupClick('update', partner)}
              >
                Edit
              </span>
              <span
                onClick={() => {
                  localStorage.setItem('bankId', partner.bank_id);
                  localStorage.setItem(
                    'currentPartner',
                    JSON.stringify(partner),
                  );
                  props.history.push({
                    pathname: `/bank/partners/info/${partner._id}`,
                  });
                }}
              >
                Info
              </span>
              <span
                onClick={() => {
                  props.history.push({
                    pathname: `/bank/fees`,
                  });
                }}
              >
                Revenue Sharing
              </span>
              {partner.status === -1 ? (
                <span onClick={() => block(partner._id, 'unblock')}>
                  Unblock
                </span>
              ) : (
                  <span onClick={() => block(partner._id, 'block')}>Block</span>
              )}
            </div>
          </span>
        </div>
      </td>
    </tr>
  ));
  const searchlistfunction = (value) => {
    console.log(value)
    // console.log(this.state.searchrules)
    const newfilterdata = copyPartnerList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );
    setPartnerList(newfilterdata)


  }
  return (
    <Wrapper from="bank">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
      <BankHeader active="partner" />
      <Container verticalMargin>
        <Main fullWidth>
          <Row>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  textAlign="center"
                  buttonMarginTop="32px"
                  bigPadding
                  smallValue
                >
                  <h4>Number of Agency</h4>
                  <div className="cardValue">{totalBranches}</div>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Opening Balance</h4>
                  <div className="cardValue">{CURRENCY}: {openingBalance}</div>
                </Card>
              </Col>
              <Col>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Received</h4>
                  <div className="cardValue">{CURRENCY}: {cashReceived}</div>
                </Card>
              </Col>
              <Col>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash Paid</h4>
                  <div className="cardValue">{CURRENCY}: {cashPaid}</div>
                </Card>
              </Col>
              <Col>
                <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Cash In Hand</h4>
                  <div className="cardValue">{CURRENCY}: {cashInHand}</div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Invoices Paid</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Number</h5>
                      <div className="cardValue">{invoicePaid}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Amount</h5>
                      <div className="cardValue">{CURRENCY}: {amountPaid}</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
              <Card
                   style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  bigPadding
                  textAlign="center"
                  smallValue
                >
                  <h4>Revenue Collected</h4>
                  <Row>
                    <Col style={{textAlign:'center'}}>
                      <h5>Fee</h5>
                      <div className="cardValue">{CURRENCY}: {feeGenerated}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Commission</h5>
                      <div className="cardValue">{CURRENCY}: {commissionGenerated}</div>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                      <h5>Total</h5>
                      <div className="cardValue">{CURRENCY}: {(parseFloat(commissionGenerated,10)+ parseFloat(feeGenerated,10)).toFixed(2)}</div>
                    </Col>
                  </Row>
                  
                </Card>
              </Col>
              <Col>
                <Card
                  style={{height:'130px'}}
                  marginBottom="10px"
                  buttonMarginTop="32px"
                  textAlign="center"
                  bigPadding
                  smallValue
                >
                  <h4>Closing Balance</h4>
                  <div className="cardValue">{CURRENCY}: {closingBalance}</div>
                </Card>
              </Col>
            </Row>
            
          </Main>
        <Main fullWidth>
          
          <Card bigPadding>
          <Button
              className="addBankButton"
              flex
              style={{
                float:"right",
                marginBottom:'10px',
              }}
              onClick={() => handlePartnerPopupClick('new', {})}
            >
               <i className="material-icons">add</i>
              <span>Add Partner</span>
            </Button>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Partner List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Total Agencies</th>
                    <th>Opening Balance</th>
                    <th>Cash Received</th>
                    <th>Cash Paid</th>
                    <th>Invoice Paid</th>
                    <th>Amount of Invoice Paid</th>
                    <th>Fee Collected</th>
                    <th>Commission Collected</th>
                    <th>Revenue Collected</th>
                    <th>Cash In Hand</th>
                    <th>Closing Balance</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {partnerList && partnerList.length > 0 ? partners : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addPartnerPopup ? (
        <CreatePartnerPopup
          type={popupType}
          partner={editingPartner}
          onClose={() => onPopupClose()}
          submit={(values) => handleFormSubmit(values)}
        />
      ) : null}
      {otpPopup ? (
        <EnterOTPPopup
          onClose={() => onPopupClose()}
          resend={() => generateOTP(newPartner)}
          submit={(values) => VerifyOtp(values)}
        />
      ) : null}
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Wrapper>
  );
}

export default BankPartnerListPage;
