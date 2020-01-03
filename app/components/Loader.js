import React, { Component } from 'react';
import styled from 'styled-components';

const LoaderWrap = styled.div`
    position:${props => props.fullPage == true ? 'fixed' : 'relative' };
    width:100%;
    height:${props => props.fullPage == true ? '100%' : '23px' };
    z-index: 99999;
    background-color: ${props => props.fullPage == true ? '#102910' : 'transparent' };
    display:flex;
    align-items:center;
    justify-content: center;
    .lds-ring {
        display: inline-block;
        position: relative;
        width:  ${props => props.fullPage == true ? '80px' : '10px' };
        height:  ${props => props.fullPage == true ? '80px' : '10px' };
        div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width:  ${props => props.fullPage == true ? '64px' : '8px' };
            height:  ${props => props.fullPage == true ? '64px' : '8px' };
            margin: ${props => props.fullPage == true ? '8px' : '0' };
            border: 8px solid #fff;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #fff transparent transparent transparent;
          }
          div:nth-child(1) {
            animation-delay: -0.45s;
          }
          div:nth-child(2) {
            animation-delay: -0.3s;
          }
          div:nth-child(3) {
            animation-delay: -0.15s;
          }
    }
    @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
`;


class Loader extends Component {
  
  render() {
    console.log(this.props);
    return (
      <LoaderWrap fullPage={this.props.fullPage}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </LoaderWrap>
    );
  }
}

export default Loader;
