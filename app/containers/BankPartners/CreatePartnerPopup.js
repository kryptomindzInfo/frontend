import React from 'react';
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

function CreatePartnerPopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          name: props.partner.name || '',
          code: props.partner.username || '',
          address: props.partner.address || '',
          state: props.partner.state || '',
          zip: props.partner.zip || '',
          country: props.partner.country || '',
          ccode: props.partner.code || '',
          mobile: props.partner.mobile || '',
          email: props.partner.email || '',
          logo: props.partner.logo || '',
          contract: props.partner.contract || '',
        }}
        onSubmit={async values => {
          props.submit(values);
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
          code: Yup.string()
            .min(3, 'Partner Id should be atleast 3 characters')
            .required('Partner Id is required'),
          name: Yup.string()
            .min(3, 'Partner name should be atleast 3 characters')
            .required('Partner name is required'),
          logo: Yup.string().required('Partner logo is required'),
          contract: Yup.string().required('Partner contract is required'),
          state: Yup.string().required('Partner state is required'),
          address: Yup.string().required('Partner address is required'),
          ccode: Yup.string().required('Country code is required'),
          zip: Yup.string().required('Zip code is required'),
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
            if (key === 'contract') {
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

          const countryChange = (event) => {
            const { value } = event.target;
            const { title } = event.target.options[event.target.selectedIndex];
            setFieldValue('ccode', title, true);
            setFieldValue('country', value, true);
          };

          return (
            <div>
              <h1>
                {props.type === 'update' ? 'Update Partner' : 'Add Partner'}
              </h1>
              <Form>
              <FormGroup>
                  <TextField
                    size="small"
                    name="name"
                    label="Partner Name"
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
                    name="code"
                    label="Partner ID"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.code && touched.code ? errors.code : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="address"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.address && touched.address ? errors.address : ''}
                      </Typography>
                    }
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <TextField
                        size="small"
                        name="state"
                        label="State"
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '14px' }}
                        type="text"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          <Typography variant="body2" color="error">
                            {errors.state && touched.state ? errors.state : ''}
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <TextField
                        size="small"
                        name="zip"
                        label="Zip Code"
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '14px' }}
                        type="text"
                        value={values.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          <Typography variant="body2" color="error">
                            {errors.zip && touched.zip ? errors.zip : ''}
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <CountrySelectBox
                        type="text"
                        name="country"
                        value={values.country}
                        onChange={countryChange}
                        data-change="ccode"
                        required
                      />
                    </FormGroup>  
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
                <Row>
                  <Col cW="20%">
                  <FormGroup>
                      <TextField
                        size="small"
                        name="ccode"
                        label="Ccode"
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '14px' }}
                        type="text"
                        value={values.ccode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          <Typography variant="body2" color="error">
                            {errors.ccode && touched.ccode ? errors.ccode : ''}
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="80%">
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
                  </Col>
                </Row>
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
                    {values.contract ? (
                      <a
                        className="uploadedImg"
                        href={CONTRACT_URL + values.contract}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerBrowse('contract')}
                    >
                      <input
                        type="file"
                        id="contract"
                        onChange={e => onChange(e)}
                        data-key="contract"
                        accept=".pdf"
                      />
                      {!values.contract ? (
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
                        {values.contract === '' ? (
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
                    {errors.contract && touched.contract
                      ? errors.contract
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
                        ? 'Update Partner'
                        : 'Add Partner'}
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

export default CreatePartnerPopup;
