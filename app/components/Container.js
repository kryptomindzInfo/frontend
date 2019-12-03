import styled from 'styled-components';

const Container = styled.div `
width: 96%;
max-width: 1270px;
margin: ${props => props.verticalMargin ? '48px' : '0' } auto;

&:after{
    content: '';
    display: block;
    clear:both;
}
`;
export default Container;