import styled from 'styled-components';
const Row = styled.div`
  display: flex;
   box-sizing:border-box;
  margin-top: ${props => props.marginTop ? '24px' : '0' };
  flex-direction: row;
  align-items: ${props => props.vAlign ? props.vAlign : 'center' };
  justify-content: center;
`;
export default Row;