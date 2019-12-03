import styled from 'styled-components';

const BigLeftSection = styled.section`
  background-image: ${props => props.theme.vGradient};
  width: 50%;
  position:absolute;
  top:0;
  left:0;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
`;
export default BigLeftSection;