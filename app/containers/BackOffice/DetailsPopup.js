import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Popup from '../../components/Popup';
import Table from '../../components/Table';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { postRequest, getRequest } from '../App/ApiCall';
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

  const retry = async (mastercode, childcode) => {
    setRetryLoading(true);
    try {
      const res = await postRequest('bank/retryTransaction', token, {
        master_code: mastercode,
        child_code: childcode,
      });
      if (res.data.data.status === 0) {
        setRetryLoading(false);
        props.onClose();
        toast.error(res.data.data.message);
      } else {
        props.refresh();
        props.onClose();
        setRetryLoading(false);
        toast.success('Retry Successful');
      }
    } catch (err) {
      console.log(err);
      setRetryLoading(false);
      toast.error('Something went wrong');
    }
  };
  const partners = props.transaction.childTx.map(partner => {
    const months = [
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
    // var isoformat = partner.transaction.createdAt;
    const isoformat = partner.retry_at;
    console.log(props.transaction.retry_at);
    console.log(partner);
    const readable = new Date(isoformat);
    const m = readable.getMonth(); // returns 6
    const d = readable.getDate(); // returns 15
    const y = readable.getFullYear();
    const h = readable.getHours();
    const mi = readable.getMinutes();
    const mlong = months[m];
    const fulldate = `${d} ${mlong} ${y}`;
    const time = `${h}:${mi}`;
    return (
      <tr
        key={partner._id}
        className={Number(partner.state) === 0 ? 'red' : ''}
      >
        <td className="tac">{partner.transaction.from_name}</td>
        <td className="tac">{partner.transaction.to_name}</td>
        <td className="tac">
          {fulldate} {time}
        </td>
        <td className="tac">{partner._id}</td>
        <td className="tac">{partner.transaction.amount.toFixed(2)}</td>
        <td className="tac">
          {Number(partner.state) === 1 ? (
            <span style={{ color: 'green' }}>Successful</span>
          ) : (
            <span style={{ color: 'green' }}>Failed</span>
          )}
        </td>
        <td className="tac">{partner.message}</td>
        <td
          className="tac"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {Number(partner.state) === 0 ? (
            <div>
              {!retryLoading ? (
                <Button
                  style={{ width: '70px' }}
                  filledBtn
                  onClick={() =>
                    retry(
                      partner.transaction.master_code,
                      partner.transaction.child_code,
                    )
                  }
                >
                  Retry
                </Button>
              ) : (
                <Button style={{ width: '70px' }} filledBtn>
                  <Loader />
                </Button>
              )}
            </div>
          ) : null}
        </td>
      </tr>
    );
  });
  return (
    <Popup bigBody accentedH1 close={props.onClose}>
      <div>
        <h1>Child Transactions</h1>
        <Table marginTop="34px">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Remarks</th>
              <th />
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
