import React, { useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import CreateMerchantPopup from './CreateMerchantPopup';
import { STATIC_URL, API_URL } from '../App/constants';
import Loader from '../../components/Loader';
import { fetchMerchantList } from './api/merchantAPI';

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
  const [popupType, setPopupType] = React.useState('new');
  const [editingMerchant, setEditingMerchant] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

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

  useEffect(() => {
    setLoading(true);
    const getMerchantList = async () => {
      const data = await fetchMerchantList();
      setMerchantList(data.list);
      setLoading(data.loading);
    };
    getMerchantList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const merchants = merchantList.map(merchant => (
    <tr key={merchant._id}>
      <td className="tac">
        <img
          style={{ height: '60px', width: '60px' }}
          src={`${STATIC_URL}${merchant.logo}`}
        />
      </td>
      <td className="tac">{merchant.name}</td>
      <td className="tac">{merchant.bills_paid}</td>
      <td className="tac">{merchant.bills_raised}</td>
      <td className="tac">{merchant.amount_collected}</td>
      <td className="tac">{merchant.amount_due}</td>
      <td className="tac">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <td className="tac">{merchant.creator === 0 ? 'Bank' : 'Infra'}</td>
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
  return (
    <Wrapper from="bank">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
      <BankHeader active="merchants" />
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
              <input type="text" placeholder="Search Merchants" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleMerchantPopupClick('new', {})}
            >
              <i className="material-icons">add</i>
              <span>Add Merchant</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
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
                    <th>Bills Paid</th>
                    <th>Bills Raised </th>
                    <th>Amount Collected</th>
                    <th>Amount Due</th>
                    <th>Created By</th>
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
    </Wrapper>
  );
}

export default BankMerchantList;
