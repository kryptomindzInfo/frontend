import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Table from 'components/Table';
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
  const [totalAmount, setTotalAmount] = useState(
    invoice.items.reduce(function(a, b) {
      return a + b.quantity * b.item_desc.unit_price;
    }, 0),
  const [totalTax, setTotalTax] = useState(invoice.items.reduce(
    function(a, b){
      return a + (b.total_amount-(b.quantity*b.item_desc.unit_price));
    }, 0));
  const [fee, setFee] = useState();
  const { merchant } = props;

  const checkFee = () => {
    checkCashierFee({
      merchant_id: props.merchantId,
      amount: invoice.amount,
    }).then(data => {
      setFee(data.fee);
    });
  };

  const getItems = () =>
    invoice.items.map(item => (
        <tr key={item._id}>
          <td className="tac">{item.item_desc.name}</td>
          <td className="tac">{item.item_desc.description}</td>
          <td className="tac">{item.item_desc.code}</td>
          <td className="tac">{item.item_desc.unit_of_measure}</td>
          <td className="tac">{item.item_desc.unit_price}</td>
          <td className="tac">{item.quantity}</td>
          <td className="tac">{item.tax_desc.value}</td>
          <td className="tac">{item.quantity*item.item_desc.unit_price}</td>
      </tr>
      ));

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
          bill_date: invoice.bill_date || '',
          bill_period: invoice.bill_period || '',
          mobile: invoice.mobile || '',
        }}
        onSubmit={values => {
          values.invoice_id = invoice._id;
          // setInvoice(values);
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
                    cW="25%"
                    className="popInfoLeft"
                    style={{ marginRight: '-110px' }}
                  >
                    <div className="cardHeaderLeft">
                      <img
                        src={`${STATIC_URL}${merchant.logo}`}
                        alt=""
                        style={{
                          height: '60px',
                          width: '60px',
                          paddingRight: '10px',
                          marginRight: '10px',
                        }}
                      />
                    </div>
                  </Col>
                  <Col cW="25%" className="popInfoRight">
                    <div className="cardHeader">
                      <div className="cardHeaderRight">
                        <h4 style={{ color: 'green' }}>{merchant.name}</h4>
                        <p>{merchant.description}</p>
                      </div>
                    </div>
                  </Col>
                  <Col cW="50%" />
                </Row>
                <Row>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Name</Col>
                      <Col className="popInfoRight">{values.name}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Mobile</Col>
                      <Col className="popInfoRight">{values.mobile}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Invoice No</Col>
                      <Col className="popInfoRight">{values.number}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Bill Date</Col>
                      <Col className="popInfoRight">{values.bill_date}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Due Date</Col>
                      <Col className="popInfoRight">{values.due_date}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Bill Period</Col>
                      <Col className="popInfoRight">
                        {values.bill_period.period_name}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col cW="100%">
                    <Row />
                    <Table marginTop="34px" smallTd>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Code</th>
                          <th>Unit of measure</th>
                          <th>Unit price</th>
                          <th>Quantity</th>
                          <th>Tax %</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items && invoice.items.length > 0
                          ? getItems()
                          : null}
                      </tbody>
                      <hr />
                      <tbody>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td style={{ float: 'left' }}>
                            <b>Total Amount</b>
                          </td>
                          <td>{totalAmount}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td style={{ float: 'left' }}>
                            <b>Total Tax</b>
                          </td>
                          <td>{totalTax}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td style={{ float: 'left' }}>
                            <b>Fees</b>
                          </td>
                          <td>{fee}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                          <td style={{ float: 'left' }}>
                            <b>Sum Total</b>
                          </td>
                          <td>{fee + values.amount}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
              <FormGroup>
                {isNaN(Number(fee) + Number(values.amount)) ? (
                  <h5 style={{ marginTop: '10px', textAlign: 'center' }}>
                    Can't process transaction right now
                  </h5>
                ) : (
                  <Button filledBtn>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      `Collect ${CURRENCY} ${Number(fee) +
                        Number(values.amount)} and Pay Bill`
                    )}
                  </Button>
                )}
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PayBillsInvoiceDetails;
