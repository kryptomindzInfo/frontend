import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Popup from '../../components/Popup';
import { postRequest, getRequest } from '../App/ApiCall';

import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});



function MessagePopup(props) {
  const token = localStorage.getItem('bankLogged');

 

  useEffect(() => {
  }, []); // Or [] if effect doesn't need props or state

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          message: '',
          message_title: '',
        }}
        onSubmit={async values => {
            const res = await postRequest("broadcastMessage", token, {...values});
            if (res.data.data.status === 0) {
                toast.error(res.data.data.message);
              } else {
                toast.success(res.data.data.message);
                props.onClose();
              }
        }}
        validationSchema={Yup.object().shape({
          message: Yup.string().required('Message is required'),
          message_title: Yup.string().required('Message Title is required'),
        })}
      >
        {formikProps => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = formikProps;

          return (
            <div>
              <h1>
                Broadcast Messages
              </h1>
              <Form>
              <FormGroup>
                  <TextField
                    size="small"
                    name="message_title"
                    label="Message Title*"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.message_title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.otp && touched.otp ? errors.otp : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="message"
                    label="Enter Message*"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.otp && touched.otp ? errors.otp : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  marginTop="10px"
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>Submit</span>
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

export default MessagePopup;
