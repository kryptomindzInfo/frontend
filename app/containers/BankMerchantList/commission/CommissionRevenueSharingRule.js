import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from 'components/Card';
import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Row from 'components/Row';
import Col from 'components/Col';
import Loader from 'components/Loader';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../../components/handleInputFocus';
import {
  addInfraShare,
  editInfraShare,
  updatePartnerShare,
} from '../api/merchantAPI';
import AddBranchModal from '../../BankFees/AddBranchDialog';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const CommissionRevenueSharingRule = props => {
  const [isLoading, setLoading] = useState(false);
  const [share, setShare] = useState(props.editingRule.infra_share);
  const [infraStatus, setInfraStatus] = useState(
    props.editingRule.infra_approve_status,
  );
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);
  const [openBranchModal, setOpenBranchModal] = useState(false);
  const [branchPartnerShare, setBranchPartnerShare] = useState(
    Number(props.editingRule.partner_share_percentage),
  );
  const [branchWithSpecificRevenue, setBranchWithSpecificRevenue] = useState(
    props.editingRule.specific_branch_share,
  );
  const [bankId, setBankId] = useState(localStorage.getItem('bankId'));

  const getBranchDetailsFromModal = branchDetails => {
    if (branchWithSpecificRevenue && branchWithSpecificRevenue.length > 0) {
      if (
        branchWithSpecificRevenue
          .map(d => d.code)
          .includes(branchDetails[0].bcode)
      ) {
        return alert('Branch already saved');
      }
    }

    setBranchWithSpecificRevenue([
      ...branchWithSpecificRevenue,
      {
        code: branchDetails[0].bcode,
        name: branchDetails[0].name,
        percentage: 0,
      },
    ]);

    setOpenBranchModal(false);
  };

  useEffect(() => {
    if (Object.keys(share).length > 0) {
      correctFocus('update');
    }
  });

  const nameBasedOnStatus = () => {
    switch (infraStatus) {
      case 1:
        return 'Update';
      case 2:
        return 'Send For Approval';
      case 3:
        return 'Pending';
      default:
        return 'Send For Approval';
    }
  };

  return (
    <Card bigPadding>
      <div className="cardHeader">
        <Grid
          container
          style={{ textAlign: 'center', background: '#f5a623', padding: 12 }}
          alignItems="center"
          justify="space-between"
        >
          <h3 style={{ color: '#fff' }}>{`Commission with Infra(${
            type === '0' ? 'Wallet to Merchant' : 'Non-wallet to Merchant'
          })`}</h3>
          <Grid item>
            <Button onClick={props.onBack}>x</Button>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          border: '1px solid #d0d6d1',
          padding: '3%',
        }}
      >
        <div className="cardBody">
          <Formik
            enableReinitialize
            initialValues={{
              fixed: Number(share.fixed) || Number(''),
              percentage: Number(share.percentage) || Number(''),
            }}
            validationSchema={Yup.object().shape({
              fixed: Yup.number().required('Fixed Amount is required'),
              percentage: Yup.number()
                .max(100, 'Cannot exceed 100')
                .required('Percentage is required'),
            })}
            onSubmit={values => {
              setLoading(true);
              values.commission_id = id;
              values.fixed = Number(values.fixed);
              values.percentage = Number(values.percentage);
              if (infraStatus === 1) {
                editInfraShare(props, 'commission', values).then(r => {
                  if (r.status !== 0) {
                    if (r.rule.infra_share_edit_status === 1) {
                      r.rule.infra_share = r.rule.edited.infra_share;
                      r.rule.infra_approve_status =
                        r.rule.edited.infra_approve_status;
                      props.refreshRule(r.rule);
                      setLoading(false);
                    }
                  }
                });
              } else {
                addInfraShare(props, 'commission', values).then(r => {
                  props.refreshRule(r);
                  setLoading(false);
                });
              }
            }}
          >
            {formikProps => {
              const { handleChange, handleBlur, values } = formikProps;
              return (
                <div
                  style={{
                    border: '1px solid #d0d6d1',
                    padding: '3%',
                    marginBottom: '4%',
                  }}
                >
                  <h5 style={{ color: '#417505' }}>Commission with Infra</h5>
                  <Form>
                    <Row marginTop>
                      <Col cW="25%" textAlign="center">
                        <FormGroup>
                          <label htmlFor="fixed">Fixed Amount</label>
                          <TextInput
                            type="text"
                            name="fixed"
                            value={values.fixed}
                            onFocus={e => {
                              inputFocus(e);
                              handleChange(e);
                            }}
                            onBlur={e => {
                              inputBlur(e);
                              handleBlur(e);
                            }}
                            onChange={handleChange}
                          />
                          <ErrorMessage name="fixed" />
                        </FormGroup>
                      </Col>
                      <Col textAlign="center" cW="5%">
                        <span>AND</span>
                      </Col>
                      <Col cW="25%" textAlign="center">
                        <FormGroup>
                          <label htmlFor="percentage">Percentage</label>
                          <TextInput
                            type="text"
                            name="percentage"
                            value={values.percentage}
                            onFocus={e => {
                              inputFocus(e);
                              handleChange(e);
                            }}
                            onBlur={e => {
                              inputBlur(e);
                              handleBlur(e);
                            }}
                            onChange={handleChange}
                          />
                          <ErrorMessage name="percentage" />
                        </FormGroup>
                      </Col>
                      <Col cW="45%" textAlign="center">
                        <FormGroup>
                          <Button
                            noMin
                            disabled={infraStatus === 3}
                            type="submit"
                            filledBtn
                            style={{
                              marginLeft: '15px',
                              fontSize: '16px',
                              paddingRight: '10px',
                              paddingLeft: '10px',
                            }}
                          >
                            {isLoading ? <Loader /> : nameBasedOnStatus()}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
              );
            }}
          </Formik>
          {type !== 0 ? (
            <div
              style={{
                border: '1px solid #d0d6d1',
              }}
            >
              <Row
                vAlign="left"
                justifiy="flex-start"
                style={{
                  marginTop: '2%',
                  borderBottom: '1px solid #417505',
                }}
              >
                <Col>
                  <span className="ActiveTab">Bank Branches</span>
                </Col>
              </Row>
              <Row
                vAlign="left"
                justifiy="flex-start"
                style={{ padding: '2%' }}
              >
                <Formik
                  initialValues={{
                    payBill: String(branchPartnerShare) || '',
                  }}
                  validationSchema={Yup.object().shape({
                    payBill: Yup.number().required('Pay Bill required'),
                  })}
                  onSubmit={values => {}}
                >
                  {formikProps => {
                    const { handleChange, handleBlur, values } = formikProps;
                    return (
                      <div>
                        <h5 style={{ color: 'black' }}>
                          Standard Commission Sharing Rule
                        </h5>
                        <Form>
                          <Col cW="100%" textAlign="center">
                            <FormGroup>
                              <label htmlFor="payBill">Sharing %</label>
                              <TextInput
                                type="number"
                                name="payBill"
                                value={values.payBill}
                                onFocus={e => {
                                  inputFocus(e);
                                  handleChange(e);
                                }}
                                onBlur={e => {
                                  inputBlur(e);
                                  handleBlur(e);
                                }}
                                onChange={e => {
                                  setBranchPartnerShare(e.target.value);
                                  handleChange(e);
                                }}
                              />
                              <ErrorMessage name="payBill" />
                            </FormGroup>
                          </Col>
                        </Form>
                      </div>
                    );
                  }}
                </Formik>
              </Row>
            </div>
          ) : null}
          {type !== 0 ? (
            <div
              style={{
                border: '1px solid #d0d6d1',
              }}
            >
              <Row
                vAlign="left"
                justifiy="flex-start"
                style={{
                  padding: '2%',
                  margin: '2%',
                  borderBottom: '1px solid #d0d6d1',
                }}
              >
                <Col cW="100%" textAlign="center">
                  <h5 style={{ color: 'black', textAlign: 'start' }}>
                    Branches with Specific Commission Sharing
                  </h5>
                </Col>
                <Col cW="100%" textAlign="right">
                  <Button float="right"> Add Branch</Button>
                </Col>
              </Row>
              {branchWithSpecificRevenue &&
              branchWithSpecificRevenue.length > 0 ? (
                  <Row
                    vAlign="left"
                    justifiy="flex-start"
                    style={{
                      padding: '2%',
                      margin: '2%',
                      borderBottom: '1px solid #d0d6d1',
                    }}
                  >
                    {branchWithSpecificRevenue.map((d, i) => (
                    <>
                      <Col>{d.code}</Col>
                      <Col>{d.name}</Col>
                      <Col style={{ marginTop: '-10px' }}>
                        <TextField
                          type="number"
                          label="pay bills%"
                          margin="dense"
                          variant="outlined"
                          onChange={e => {
                            const val = e.target.value;
                            const tempArr = [...branchWithSpecificRevenue];
                            tempArr[i].percentage = val;
                            setBranchWithSpecificRevenue(tempArr);
                          }}
                          value={d.percentage}
                        />
                      </Col>
                      <Col>
                        <Button
                          style={{ marginLeft: '60px' }}
                          onClick={() => {
                            setBranchWithSpecificRevenue(
                              branchWithSpecificRevenue.filter(
                                branch => d.branch_code !== branch.code,
                              ),
                            );
                          }}
                        >
                          {' '}
                          delete
                        </Button>
                      </Col>
                    </>
                    ))}
                  </Row>
                ) : null}
              <Row
                vAlign="left"
                height="125px"
                justifiy="flex-start"
                style={{ padding: '2%' }}
              >
                <Col cW="100%" textAlign="center" />
                <Col
                  cW="20%"
                  textAlign="right"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    noMin
                    type="submit"
                    filledBtn
                    style={{
                      marginLeft: '15px',
                      fontSize: '16px',
                      paddingRight: '10px',
                      paddingLeft: '10px',
                      float: 'right',
                    }}
                    onClick={() =>
                      updatePartnerShare(props, 'Commission', {
                        percentage: branchPartnerShare,
                        specific_partners_share: branchWithSpecificRevenue,
                        commission_id: id,
                      }).then(rule => {
                        props.refreshRule(rule);
                      })
                    }
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
      </div>
      <AddBranchModal
        open={openBranchModal}
        bank_id={bankId}
        handleClose={() => setOpenBranchModal(false)}
        getBranchDetailsFromModal={details =>
          getBranchDetailsFromModal(details)
        }
      />
    </Card>
  );
};

export default CommissionRevenueSharingRule;
