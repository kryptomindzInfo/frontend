import styled from 'styled-components';

const Label = styled.label `
width:100%;
color: ${props => props.theme.light };
margin-top: ${props => props.mT ? props.mT : '0'};
margin-bottom: ${props => props.mB ? props.mB : '0'};
`;

export default Label;