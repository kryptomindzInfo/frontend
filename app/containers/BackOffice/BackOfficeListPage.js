import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import DetailsPopup from './DetailsPopup';
import EnterOTPPopup from './EnterOTPPopup';
import { STATIC_URL, API_URL } from '../App/constants';
import Loader from '../../components/Loader';
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

function BankPartnerListPage(props) {
  const [newPartner, setNewPartner] = React.useState({});
  const [otpPopup, setOtpPopup] = React.useState(false);
  const [otpID, setOtpId] = React.useState('');
  const [partnerList, setPartnerList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [Transaction, setTransaction] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [detailsPopup, setDetailsPopup] = React.useState(false);
  const token = localStorage.getItem('bankLogged');

  const handlePartnerPopupClick = (type, partner) => {
    setEditingPartner(partner);
    setPopupType(type);
    setAddPartnerPopup(true);
  };

  const onPopupClose = () => {
    setDetailsPopup(false);
    setOtpPopup(false);
  };

  const fetchPartnerList = async () => {
    const res = await postRequest("bank/getFailedTransactions", token, {})
    if (res.data.data.status === 0) {
      toast.error(res.data.data.message);
      return { list: [], loading: false };
    } else {
      console.log(res);
      return { list: res.data.data.transactions, loading: false };
    }
  };

  const refreshPartnertList = async () => {
    const data = await fetchPartnerList();
    setPartnerList(data.list);
    setLoading(data.loading);
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

  

  const showDetails = (transaction) => {
    setTransaction(transaction);
    setDetailsPopup(true);

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

  useEffect(() => {
    setLoading(true);
    const getPartnerList = async () => {
      const data = await fetchPartnerList();
      setPartnerList(data.list);
      setLoading(data.loading);
    };
    getPartnerList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const partners = partnerList.map(partner => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var isoformat = partner.createdAt;
                        var readable = new Date(isoformat);
                        var m = readable.getMonth(); // returns 6
                        var d = readable.getDate(); // returns 15
                        var y = readable.getFullYear();
                        var h = readable.getHours();
                        var mi = readable.getMinutes();
                        var mlong = months[m];
                        var fulldate =
                          d + ' ' + mlong + ' ' + y;
                        var time =  h + ':' + mi;
    return(
    <tr key={partner._id} style={{display: partner.childTx.length > 0 ? '' : 'None'}}>
      <td className="tac">{partner.txType}</td>
      <td className="tac">{partner.state}</td>
      <td className="tac">{fulldate}</td>
      <td className="tac">{time}</td>
      <td className="tac" style={{display:"flex",justifyContent:"center"}}><Button onClick={()=>showDetails(partner)}>Get Details</Button></td>
      {/* <td className="tac">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <td className="tac">{partner.total_trans}</td>
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
      </td> */}
    </tr>
    );
  });
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
      <BankHeader active="partnerss" />
      <Container verticalMargin>
        <SidebarBank />
        <Main>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Failed Transactions</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    {/* <th>Wallet Id</th> */}
                    <th>Type</th>
                    <th>State</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Details</th>
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
      {detailsPopup ? (
        <DetailsPopup
          transaction={Transaction}
          refresh={refreshPartnertList}
          onClose={() => onPopupClose()}
        />
      ) : null}
      {otpPopup ? (
        <EnterOTPPopup
          onClose={() => onPopupClose()}
          resend={() => generateOTP(newPartner)}
          submit={(values) => VerifyOtp(values)}
        />
      ) : null}
    </Wrapper>
  );
}

export default BankPartnerListPage;
