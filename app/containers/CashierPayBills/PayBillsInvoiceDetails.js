import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';

import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Col from 'components/Col';
import Container from 'components/Container';
import * as Yup from 'yup';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../components/handleInputFocus';

const PayBillsInvoiceDetails = props => {
  const [isLoading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(props.invoice);
  const [fee, setFee] = useState(0);

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
        onSubmit={values => {
          values.invoice_id = invoice._id;
          setInvoice(values);
          props.showOTPPopup(values);
        }}
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
          const { values } = formikProps;
          return (
            <Form>
              <Container>
                <Row>
                  <Col className="popInfoLeft">Name</Col>
                  <Col className="popInfoRight">{values.name}</Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Amount</Col>
                  <Col className="popInfoRight">{values.amount}</Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Due Date</Col>
                  <Col className="popInfoRight">{values.due_date}</Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Description</Col>
                  <Col className="popInfoRight">{values.description}</Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Mobile</Col>
                  <Col className="popInfoRight">{values.mobile}</Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Fee</Col>
                  <Col className="popInfoRight">{fee}</Col>
                </Row>
              </Container>
              <FormGroup>
                <Button filledBtn>
                  {isLoading ? <Loader /> : `Collect ${fee} and Pay Bill`}
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PayBillsInvoiceDetails;
