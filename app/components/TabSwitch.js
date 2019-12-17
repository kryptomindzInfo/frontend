import React, { Component } from "react";
import styled from 'styled-components';
import ReactDOM from "react-dom";
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const TabSwitchWrap = styled.div `
    display:block;
    position:relative;
    .tabControls:after{
        content: '';
        display:block;
        clear:both;
    }
    .tabControls{
        margin-bottom: 40px;
    }
    .tabToggle{
        width: 194px;
        padding:12px;
        color: ${props => props.theme.primary};;
        font-size: 20px;
        font-weight: bold;
        border-radius: 1px;
        text-align:center;
        border: 1px solid ${props => props.theme.primary};
        background-color: transparent;
    }
    .tabToggle.active{
        width: 194px;
        padding:12px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        text-align:center;
        border: 1px solid ${props => props.theme.primary};
        background-color: ${props => props.theme.primary};
    }
    .tabContent{
        box-sizing:border-box;
        width:100%;
        display: none;
    }
    .tabContent.active{
        display:block;
    }
`;

class TabSwitch extends Component {
    componentDidMount() {
            }
    switchTab = e => {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const child = node.querySelector('.tabContent.active');
            child.classList.remove("active");
            node.querySelector('.tabToggle.active').classList.remove("active");

            const target = e.target.getAttribute("data-id");
            node.querySelector("#"+target).classList.add("active");
            e.target.classList.add("active");
        }
      //document.findDOMNode(".tabContent.acitve").style.display = "none";
    };
    render() {
    return (
        <TabSwitchWrap>
            <div className="tabControls">
            {
               this.props.tabs.map((item, key) =>
                    <button key={key} onClick={this.switchTab} className={"tabToggle "+item.active} data-id={item.target}>{item.name}</button>
                )
            }
            </div>
            {this.props.children}
        </TabSwitchWrap>
    );
  }
}

export default TabSwitch;
