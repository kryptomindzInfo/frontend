import React from 'react';
import Row from './Row';
import Col from './Col';
import Card from './Card';
import { CURRENCY } from '../containers/App/constants';

const DashCards = (props) => {
  const no = props.no ? props.no : 0;
  const amount = props.amount ? props.amount : 0;
  const title = props.title ? props.title: 0;
  return (
    <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>{title}</h4>
        <Row>
            <Col >
                <Row>
                    No.:
                </Row>
                <Row>
                    <span className="cardValue" > {no}</span>
                </Row>
            </Col>
            <Col >
                <Row>
                    Amount:
                </Row>
                <Row>
                    <span className="cardValue">{amount}</span>
                </Row>
            </Col>  
        </Row>
    </Card>
  );
};
export default DashCards;