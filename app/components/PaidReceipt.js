import React, { Component } from 'react';
import Row from './Row';
import Col from './Col';
import Container from './Container';

export class PaidReciept extends Component {
  componentDidMount() {
    console.log(this.props.values);
  }
    render() {
      return (
      <Container>
        <Row vAlign="flex-start">
          <Col md="12">
         
         `` <div
              style={{
              fontSize: '34px',
              fontWeight: 'bold',
              padding: '13px 0px',
              textAlign: 'center',
              color: '#417505',
            }}
          >
              Transaction Receipt
            </div>
          <hr style={{border: '1px solid black'}}></hr>
            <Row>
              <Col className="popInfoLeft">Transaction ID :</Col>
                <Col className="popInfoRight">
                  19648821974200954
              </Col>
            </Row>
            <Row>
              <Col className="popInfoLeft">Amount :</Col>
                <Col className="popInfoRight">
                {this.props.values.receiverIdentificationAmount}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{border: '1px solid black'}}></hr>
        
                      <hr style={{border: '1px solid black'}}></hr>
                      <Row>
                        <Col >
                      <div
                            style={{
                              fontSize: '20px',
                              fontWeight: 'bold',
                              padding: '13px 0px',
                              color: '#417505',
                            }}
                            >
                            Signature: ____________________
                          </div>
                        </Col>
                        <Col></Col>

                      </Row>
      </Container>
      );
    }
  }
