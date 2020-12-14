import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import Popup from './Popup';
import Button from './Button';
import { PaidReciept } from './PaidReceipt';


const InvoiceReciept = props => {
  const componentRef = useRef();


  return (
    <Popup close={props.close} bigBody roundedCorner>
      
                       
      <ReactToPrint
        trigger={() => <Button><PrintIcon/>  Print</Button>}
        content={() => componentRef.current}
      />
      <PaidReciept values={props.values} ref={componentRef} />
    </Popup>
  );
};

export default InvoiceReciept;
