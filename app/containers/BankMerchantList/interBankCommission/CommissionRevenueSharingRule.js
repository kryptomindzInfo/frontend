import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from 'components/Card';
import Button from 'components/Button';
import MaterialButton from '@material-ui/core/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Row from 'components/Row';
import Col from 'components/Col';
import Loader from 'components/Loader';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../../components/handleInputFocus';
import {
  editInterBankInfraShare,
  addInterBankInfraShare,
  updateOtherBankShare,
  fetchMerchantdetails,
  merchantVisiblity,
} from '../api/merchantAPI';
import AddBranchModal from '../../BankFees/AddBranchDialog';
import AddPartnerModal from '../../BankFees/AddPartnerDialog';

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
  const [activeTab, setActiveTab] = useState('branch');
  const [share, setShare] = useState(props.editingRule.infra_share);
  const [infraStatus, setInfraStatus] = useState(
    props.editingRule.infra_approve_status,
  );
  const [type, setType] = useState(props.type);
  const [merchantStatus, setMerchantStatus] = useState(false);
  const [id, setId] = useState(props.id);
  const [otherBankShareFixed, setOtherBankShareFixed] = useState(props.editingRule.other_bank_share.fixed);
  const [otherBankSharePercentage, setOtherBankSharePercentage] = useState(props.editingRule.other_bank_share.percentage);
  const [bankId, setBankId] = useState(localStorage.getItem('bankId'));
  const [partner_share, setPartnerBranchShare] = useState(
    Number(props.share.partner_share || 0),
  );
  const [branch_share, setBranchPartnerShare] = useState(
    Number(props.share.branch_share || 0),
  );
  const [branchWithSpecificRevenue, setBranchWithSpecificRevenue] = useState(
    props.share.specific_branch_share || [],
  );
  const [partnerWithSpecificRevenue, setPartnerWithSpecificRevenue] = useState(
    props.share.specific_partner_share || [],
  );

  const refreshMerchantDetails = async() => {
    setLoading(true);
    const data = await fetchMerchantdetails(props.merchantId);
    console.log(data);
    setMerchantStatus(data.merchant.is_private);
    setLoading(false); 
  };
  const visiblity = async(value) => {
    const merchant = await merchantVisiblity(props.merchantId,value,refreshMerchantDetails);
    if (value === true){
      updateOtherBankShare(props, {
        other_bank_share: {
          fixed: 0,
          percentage:0,
        },
        rule_id: id,
      }).then(rule => {
        props.refreshRule(rule);
      })
    }
  };

  useEffect(() => {
    refreshMerchantDetails();
  },[]);

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
           type === 'IBWM-C' ? 'Wallet to Merchant' : 'Non-wallet to Merchant'
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
              values.rule_id = id;
              values.fixed = Number(values.fixed);
              values.percentage = Number(values.percentage);
              if (infraStatus === 1) {
                editInterBankInfraShare(props, values).then(r => {
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
                addInterBankInfraShare(props, values).then(r => {
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
                          <label htmlFor="fixed" className="focused">Fixed Amount</label>
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
                          <label htmlFor="percentage" className="focused">Percentage</label>
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
          </div> 
        <Grid item xs={12}>
                 <div
                  style={{
                    border: '1px solid #d0d6d1',
                    padding: '3%',
                    marginBottom: '4%',
                  }}
                >
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle"
                    >
                      Standard Revenue Sharing With Other Banks
                    </Typography>
                  </Grid>
                  <Row marginTop>
                  <Col cW="45%" textAlign="center">
                    <Grid item>
                        <TextField
                          type="number"
                          label="Percentage%"
                          margin="dense"
                          variant="outlined"
                          disabled={merchantStatus === true}
                          onChange={(e) => {
                            const val = e.target.value;
                            setOtherBankSharePercentage(val);
                          }}
                          value={otherBankSharePercentage}
                        />
                      </Grid>
                    </Col>
                    <Col cW="10%" textAlign="center">
                      <Grid item>
                        <Typography variant="caption">AND</Typography>
                      </Grid>
                    </Col>
                    <Col cW="45%" textAlign="center">
                      <Grid item>
                        <TextField
                          type="number"
                          label="Fixed"
                          disabled={merchantStatus === true}
                          margin="dense"
                          variant="outlined"
                          onChange={(e) => {
                            const val = e.target.value;
                            setOtherBankShareFixed(val);
                            
                          }}
                            value={otherBankShareFixed}
                        />
                      </Grid>
                    </Col>
                  </Row>
                </Grid>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} style={{textAlign: 'right'}}>
              {merchantStatus === false ? (
                <MaterialButton
                variant="contained"
                color="primary"
                style={{
                  marginTop: '13px',
                  marginRight: '10px',
                }}
                onClick={() =>
                  visiblity(true)
                }
                type="button"
              >
                 Make Private
              </MaterialButton>

              ) : (
                <MaterialButton
                variant="contained"
                color="primary"
                style={{
                  marginTop: '13px',
                }}
                onClick={() =>
                  visiblity(false)
                }
                type="button"
              >
                 Make Public
              </MaterialButton>
              )}

                <MaterialButton
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '13px',
                    marginLeft: '10px',
                  }}
                  onClick={() =>
                    updateOtherBankShare(props, {
                      other_bank_share: {
                        fixed: otherBankShareFixed,
                        percentage:otherBankSharePercentage,
                      },
                      rule_id: id,
                    }).then(rule => {
                      props.refreshRule(rule);
                    })
                  }
                  type="button"
                >
                  Update
                </MaterialButton>
              </Grid>
            </div>
      </Grid>
      </div>
      {type !== 'IBWM-C' ? (
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
                <Col cW = "23%">
                  <span
                    className={`${
                      activeTab ===  'branch' ? 'ActiveTab' : 'InactiveTab'
                    } `}
                    // className={classes.bankBranches}
                    onClick={() => setActiveTab('branch')}
                  >
                    Bank Branches
                  </span>
                </Col>
                <Col>
                  <span
                    className={`${
                      activeTab ===  'partner' ? 'ActiveTab' : 'InactiveTab'
                    } `}
                    // className={classes.bankBranches}
                    onClick={() => setActiveTab('partner')}
                  >
                    Bank Partners
                  </span>
                </Col>
              </Row>
              {activeTab ===  'branch' ? (
                <Row
                vAlign="left"
                justifiy="flex-start"
                style={{ padding: '2%' }}
              >
                <Formik
                  enableReinitialize
                  initialValues={{
                    payBill: branch_share || '',
                  }}
                  onSubmit={values => {}}
                >
                  {formikProps => {
                    const { handleChange, handleBlur, values } = formikProps;
                    return (
                      <div>
                        <h5 style={{ color: 'black' }}>
                          Standard Revenue Sharing Rule
                        </h5>
                        <Form>
                          <Col cW="100%" textAlign="center">
                            <FormGroup>
                              <label htmlFor="payBill" className="focused">Sharing % for branches</label>
                              <TextInput
                                type="number"
                                name="payBill"
                                disabled
                                value={branch_share}
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
              ) : (
                <Row
                vAlign="left"
                justifiy="flex-start"
                style={{ padding: '2%' }}
              >
                <Formik
                  enableReinitialize
                  initialValues={{
                    partner_share: partner_share || '',
                  }}
                  onSubmit={values => {}}
                >
                  {formikProps => {
                    const { handleChange, handleBlur, values } = formikProps;
                    return (
                      <div>
                        <h5 style={{ color: 'black' }}>
                          Standard Revenue Sharing Rule
                        </h5>
                        <Form>
                          <Col cW="100%" textAlign="center">
                            <FormGroup>
                              <label htmlFor="partner_share" className="focused">Sharing % for partner</label>
                              <TextInput
                                type="number"
                                name="partner_share"
                                disabled
                                value={partner_share}
                                onFocus={e => {
                                  inputFocus(e);
                                  handleChange(e);
                                }}
                                onBlur={e => {
                                  inputBlur(e);
                                  handleBlur(e);
                                }}
                                onChange={e => {
                                  setPartnerBranchShare(e.target.value);
                                  handleChange(e);
                                }}
                              />
                              <ErrorMessage name="partner_share" />
                            </FormGroup>
                          </Col>
                        </Form>
                      </div>
                    );
                  }}
                </Formik>
              </Row>
              )}
            </div>
          ) : null}

          {type !== 'IBWM-C' ? (
            <div>
              {activeTab === 'branch' ? (
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
                      Branches with Specific Revenue Sharing
                    </h5>
                  </Col>
                </Row>
                  {branchWithSpecificRevenue.length > 0
                    ? branchWithSpecificRevenue.map((d, i) => (
                      <Row
                        vAlign="left"
                        justifiy="flex-start"
                        style={{
                          padding: '2%',
                          margin: '2%',
                          borderBottom: '1px solid #d0d6d1',
                        }}
                      >
                        <Col cW="20%">{d.code}</Col>
                        <Col cW="20%">{d.name}</Col>
                        <Col cW="30%"  style={{ marginTop: '-10px' }}>
                          <TextField
                            type="number"
                            label="Sharing%"
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
                        <Col cW="30%">
                          <Button
                            style={{ marginLeft: '60px' }}
                            onClick={() => {
                              setBranchWithSpecificRevenue(
                                branchWithSpecificRevenue.filter(
                                  branch => d.code !== branch.code,
                                ),
                              );
                            }}
                          >
                            {' '}
                            delete
                          </Button>
                        </Col>
                      </Row>
                    ))
                    : null}
                <Row
                  vAlign="left"
                  height="125px"
                  justifiy="flex-start"
                  style={{ padding: '2%' }}
                >
                  <Col cW="100%" textAlign="center" />
                </Row>
              </div>
              ) : (
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
                      Partners with Specific Revenue Sharing
                    </h5>
                  </Col>
                </Row>
                  {partnerWithSpecificRevenue.length > 0
                    ? partnerWithSpecificRevenue.map((d, i) => (
                      <Row
                        vAlign="left"
                        justifiy="flex-start"
                        style={{
                          padding: '2%',
                          margin: '2%',
                          borderBottom: '1px solid #d0d6d1',
                        }}
                      >
                        <Col cW="20%">{d.code}</Col>
                        <Col cW="20%">{d.name}</Col>
                        <Col cW="30%"  style={{ marginTop: '-10px' }}>
                          <TextField
                            type="number"
                            label="Sharing%"
                            margin="dense"
                            variant="outlined"
                            onChange={e => {
                              const val = e.target.value;
                              const tempArr = [...partnerWithSpecificRevenue];
                              tempArr[i].percentage = val;
                              setPartnerWithSpecificRevenue(tempArr);
                            }}
                            value={d.percentage}
                          />
                        </Col>
                        <Col cW="30%">
                          <Button
                            style={{ marginLeft: '60px' }}
                            onClick={() => {
                              setPartnerWithSpecificRevenue(
                                partnerWithSpecificRevenue.filter(
                                  branch => d.code !== branch.code,
                                ),
                              );
                            }}
                          >
                            {' '}
                            delete
                          </Button>
                        </Col>
                      </Row>
                  ))
                  : null}
                <Row
                  vAlign="left"
                  height="125px"
                  justifiy="flex-start"
                  style={{ padding: '2%' }}
                >
                  <Col cW="100%" textAlign="center" />
                </Row>
            </div>
            )}
            </div>
          ) : null}
    </Card>
  );
};


export default CommissionRevenueSharingRule;
