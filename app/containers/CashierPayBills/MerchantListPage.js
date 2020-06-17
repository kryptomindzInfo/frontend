import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { STATIC_URL } from '../App/constants';
import Loader from '../../components/Loader';
import CashierHeader from '../../components/Header/CashierHeader';
import SidebarCashier from '../../components/Sidebar/SidebarCashier';

function MerchantListPage(props) {
  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const [merchantList, setMerchantList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingMerchant, setEditingMerchant] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const logo = localStorage.getItem('bankLogo');

  const handleMerchantPopupClick = (type, merchant) => {
    setEditingMerchant(merchant);
    setPopupType(type);
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

  const refreshMerchantList = async () => {
    const data = {};
    setMerchantList(data.list);
    setLoading(data.loading);
  };

  useEffect(() => {
    setLoading(true);
    const getMerchantList = async () => {
      const data = {};
      setMerchantList(data.list);
      setLoading(data.loading);
    };
    getMerchantList();
  }, []); // Or [] if effect doesn't need props or state

  const getMerchants = () =>
    merchantList.map(function(merchant) {
      return (
        <tr key={merchant._id}>
          <td className="tac">
            <img
              style={{ height: '22%' }}
              src={`${STATIC_URL}/${merchant.logo}`}
            />
          </td>
          <td className="tac">{merchant.name}</td>
          <td className="tac">Select Merchant</td>

          {/*  <td className="tac bold">
           <div
           style={{
           display: 'flex',
           justifyContent: 'center',
           }}
           >
           <td className="tac">
           {merchant.fee_generated}
           </td>
           <span className="absoluteMiddleRight primary popMenuTrigger">
           <i className="material-icons ">more_vert</i>
           <div className="popMenu">
           <span
           onClick={() =>
           handleMerchantPopupClick(
           'update',
           merchant,
           )
           }
           >
           Edit
           </span>
           <span
           onClick={() =>
           props.history.push({
           pathname: `/bank/merchants/info/${
           merchant._id
           }`,
           state: merchant,
           })
           }
           >
           Info
           </span>
           {merchant.status === -1 ? (
           <span>Unblock</span>
           ) : (
           <span>Block</span>
           )}
           </div>
           </span>
           </div>
           </td> */}
        </tr>
      );
    });
  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper from="branch">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | CASHIER | E-WALLET</title>
      </Helmet>
      <CashierHeader
        active="bills"
        from="cashier"
        bankName={props.match.params.bank}
        bankLogo={STATIC_URL + logo}
      />
      <Container verticalMargin>
        <SidebarCashier
          branchName={props.match.params.bank}
          refresh={() => {}}
        />
        <Main>
          <ActionBar marginBottom="33px" className="clr">
            <div className="iconedInput fl">
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search Merchants" />
            </div>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Merchant List</h3>
                <h5>Pay your bills safely with us</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {merchantList && merchantList.length > 0
                    ? getMerchants()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default MerchantListPage;
