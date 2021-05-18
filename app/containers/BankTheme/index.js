/**
 *
 * BankTheme
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { ChromePicker } from 'react-color';
import Color from 'color';
import Button from 'components/Button';
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import BankSidebarTwo from 'components/Sidebar/BankSidebarTwo';
import Main from 'components/Main';
import Card from 'components/Card';
import Row from 'components/Row';
import Col from 'components/Col';
import messages from './messages';
import Loader from 'components/Loader';
import { postRequest, getRequest } from '../App/ApiCall';

export function BankTheme(props) {
  const [primary, setPrimary] = useState(props.appTheme.primary);
  const [secondary, setSecondary] = useState(props.appTheme.secondary);
  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('bankLogged');
  // useEffect(() => {
  //   console.log(props);
  //   setTimeout(() => {
  //     props.setTheme({ ...props.appTheme, primary: '#ff0000' });
  //   }, 3000);
  // }, []);

  const onSubmit = async()=> {
    setLoading(true);
    const res = await postRequest("editBankTheme", token, { theme: {
      primary: primary,
      secondary: secondary,
    }});
    if (res.data.data.status !== 0) {
      props.setTheme({
        ...props.appTheme,
        secondary: secondary,
        primary: primary,
      });
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div>
      <Helmet>
        <title>BankTheme</title>
        <meta name="description" content="Description of BankTheme" />
      </Helmet>
      <BankHeader />
      <Container>
        <BankSidebarTwo active="theme" />
        <Main>
          {' '}
          <Card bigPadding>
            <Container style={{marginTop:'30px'}}>
              <Row >
                <Col cW="10%"> <h4 style={{marginBottom:'0px'}}>Primary</h4></Col>
                <Col  cW="20%">
                  <button
                    style={{backgroundColor:`${primary}`, color:`${primary}`, padding:'10px 50px 10px 50px'}}
                    onClick={()=>setShowPrimary(showPrimary=> !showPrimary)}
                  />
                </Col>
                <Col cW="15%"> <h4 style={{marginBottom:'0px'}}>Secondary </h4></Col>
                <Col  cW="20%">
                  <button
                    style={{backgroundColor:`${secondary}`, color:`${secondary}`, padding:'10px 50px 10px 50px'}}
                    onClick={()=>setShowSecondary(showSecondary=> !showSecondary)}
                  ></button>
                </Col>
                <Col cW="20%"><Button onClick={()=>onSubmit()}>Apply</Button></Col>
              </Row>
              <Row>
              <Col cW="10%"></Col>
              <Col cW="30%">
                  {
                    showPrimary && (
                      <ChromePicker
                        color={primary}
                        onChange={color=>{
                          console.log(color);
                          setPrimary(color.hex)
                        }}
                      />
                    )
                  }
                </Col>
                <Col cW="10%"></Col>
              <Col cW="30%">
                  {
                    showSecondary && (
                      <ChromePicker
                        color={secondary}
                        onChange={color=>{
                          console.log(color);
                          setSecondary(color.hex)
                        }}
                      />
                    )
                  }
                </Col>
                <Col cW="40%"></Col>
              </Row>
            </Container>
          </Card>
        </Main>
      </Container>
    </div>
  );
}

BankTheme.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(BankTheme);
