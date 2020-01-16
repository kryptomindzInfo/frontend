import styled from 'styled-components';
const TextArea = styled.textarea `
  width: 100%;
  position:relative;
  z-index: 1;
  background: transparent;
  box-sizing:border-box;
  padding:12px 18px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  display:block;
  margin-bottom: 14px;
  outline: 0;
  font-size: 14px;
  line-height: 19px;
  &:focus{
    border: solid 1px ${props => props.theme.primary};
  }
`;
export default TextArea;