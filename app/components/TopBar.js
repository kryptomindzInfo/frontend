import styled from 'styled-components';

const TopBar = styled.header `
background:${props => props.theme.hGradient};
color: white;
font-size: 20px;
height: 79px;
box-sizing: border-box;
padding: 20px;
> a {
    color: #fff;
}
&:after{
    content: '';
    display:block;
    clear:both;
}
`;
export default TopBar;