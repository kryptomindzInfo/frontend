import styled from "styled-components";
const FormGroup = styled.div`
  display: block;
  position:relative;
  > label{
    position:absolute;
    top:11px;
    left:13px;
    z-index:0;
  }
  > label.focused{
    top: -7px;
    left: 15px;
    color: ${props => props.theme.primary};
    background: #fff;
    display: block;
    font-size: 10px;
    padding: 0 5px;
    z-index: 2;
  }
  &.checkbox{
    font-size: 12px;
    color: #9ea0a5;
    margin-top: 20px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    > input{
      margin-right: 10px;
    }
  }
`;
export default FormGroup;