import styled from 'styled-components';

const Sidebar = styled.aside `
width: 303px;
float:left;
margin-right: ${props => props.marginRight ? '33px' : '0' };
`;
export default Sidebar;