import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing:border-box;
  outline:0;
}
.clr:after{
  content:'';
  display:block;
  clear:both;
}
.fl{float:left;}
.fr{float:right;}
  @import url('https://fonts.googleapis.com/css?family=Roboto|Material+Icons&display=swap');
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: ${props => props.theme.fontSize};
    margin:0;
    background-color: #fcfffc;
  }
  button{
    cursor:pointer;
  }
  a{
    text-decoration:none;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 14px;
  }
  a >  span > span {
    color: ${props => props.theme.light};
  }

  #app {
    background-color: #fcfffc;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    line-height: 1.5em;
  }
  .mt10{
    margin-top:10px;
  }
  .absoluteRight{
    position:absolute;
    right:0;
  }
  .absoluteTopRight{
    position:absolute;
    top:0;
    right:0;
  }
  .tac{text-align:center;}
  .bold{font-weight:bold; }
`;

export default GlobalStyle;
