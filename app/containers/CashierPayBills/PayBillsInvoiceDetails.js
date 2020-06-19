import React, { useState, useEffect } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';

import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import * as Yup from 'yup';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../components/handleInputFocus';

const PayBillsInvoiceDetails = props => {
  const [isLoading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(props.invoice);

  useEffect(() => {
    correctFocus('update');
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: invoice.name || '',
          amount: invoice.amount || '',
          due_date: invoice.due_date || '',
          description: invoice.description || '',
          mobile: invoice.mobile || '',
        }}
        onSubmit={values => {}}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          amount: Yup.number().required('Number is required.'),
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
        })}
      >
        {formikProps => {
          const { values, handleChange, handleBlur } = formikProps;
          return (
            <Form>
              <FormGroup>
                <label htmlFor="name">Name</label>
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
                  value={values.name}
                />
                <ErrorMessage name="name" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amount">Amount</label>
                <TextInput
                  type="number"
                  name="amount"
                  onFocus={e => {
                    inputFocus(e);
                    handleChange(e);
                  }}
                  onBlur={e => {
                    inputBlur(e);
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  value={values.amount}
                />
                <ErrorMessage name="amount" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amoudue_datent" className="focused">
                  Due Date
                </label>
                <TextInput
                  placeholder="dd-mm-yyyy"
                  type="text"
                  name="due_date"
                  onFocus={e => {
                    handleChange(e);
                  }}
                  onBlur={e => {
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  value={values.due_date}
                />
                <ErrorMessage name="due_date" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="description">Description</label>
                <TextInput
                  rows="3"
                  type="text"
                  name="description"
                  onFocus={e => {
                    inputFocus(e);
                    handleChange(e);
                  }}
                  onBlur={e => {
                    inputBlur(e);
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  value={values.description}
                />
                <ErrorMessage name="description" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="mobile">Mobile</label>
                <TextInput
                  type="number"
                  name="mobile"
                  onFocus={e => {
                    inputFocus(e);
                    handleChange(e);
                  }}
                  onBlur={e => {
                    inputBlur(e);
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  value={values.mobile}
                />
                <ErrorMessage name="mobile" />
              </FormGroup>
              <FormGroup>
                <Button filledBtn>{isLoading ? <Loader /> : 'Pay Bill'}</Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PayBillsInvoiceDetails;
