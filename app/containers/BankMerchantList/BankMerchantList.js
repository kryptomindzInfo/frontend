import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
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
import { API_URL, STATIC_URL } from '../App/constants';

function BankMerchantList() {
  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const [merchantList, setMerchantList] = React.useState([]);

  const handleAddMerchantClick = () => {
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

  useEffect(() => {
    async function fetchMerchantList() {
      try {
        const token = localStorage.getItem('bankLogged');
        const res = await axios.post(`${API_URL}/bank/listMerchant`, {
          token,
        });
        if (res.status === 200) {
          if (res.data.status === 0) {
            toast.error(res.data.message);
          } else {
            setMerchantList(res.data.list);
          }
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error('Something went wrong');
      }
    }
    fetchMerchantList();
  }, []); // Or [] if effect doesn't need props or state

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
              onClick={handleAddMerchantClick}
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
                <h5>Your friends and family</h5>
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
                    <th>Fee Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {merchantList && merchantList.length > 0
                    ? merchantList.map(function(merchant) {
                        return (
                        <tr key={merchant._id}>
                          <td className="tac">
                            <img
                              style={{ height: '22%' }}
                              src={`${STATIC_URL}/${merchant.logo_hash}`}
                            />
                          </td>
                            <td className="tac">{merchant.logo_hash}</td>
                            <td className="tac">{merchant.name}</td>
                          <td className="tac">{merchant.bills_paid}</td>
                            <td className="tac">{merchant.bills_raised}</td>
                          <td className="tac">{merchant.amount_collected}</td>
                            <td className="tac">{merchant.fee}</td>

                          <td className="tac bold">
                            <span className="absoluteMiddleRight primary popMenuTrigger">
                                <i className="material-icons ">more_vert</i>
                              <div className="popMenu">
                                  <span>Edit</span>
                                {merchant.status === -1 ? (
                                    <span>Unblock</span>
                                ) : (
                                    <span>Block</span>
                                )}
                                </div>
                            </span>
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
      {addMerchantPopup ? (
        <CreateMerchantPopup onClose={() => onPopupClose()} />
      ) : null}
    </Wrapper>
  );
}

export default BankMerchantList;
