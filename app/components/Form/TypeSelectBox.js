import React, { Component } from 'react';
import styled from 'styled-components';

const SelectInput = styled.select`
  width: 100%;
  z-index: 1;
  height: auto;
  background: transparent;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 0;
  border: solid 1px rgba(0, 0, 0, 0.32);

  border-radius: 4px;
  display: block;
  margin-bottom: 5px;
  outline: 0;
  font-size: 14px;
  line-height: 19px;
  &:focus {
    border: solid 1px ${props => props.theme.primary};
  }
`;

class TypeSelectBox extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <SelectInput {...this.props}>
        <option value="">Select Type</option>
        <option value="passport">Passport</option>
        <option value="national-id">National Id</option>
      </SelectInput>
    );
  }
}

export default TypeSelectBox;
