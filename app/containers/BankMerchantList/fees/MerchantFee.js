import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from 'components/Card';
import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import Row from 'components/Row';
import Col from 'components/Col';
import Loader from 'components/Loader';
import * as Yup from 'yup';
import { Form, Formik, FieldArray, ErrorMessage } from 'formik';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../../components/handleInputFocus';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const MerchantFee = props => {
  const [isLoading, setLoading] = useState(false);
  const [rule, setRule] = useState(props.rules);

  useEffect(() => {
    if (Object.keys(rule).length > 0) {
      correctFocus('update');
    }
  });

  return (
    <Card bigPadding>
      <div className="cardHeader" style={{ paddingBottom: '20px' }}>
        <div className="cardHeaderLeft flex">
          <i className="material-icons" onClick={props.onBack}>
            arrow_back
          </i>
          <h3>Create Revenue sharing Rules</h3>
        </div>
      </div>
      <div className="cardBody">
        <Formik
          enableReinitialize
          initialValues={{
            name: rule.name || '',
            type: rule.type || '',
            active: rule.active || '',
            ranges: rule.ranges || [
              {
                trans_from: '',
                trans_to: '',
                fixed_amount: '',
                percentage: '',
              },
            ],
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            type: Yup.string().required('Transaction Type is required'),
            active: Yup.string().required('Status is required'),
            transaction: Yup.array().of(
              Yup.object().shape({
                trans_from: Yup.number().required('Trans From is required'),
                trans_to: Yup.number().required('Trans To is required'),
                fixed_amount: Yup.number().required('Fixed Amount is required'),
                percentage: Yup.number()
                  .max(100, 'Cannot exceed 100')
                  .required('Percentage is required'),
              }),
            ),
          })}
          onSubmit={values => {
            setLoading(true);
            if (rule) {
              values.fee_id = rule.fee_id;
              editMerchantRule(props, 'revenue', values).then(() => {
                setLoading(false);
              });
            } else {
              values.merchant_id = props.merchantId;
              createMerchantRule(props, 'revenue', values).then(() => {
                setLoading(false);
              });
            }
          }}
        >
          {formikProps => {
            const { handleChange, handleBlur } = formikProps;
            return (
              <Form>
                <FormGroup>
                  <label htmlFor="name">Name*</label>
                  <TextInput
                    type="text"
                    name="name"
                    onFocus={e => {
                      inputFocus(e);
                      handleChange(e);
                    }}
                    onBlur={e => {
                      inputBlur(e);
                      handleBlur(e);
                    }}
                    onChange={handleChange}
                    value={formikProps.values.name}
                  />
                  <ErrorMessage name="name" />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        type="text"
                        name="type"
                        value={formikProps.values.type}
                        onChange={handleChange}
                      >
                        <option value="">Transaction Type*</option>
                        <option value="0">Wallet to Merchant</option>
                        <option value="1">Non Wallet to Merchant</option>
                      </SelectInput>
                      <ErrorMessage name="type" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        type="text"
                        name="active"
                        value={formikProps.values.active}
                        onChange={handleChange}
                      >
                        <option value="">Status Type*</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive </option>
                      </SelectInput>
                      <ErrorMessage name="active" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="ranges">Transaction</label>
                  <FieldArray name="ranges">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { ranges } = values;
                      return (
                        <div>
                          {ranges.map((transaction, index) => (
                            <Row key={index}>
                              <Col>
                                <FormGroup>
                                  <label
                                    htmlFor={`ranges[${index}].trans_from`}
                                  >
                                    Transaction From
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].trans_from`}
                                    value={transaction.trans_from}
                                    onFocus={e => {
                                      inputFocus(e);
                                      handleChange(e);
                                    }}
                                    onBlur={e => {
                                      inputBlur(e);
                                      handleBlur(e);
                                    }}
                                    onChange={e => {
                                      handleChange(e);
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].trans_from`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <label htmlFor={`ranges[${index}].trans_to`}>
                                    Transaction To
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].trans_to`}
                                    value={transaction.trans_to}
                                    onFocus={e => {
                                      inputFocus(e);
                                      handleChange(e);
                                    }}
                                    onBlur={e => {
                                      inputBlur(e);
                                      handleBlur(e);
                                    }}
                                    onChange={e => {
                                      handleChange(e);
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].trans_to`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <label
                                    htmlFor={`ranges[${index}].fixed_amount`}
                                  >
                                    Fixed Amount
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].fixed_amount`}
                                    value={transaction.fixed_amount}
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
                                  <ErrorMessage
                                    name={`ranges[${index}].fixed_amount`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <label
                                    htmlFor={`ranges[${index}].percentage`}
                                  >
                                    Percentage
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].percentage`}
                                    value={transaction.percentage}
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
                                  <ErrorMessage
                                    name={`ranges[${index}].percentage`}
                                  />
                                </FormGroup>
                              </Col>
                              {index > 0 ? (
                                <Col
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '14px',
                                  }}
                                >
                                  <FormGroup>
                                    <Button onClick={() => remove(index)}>
                                      <i className="material-icons">delete</i>
                                    </Button>
                                  </FormGroup>
                                </Col>
                              ) : null}
                            </Row>
                          ))}
                          <Button
                            type="button"
                            accentedBtn
                            marginTop="10px"
                            onClick={() => {
                              push({
                                trans_from:
                                  ranges[ranges.length - 1].trans_to + 1,
                                trans_to: '',
                                fixed_amount: '',
                                percentage: '',
                              });
                            }}
                          >
                            <span>Add Another Range</span>
                          </Button>
                        </div>
                      );
                    }}
                  </FieldArray>
                </FormGroup>
                <Button type="submit" filledBtn marginTop="100px">
                  {isLoading ? <Loader /> : 'Save'}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
};

export default MerchantFee;
