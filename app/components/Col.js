import styled from 'styled-components';
const Col = styled.div `
  text-align: ${props => props.textRight ? 'right' : 'left' };
`;
export default Col;