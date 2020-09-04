import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Row from '../../components/Row';
import Col from '../../components/Col';
// import EditMerchantPopup from './EditMerchantPopup';
import Loader from '../../components/Loader';
// import SettingSideBar from '../SettingSidebar';
import BankHeader from '../../components/Header/BankHeader';

const PartnerInfoPage = props => {
  const [editMerchantPopup, setEditMerchantPopup] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(JSON.parse(localStorage.getItem('currentPartner')));
  const { match } = props;
  const { id } = match.params;
  localStorage.setItem('currentPartnerId', id);
  const handlePopupClick = () => {
    setEditMerchantPopup(true);
  };
  const onPopupClose = () => {
    setEditMerchantPopup(false);
  };
  const refreshPartnerInfo = data => {
    setLoading(true);
    setPartnerInfo(data);
    setLoading(false);
  };
  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Partner | Info</title>
      </Helmet>
      <BankHeader active="partners" />
      <Container verticalMargin>
        {/* <SettingSideBar merchantId={id} active="info" /> */}
        <Main>
          {/* <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              className="addBankButton"
              style={{ padding: '8px' }}
              onClick={() => handlePopupClick()}
              flex
            >
              <span>Edit</span>
            </Button>
          </ActionBar> */}
          <Card bigPadding bordered>
            <div className="cardBody">
              <Row>
                <Col className="infoLeft">Partner Name</Col>
                <Col className="infoRight">{partnerInfo.name}</Col>
              </Row>
							<Row>
                <Col className="infoLeft">Partner Number</Col>
                <Col className="infoRight">{partnerInfo.mobile}</Col>
              </Row>
              <Row>
                <Col className="infoLeft">Merchant Code</Col>
                <Col className="infoRight">{partnerInfo.code}</Col>
              </Row>
              <Row>
                <Col className="infoLeft">User Name</Col>
                <Col className="infoRight">{partnerInfo.username}</Col>
              </Row>  
              <Row>
                <Col className="infoLeft">Email</Col>
                <Col className="infoRight">{partnerInfo.email}</Col>
              </Row>
							<Row>
                <Col className="infoLeft">Country</Col>
                <Col className="infoRight">{partnerInfo.country}</Col>
              </Row>
							<Row>
                <Col className="infoLeft">State</Col>
                <Col className="infoRight">{partnerInfo.state}</Col>
              </Row>
              
            </div>
          </Card>
        </Main>
      </Container>
      {/* {editMerchantPopup ? (
        <EditMerchantPopup
          refreshMerchantList={data => refreshMerchantInfo(data)}
          merchant={merchantInfo}
          onClose={() => onPopupClose()}
        />
      ) : null} */}
    </Wrapper>
  );
};
export default PartnerInfoPage;
