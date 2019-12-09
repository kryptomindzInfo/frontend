import styled from 'styled-components';

const Button = styled.button `
min-width: ${props => props.filledBtn ? '100%' : '110px' };
padding: 5px;
text-align:center;
border-radius: 4px;
background-color: ${props => props.filledBtn ? '#417505' : '#fff' };
border: 1px solid #417505;
color: ${props => props.filledBtn ? '#fff' : '#417505' };
font-size: ${props => props.filledBtn ? '20px' : '11px' };
font-weight:${props => props.filledBtn ? 'bold' : 'normal' };
display: ${props => props.flex ? 'flex' : 'block' };
align-items: center;
justify-content: center;
margin-top: ${props => props.marginTop ? props.marginTop : '0' };

> i{
    font-size:13px;
}
`;

export default Button;