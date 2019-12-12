import React, { Component } from 'react';
import styled from 'styled-components';

const PopupWrap = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.39);
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
`;

const PopupBody = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 90%;
  max-width: 648px;
  padding: 20px;
  margin: 100px auto;

  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #ffffff;
    margin-top: 0;
    background-color: #f5a623;
    margin-left: -20px;
    margin-top: -20px;
    margin-right: -20px;
    padding: 10px;
  }

`;

class Popup extends Component {
  sendCloseSignal = event => {
    if (!document.getElementById('popupBody').contains(event.target)) {
      this.props.close();
    }
  };

  render() {
    return (
      <PopupWrap className="popupwrap" onClick={this.sendCloseSignal}>
        <PopupBody id="popupBody">{this.props.children}</PopupBody>
      </PopupWrap>
    );
  }
}

export default Popup;
