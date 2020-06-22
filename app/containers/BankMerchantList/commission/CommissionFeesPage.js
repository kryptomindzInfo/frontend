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
import CommissionFee from './CommissionFee';
import CommissionRevenueSharingRule from './CommissionRevenueSharingRule';
import { getRules } from '../api/merchantAPI';

const CommissionFeesPage = props => {
  const [isLoading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);
  const [editRulePage, setEditRulePage] = useState(false);
  const [createRulePage, setCreateRulePage] = useState(false);
  const [revenueSharingRulePage, setRevenueSharingRulePage] = useState(false);
  const [editingRule, setEditingRule] = useState({});
  const { match } = props;
  const { id } = match.params;
  localStorage.setItem('currentMerchantId', id);

  const refreshFeeList = () => {
    setCreateRulePage(false);
    setEditRulePage(false);
    setLoading(true);
    getRules('commission', id).then(r => {
      setRules(r.list);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshFeeList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  const rulesMap = () =>
    rules.map(r => {
      if (r.edited && r.edited.ranges.length > 0) {
        r.ranges = r.edited.ranges;
        r.merchant_approve_status = r.edited.merchant_approve_status;
      }
      return (
        <tr key={r._id}>
          <td className="tac">
            <span>{r.name}</span>
          </td>
          <td className="tac">
            <span>
              {r.type === 0 ? 'Wallet to Merchant' : 'Non-wallet to Merchant'}
            </span>
          </td>
          <td>
            {r.ranges.map(range => (
              <div key={range._id}>
                Fixed:{' '}
                <span className="green">{`${CURRENCY} ${range.fixed}`}</span>,
                Percentage:{' '}
                <span className="green">{`${range.percentage} %`}</span>
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
                setEditingRule(r);
                setEditRulePage(true);
              }}
              className="addBankButton"
            >
              <span>Edit</span>
            </Button>
            {r.merchant_approve_status === 0 ? (
              <Button style={{ cursor: 'default' }}>
                Pending Merchant Approval
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setEditingRule(r);
                  setRevenueSharingRulePage(true);
                }}
                className="addBankButton"
              >
                Revenue Sharing Rule
              </Button>
            )}
          </td>
        </tr>
      );
    });

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Settings</title>
      </Helmet>
      <BankHeader active="merchants" />
      <Container verticalMargin>
        <SettingSideBar active="commission" />
        <Main big>
          {!createRulePage && !editRulePage && !revenueSharingRulePage ? (
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
                  <span>Create Commission Fee</span>
                </Button>
              </ActionBar>
              <Card bigPadding>
                <div className="cardHeader">
                  <div className="cardHeaderLeft">
                    <i className="material-icons">supervised_user_circle</i>
                  </div>
                  <div className="cardHeaderRight">
                    <h3>Commission</h3>
                    <h5>Commission created by the Merchant</h5>
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
                    <tbody>
                      {rules && rules.length > 0 ? rulesMap() : null}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            ''
          )}
          {editRulePage ? (
            <CommissionFee
              merchantId={id}
              rules={editingRule}
              refreshRuleList={() => refreshFeeList()}
              onBack={() => {
                setEditRulePage(false);
              }}
            />
          ) : (
            ''
          )}
          {createRulePage ? (
            <CommissionFee
              merchantId={id}
              rules={{}}
              refreshRuleList={() => refreshFeeList()}
              onBack={() => {
                setCreateRulePage(false);
              }}
            />
          ) : (
            ''
          )}
          {revenueSharingRulePage ? (
            <CommissionRevenueSharingRule
              merchantId={id}
              share={editingRule.infra_share}
              status={editingRule.infra_approve_status}
              type={editingRule.type}
              id={editingRule._id}
              onBack={() => {
                setRevenueSharingRulePage(false);
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
export default CommissionFeesPage;
