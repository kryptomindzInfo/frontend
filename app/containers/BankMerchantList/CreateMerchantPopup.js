import React from 'react';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Popup from '../../components/Popup';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import { API_URL, CONTRACT_URL, STATIC_URL } from '../App/constants';
import messages from '../BankPage/messages';
import UploadArea from '../../components/UploadArea';
import { createMerchant, editMerchant } from './api/merchantAPI';

function CreateMerchantPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.merchant.name || '',
          logo: props.merchant.logo || '',
          description: props.merchant.description || '',
          document_hash: props.merchant.document_hash || '',
          email: props.merchant.email || '',
          mobile: props.merchant.mobile || '',
          merchant_id: props.merchant.username || '',
        }}
        onSubmit={async values => {
          if (props.type === 'update') {
            values.username = values.merchant_id;
            values.merchant_id = props.merchant._id;
            await editMerchant(props, values, token);
          } else {
            await createMerchant(props, values, token);
          }
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
          merchant_id: Yup.string()
            .min(3, 'Merchant Id should be atleast 3 characters')
            .required('Merchant Id is required'),
          name: Yup.string()
            .min(3, 'Merchant name should be atleast 3 characters')
            .required('Merchant name is required'),
          logo: Yup.string().required('Merchant logo is required'),
          document_hash: Yup.string().required('Merchant contract is required'),
          email: Yup.string()
            .email('Please provide a valid email')
            .required('Email is required'),
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

          const triggerBrowse = inp => {
            const input = document.getElementById(inp);
            input.click();
          };

          const onChange = e => {
            if (e.target.files && e.target.files[0] != null) {
              fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
            }
          };

          const fileUpload = (file, key) => {
            const formData = new FormData();
            formData.append('file', file);
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
            let method = 'fileUpload';
            let url = `${API_URL}/${method}?token=${token}&from=bank`;
            if (key === 'document_hash') {
              method = 'ipfsUpload';
              url = `${API_URL}/${method}?token=${token}`;
            }
            axios
              .post(url, formData, config)
              .then(res => {
                if (res.status === 200) {
                  if (res.data.error) {
                    throw res.data.error;
                  } else if (key === 'logo') {
                    setFieldValue(key, res.data.name);
                  } else {
                    setFieldValue(key, res.data.hash);
                  }
                } else {
                  throw res.data.error;
                }
              })
              .catch(err => {
                toast.error('something went wrong!');
              });
          };

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Update Merchant' : 'Add Merchant'}
              </h1>
              <Form>
                <FormGroup>
                  <TextField
                    size="small"
                    name="merchant_id"
                    label="Merchant ID"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.merchant_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.merchant_id && touched.merchant_id
                          ? errors.merchant_id
                          : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="name"
                    label="Merchant Name"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.name && touched.name ? errors.name : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="description"
                    label="Description"
                    fullWidth
                    style={{ marginBottom: '14px' }}
                    variant="outlined"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="email"
                    label="Contact Person Email"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.email && touched.email ? errors.email : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="mobile"
                    label="Contact Person Phone Number"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.mobile && touched.mobile ? errors.mobile : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={STATIC_URL + values.logo}>
                    {values.logo ? (
                      <a
                        className="uploadedImg"
                        href={STATIC_URL + values.logo}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('logo')}
                    >
                      <input
                        type="file"
                        id="logo"
                        onChange={e => onChange(e)}
                        data-key="logo"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      {!values.logo ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {values.logo === '' ? (
                          <FormattedMessage {...messages.popup9} />
                        ) : (
                          <span>Change Logo</span>
                        )}
                        *
                      </label>
                    </div>
                  </UploadArea>
                  <Typography variant="body2" color="error">
                    {errors.logo && touched.logo ? errors.logo : ''}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={`${STATIC_URL}main/pdf-icon.png`}>
                    {values.document_hash ? (
                      <a
                        className="uploadedImg"
                        href={CONTRACT_URL + values.document_hash}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('document_hash')}
                    >
                      <input
                        type="file"
                        id="document_hash"
                        onChange={e => onChange(e)}
                        data-key="document_hash"
                        accept=".pdf"
                      />
                      {!values.document_hash ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}

                      <label>
                        <div className="tooltip">
                          <i
                            className="fa fa-info-circle"
                            style={{ margin: '5px' }}
                          />
                          <span className="tooltiptext">
                            This contract will be uploaded on Blockchain.
                          </span>
                        </div>
                        {values.document_hash === '' ? (
                          <FormattedMessage {...messages.popup10} />
                        ) : (
                          <span>Change Contract</span>
                        )}
                        *
                        <p>
                          <span style={{ color: 'red' }}>* </span>Only PDF
                          allowed{' '}
                        </p>
                      </label>
                    </div>
                  </UploadArea>
                  <Typography variant="body2" color="error">
                    {errors.document_hash && touched.document_hash
                      ? errors.document_hash
                      : ''}
                  </Typography>
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
                    <span>
                      {' '}
                      {props.type === 'update'
                        ? 'Update Merchant'
                        : 'Add Merchant'}
                    </span>
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

export default CreateMerchantPopup;
