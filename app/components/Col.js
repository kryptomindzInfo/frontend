import styled from 'styled-components';
const Col = styled.div `
  text-align: ${props => props.textRight ? 'right' : 'left' };
  width: ${props => props.cW ? props.cW : '48%' };
  margin-right: ${props => props.mR ? props.mR : '2%' };
  margin-left: ${props => props.mL ? props.mL : '0' };
  &:last-child{
    margin-right: ${props => props.mR ? props.mR : '0' };
    margin-left: ${props => props.mL ? props.mL : '2%' };
  }
`;
export default Col;