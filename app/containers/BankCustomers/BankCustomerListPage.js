import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import BankSidebarTwo from 'components/Sidebar/BankSidebarTwo';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { STATIC_URL, API_URL } from '../App/constants';
import MessagePopup from './MessagePopup';
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

function BankCustomerListPage(props) {
  const [Popup, setPopup] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);
  const [copyCustomerList, setCopyCustomerList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const token = localStorage.getItem('bankLogged');

  const handlePopupClick = () => {
    setPopup(true);
  };

  const onPopupClose = () => {
    setPopup(false);
  };

  const fetchCustomerList = async () => {
    const res = await postRequest("listEndUsers", token, {})
    if (res.data.data.status === 0) {
      toast.error(res.data.data.message);
      return { list: [], loading: false };
    } else {
      return { list: res.data.data.users, loading: false };
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCustomerList = async () => {
      const data = await fetchCustomerList();
      setCustomerList(data.list);
      setCopyCustomerList(data.list);
      setLoading(data.loading);
    };
    getCustomerList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const customer = customerList.map(customer => (
    <tr key={customer._id}>
      <td className="tac">{customer.name}</td>
      <td className="tac">{customer.last_name}</td>
      <td className="tac">{customer.username}</td>
      <td className="tac">{customer.mobile}</td>
    </tr>
  ));
  const searchlistfunction = (value) => {
    console.log(value)
    // console.log(this.state.searchrules)
    const newfilterdata = copyCustomerList.filter(element =>
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
      <BankHeader active="users" />
      <Container verticalMargin>
      <BankSidebarTwo active="announcements" />
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search Customer" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handlePopupClick()}
            >
              <span>Broadcast</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Customer List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList && customerList.length > 0 ? customer : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {Popup ? (
        <MessagePopup
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default BankCustomerListPage;
