import styled from 'styled-components';

const UploadedFile = styled.p `
    font-size: 12px;
    color: #417505;
    font-weight: bold;
    line-height: 14px;
    display: block;
    position: relative;
    > a{
        font-size: 12px;
        color: #417505;
        font-weight: bold;
        line-height: 14px;
    }
    > i{
        position: absolute;
        right: 0;
        top: 0;
        color: #ff1a1a;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }

`;
export default UploadedFile;