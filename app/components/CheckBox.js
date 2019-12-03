import styled from 'styled-components';

const CheckBox = styled.div `
color: ${props => props.theme.light};
padding-top:10px;
> a {
  text-decoration:underline;
  color: #56575a;
}
`;
export default CheckBox;