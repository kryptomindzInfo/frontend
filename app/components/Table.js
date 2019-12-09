import styled from 'styled-components';

const Table = styled.table `
width:100%;
margin-top: ${props => props.marginTop ? props.marginTop : '0' };

> thead > tr > th{
    font-size:16px;
    font-weight:bold;
    padding: 8px;
    text-align:center;
    background-color: #f5a623;
    color: #fff;
    position:relative;
}
> tbody > tr > td{
    font-size: 16px;
    font-weight: 300;
    color: #4a4a4a;
    padding: 14px 22px;
    background-color: rgba(81, 111, 10, 0.01);
    position:relative;
}
td > .material-icons{
    font-size: 19px;
    font-weight:bold;
    color: #417505;
}
>
.bold{
    font-weight:bold;
}

.popMenuTrigger{
    .popMenu{
        display: none;
        position: absolute;
        z-index: 10;
        width: 100px;
        right: 18px;
        margin-top: -15px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
        padding: 5px 10px;
        > a {
            margin: 5px 0;
            text-align: left;
            display:block;
            color: #000;
            font-size:13px;
        }
    }
    &:hover .popMenu, .popMenu:hover{
        display:block;
    }
}

`;

export default Table;