import React, { Component } from "react";
import styled from 'styled-components';

const Sidebar = styled.aside `
width: 260px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
>h3{
    font-size: 11px;
    font-weight: bold;
    color: #323c47;
}
`;


class EmptySideBar extends Component {

  render() {
    
    return (
        <Sidebar marginRight>
            {this.props.children}
        </Sidebar>
    );
  }
}
 
export default EmptySideBar