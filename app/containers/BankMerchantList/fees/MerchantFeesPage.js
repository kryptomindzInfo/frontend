import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../../components/Wrapper';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import ActionBar from '../../../components/ActionBar';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import SettingSideBar from '../SettingSidebar';
import BankHeader from '../../../components/Header/BankHeader';
import { CURRENCY } from '../../App/constants';
import MerchantFee from './MerchantFee';

const MerchantFeesPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [rules, setRules] = useState([
    {
      name: 'Hello',
      transType: 'Wallet to Wallet',
      active: 'Inactive',
      transactions: [
        {
          trans_from: 10000,
          trans_to: 100001,
          fixed_amount: 1000,
          percentage: 10,
        },
        {
          trans_from: 10000,
          trans_to: 100001,
          fixed_amount: 1000,
          percentage: 10,
        },
      ],
    },
  ]);
  const [permissions, setPermissions] = useState(false);
  const [merchantInfo, setMerchantInfo] = useState({});
  const [editRulePage, setEditRulePage] = useState(false);
  const [createRulePage, setCreateRulePage] = useState(false);
  const [rule, setRule] = useState({});

  useEffect(() => {
    setLoading(true);
    // const merchant = JSON.parse(localStorage.getItem('merchantLogged')).details;
    setMerchantInfo({});
    setLoading(false);
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  const rulesMap = rules.map((b, index) => (
    <tr key={b._id}>
      <td>
        <span>{b.name}</span>
      </td>
      <td className="tac">
        <span>{b.transType}</span>
      </td>
      <td>
        {b.transactions.map((transaction, i) => (
          <div key={i}>
            Fixed:{' '}
            <span className="green">{`${CURRENCY} ${
              transaction.fixed_amount
            }`}</span>
            , Percentage:{' '}
            <span className="green">{`${transaction.percentage} %`}</span>
          </div>
        ))}
      </td>

      <td
        className="tac bold"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Button
          onClick={() => {
            setRule(rules[index]);
            setEditRulePage(true);
          }}
          className="addBankButton"
        >
          <span>Edit</span>
        </Button>
        <Button onClick={() => {}}>Revenue Sharing Rule</Button>
      </td>
    </tr>
  ));
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Settings</title>
      </Helmet>
      <BankHeader active="merchants" />
      <Container verticalMargin>
        <SettingSideBar active="fee" />
        <Main big>
          {!createRulePage && !editRulePage ? (
            <div>
              <ActionBar
                marginBottom="33px"
                inputWidth="calc(100% - 241px)"
                className="clr"
              >
                <div className="iconedInput fl">
                  <i className="material-icons">search</i>
                  <input
                    type="text"
                    placeholder="Search Revenue Sharing Rule"
                  />
                </div>
                <Button
                  className="addBankButton"
                  flex
                  onClick={() => setCreateRulePage(true)}
                >
                  <i className="material-icons">add</i>
                  <span>Create Rules</span>
                </Button>
              </ActionBar>
              <Card bigPadding>
                <div className="cardHeader">
                  <div className="cardHeaderLeft">
                    <i className="material-icons">supervised_user_circle</i>
                  </div>
                  <div className="cardHeaderRight">
                    <h3>Fees</h3>
                    <h5>Fees created by the Merchant</h5>
                  </div>
                </div>
                <div className="cardBody">
                  <Table marginTop="34px" smallTd>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Transaction Type</th>
                        <th>Ranges</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>{rules && rules.length > 0 ? rulesMap : null}</tbody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            ''
          )}
          {editRulePage ? (
            <MerchantFee
              rules={rule}
              onBack={() => {
                setEditRulePage(false);
              }}
            />
          ) : (
            ''
          )}
          {createRulePage ? (
            <MerchantFee
              rules={{}}
              onBack={() => {
                setCreateRulePage(false);
              }}
            />
          ) : (
            ''
          )}
        </Main>
      </Container>
    </Wrapper>
  );
};
export default MerchantFeesPage;
