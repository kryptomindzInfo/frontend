import React, { useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Footer from 'components/Footer';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Row from '../../components/Row';
import Col from '../../components/Col';
import DashCards from '../../components/DashCrads';
import Table from '../../components/Table';
import CreateMerchantPopup from './CreateMerchantPopup';
import { STATIC_URL, API_URL } from '../App/constants';
import Loader from '../../components/Loader';
import { fetchMerchantList } from './api/merchantAPI';
import history from 'utils/history.js';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

function BankMerchantList(props) {

  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const [merchantList, setMerchantList] = React.useState([]);
  const [copyMerchantList, setCopyMerchantList] = React.useState([]);
  const [merchantStats, setMerchantStats] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingMerchant, setEditingMerchant] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [billPaidByMC, setBillPaidByMC] = React.useState(0);
  const [amountPaidByMC, setAmountPaidByMC] = React.useState(0);
  const [billPaidByPC, setBillPaidByPC] = React.useState(0);
  const [amountPaidByPC, setAmountPaidByPC] = React.useState(0);
  const [billPaidByBC, setBillPaidByBC] = React.useState(0);
  const [amountPaidByBC, setAmountPaidByBC] = React.useState(0);
  const [billPaidByUS, setBillPaidByUS] = React.useState(0);
  const [amountPaidByUS, setAmountPaidByUS] = React.useState(0);
  const [billPaid, setBillPaid] = React.useState(0);
  const [amountPaid, setAmountPaid] = React.useState(0);
  const [billPending, setBillPending] = React.useState(0);
  const [amountPending, setAmountPending] = React.useState(0);
  const [billcreated, setBillCreated] = React.useState(0);
  const [amountcreated, setamountCreated] = React.useState(0);
  const bankName = localStorage.getItem('bankName');
  const bankLogo = localStorage.getItem('bankLogo');
  const bank_id = localStorage.getItem('bankId'); 
  const admin =  localStorage.getItem('admin');

  const handleMerchantPopupClick = (type, merchant) => {
    setEditingMerchant(merchant);
    setPopupType(type);
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

  const refreshMerchantList = async () => {
    const data = await fetchMerchantList();
    setMerchantList(data.list);
    setLoading(data.loading);
  };

  const block = (id, type) => {
    const token = localStorage.getItem('bankLogged');
    axios
      .post(`${API_URL}/bank/${type}Merchant`, {
        token,
        merchant_id: id,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.status === 0) {
            throw res.data.message;
          } else {
            const n = type == 'unblock' ? 'Unblocked' : 'Blocked';
            toast.success(`Merchant ${n}`);
            refreshMerchantList();
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        toast.error('Something went wrong');
      });
  };

  const visiblity = (id, value) => {
    const token = localStorage.getItem('bankLogged');
    axios
      .post(`${API_URL}/bank/changeMerchantAcces`, {
        token,
        merchant_id: id,
        is_private: value,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.status === 0) {
            throw res.data.message;
          } else {
            toast.success(res.data.message);
            refreshMerchantList();
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        toast.error('Something went wrong');
      });
  };

  
  const getMerchantDashStats = async(id) => {
    const token = localStorage.getItem('bankLogged');
    try {
      const res = await axios.post(`${API_URL}/bank/getmerchantDashStats`, { token,merchant_id:id });
      if (res.status == 200) {
        return (res.data);
      }
    } catch(err){
      console.log(err);
    }
  }

  const getMerchantStats = async(list) => {
    const stats = list.map(async (merchant) => {
      const merchantstats = await getMerchantDashStats(merchant._id);
      return (merchantstats);
    });
    const result= await Promise.all(stats);
    return({res:result,loading:false});
  }

  const getData = async () => {
    setLoading(true);
    const merchants = await fetchMerchantList(bank_id);
    const merchantstats = await getMerchantStats(merchants.list);
    setMerchantStats(merchantstats.res)
    setMerchantList(merchants.list);
    setBillPaidByMC(merchantstats.res.reduce((a, b) => a + b.bill_paid_by_MC, 0));
    setAmountPaidByMC(merchantstats.res.reduce((a, b) => a + b.amount_paid_by_MC, 0).toFixed(2));
    setBillPaidByPC(merchantstats.res.reduce((a, b) => a + b.bill_paid_by_PC, 0));
    setAmountPaidByPC(merchantstats.res.reduce((a, b) => a + b.amount_paid_by_PC, 0).toFixed(2));
    setBillPaidByBC(merchantstats.res.reduce((a, b) => a + b.bill_paid_by_BC, 0));
    setAmountPaidByBC(merchantstats.res.reduce((a, b) => a + b.amount_paid_by_BC, 0).toFixed(2));
    setBillPaidByUS(merchantstats.res.reduce((a, b) => a + b.bill_paid_by_US, 0));
    setAmountPaidByUS(merchantstats.res.reduce((a, b) => a + b.amount_paid_by_US, 0).toFixed(2));
    setBillPaid(merchantstats.res.reduce((a, b) => a + b.bill_paid, 0));
    setAmountPaid(merchantstats.res.reduce((a, b) => a + b.amount_paid, 0).toFixed(2));
    setBillCreated(merchantstats.res.reduce((a, b) => a + b.bills_created, 0));
    setamountCreated(merchantstats.res.reduce((a, b) => a + b.amount_created, 0).toFixed(2));
    setBillPending(merchantstats.res.reduce((a, b) => a + b.bills_pending, 0))
    setAmountPending(merchantstats.res.reduce((a, b) => a + b.amount_pending, 0).toFixed(2))
    setLoading(merchantstats.loading);
  };


  useEffect(() => {
    getData();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const merchants = merchantList.map((merchant,i) => (
    <tr key={merchant._id}>
      <td className="tac">
        <img
          style={{ height: '60px', width: '60px' }}
          src={`${STATIC_URL}${merchant.logo}`}
        />
      </td>
      <td className="tac">{merchant.name}</td>
      <td className="tac">
        <Row> No. {merchantStats[i].bills_created}</Row>
        <Row> Amount. {merchantStats[i].amount_created}</Row>
      </td>
      <td className="tac">
        <Row> No. {0}</Row>
        <Row> Amount. {0}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bill_paid}</Row>
        <Row> Amount. {merchantStats[i].amount_paid}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bill_paid_by_BC}</Row>
        <Row> Amount. {merchantStats[i].amount_paid_by_BC}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bill_paid_by_PC}</Row>
        <Row> Amount. {merchantStats[i].amount_paid_by_PC}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bill_paid_by_US}</Row>
        <Row> Amount. {merchantStats[i].amount_paid_by_US}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bill_paid_by_MC}</Row>
        <Row> Amount. {merchantStats[i].amount_paid_by_MC}</Row>
      </td>
      <td className="tac">
        <Row> No. {merchantStats[i].bills_pending}</Row>
        <Row> Amount. {merchantStats[i].amount_pending}</Row>
      </td>
     
      <td className="tac">{merchant.creator === 0 ? 'Bank' : 'Infra'}</td>
      <td>0</td>
      <td className="tac">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          
          <td className="tac"><Button
                                style={{minWidth:'90%', marginRight:'5px'}}
                                onClick={() => {
                                  localStorage.setItem(
                                    'selectedMerchant',
                                    JSON.stringify(merchant),
                                  );
                                history.push(`/bank/merchantreports/${merchant._id}`);
                                }}
                              >                    
                                Reports                  
                              </Button></td>
          <span
            style={{ top: 'inherit' }}
            className="absoluteMiddleRight primary popMenuTrigger"
          >
            <i className="material-icons ">more_vert</i>
            <div className="popMenu">
              <span
                onClick={() => handleMerchantPopupClick('update', merchant)}
              >
                Edit
              </span>
              <span
                onClick={() => {
                  localStorage.setItem('bankId', merchant.bank_id);
                  localStorage.setItem(
                    'currentMerchant',
                    JSON.stringify(merchant),
                  );
                  props.history.push({
                    pathname: `/bank/merchants/info/${merchant._id}`,
                  });
                }}
              >
                Info
              </span>
              {merchant.status === 0 ? (
                <span onClick={() => block(merchant._id, 'unblock')}>
                  Unblock
                </span>
              ) : (
                  <span onClick={() => block(merchant._id, 'block')}>Block</span>
                )}
              {merchant.is_private === false ? (
                <span onClick={() => visiblity(merchant._id, true)}>
                  Make Private
                </span>
              ) : (
                  <span onClick={() => visiblity(merchant._id, false)}>
                    Make Public
                  </span>
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
    const newfilterdata = copyMerchantList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );
    setMerchantList(newfilterdata)


  }
  return (
    <Wrapper from="bank">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
      <BankHeader active="merchants" />
      <Container verticalMargin>
        <Main fullWidth>
        <Row>
          <Col>
            <DashCards title='Invoice Created' no={billcreated} amount={amountcreated}/>
          </Col>
          <Col>
            <DashCards title='Invoice Uploaded' no={0} amount={0}/>
          </Col>
          <Col>
            <DashCards title='Invoice Paid' no={billPaid} amount={amountPaid}/>
          </Col>
          <Col>
            <DashCards title='Invoice Pending' no={billPending} amount={amountPending}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <DashCards title='Paid by bank' no={billPaidByBC} amount={amountPaidByBC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by partner' no={billPaidByPC} amount={amountPaidByPC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by merchant' no={billPaidByMC} amount={amountPaidByMC} row={3}/>
          </Col>
          <Col>
            <DashCards title='Paid by user' no={billPaidByUS} amount={amountPaidByUS} row={3}/>
          </Col>
        </Row>
        <Row>
                <Col>
                <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
                      <h4>Total Revenue</h4>
                      <Row>
                          <Col >
                              <Row>
                                  Fee:
                              </Row>
                              <Row>
                                  <span className="cardValue" > 0</span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Commission:
                              </Row>
                              <Row>
                                  <span className="cardValue">0</span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Total:
                              </Row>
                              <Row>
                                  <span className="cardValue">0</span>
                              </Row>
                          </Col> 
                      </Row>
                      </Card>
                  </Col>
              </Row>

          
        </Main>
        <Main fullWidth>
          <Card bigPadding>
          { admin === false || admin === 'false' ? (
                <Button
                className="addBankButton"
                flex
                style={{
                  float:"right",
                  marginBottom:'10px',
                }}
                onClick={() => handleMerchantPopupClick('new', {})}
              >
                 <i className="material-icons">add</i>
                <span>Add Merchant</span>
              </Button>

            ): ''}
        
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Merchant List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Invoice Created</th>
                    <th>Invoice Uploaded</th>
                    <th>Total Invoice Paid</th>
                    <th>Invoice Paid By Bank</th>
                    <th>Invoice Paid By Partner</th>
                    <th>Invoice Paid By User</th>
                    <th>Invoice Paid By Merchant</th>
                    <th>Invoice Pending</th>
                    <th>Creater</th>
                    <th>Total Revenue</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {merchantList && merchantList.length > 0 ? merchants : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addMerchantPopup ? (
        <CreateMerchantPopup
          type={popupType}
          merchant={editingMerchant}
          refreshMerchantList={() => refreshMerchantList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Wrapper>
  );
}

export default BankMerchantList;
