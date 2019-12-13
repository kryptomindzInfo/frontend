import styled from 'styled-components';

const Main = styled.section `
width: 80%;
width: ${props => props.fullWidth ? '100%' : 'calc( 100% - 293px )'};
display:block;
float:left;
`;
export default Main;