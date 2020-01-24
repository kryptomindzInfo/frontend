import React, { Component } from 'react';
import styled from 'styled-components';

const PopupClaimMoneyWrap = styled.div`
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
        margin 30px auto;
    }
`;

const PopupClaimMoneyBody = styled.div`
  background: #fff;
  border-radius: 6px;
  width: 88%;
  padding: 20px;
  margin: 20px auto;
  position: relative;
  @media (max-width: 300px) {
    width: 82%;
  }

  .popClose {
    position: absolute;
    top: 0;
    right: 0;
    padding: 9px;
    cursor: pointer;
    font-size: 22px;
    background: ${props => props.theme.accent};
    color: #fff;
    :hover {
      background-color: #cc8819;
    }
  }

  h1 {
    text-align: center;
    font-size: 26px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #ffffff;
    margin-top: 0;
    background-color: ${props => props.theme.accent};
    margin-left: -20px;
    margin-top: -20px;
    margin-right: -20px;
    padding: 6px;
    &.normalH1 {
      background-color: ${props => props.theme.accent};
      color: white;
      padding-top: 6px;
    }
  }
`;

class PopupClaimMoney extends Component {
  sendCloseSignal = event => {
    if (!document.getElementById('popupBody').contains(event.target)) {
      this.props.close();
    }
  };

  render() {
    return (
      <PopupClaimMoneyWrap className="popupwrap" onClick={this.sendCloseSignal}>
        <PopupClaimMoneyBody id="popupBody">
          <i
            className="material-icons popClose"
            onClick={() => this.props.close()}
          >
            close
          </i>
          {this.props.children}
        </PopupClaimMoneyBody>
      </PopupClaimMoneyWrap>
    );
  }
}

export default PopupClaimMoney;
