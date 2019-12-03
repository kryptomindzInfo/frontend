import styled from 'styled-components';

const UploadArea = styled.div `
width: 100%;
background:#fff;
cursor:pointer;
border-radius: 7.5px;
border: dashed 1.5px #417505;
padding: 18px 40px;
margin-bottom: 20px; 

&:after{
    content: '';
    display: block;
    clear:both;
}
> .uploaded {
    font-size: 12px;
    color: #417505;
    font-weight: bold;
    line-height: 14px;
    display: block;
    position: relative;
    > i{
        position: absolute;
        right: 0;
        top: 0;
        color: #ff1a1a;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }
}
>input{
    display:none;
}
> i {
    font-size: 80px;
    line-height: 56px;
    display: block;
    float: left;
    color: #417505;
}
> label {
    font-size: 18px;
    font-weight: bold;
    line-height:3;
    color: #43434a;
    float:right;
    cursor:pointer;
}
`;
export default UploadArea;