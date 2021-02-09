import React, { useEffect } from 'react';
import Popup from '../../components/Popup';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { postRequest, getRequest } from '../App/ApiCall';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const token = localStorage.getItem('bankLogged');
function DetailsPopup(props) {
  const [retryLoading, setRetryLoading] = React.useState(false);

  useEffect(() => {
    console.log(props.transaction);
  }, []);

  const retry = async (mastercode, childcode) =>{
    console.log(mastercode, childcode);
    try {
      const res = await postRequest("bank/retryTransaction", token, {
        master_code:mastercode,
        child_code:childcode,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          toast.error(res.data.message);
        } else {
            props.refresh();
            props.onClose();
            toast.success("Retry successful");
        }
      } else {
       
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };
  const partners = props.transaction.childTx.map(partner => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var isoformat = partner.transaction.created_at;
                        var readable = new Date(isoformat);
                        var m = readable.getMonth(); // returns 6
                        var d = readable.getDate(); // returns 15
                        var y = readable.getFullYear();
                        var h = readable.getHours();
                        var mi = readable.getMinutes();
                        var mlong = months[m];
                        var fulldate =
                          d + ' ' + mlong + ' ' + y;
                        var time =  h + ':' + mi;
    return(
    <tr key={partner._id} className={ Number(partner.state) === 0  ? 'red' : ''}>
      <td className="tac">{partner.transaction.from_name}</td>
      <td className="tac">{partner.transaction.to_name}</td>
      <td className="tac">{fulldate}</td>
      <td className="tac">{time}</td>
      <td className="tac">{partner.transaction.amount.toFixed(2)}</td>
      <td className="tac">{Number(partner.state) === 1 ? 'Successful' : 'Failed'}</td>
      <td className="tac">{partner.message}</td>
      <td className="tac" style={{display:"flex",justifyContent:"center"}}>
      {Number(partner.state) === 0 ? (
        <Button filledBtn onClick={()=>retry(partner.transaction.master_code,partner.transaction.child_code)}>Retry</Button>
      ) : null}
      </td>
    </tr>
    );
  });
  return (
    <Popup  bigBody accentedH1 close={props.onClose.bind(this)}>
      <div>
        <h1>
          Child Transactions
        </h1>
        <Table marginTop="34px">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.transaction.childTx.length > 0 ? partners : null}
                </tbody>
              </Table>
      </div>
              
    </Popup>
  );
}

export default DetailsPopup;
