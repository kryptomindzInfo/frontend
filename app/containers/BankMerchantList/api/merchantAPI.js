import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../App/constants';

const createMerchant = async (props, values, token) => {
  try {
    const res = await axios.post(`${API_URL}/bank/createMerchant`, {
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

const editMerchant = async (props, values, token) => {
  try {
    values.username = values.merchant_id;
    const res = await axios.post(`${API_URL}/bank/editMerchant`, {
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

const fetchMerchantList = async () => {
  try {
    const token = localStorage.getItem('bankLogged');
    const res = await axios.post(`${API_URL}/bank/listMerchants`, {
      token,
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

export { createMerchant, editMerchant, fetchMerchantList };
