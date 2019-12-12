import React, { Component } from "react";
import styled from 'styled-components';
import LanguageSwitch from 'components/LanguageSwitch';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SelectInputWrap = styled.select `
  width: 100%;
  position:relative;
  z-index: 1;
  background: transparent;
  box-sizing:border-box;
  padding:9px;
  border: solid 2px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  display:block;
  margin-bottom: 14px;
  outline: 0;
  font-size: 14px;
  line-height: 19px;
  &:focus{
    border: solid 2px ${props => props.theme.primary};
  }
`;

class SelectInput extends Component {
  render() {
   
    return (
        <SelectInputWrap>
            {this.props.children}
        </SelectInputWrap>
    );
  }
}
 
export default SelectInput;