import styled from 'styled-components';
const TextInput = styled.input `
  width: 100%;
  position:relative;
  z-index: 1;
  background: transparent;
  box-sizing:border-box;
  padding:13px;
  border: solid 2px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  display:block;
  margin-bottom: 18px;
  outline:0;
  &:focus{
    border: solid 2px ${props => props.theme.primary};
  }
`;
export default TextInput;