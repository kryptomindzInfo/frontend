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
  const [share, setShare] = useState(props.editingRule.infra_share);
  const [infraStatus, setInfraStatus] = useState(
    props.editingRule.infra_approve_status,
  );
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);
  const [otherBankShareFixed, setOtherBankShareFixed] = useState(props.editingRule.other_bank_share.fixed);
  const [otherBankSharePercentage, setOtherBankSharePercentage] = useState(props.editingRule.other_bank_share.percentage);
  const [bankId, setBankId] = useState(localStorage.getItem('bankId'));

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
                          // disabled={this.state.trans_type === 'Wallet to Non Wallet'}
                          // className={classNames(classes.textField, classes.dense)}
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
                <MaterialButton
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '13px',
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
    </Card>
  );
};


export default CommissionRevenueSharingRule;
