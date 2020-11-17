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
        max-width: ${props => props.bigBody ? '100%' : '445px' };
        margin 0 auto;
    }
`;

const PopupBody = styled.div`
  background: #fff;
  border-radius: 6px;
  width: ${ props => props.bigBody ? '80%' : '35%' };
  max-width: ${ props => props.bigBody ? 'none' : '648px' };
  padding: 20px;
  margin: 45px auto;
  position: relative;

  .popClose {
    position: absolute;
    top: 0;
    right: 0;
    padding: 9px;
    cursor: pointer;
    font-size: 22px;
    background: ${props => props.theme.accent};
    color: #fff;
    :hover{
      background-color: #cc8819
    }
  }
  .popInfoLeft{
    font-size: 15px;
    font-weight: bold;
    color: #4a4a4a;
    margin-bottom: 10px;
  }
  .popInfoRight {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 10px;
    color: green;
    word-break: keep-all;
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
    margin-bottom: 20px;
    padding: 6px;
    &.normalH1 {
      background-color: ${props => props.theme.accent};
      color: white;
      padding-top: 6px;
    }
  }
`;

class Popup extends Component {
  
  sendCloseSignal = event => {
    if (!document.getElementById('popupBody').contains(event.target)) {
      this.props.close();
    }
  };
  componentDidMount() {
  
    console.log(this.props);
  
}
  render() {
    return (
      
      <PopupWrap className="popupwrap" bigBody={this.props.bigBody}>
        <PopupBody id="popupBody" bigBody={this.props.bigBody}>
          <i
            className="material-icons popClose"
            onClick={() => this.props.close()}
          >
            close
          </i>
          {this.props.children}
        </PopupBody>
      </PopupWrap>
    );
  }
}

export default Popup;
