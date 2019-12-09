import styled from 'styled-components';
const TextInput = styled.input `
  width: 100%;
  position:relative;
  z-index: 1;
  background: transparent;
  box-sizing:border-box;
  padding:9px;
  border: solid 2px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  display:block;
  margin-bottom: 14px;
  outline: 0;
  font-size: 14px;
  line-height: 19px;
  &:focus{
    border: solid 2px ${props => props.theme.primary};
  }
`;
export default TextInput;