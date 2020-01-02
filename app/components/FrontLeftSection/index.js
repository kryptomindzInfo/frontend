import React, { Component } from "react";
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import CircularLogo from './CircularLogo';
import Title from './Title';
import SubTitle from './SubTitle';

const FrontLeftWrap = styled.section`
background-image: ${props => props.theme.vGradient};
width: 50%;
position:absolute;
top:0;
left:0;
height:100%;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
`;

class FrontLeftSection extends Component {
  render() {
      console.log(this.props);
      const logo = 'sdf';
    return (
        <FrontLeftWrap>
          <CircularLogo>
            {
              (this.props.logo) ? 
              <img src={this.props.logo} />
              :
              (this.props.from == 'bank')  ?
                <FormattedMessage {...messages.bank} />
              :
              (this.props.from == 'user')  ? 
              <FormattedMessage {...messages.user} />
              :
              <FormattedMessage {...messages.infra} />
              
            }
          </CircularLogo>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <SubTitle>
            <FormattedMessage {...messages.subTitle1} />
            <br />
            <FormattedMessage {...messages.subTitle2} />
            <br />
            <FormattedMessage {...messages.subTitle3} />
          </SubTitle>
        </FrontLeftWrap>
    );
  }
}
 
export default FrontLeftSection;