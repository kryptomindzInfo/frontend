import styled from 'styled-components';

const Container = styled.div `
width: 96%;
max-width: ${props => props.big ? '1170' : '1070' }px;

margin: ${props => props.verticalMargin ? '48px' : '0' } auto;

&:after{
    content: '';
    display: block;
    clear:both;
}
`;
export default Container;