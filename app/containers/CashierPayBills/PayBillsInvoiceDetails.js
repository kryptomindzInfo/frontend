import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Col from 'components/Col';
import Container from 'components/Container';
import * as Yup from 'yup';
import { correctFocus } from '../../components/handleInputFocus';
import { checkCashierFee } from './api/CashierMerchantAPI';
import { CURRENCY, STATIC_URL } from '../App/constants';

const PayBillsInvoiceDetails = props => {
  const [isLoading, setLoading] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const [invoice, setInvoice] = useState(props.invoice);
  const [fee, setFee] = useState(0);
  const { merchant } = props;

  const checkFee = () => {
    checkCashierFee({
      merchant_id: props.merchantId,
      amount: invoice.amount,
    }).then(data => {
      setFee(data.fee);
    });
  };

  useEffect(() => {
    setDataLoading(true);
    checkFee();
    correctFocus('update');
    setDataLoading(false);
  });
  return (
    <div>
      <Formik
        initialValues={{
          number: invoice.number || '',
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
                <Row style={{ marginBottom: '20px' }}>
                  <Col
                    className="popInfoLeft"
                    style={{ marginRight: '-110px' }}
                  >
                    <div className="cardHeaderLeft">
                      <img
                        src={`${STATIC_URL}/${merchant.logo}`}
                        alt=""
                        style={{
                          height: '60px',
                          width: '60px',
                          paddingRight: '10px',
                        }}
                      />
                    </div>
                  </Col>
                  <Col className="popInfoRight">
                    <div className="cardHeader">
                      <div className="cardHeaderRight">
                        <h4 style={{ color: 'green' }}>{merchant.name}</h4>
                        <p>{merchant.description}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="popInfoLeft">Invoice No</Col>
                  <Col className="popInfoRight">{values.number}</Col>
                </Row>
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
                  {isLoading ? (
                    <Loader />
                  ) : (
                    `Collect ${CURRENCY} ${Number(fee) +
                      Number(values.amount)} and Pay Bill`
                  )}
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
