import styled from 'styled-components';

const TopBar = styled.header `
background:${props => props.theme.hGradient};
color: white;
font-size: 18px;
height: 63px;
box-sizing: border-box;
padding: 11px 30px;
> .anchor {
    color: #fff;
}
&:after{
    content: '';
    display:block;
    clear:both;
}
.bankLogo{
    height: 39px;
    width: 39px;
    float:left;
    /* margin-left: 100px; */
    background:#fff;
    img{
        max-width: 100%;
        max-height: 100%;
    }
}

bankLogoInfra{
    height: 9px;
    width: 9px;
}
h2{
    font-size: 24px;
    font-wight:normal;
    color: #fff;
    float: left;
    margin: 7px 15px;
}
.headerNavDash{
    min-width: 214px;
    text-align:center;
    border: 2px solid #fff;
    float:left;
    color: #fff;
    padding: 8px;
    border-radius:8px;
    font-size: 18px;
}
`;
export default TopBar;
