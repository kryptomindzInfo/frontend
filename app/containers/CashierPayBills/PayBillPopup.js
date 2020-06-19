import React, { useState } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import * as Yup from 'yup';
import Popup from '../../components/Popup';
import { inputBlur, inputFocus } from '../../components/handleInputFocus';
import PayBillsInvoiceList from './PayBillsInvoiceList';
import PayBillsInvoiceDetails from './PayBillsInvoiceDetails';

const PayBillPopup = props => {
  const { merchant } = props;
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isInvoiceId, setInvoiceId] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState({});
  const [displayInvoiceList, setDisplayInvoiceList] = useState(false);
  const [displayInvoiceDetailForm, setDisplayInvoiceDetailForm] = useState(
    false,
  );

  const handleSetEditingInvoice = invoice => {
    setEditingInvoice(invoice);
    setDisplayInvoiceList(false);
    setDisplayInvoiceDetailForm(true);
  };

  return (
    <div>
      <Popup accentedH1 close={props.close}>
        <div>
          <h1>Pay Bills</h1>
          {!displayInvoiceList && !displayInvoiceDetailForm ? (
            <Formik
              initialValues={{
                invoiceIdOrMobile: '',
              }}
              onSubmit={values => {
                if (isMobile) {
                  setInvoiceList([]);
                  setDisplayInvoiceList(true);
                } else if (isInvoiceId) {
                  setEditingInvoice();
                  setDisplayInvoiceDetailForm(true);
                }
              }}
              validationSchema={Yup.object().shape({
                invoiceIdOrMobile: Yup.string()
                  .max(10, 'Cannot exceed 10 digits')
                  .test('isMobile', '', value => {
                    if (value.length === 10) {
                      setMobile(true);
                      setInvoiceId(false);
                      return false;
                    }
                    setInvoiceId(true);
                    setMobile(false);
                    return false;
                  })
                  .test('isInvoice', '', value => {
                    if (value.length < 10) {
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
            />
          ) : (
            ''
          )}
          {displayInvoiceDetailForm ? (
            <PayBillsInvoiceDetails invoice={editingInvoice} />
          ) : (
            ''
          )}
        </div>
      </Popup>
    </div>
  );
};

export default PayBillPopup;
