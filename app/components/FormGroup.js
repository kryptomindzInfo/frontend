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
`;
export default FormGroup;