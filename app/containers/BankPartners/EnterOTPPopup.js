import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import CountrySelectBox from  '../../components/CountrySelectBox';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Popup from '../../components/Popup';
import Row from '../../components/Row';
import Col from '../../components/Col';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import { API_URL, CONTRACT_URL, STATIC_URL } from '../App/constants';
import messages from '../BankPage/messages';
import UploadArea from '../../components/UploadArea';


function EnterOTPPopup(props) {
  const [timer, setTimer] = React.useState(30);
  const [resend, setResend] = React.useState(false);
  const token = localStorage.getItem('bankLogged');

  const startTimer = () => {
    setResend(false);
    let time = 30;
    var timercount = setInterval(function() {
      if (time <= 0) {
        clearInterval(timercount);
        setResend(true);
      } else {
        time = time - 1;
        setTimer(time);
      }
    }, 1000);
  };

  const handleresend = () => {
    startTimer();
    props.resend();
  }

  useEffect(() => {
    startTimer();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          otp: '',
        }}
        onSubmit={async values => {
          props.submit(values);
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string().required('Otp is required'),
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
                Verify OTP
              </h1>
              <Form>
                <FormGroup>
                  <TextField
                    size="small"
                    name="otp"
                    label="Enter OTP*"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.otp}
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
                    <span>Verify OTP</span>
                  )}
                </Button>
                <p className="resend">
                    Wait for <span className="timer">{timer}</span>{' '}
                    to{' '}
                    {resend ? (
                      <span className="go" onClick={handleresend}>
                        Resend
                      </span>
                    ) : (
                      <span>Resend</span>
                    )}
                  </p>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default EnterOTPPopup;
