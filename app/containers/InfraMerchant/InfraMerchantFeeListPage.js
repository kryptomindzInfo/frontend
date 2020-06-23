import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Wrapper from 'components/Wrapper';
import TopBar from 'components/Header/TopBar';
import Container from 'components/Container';
import Welcome from 'components/Header/Welcome';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import FormGroup from 'components/FormGroup';
import Row from 'components/Row';
import Col from 'components/Col';
import A from 'components/A';
import Loader from 'components/Loader';
import MiniPopUp from 'components/MiniPopUp';

import { CURRENCY } from '../App/constants';

import 'react-toastify/dist/ReactToastify.css';
import InfraMerchantSidebar from './InfraMerchantSidebar';
import { getInfraMerchantRules, merchantInfraRuleApi } from './FeeAPI';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export const InfraMerchantFeeListPage = props => {
  const [loading, setLoading] = useState(false);
  const [ruleList, setRules] = useState([]);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalPopup, setApprovalPopup] = useState(false);
  const [ruleForApproval, setRuleForApproval] = useState({});
  const [bankId, setBankId] = useState(localStorage.getItem('selectBankId'));
  const [merchantInfo, setMerchantInfo] = useState(
    JSON.parse(localStorage.getItem('selectedMerchant')),
  );
  const { match } = props;
  const { id } = match.params;

  const refreshRuleList = async () => {
    setLoading(true);
    getInfraMerchantRules(props.feeType, id).then(rules => {
      setRules(rules.list.filter(rule => rule.infra_approve_status !== 0));
      setLoading(rules.loading);
    });
  };

  useEffect(() => {
    refreshRuleList();
  }, []);

  const onApprovalPopupClick = rule => {
    setRuleForApproval(rule);
    setApprovalPopup(true);
  };

  const onCloseApprovalPopup = () => {
    setRuleForApproval({});
    setApprovalPopup(false);
  };

  const rules = () =>
    ruleList.map(rule => {
      if(rule.infra_share_edit_status === 1) {
        rule.infra_share = rule.edited.infra_share;
        rule.infra_approve_status = rule.edited.infra_approve_status;
      }
      return (
        <tr key={rule._id}>
          <td>
            <span>{rule.name}</span>
          </td>
          <td className="tac">
            <span>
              {' '}
              {rule.type === 0
                ? 'Wallet to Merchant'
                : 'Non-wallet to Merchant'}
            </span>
          </td>
          <td>
            <div>
              <span key={rule._id}>
                <br />
                Fixed: {`${CURRENCY} ${rule.infra_share.fixed}`} <br />
                Percentage: {`${rule.infra_share.percentage}`} <br />
              </span>
            </div>
          </td>

          <td className="tac bold">
            {rule.infra_approve_status === 3 ? (
              <Button
                onClick={() => onApprovalPopupClick(rule)}
                className="addBankButton"
              >
                <span>Approve</span>
              </Button>
            ) : rule.infra_approve_status === 1 ? (
              <span>Approved</span>
            ) : (
              <span>Declined</span>
            )}
          </td>
        </tr>
      );
    });

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
      <TopBar>
        <Welcome infraNav />
        <Container>
          <A href={`/merchants/${bankId}`} float="left">
            <div className="headerNavDash">Back</div>
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
          <div
            style={{
              paddingLeft: '5px',
              paddingTop: '7px',
            }}
          >
            <h2>{merchantInfo.name}</h2>
          </div>
        </div>

        <InfraMerchantSidebar
          bankId={bankId}
          merchantId={id}
          active={props.feeType}
        />
        <Main big>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search Revenue Sharing Rule" />
            </div>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Merchant {props.feeType} Sharing Rules</h3>
                <h5>Fees created by the infra</h5>
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
                  {ruleList && ruleList.length > 0 ? rules() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>

      {approvalPopup ? (
        <MiniPopUp close={() => onCloseApprovalPopup()}>
          <div>
            <form>
              <p>
                <span id="popname">{ruleForApproval.name}</span>
              </p>
              <p> </p>
              <div>
                Fixed:{' '}
                <span className="green">{`${CURRENCY} ${
                  ruleForApproval.infra_share.fixed
                }`}</span>
                , Percentage:{' '}
                <span className="green">
                  {ruleForApproval.infra_share.percentage}%
                </span>
              </div>

              <Row>
                <Col>
                  <FormGroup>
                    {approvalLoading ? (
                      <Button
                        filledBtn
                        marginTop="50px"
                        accentedBtn
                        disabled
                        type="button"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        filledBtn
                        marginTop="50px"
                        accentedBtn
                        type="button"
                        onClick={() =>
                          merchantInfraRuleApi(
                            props,
                            props.feeType,
                            'decline',
                            {
                              fee_id: ruleForApproval._id,
                              commission_id: ruleForApproval._id,
                            },
                          ).then(() => {
                            setApprovalPopup(false);
                            refreshRuleList();
                          })
                        }
                      >
                        <span>Decline</span>
                      </Button>
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    {approvalLoading ? (
                      <Button filledBtn marginTop="50px" disabled type="button">
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          merchantInfraRuleApi(
                            props,
                            props.feeType,
                            'approve',
                            {
                              fee_id: ruleForApproval._id,
                              commission_id: ruleForApproval._id,
                            },
                          ).then(() => {
                            setApprovalPopup(false);
                            refreshRuleList();
                          })
                        }
                        filledBtn
                        marginTop="50px"
                        type="button"
                      >
                        <span>Approve</span>
                      </Button>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </div>
        </MiniPopUp>
      ) : null}
    </Wrapper>
  );
};
