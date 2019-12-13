import styled from 'styled-components';

const Card = styled.div `
display:block;
width: ${props => props.cardWidth ? props.cardWidth : '100%' };
margin-left: ${props => props.horizontalMargin ? props.horizontalMargin : '0' };
margin-right: ${props => props.horizontalMargin ? props.horizontalMargin : '0' };
padding:  ${props => props.bigPadding ? '18px 30px' : '12px 6px' };
box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.02);
background-color: ${props => props.selected ? '#6cac69' : '#fff' };
color: ${props => props.selected ? '#fff' : '#323c47' };
border-radius: ${props => props.rounded ? '5px' : '0' };
margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
text-align: ${props => props.textAlign ? props.textAlign : 'left'};
float: ${props => props.col ? 'left' : 'none' };
max-width: ${props => props.centerSmall ? '600px' : '100%' };
margin: ${props => props.centerSmall ? '0 auto' : 'sdf' };
position: relative;
.history{
    position: absolute;
    right: 20px;
    bottom: 25px;
    color: ${props => props.theme.accent};
}
&.sideNav{
    padding: 15px 10px;
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: flex-start;
    margin-bottom: 10px;
    border: solid 1px #e9eff4;
    box-shaddow: none;
    i{
        margin-right:10px;
        margin-top:0;
        color: #4da1ff;
        background-color: ${props => props.selected ? '#fff' : 'transparent' };
    }
    h3{
        font-size: 13px;
        font-weight:bold;
        margin:0;
        color: ${props => props.selected ? '#fff' : '#323c47' };
    }
}
> .cardHeader:after{
    content: '';
    display:block;
    clear:both;
}
> .cardHeader > .cardHeaderRight > h3, > h3{
    color: #323c47;
    font-size: 24px;
    font-weight: normal;
    margin-top:0;
    margin-bottom: 20px;
}
> .cardHeader > .cardHeaderRight > h3{
    margin-bottom:1px;
}
> .cardHeader  > .cardHeaderLeft{
    float:left;
    &.flex{
        display:flex;
        align-items:center;
        justify-content: flex-start;
        flex-direction: row;
        h3{
            font-size: 28px;
        }
        .material-icons{
            background: #417505;
            color: #fff;
            
        }
    }
}
> .cardHeader  > .cardHeaderRight{
    float:left;
}
> .cardHeader > .cardHeaderLeft > .material-icons {
    width: 46px;
    height: 46px;
    color: #417505;
    background: transparent;
    border-radius: 50%;
    margin: 3px 17px;
    font-size: 40px;
    padding: 0;
    line-height: 46px;
}
>h4{
    font-size: ${props => props.h4FontSize ? props.h4FontSize : '18px' };
    font-weight: normal;
    color: #323c47;
    margin-top:0;
    margin-bottom: 18px;
}
.menuTabs{
    font-size: 20px;
    color: #417505;
    font-weight:bold;
    float:left;
    margin-top:20px;
    margin-right: 30px;
}
> .cardHeader > .cardHeaderRight > h5,  > h5{
    font-size: 14px;
    font-weight: 300;
    color: rgba(50, 60, 71, 0.4);
    margin-top:0;
    margin-bottom:15px;
}

> .cardValue{
    font-size: 32px;
    font-weight: bold;
    color: #417505;
}

> button{
    padding: 6px;
    border-radius: 2px;
    border: solid 1px #417505;
    color: #417505;
    font-size: 11px;
    font-weight: bold;
    background: #fff;
    margin-top: ${props => props.buttonMarginTop ? props.buttonMarginTop : '0'};

    >i{
        margin-right:5px;
        font-size: 11px;
    }
}

`;
export default Card;