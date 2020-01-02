import styled from 'styled-components';
const UploadArea = styled.div `
position:relative;
> .uploadedImg{
    width: 64px;
    height: 64px;
    position: absolute;
    border-radius: 50%;
    display: block;
    float: left;
    top: 14px;
    left: 40px;
    background-image: url('${props => props.bgImg ? props.bgImg : '' }');
    background-size: cover;
}

.uploadTrigger{
width: 100%;
background:#fff;
cursor:pointer;
border-radius: 7.5px;
border: dashed 1.5px #417505;
padding: 16px 40px;
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
    font-size: 60px;
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
    text-align:right;
    cursor:pointer;
    p{
        margin: 0;
    font-size: 12px;
    color: #9b9b9b;
    line-height: 0;
    }
}
}
`;
export default UploadArea;