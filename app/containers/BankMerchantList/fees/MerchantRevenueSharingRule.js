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
  const [rule, setRule] = useState(props.rules);
  const [infraStatus, setInfraStatus] = useState(props.status);

  useEffect(() => {
    if (Object.keys(rule).length > 0) {
      correctFocus('update');
    }
  });

  const nameBasedOnStatus = () => {
    switch (infraStatus) {
      case 1:
        return 'Update';
      case 2:
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
            rule.type === '0' ? 'Wallet to Merchant' : 'Non-wallet to Merchant'
          })`}</h3>
        </div>
      </div>
      <div className="cardBody">
        <Formik
          enableReinitialize
          initialValues={{
            fixed: rule.infra_share.fixed || '',
            percentage: rule.infra_share.percentage || '',
          }}
          validationSchema={Yup.object().shape({
            fixed: Yup.number().required('Fixed Amount is required'),
            percentage: Yup.number()
              .max(100, 'Cannot exceed 100')
              .required('Percentage is required'),
          })}
          onSubmit={() => {}}
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