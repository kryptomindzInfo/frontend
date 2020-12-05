import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Button from 'components/Button';
import Card from 'components/Card';
import Table from 'components/Table';
import Loader from '../../../components/Loader';
import { STATIC_URL, CONTRACT_URL } from '../../App/constants';
import InfraCreateMerchantPopup from './InfraCreateMerchantPopup';
import TopBar from '../../../components/Header/TopBar';
import Welcome from '../../../components/Header/Welcome';
import A from '../../../components/A';
import SidebarTwo from '../../../components/Sidebar/SidebarTwo';
import { fetchInfraMerchantList } from './Api/InfraMerchantApi';
import history from '../../../utils/history';

function InfraMerchantList(props) {
  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const [merchantList, setMerchantList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingMerchant, setEditingMerchant] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { match } = props;
  const { id } = match.params;

  const handleMerchantPopupClick = (type, merchant) => {
    setEditingMerchant(merchant);
    setPopupType(type);
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

  const getMerchantList = async () => {
    setLoading(true);
    fetchInfraMerchantList(id)
      .then(data => {
        setMerchantList(data.list);
        setLoading(data.loading);
      })
      .catch(error => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getMerchantList();
  }, []); // Or [] if effect doesn't need props or state
  console.log(merchantList);

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
      <td className="tac">{merchant.fee_generated}</td>
      <td className="tac">
        <a
          href={`${CONTRACT_URL}${merchant.document_hash}`}
          target="_blank"
          style={{ fontSize: '15px' }}
        >
          View
        </a>
      </td>
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
              {merchant.creator === 1 ? (
                <span
                  onClick={() => handleMerchantPopupClick('update', merchant)}
                >
                  Edit
                </span>
              ) : null}
              <span
                onClick={() => {
                  localStorage.setItem('selectedBankId', id);
                  localStorage.setItem(
                    'selectedMerchant',
                    JSON.stringify(merchant),
                  );
                  history.push({
                    pathname: `/infra/merchant/fees/${merchant._id}`,
                    state: merchant,
                  });
                }}
              >
                Intra Bank Sharing Rules
              </span>
              <span
                onClick={() => {
                  console.log('click');
                  localStorage.setItem('selectedBankId', id);
                  localStorage.setItem(
                    'selectedMerchant',
                    JSON.stringify(merchant),
                  );
                  history.push({
                    pathname: `/infra/merchant/inter-bank-fees/${
                      this.props.merchantId
                    }`,
                    state: merchant,
                  });
                }}
              >
                Inter Bank Sharing Rules
              </span>
              {/* {merchant.status === 2 ? (
                <span>Unblock</span>
              ) : (
                  <span>Block</span>
                )} */}
              {merchant.status == 1 ? <span>Unblock</span> : <span>Block</span>}
            </div>
          </span>
        </div>
      </td>
    </tr>
  ));
  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchants | INFRA | E-WALLET</title>
      </Helmet>
      <TopBar>
        <Welcome infraNav />
        <Container>
          <A href="/dashboard" float="left">
            <div className="headerNavDash">Main Dashboard</div>
          </A>
        </Container>
      </TopBar>
      <Container verticalMargin>
        <div
          className="bankLogo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '16px',
            marginBottom: '1.2rem',
            boxShadow: '0 0 1px black',
            paddingTop: '16px',
            backgroundColor: 'white',
          }}
        >
          {/* <img
            src={STATIC_URL + this.state.logo}
            style={{
              width: '75px',
            }}
          /> */}
          <div
            style={{
              paddingLeft: '5px',
              paddingTop: '7px',
            }}
          >
            <h2>Merchants</h2>
          </div>
        </div>
        <SidebarTwo bankId={id} active="merchant" />

        <Main big>
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
                    <th>Fee Generated</th>
                    <th>Document</th>
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
        <InfraCreateMerchantPopup
          type={popupType}
          merchant={editingMerchant}
          bankId={id}
          refreshMerchantList={() => getMerchantList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default InfraMerchantList;
