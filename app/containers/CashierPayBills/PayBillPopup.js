import React, { useState, useEffect } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import Button from 'components/Button';
import Row from 'components/Row';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import * as Yup from 'yup';
import Popup from '../../components/Popup';
import { inputBlur, inputFocus } from '../../components/handleInputFocus';
import PayBillsInvoiceList from './PayBillsInvoiceList';
import PayBillsInvoiceDetails from './PayBillsInvoiceDetails';
import { getInvoiceDetails, getUserInvoices } from './api/PayBillsAPI';
import PayBillOTP from './PayBillOTP';

const PayBillPopup = props => {
  const { merchant } = props;
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isInvoiceId, setInvoiceId] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState({});
  const [displayInvoiceList, setDisplayInvoiceList] = useState(false);
  const [paybillOTP, setPaybillOTP] = useState(false);
  const [displayInvoiceDetailForm, setDisplayInvoiceDetailForm] = useState(
    false,
  );
  const [invoiceName, setInvoiceName] = useState('');
  const [isBackButtonEnabled, setBackButtonEnabled] = useState(false);

  const handleSetEditingInvoice = invoice => {
    setEditingInvoice(invoice);
    setDisplayInvoiceList(false);
    setBackButtonEnabled(true);
    setDisplayInvoiceDetailForm(true);
  };
  const onBack = () => {
    setDisplayInvoiceList(true);
    setBackButtonEnabled(false);
    setDisplayInvoiceDetailForm(false);
  };

  useEffect(() => {
    console.log(merchant._id);
  }, []);

  return (
    <div>
      <Popup accentedH1 bigBody close={props.close}>
        {paybillOTP ? (
          <PayBillOTP close={props.close} invoice={editingInvoice} />
        ) : (
          <div>
            <h1>Pay {invoiceName} Bills</h1>
            {!displayInvoiceList && !displayInvoiceDetailForm ? (
              <Formik
                initialValues={{
                  invoiceIdOrMobile: '',
                }}
                onSubmit={async values => {
                  if (isMobile) {
                    getUserInvoices(values.invoiceIdOrMobile).then(data => {
                      console.log(data.list);
                      setInvoiceList(data.list);
                      setDisplayInvoiceList(true);
                      if(data.list.length > 0){
                        setInvoiceName(data.list[0].name);
                      }
                    });
                  } else if (isInvoiceId) {
                    getInvoiceDetails(values.invoiceIdOrMobile, merchant._id).then(data => {
                      console.log(data.list);
                      setInvoiceList(data.list);
                      setDisplayInvoiceList(true);
                      if(data.list.length > 0){
                        setInvoiceName(data.list[0].name);
                      }
                    });
                  }
                }}
                validationSchema={Yup.object().shape({
                  invoiceIdOrMobile: Yup.string()
                    .test('isMobile', '', value => {
                      if (isNaN(value)) {
                        setMobile(false);
                        setInvoiceId(true);
                        return false;
                      }
                      setInvoiceId(false);
                      setMobile(true);
                      return false;
                    })
                    .test('isInvoice', '', value => {
                      if (isNaN(value)) {
                        setInvoiceId(true);
                        setMobile(false);
                        return false;
                      }
                      setMobile(true);
                      setInvoiceId(false);
                      return false;
                    })
                    .required('Required'),
                })}
              >
                {formikProps => {
                  const { values, handleChange, handleBlur } = formikProps;
                  return (
                    <Form>
                      <FormGroup>
                        <label htmlFor="invoiceIdOrMobile">
                          Mobile or Invoice Id
                        </label>
                        <TextInput
                          type="text"
                          name="invoiceIdOrMobile"
                          onFocus={e => {
                            inputFocus(e);
                            handleChange(e);
                          }}
                          onBlur={e => {
                            inputBlur(e);
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.invoiceIdOrMobile}
                        />
                        <ErrorMessage name="invoiceIdOrMobile" />
                      </FormGroup>
                      <FormGroup>
                        <Button filledBtn>
                          {isLoading ? <Loader /> : 'Get'}
                        </Button>
                      </FormGroup>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              ''
            )}
            {displayInvoiceList ? (
              <PayBillsInvoiceList
                merchant={merchant}
                invoiceList={invoiceList}
                setEditingInvoice={value => handleSetEditingInvoice(value)}
                close={props.close}
                showOTPPopup={values => {
                  setEditingInvoice(values);
                  setPaybillOTP(true);
                }}
              />
            ) : (
              ''
            )}
            {displayInvoiceDetailForm ? (
              <PayBillsInvoiceDetails
                merchantId={merchant._id}
                showOTPPopup={values => {
                  setEditingInvoice(values);
                  setPaybillOTP(true);
                }}
                close={props.close}
                invoice={editingInvoice}
                merchant={merchant}
              />
            ) : (
              ''
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default PayBillPopup;
