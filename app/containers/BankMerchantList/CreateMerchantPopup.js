import React from 'react';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import Popup from '../../components/Popup';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import { API_URL, CONTRACT_URL, STATIC_URL } from '../App/constants';
import messages from '../BankPage/messages';
import UploadArea from '../../components/UploadArea';

function CreateMerchantPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: '',
          logo_hash: '',
          description: '',
          document_hash: '',
          email: '',
          mobile: '',
          merchant_id: '',
        }}
        onSubmit={async values => {
          try {
            const res = await axios.post(`${API_URL}/bank/createMerchant`, {
              token,
              ...values,
            });
            if (res.status === 200) {
              if (res.data.status === 0) {
                toast.error(res.data.message);
              } else {
                toast.success(res.data.message);
                props.onClose();
              }
            } else {
              toast.error(res.data.message);
            }
          } catch (err) {
            toast.error('Something went wrong');
          }
        }}
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
                  } else if (key === 'logo_hash') {
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
              <h1>Add Merchant</h1>
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
                  />
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={STATIC_URL + values.logo_hash}>
                    {values.logo_hash ? (
                      <a
                        className="uploadedImg"
                        href={STATIC_URL + values.logo_hash}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('logo_hash')}
                    >
                      <input
                        type="file"
                        id="logo_hash"
                        onChange={e => onChange(e)}
                        data-key="logo_hash"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      {!values.logo_hash ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {values.logo_hash === '' ? (
                          <FormattedMessage {...messages.popup9} />
                        ) : (
                          <span>Change Logo</span>
                        )}
                        *
                      </label>
                    </div>
                  </UploadArea>
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
                </FormGroup>
                <Button disabled={isSubmitting} filledBtn marginTop="10px">
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>Add Merchant</span>
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
