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
import { getRules } from '../api/merchantAPI';
import MerchantRevenueSharingRule from './MerchantRevenueSharingRule';

const MerchantFeesPage = props => {
  const [isLoading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);
  const [editRulePage, setEditRulePage] = useState(false);
  const [createRulePage, setCreateRulePage] = useState(false);
  const [revenueSharingRulePage, setRevenueSharingRulePage] = useState(false);
  const [editingRule, setEditingRule] = useState({});
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    setLoading(true);
    getRules('revenue', id).then(r => {
      setRules(r.list);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  const rulesMap = rules.map((r, index) => (
    <tr key={r._id}>
      <td>
        <span>Demo</span>
      </td>
      <td className="tac">
        <span>
          {r.type === '0' ? 'Wallet to Merchant' : 'Non-wallet to Merchant'}
        </span>
      </td>
      <td>
        {r.ranges.map(range => (
          <div key={range._id}>
            Fixed: <span className="green">{`${CURRENCY} ${range.fixed}`}</span>
            , Percentage:{' '}
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
            setEditingRule(rules[index]);
            setEditRulePage(true);
          }}
          className="addBankButton"
        >
          <span>Edit</span>
        </Button>
        <Button
          onClick={() => {
            setEditingRule(rules[index]);
            setRevenueSharingRulePage(true);
          }}
          className="addBankButton"
        >
          Revenue Sharing Rule
        </Button>
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
              merchantId={id}
              rules={editingRule}
              onBack={() => {
                setEditRulePage(false);
              }}
            />
          ) : (
            ''
          )}
          {createRulePage ? (
            <MerchantFee
              merchantId={id}
              rules={{}}
              onBack={() => {
                setCreateRulePage(false);
              }}
            />
          ) : (
            ''
          )}
          {revenueSharingRulePage ? (
            <MerchantRevenueSharingRule
              merchantId={id}
              rules={editingRule}
              status={editingRule.infra_share_edit_status}
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
export default MerchantFeesPage;
