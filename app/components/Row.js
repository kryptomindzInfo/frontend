import styled from 'styled-components';
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50% 50%;
  box-sizing:border-box;
  grid-gap: 5px;
  margin-top: ${props => props.marginTop ? '24px' : '0' };
`;
export default Row;