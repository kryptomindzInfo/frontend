import styled from 'styled-components';

const TopBar = styled.header `
background:${props => props.theme.hGradient};
color: white;
font-size: 18px;
height: 63px;
box-sizing: border-box;
padding: 11px 30px;
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