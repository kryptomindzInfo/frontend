import React, { useState, useEffect } from 'react';
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

import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { createMerchantRule, editMerchantRule } from '../api/merchantAPI';

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

const CommissionFee = props => {
  const [isLoading, setLoading] = useState(false);
  const [rule, setRule] = useState(props.rules);

  const [ranges , setRanges] = useState([]);

  const handleRangeChange = (e,index) => {
    const rangelist = [...ranges];
    if( parseInt(e.target.value,10) < parseInt(rangelist[index].trans_from,10)){
      console.log('h');
      rangelist[index].trans_to = '9999999999';
      e.target.value = '9999999999';
      setRanges(rangelist);
      console.log(rangelist);
    }
    else if(e.target.value < 9999999999) {
      rangelist[index].trans_to = e.target.value;
      const obj = {
        trans_from: `${parseInt(e.target.value,10) + 1}`,
        trans_to: '9999999999',
        fixed: '',
        percentage: '',
      };
      rangelist.push(obj);
      setRanges(rangelist);
    }
  };

  useEffect(() => {
    if(props.rules){
      setRanges(props.rules.ranges);
    } else {
      setRanges([
        {
          trans_from: '1',
          trans_to: '9999999999',
          fixed: '',
          percentage: '',
        },
      ]);
    }
  },[]);

  return (
    <Card bigPadding>
      <div className="cardHeader" style={{ paddingBottom: '20px' }}>
        <div className="cardHeaderLeft flex">
          <i className="material-icons" onClick={props.onBack}>
            arrow_back
          </i>
          {Object.keys(rule).length > 0 ? (
            <h3 style={{margin:"auto"}}>Edit Commission Rule</h3>
          ) : (
            <h3 style={{margin:"auto"}}>Create Commission Rule</h3>
          )}
        </div>
      </div>
      <div className="cardBody">
        <Formik
          enableReinitialize
          initialValues={{
            name: rule.name || '',
            type: rule.type || '',
            active: rule.active || '',
            ranges: ranges,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            type: Yup.string().required('Transaction Type is required'),
            active: Yup.string().required('Status is required'),
            ranges: Yup.array().of(
              Yup.object().shape({
                trans_from: Yup.number().required('Trans From is required'),
                trans_to: Yup.number()
                  .required('Trans To is required')
                  .moreThan(Yup.ref('trans_from')),
                fixed: Yup.number().required('Fixed Amount is required'),
                percentage: Yup.number()
                  .max(100, 'Cannot exceed 100')
                  .required('Percentage is required'),
              }),
            ),
          })}
          onSubmit={values => {
            setLoading(true);
            if (Object.keys(rule).length > 0) {
              values.rule_id = rule._id;
              editMerchantRule(props, values).then(() => {
                setLoading(false);
              });
            } else {
              values.merchant_id = props.merchantId;
              createMerchantRule(props, values).then(() => {
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
                  <label htmlFor="name" className="focused">Name*</label>
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
                        disabled={Object.keys(rule).length > 0}
                      >
                        <option value="">Transaction Type*</option>
                        <option value="WM-C">Wallet to Merchant </option>
                        <option value="NWM-C">Non Wallet to Merchant </option>
                        <option value="M-C">Merchant cashier to Merchant</option>
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
                  <FieldArray name="ranges">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { ranges } = values;
                      return (
                        <div>
                          {ranges.map((transaction, index) => (
                            <Row key={transaction._id}>
                              <Col cW="30%">
                                <FormGroup>
                                  <label
                                    htmlFor={`ranges[${index}].trans_from`}
                                    className="focused"
                                  >
                                    Transaction From
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].trans_from`}
                                    value={transaction.trans_from}
                                    disabled
                                    onFocus={e => {
                                      inputFocus(e);
                                      handleChange(e);
                                    }}
                                    onBlur={e => {
                                      inputBlur(e);
                                      handleBlur(e);
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].trans_from`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col cW="30%">
                                <FormGroup>
                                  <label htmlFor={`ranges[${index}].trans_to`} className="focused">
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
                                      handleRangeChange(e,index);
                                    }}
                                    onChange={handleChange}
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].trans_to`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col cW="30%">
                                <FormGroup>
                                  <label htmlFor={`ranges[${index}].fixed`} className="focused">
                                    Fixed Amount
                                  </label>
                                  <TextInput
                                    type="number"
                                    name={`ranges[${index}].fixed`}
                                    value={transaction.fixed}
                                    onFocus={e => {
                                      inputFocus(e);
                                      handleChange(e);
                                    }}
                                    onBlur={e => {
                                      inputBlur(e);
                                      handleBlur(e);
                                    }}
                                    onChange={handleChange}
                                    required
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].fixed`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col cW="30%">
                                <FormGroup>
                                  <label
                                    htmlFor={`ranges[${index}].percentage`}
                                    className="focused"
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
                                    required
                                  />
                                  <ErrorMessage
                                    name={`ranges[${index}].percentage`}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          ))}
                          <Button
                            type="button"
                            accentedBtn
                            marginTop="10px"
                            onClick={() => {
                              setRanges([
                                {
                                  trans_from: '1',
                                  trans_to: '9999999999',
                                  fixed: '',
                                  percentage: '',
                                },
                              ]);
                          }}
                            
                          >
                            <span>Reset</span>
                          </Button>
                        </div>
                      );
                    }}
                  </FieldArray>
                </FormGroup>
                <Button type="submit" filledBtn marginTop="100px">
                  {isLoading ? <Loader /> : 'Save and Send for Approval'}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
};

export default CommissionFee;
