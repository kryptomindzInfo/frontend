import React, { Component } from 'react';
import styled from 'styled-components';

const MiniPopupWrap = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    z-index: 999;
    background-color: transparent;
    top:0;
    left:0;
    &::-webkit-scrollbar { width: 0 !important }
    overflow: -moz-scrollbars-none;
-ms-overflow-style: none; 
    overflow-y:auto;
    form{
        display:block;
        width: 100%;
        max-width: 445px;
        margin 0 auto;
    }
    p{
        font-size:  20px;
        > span{
            font-weight:bold;
        }
    }
`;

const MiniPopupBody = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 90%;
  max-width: 648px;
  padding: 20px;
  margin: 100px auto;
  border-radius: 6px;
  box-shadow: 0 4px 9px 0 rgba(82, 82, 82, 0.47);
  background-color: #ffffff;

  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #ffffff;
    margin-top: 0;
    background-color: ${props => props.theme.accent};
    margin-left: -20px;
    margin-top: -20px;
    margin-right: -20px;
    padding: 10px;
  }
  
`;

class MiniPopup extends Component {
  sendCloseSignal = event => {
    if (!document.getElementById('MiniPopupBody').contains(event.target)) {
      this.props.close();
    }
  };

  render() {
    console.log(this.props);
    return (
      <MiniPopupWrap className="MiniPopupwrap" onClick={this.sendCloseSignal}>
        <MiniPopupBody id="MiniPopupBody">{this.props.children}</MiniPopupBody>
      </MiniPopupWrap>
    );
  }
}

export default MiniPopup;
