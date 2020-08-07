import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../components/Popup';
import axios from 'axios';
import FormField from '../../components/FormGroup';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import ErrorText from '../../components/ErrorText';
// import notify from '../../components/Notify';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

function CreateCountryPopup(props) {
  useEffect(() => {
  }, []);

  const inputFocus = (e) => {
    const { target } = e;
    target.parentElement.querySelector('label').classList.add('focused');
  }

  const inputBlur = (e) => {
    const { target } = e;
    if (target.value == '') {
      target.parentElement.querySelector('label').classList.remove('focused');
    }
  }

  const saveCountry = async (props, values) => {
    try {
        const res = await axios.post(`${API_URL}/save-country`, {
          ...values,
        });
        console.log(res);
        if (res.status === 200) {
          if (res.data.status === 0) {
          } else {
            props.refreshcountrylist();
            props.onClose();
          }
        } else {
        //   notify(res.data.message, 'error');
        }
      } catch (e) {
        // notify('Something went wrong');
      }
    };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>Add Country</h1>
      <Formik
        initialValues={{
          ccode: '',
          name: '',
        }}
        onSubmit={async (values) => {
          await saveCountry(props, values);
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="cdays">Name*</label>
                  <Field
                    type="text"
                    name="name"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField>
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Country Code*</label>
                  <Field
                    type="text"
                    name="ccode"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="ccode" component={ErrorText} />
                </FormField>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>AddCountry</span>
                  )}
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateCountryPopup;
