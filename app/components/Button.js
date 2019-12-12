import styled from 'styled-components';

const Button = styled.button `
min-width: ${props => props.filledBtn ? '100%' : '110px' };
padding: ${props => props.accentedBtn ? '10px' : '5px' };
text-align:center;
border-radius: 4px;
background-color: ${props => props.filledBtn ? props.theme.primary : '#fff' };
background-color: ${props => props.accentedBtn ? props.theme.accent : 'sdf' };
border: ${props => props.accentedBtn ? 'none' : '1px solid #417505' };
color: ${props => (props.filledBtn || props.accentedBtn) ? '#fff' : props.theme.primary };
font-size: ${props => props.filledBtn ? '20px' : '11px' };
font-size: ${props => props.accentedBtn ? '16px' : 'sdf' };
font-weight:${props => (props.filledBtn || props.accentedBtn) ? 'bold' : 'normal' };
display: ${props => props.flex ? 'flex' : 'block' };
align-items: center;
justify-content: center;
margin-top: ${props => props.marginTop ? props.marginTop : '0' };
position: ${props => props.bottomRight ? 'absolute' : 'relative' };
bottom: ${props => props.bottomRight ? '2px;' : '0' };
right: ${props => props.bottomRight ? '2px;' : '0' };
> i{
    font-size:13px;
}
`;

export default Button;