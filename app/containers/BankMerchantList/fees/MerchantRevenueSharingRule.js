import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from 'components/Card';
import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import Row from 'components/Row';
import Col from 'components/Col';
import Loader from 'components/Loader';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik, ErrorMessage } from 'formik';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../../components/handleInputFocus';
import { addInfraShare, editInfraShare } from '../api/merchantAPI';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const MerchantRevenueSharingRule = props => {
  const [isLoading, setLoading] = useState(false);
  const [share, setShare] = useState(props.share);
  const [infraStatus, setInfraStatus] = useState(props.status);
  const [type, setType] = useState(props.type);
  const [id, setId] = useState(props.id);

  useEffect(() => {
    if (Object.keys(share).length > 0) {
      correctFocus('update');
    }
  });

  const nameBasedOnStatus = () => {
    switch (infraStatus) {
      case 1:
        return 'Update';
      case 2:
        return 'Send For Approval';
      case 3:
        return 'Pending';
      default:
        return 'Send For Approval';
    }
  };

  return (
    <Card bigPadding>
      <div className="cardHeader" style={{ paddingBottom: '20px' }}>
        <div className="cardHeaderLeft flex">
          <i className="material-icons" onClick={props.onBack}>
            arrow_back
          </i>
          <h3 style={{ color: '#417505' }}>{`Revenue with Infra(${
            type === '0' ? 'Wallet to Merchant' : 'Non-wallet to Merchant'
          })`}</h3>
        </div>
      </div>
      <div className="cardBody">
        <Formik
          enableReinitialize
          initialValues={{
            fixed: share.fixed || '',
            percentage: share.percentage || '',
          }}
          validationSchema={Yup.object().shape({
            fixed: Yup.number().required('Fixed Amount is required'),
            percentage: Yup.number()
              .max(100, 'Cannot exceed 100')
              .required('Percentage is required'),
          })}
          onSubmit={values => {
            setLoading(true);
            values.fee_id = id;
            if (infraStatus === 1) {
              editInfraShare(infraStatus, 'revenue', values).then(r => {
                setInfraStatus(r.status);
                setLoading(false);
              });
            } else {
              addInfraShare('revenue', values).then(r => {
                setInfraStatus(r.status);
                setShare(r.share);
                setLoading(false);
              });
            }
          }}
        >
          {formikProps => {
            const { handleChange, handleBlur, values } = formikProps;
            return (
              <Form>
                <Row marginTop>
                  <Col textAlign="center">
                    <FormGroup>
                      <label htmlFor="fixed">Fixed Amount</label>
                      <TextInput
                        type="number"
                        name="fixed"
                        value={values.fixed}
                        onFocus={e => {
                          inputFocus(e);
                          handleChange(e);
                        }}
                        onBlur={e => {
                          inputBlur(e);
                          handleBlur(e);
                        }}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="fixed" />
                    </FormGroup>
                  </Col>
                  <Col textAlign="center">
                    <FormGroup>
                      <label htmlFor="percentage">Percentage</label>
                      <TextInput
                        type="number"
                        name="percentage"
                        value={values.percentage}
                        onFocus={e => {
                          inputFocus(e);
                          handleChange(e);
                        }}
                        onBlur={e => {
                          inputBlur(e);
                          handleBlur(e);
                        }}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="percentage" />
                    </FormGroup>
                  </Col>
                  <Col textAlign="center">
                    <FormGroup>
                      <Button type="submit" filledBtn>
                        {isLoading ? <Loader /> : nameBasedOnStatus()}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
};

export default MerchantRevenueSharingRule;
