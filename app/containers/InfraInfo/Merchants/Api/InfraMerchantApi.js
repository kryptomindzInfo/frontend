import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../App/constants';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const createInfraMerchant = async (props, values) => {
  try {
    const res = await axios.post(`${API_URL}/infra/createMerchant`, {
      token,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshMerchantList();
        props.onClose();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error('Something went wrong');
  }
};

const editInfraMerchant = async (props, values) => {
  try {
    const res = await axios.post(`${API_URL}/infra/editMerchant`, {
      token,
      status: 1,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshMerchantList();
        props.onClose();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};
const token = localStorage.getItem('logged');

const fetchInfraMerchantList = async id => {
  try {
    const res = await axios.post(`${API_URL}/infra/bank/listMerchants`, {
      token,
      bank_id: id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.list, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

export { createInfraMerchant, editInfraMerchant, fetchInfraMerchantList };
