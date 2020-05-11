import React from 'react';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Popup from '../../components/Popup';
import FormGroup from '../../components/FormGroup';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { STATIC_URL } from '../App/constants';
import messages from '../BankPage/messages';
import UploadArea from '../../components/UploadArea';

function CreateMerchantPopup(props) {
  const triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          merchantName: '',
          merchantLogo: '',
          description: '',
          document: '',
          contactPersonEmail: '',
          contactPersonPhoneNumber: '',
          merchantId: '',
        }}
        onSubmit={{}}
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
              <h1>Add Merchant</h1>
              <Form>
                <FormGroup>
                  <TextField
                    size="small"
                    name="merchantId"
                    label="Merchant ID"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.merchantId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="merchantName"
                    label="Merchant Name"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.merchantName}
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
                    name="contactPersonEmail"
                    label="Contact Person Email"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.contactPersonEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    size="small"
                    name="contactPersonPhoneNumber"
                    label="Contact Person Phone Number"
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '14px' }}
                    type="text"
                    value={values.contactPersonPhoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <UploadArea>
                    {false ? (
                      <a className="uploadedImg" target="_BLANK" />
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
                        onChange={handleChange}
                        data-key="logo"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      {true ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {true ? (
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
                    {false ? (
                      <a className="uploadedImg" target="_BLANK" />
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
                        onChange={handleChange}
                        data-key="contract"
                        accept=".pdf"
                      />
                      {true ? (
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
                        {true ? (
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

                {false ? (
                  <Button filledBtn marginTop="10px" disabled>
                    <Loader />
                  </Button>
                ) : (
                  <Button filledBtn marginTop="10px">
                    <span>Add Merchant</span>
                  </Button>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateMerchantPopup;
