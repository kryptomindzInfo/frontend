import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Popup from './Popup';
import { Reciept } from './Reciept';

const TransactionReciept = props => {
  const componentRef = useRef();


  return (
    <Popup close={this.closePopup.bind(this)} roundedCorner>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Reciept ref={componentRef} />
    </Popup>
  );
};

export default TransactionReciept;
