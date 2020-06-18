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
import { Grid } from '@material-ui/core';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../../components/handleInputFocus';
import { addInfraShare, editInfraShare } from '../api/merchantAPI';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const MerchantRevenueSharingRule = props => {
  const [isLoading, setLoading] = useState(false);
  const [share, setShare] = useState(props.share);
  const [infraStatus, setInfraStatus] = useState(props.status);
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);

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
          <h3 style={{ color: '#fff' }}>{`Revenue with Infra(${
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
              fixed: share.fixed || '',
              percentage: share.percentage || '',
            }}
            validationSchema={Yup.object().shape({
              fixed: Yup.number().required('Fixed Amount is required'),
              percentage: Yup.number()
                .max(100, 'Cannot exceed 100')
                .required('Percentage is required'),
            })}
            onSubmit={values => {
              setLoading(true);
              values.fee_id = id;
              if (infraStatus === 1) {
                editInfraShare(infraStatus, 'revenue', values).then(r => {
                  setInfraStatus(r.status);
                  setLoading(false);
                });
              } else {
                addInfraShare('revenue', values).then(r => {
                  setInfraStatus(r.status);
                  setShare(r.share);
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
                  <h5 style={{ color: '#417505' }}>Revenue with Infra</h5>
                  <Form>
                    <Row marginTop>
                      <Col cW="25%" textAlign="center">
                        <FormGroup>
                          <label htmlFor="fixed">Fixed Amount</label>
                          <TextInput
                            type="number"
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
                            type="number"
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
            <Row vAlign="left" justifiy="flex-start" style={{ padding: '2%' }}>
              <Formik
                enableReinitialize
                initialValues={{
                  payBill: share.payBill || '',
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
                        Standard Revenue Sharing Rule
                      </h5>
                      <Form>
                        <Col cW="100%" textAlign="center">
                          <FormGroup>
                            <label htmlFor="payBill">Pay Bill</label>
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
                              onChange={handleChange}
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
              <Col cW="100%" textAlign="right">
                <Button float="right"> Add Branch</Button>
              </Col>
            </Row>
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
                >
                  Update
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MerchantRevenueSharingRule;
