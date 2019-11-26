import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto|Material+Icons&display=swap');
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: ${props => props.theme.fontSize};
    margin:0;
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
  a >  span {
    color: ${props => props.theme.light};
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
