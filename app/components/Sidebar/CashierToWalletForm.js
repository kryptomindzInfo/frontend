import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { API_URL, CURRENCY } from '../../containers/App/constants';

const styles = makeStyles(() => ({
  '@global': {
    'MuiOutlinedInput-input': {
      padding: '12.5px 10px 12.5px 10px',
    },
  },
  dialogNonWallet: {
    paddingTop: '5%',
  },
  dialogGridLeft: {
    paddingBottom: '2%',
    paddingLeft: '10%',
    paddingRight: '2%',
  },
  dialogGridRight: {
    paddingBottom: '2%',
    paddingRight: '10%',
    paddingLeft: '2%',
  },
  dialogTextFieldGrid: {
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '2%',
  },
  dialogTextField: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  dialogTextFieldGridErrorText: {
    color: 'red',
    fontSize: '10px',
  },
  dialogTextFieldFullRow: {
    padding: '0.5%',
    marginBottom: '5px',
  },
  dialogSubHeader: {
    paddingBottom: '2%',
    paddingRight: '3%',
    paddingLeft: '3%',
  },
  dialogButton: {
    padding: '2%',
  },
  dialogPaper: {
    color: 'grey',
    padding: '2%',
    height: '80%',
    width: '95%',
  },
  noteTextField: {
    height: '70px',
  },
  toggleButtonGroup: {
    color: 'green',
    marginTop: '10px',
  },
  toggleButton: {
    width: '150px',
    background: '#1a841b',
    color: '#fff',
    '&:hover': {
      background: '#1a841b',
      color: '#fff',
    },
  },
  toggleButtonDisabled: {
    color: '#1a841b',
    border: '1px solid #1a841b',
  },
  otpTextField: {
    margin: '80px',
    marginTop: '150px',
    marginBottom: '5px',
  },
  resendText: {
    fontSize: '12px',
    marginRight: '80px',
    marginLeft: '80px',
    marginBottom: '10px',
  },
  proceedButton: {
    paddingTop: '1%',
    paddingBottom: '1%',
  },
}));
const initialValues = {
  givenname: '',
  familyname: '',
  note: '',
  senderIdentificationCountry: '',
  senderIdentificationType: '',
  senderIdentificationNumber: '',
  senderIdentificationValidTill: '',
  address1: '',
  state: '',
  zip: '',
  ccode: '',
  country: '',
  email: '',
  mobile: '',
  livefee: '',
  requireOTP: '',
  receiverMobile: '',
  receiverIdentificationAmount: '',
  // termsAndCondition: false,
};
const CashierToWalletForm = ({ onClose, formValues, isValidFee }) => {
  const classes = styles();
  const [values, setValues] = useState(initialValues);
  const [liveFee, setLiveFee] = useState(0);
  const [isFeeValid, setIsFeeValid] = useState(isValidFee);
  const handleClose = () => {
    onClose();
  };

  const getLiveFee = amount => {
    const token = localStorage.getItem('cashierLogged');
    if (amount !== '') {
      axios
        .post(`${API_URL}/cashier/checkNonWalToWalFee`, { token, amount })
        .then(res => {
          if (res.status === 200) {
            if (res.data.error) {
              toast.error(res.data.error);
            } else {
              setLiveFee(res.data.fee);
            }
          }
        })
        .catch(err => {
          toast.error(err.response.data.error);
        });
    }
  };

  const handleOnProceedClick = values => {
    formValues(values);
  };
  return (
    <div>
      <Formik
        initialValues={values}
        onSubmit={async values => {
          values.livefee = liveFee;
          values.requireOTP = '111111';
          setValues(values);
          handleOnProceedClick(values);
        }}
        validationSchema={Yup.object().shape({
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
          receiverMobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required')
            .test('numberMatch', 'You cannot send money to yourself!', function(
              value,
            ) {
              return this.parent.mobile !== value;
            })
            .test(
              'WalletCheck',
              'Wallet for this number does not exist!',
              function(value) {
                const token = localStorage.getItem('cashierLogged');
                if (value) {
                  if (value.length === 10) {
                    return new Promise((resolve, reject) => {
                      axios
                        .post(`${API_URL}/cashier/getUser`, {
                          token,
                          mobile: value,
                        })
                        .then(res => {
                          if (res.data.error || res.data.status !== 1) {
                            resolve(false);
                          }
                          resolve(true);
                        })
                        .catch(err => resolve(false));
                    });
                  }
                  return false;
                }
                return false;
              },
            ),
          givenname: Yup.string().required('Given Name is required'),
          familyname: Yup.string().required('Family Name is required'),
          country: Yup.string().required('Country is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          senderIdentificationType: Yup.string().required('Type is required'),
          senderIdentificationNumber: Yup.number().required(
            'Number no is required',
          ),
          senderIdentificationValidTill: Yup.string().required(
            'Date is required',
          ),
          receiverIdentificationAmount: Yup.number().required(
            'Amount is required',
          ),
          senderIdentificationCountry: Yup.string().required(
            'Country is required',
          ),
          // termsAndCondition: Yup.boolean().oneOf(
          //   [true],
          //   'You must accept the terms and conditions.',
          // ),
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
          } = formikProps;
          return (
            <Form>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item md={6} xs={12}>
                  <Grid
                    container
                    direction="column"
                    className={classes.dialogGridLeft}
                  >
                    <Typography
                      variant="h6"
                      className={classes.dialogSubHeader}
                    >
                      Sender's Info
                    </Typography>
                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={2}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          size="small"
                          autoFocus
                          id="form-phone-pre"
                          label="+91"
                          variant="outlined"
                          type="text"
                          disabled
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          autoFocus
                          error={errors.mobile && touched.mobile}
                          name="mobile"
                          id="form-phone"
                          label="Phone No"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="number"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          helperText={
                            errors.mobile && touched.mobile ? errors.mobile : ''
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="givenname"
                          id="form-given-name"
                          label="Given Name"
                          error={errors.givenname && touched.givenname}
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.givenname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          helperText={
                            errors.givenname && touched.givenname
                              ? errors.givenname
                              : ''
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="familyname"
                          id="form-family-name"
                          label="Family Name"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.familyname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={errors.familyname && touched.familyname}
                          helperText={
                            errors.familyname && touched.familyname
                              ? errors.familyname
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={12}
                        md={12}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="address1"
                          id="form-address"
                          label="Address"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldFullRow}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="state"
                          id="form-state"
                          label="State"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextField}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="zip"
                          id="form-zip"
                          label="Zip Code"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="country"
                          id="form-country"
                          label="Country"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={errors.country && touched.country}
                          helperText={
                            errors.country && touched.country
                              ? errors.country
                              : ''
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="email"
                          id="form-email"
                          label="Email"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={errors.email && touched.email}
                          helperText={
                            errors.email && touched.email ? errors.email : ''
                          }
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="h6"
                      className={classes.dialogSubHeader}
                    >
                      Sender's Identification
                    </Typography>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="senderIdentificationCountry"
                          id="form-identification-country"
                          label="Country"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.senderIdentificationCountry}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextField}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="senderIdentificationType"
                          id="form-fidentification-type"
                          label="Type"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.senderIdentificationType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={
                            errors.senderIdentificationType &&
                            touched.senderIdentificationType
                          }
                          helperText={
                            errors.senderIdentificationType &&
                            touched.senderIdentificationType
                              ? errors.senderIdentificationType
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="senderIdentificationNumber"
                          id="form-identification-number"
                          label="Number"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="number"
                          value={values.senderIdentificationNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={
                            errors.senderIdentificationNumber &&
                            touched.senderIdentificationNumber
                          }
                          helperText={
                            errors.senderIdentificationNumber &&
                            touched.senderIdentificationNumber
                              ? errors.senderIdentificationNumber
                              : ''
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="senderIdentificationValidTill"
                          id="form-idetification-valid-till"
                          label="Valid Till"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder=""
                          variant="outlined"
                          type="date"
                          value={values.senderIdentificationValidTill}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          error={
                            errors.senderIdentificationValidTill &&
                            touched.senderIdentificationValidTill
                          }
                          helperText={
                            errors.senderIdentificationValidTill &&
                            touched.senderIdentificationValidTill
                              ? errors.senderIdentificationValidTill
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>
                    {/*  <Grid container direction="column" alignItems="flex-start">
                      <Grid item className={classes.dialogTextFieldGrid}>
                        <Checkbox name="requireOTP"/>
                        <span>require OTP</span>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Grid
                    container
                    direction="column"
                    className={classes.dialogGridRight}
                  >
                    <Typography
                      variant="h6"
                      className={classes.dialogSubHeader}
                    >
                      Receivers's Info
                    </Typography>
                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={2}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          size="small"
                          autoFocus
                          id="form-phone-pre"
                          label="+91"
                          variant="outlined"
                          type="text"
                          disabled
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          autoFocus
                          error={
                            errors.receiverMobile && touched.receiverMobile
                          }
                          name="receiverMobile"
                          id="form-phone"
                          label="Phone No"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="text"
                          value={values.receiverMobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.dialogTextFieldGrid}
                          helperText={
                            errors.receiverMobile && touched.receiverMobile
                              ? errors.receiverMobile
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={2}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          size="small"
                          id="form-amount-pre"
                          label="XOF"
                          variant="outlined"
                          type="text"
                          disabled
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="receiverIdentificationAmount"
                          id="form-sending-amount"
                          label="Amount"
                          fullWidth
                          placeholder=""
                          variant="outlined"
                          type="number"
                          value={values.receiverIdentificationAmount}
                          onChange={handleChange}
                          onBlur={e =>
                            getLiveFee(values.receiverIdentificationAmount)
                          }
                          className={classes.dialogTextFieldGridFullRow}
                          error={
                            errors.receiverIdentificationAmount &&
                            touched.receiverIdentificationAmount
                          }
                          helperText={
                            errors.receiverIdentificationAmount &&
                            touched.receiverIdentificationAmount
                              ? errors.receiverIdentificationAmount
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="flex-start">
                      <Grid
                        item
                        xs={12}
                        alignItems="center"
                        className={classes.dialogTextFieldGrid}
                      >
                        <TextField
                          disabled={!isFeeValid}
                          size="small"
                          name="note"
                          id="form-note"
                          fullWidth
                          placeholder="Note"
                          variant="outlined"
                          multiline
                          rows="4"
                          type="text"
                          value={values.note}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      alignItems="flex-start"
                      className={classes.dialogTextFieldGrid}
                    >
                      <Typography
                        style={{
                          color: 'rgb(53, 153, 51)',
                          marginBottom: '10px',
                          fontSize: '10px',
                        }}
                      >
                        Total Fee {CURRENCY} {liveFee} will be charged
                      </Typography>

                      {/* <div>
                        <Checkbox name="termsAndCondition" />
                        <span>
                          I have read the <u> terms and conditions </u>
                        </span>
                      </div>
                      {errors.termsAndCondition && touched.termsAndCondition ? (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                          {errors.termsAndCondition}
                        </div>
                      ) : (
                        ''
                      )} */}
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      className={classes.dialogTextFieldGrid}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        onClick={handleSubmit}
                        className={classes.proceedButton}
                        variant="contained"
                        color="primary"
                        disableElevation
                        disabled={isSubmitting || !isFeeValid}
                      >
                        <Typography variant="h6">Proceed</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CashierToWalletForm;
