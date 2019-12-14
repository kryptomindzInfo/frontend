import styled from 'styled-components';
const Col = styled.div `
  text-align: ${props => props.textRight ? 'right' : 'left' };
  width: ${props => props.cW ? props.cW : '50%' };
  margin-right: ${props => props.mR ? props.mR : '0' };
`;
export default Col;