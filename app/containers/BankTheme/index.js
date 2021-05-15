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

export function BankTheme(props) {
  const [primary, setPrimary] = useState('#fff')
  const [secondary, setSecondary] = useState('#fff')
  const [showPrimary, setShowPrimary] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)
  // useEffect(() => {
  //   console.log(props);
  //   setTimeout(() => {
  //     props.setTheme({ ...props.appTheme, primary: '#ff0000' });
  //   }, 3000);
  // }, []);
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
              <Row style={{ paddingBottom: '10px' }}>
                <Col cW="20%"> <h2>Primary </h2></Col>
                <Col  cW="30%">
                  <button
                    style={{backgroundColor:`${primary}`, color:`${primary}`, padding:'10px 100px 10px 100px'}}
                    onClick={()=>setShowPrimary(showPrimary=> !showPrimary)}
                  />
                </Col>
                <Col cW="20%"> <h2>Secondary </h2></Col>
                <Col  cW="30%">
                  <button
                    style={{backgroundColor:`${secondary}`, color:`${secondary}`, padding:'10px 100px 10px 100px'}}
                    onClick={()=>setShowSecondary(showSecondary=> !showSecondary)}
                  ></button>
                </Col>
              </Row>
              <Row>
              <Col cW="20%"></Col>
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
                <Col cW="20%"></Col>
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
