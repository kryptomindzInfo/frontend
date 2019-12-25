import React, { Component } from "react";
import styled from 'styled-components';
import history from 'utils/history';

const LinkWrap = styled.span `
    display:inline-block;
    cursor:pointer;
    float: ${props => props.float ? props.float: 'none'};
    text-decoration:none;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 14px;
`;

class A extends Component {
  goTo = (page) => {
    history.push(page);
  } 
  render() {
    return (
        <LinkWrap float={this.props.float} onClick={() => this.goTo(this.props.href)} className="pointer anchor">
            {this.props.children}
        </LinkWrap>
    );
  }
}

export default A;
