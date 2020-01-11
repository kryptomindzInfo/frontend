import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div `
width:100%;
`;

const Title = styled.h1 `
font-size: 100px;
text-align:center;
color:white;
margin-top:0;
margin-bottom:72px;
`;

const SubTitle = styled.h2 `
font-size: 30px;
text-align:center;
color:white;
margin-top:0;
margin-bottom:0;
max-width:512px;
font-weight: normal;
`;

const BigLeftSection = styled.section`
background-image: ${props => props.theme.vGradient};
width: 50%;
position:absolute;
top:0;
left:0;
height:100%;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
`;

const BigRightSection = styled.section`
background: white;
width: 50%;
padding: 27px 93px;
box-sizing:border-box;
position:absolute;
top:0;
right:0;
height:100%;
`;

const LoginHeader = styled.header `
background:white;
color: ${props => props.theme.primary};
font-size: 32px;
font-weight:bold;
`;

const FrontFormTitle = styled.h3 `
font-weight: normal;
margin:0;
font-size: 24px;
color: #212529;
margin-top: 127px;
`;

const FrontFormSubTitle = styled.h4 `
font-weight:normal;
font-size: 14px;
color: ${props => props.theme.secondary};
margin:0;
margin-top: 7px;
`;

const InputsWrap = styled.div `
margin: 43px 0 25px;
`;

const FormGroup = styled.div`
display: block;
position:relative;
> label{
  position:absolute;
  top:13px;
  left:13px;
  z-index:0;
}
> label.focused{
  top: -7px;
  left: 15px;
  color: ${props => props.theme.primary};
  background: #fff;
  display: block;
  font-size: 10px;
  padding: 0 5px;
  z-index: 2;
}
`;

const TextInput = styled.input `
width: 100%;
position:relative;
z-index: 1;
background: transparent;
box-sizing:border-box;
padding:13px;
border: solid 2px rgba(0, 0, 0, 0.32);
border-radius: 4px;
display:block;
margin-bottom: 18px;
outline:0;
&:focus{
  border: solid 2px ${props => props.theme.primary};
}
`;

const PrimaryBtn = styled.button `
width: 100%;
box-sizing:border-box;
padding:8px;
background-color: ${props => props.theme.primary};
color: white;
border:0;
border-radius: 4px;
display:block;
outline:0;
text-transform: uppercase;
font-weight:bold;
font-size: 20px;
`;

const Row = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 50% 50%;
box-sizing:border-box;
grid-gap: 5px;
margin-top:24px;
`;

const Col = styled.div `
text-align: ${props => props.textRight ? 'right' : 'left' };
`;