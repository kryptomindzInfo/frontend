import React from 'react';
import { Helmet } from 'react-helmet';
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

function BankMerchantList() {
  const [addMerchantPopup, setAddMerchantPopup] = React.useState(false);
  const handleAddMerchantClick = () => {
    setAddMerchantPopup(true);
  };

  const onPopupClose = () => {
    setAddMerchantPopup(false);
  };

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
                {/* <tbody>
              {this.state.branches && this.state.branches.length > 0
                ? this.state.branches.map(function(b) {
                  return (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td className="tac">{b.total_cashiers}</td>
                      <td className="tac">{b.credit_limit}</td>
                      <td className="tac">{b.cash_in_hand}</td>
                    
                      <td className="tac bold">
                        <Row className="green">
                          <Col>0</Col>
                          <Col>0</Col>
                          <Col>0</Col>
                          <Col>0</Col>
                        </Row>
                        <span className="absoluteMiddleRight primary popMenuTrigger">
                                  <i className="material-icons ">more_vert</i>
                                  <div className="popMenu">
                                    <A href={'/bank/branch/' + b._id}>
                                      Branch Info
                                    </A>
                                    <span onClick={() => dis.showEditPopup(b)}>
                                      Edit
                                    </span>
                                    {b.status == -1 ? (
                                      <span
                                        onClick={() =>
                                          dis.blockBranch(b._id, 1)
                                        }
                                      >
                                        Unblock
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          dis.blockBranch(b._id, -1)
                                        }
                                      >
                                        Block
                                      </span>
                                    )}
                                  </div>
                                </span>
                      </td>
                    </tr>
                  );
                })
                : null}
              </tbody> */}
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
