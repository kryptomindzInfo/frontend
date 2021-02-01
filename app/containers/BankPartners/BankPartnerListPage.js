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
import CreatePartnerPopup from './CreatePartnerPopup';
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
  const [addPartnerPopup, setAddPartnerPopup] = React.useState(false);
  const [newPartner, setNewPartner] = React.useState({});
  const [otpPopup, setOtpPopup] = React.useState(false);
  const [otpID, setOtpId] = React.useState('');
  const [partnerList, setPartnerList] = React.useState([]);
  const [copyPartnerList, setCopyPartnerList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingPartner, setEditingPartner] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const token = localStorage.getItem('bankLogged');

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

  useEffect(() => {
    setLoading(true);
    const getPartnerList = async () => {
      const data = await fetchPartnerList();
      setPartnerList(data.list);
      setCopyPartnerList(data.list)
      setLoading(data.loading);
    };
    getPartnerList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const partners = partnerList.map(partner => (
    <tr key={partner._id}>
      <td className="tac">
        <img
          style={{ height: '60px', width: '60px' }}
          src={`${STATIC_URL}${partner.logo}`}
        />
      </td>
      <td className="tac">{partner.name}</td>
      <td className="tac">{partner.code}</td>
      <td className="tac">{partner.total_branches}</td>
      <td className="tac">{partner.total_cashiers}</td>
      <td className="tac">
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
      <BankHeader active="partnerss" />
      <Container verticalMargin>
        <SidebarBank />
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search Partner" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handlePartnerPopupClick('new', {})}
            >
              <i className="material-icons">add</i>
              <span>Add Partner</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
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
                    <th>Code</th>
                    <th>Total Branches</th>
                    <th>Total Cashiers</th>
                    <th>Total Transactions</th>
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
    </Wrapper>
  );
}

export default BankPartnerListPage;
