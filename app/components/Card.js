import styled from 'styled-components';

const Card = styled.div `
display:block;
width: ${props => props.cardWidth ? props.cardWidth : '100%' };
margin-left: ${props => props.horizontalMargin ? props.horizontalMargin : '0' };
margin-right: ${props => props.horizontalMargin ? props.horizontalMargin : '0' };
padding:  ${props => props.bigPadding ? '18px 30px' : '12px 6px' };
box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.02);
background-color: #ffffff;
margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
text-align: ${props => props.textAlign ? props.textAlign : 'left'};
float: ${props => props.col ? 'left' : 'none' };

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
}
> .cardHeader  > .cardHeaderRight{
    float:left;
}
> .cardHeader > .cardHeaderLeft > i {
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