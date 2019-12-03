import styled from 'styled-components';

const Table = styled.table `
width:100%;
margin-top: ${props => props.marginTop ? props.marginTop : '0' };

> thead > tr > th{
    font-size:18px;
    font-weight:bold;
    padding: 8px;
    text-align:center;
    background-color: #f5a623;
    color: #fff;
    position:relative;
}
> tbody > tr > td{
    font-size: 18px;
    font-weight: 300;
    color: #4a4a4a;
    padding: 14px 22px;
    background-color: rgba(81, 111, 10, 0.01);
    position:relative;
}
td > .material-icons{
    font-size: 21px;
    font-weight:bold;
    color: #417505;
}
.bold{
    font-weight:bold;
}

`;

export default Table;