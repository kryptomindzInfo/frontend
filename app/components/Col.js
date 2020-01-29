import styled from 'styled-components';
const Col = styled.div `
  text-align: ${props => props.textRight ? 'right' : 'left' };
  text-align: ${props => props.textAlign ? props.textAlign : 'sd' };
  width: ${props => props.cW ? props.cW : '48%' };
  margin-right: ${props => props.mR ? props.mR : '2%' };
  margin-left: ${props => props.mL ? props.mL : '0' };
  position:relative;
  &:last-child{
    width: ${props => props.cW ? props.cW : '50%' };
    margin-right: ${props => props.mR ? props.mR : '0' };
    margin-left: ${props => props.mL ? props.mL : '0' };
  }
`;
export default Col;