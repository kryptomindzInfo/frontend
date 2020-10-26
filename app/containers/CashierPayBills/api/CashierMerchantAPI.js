import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../App/constants';
const bankID = localStorage.getItem('bankId');
const token = localStorage.getItem('cashierLogged');
const fetchCashierMerchantList = async () => {
  try {
    const res = await axios.post(`${API_URL}/cashier/listMerchants`, {
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

const getPenaltyRule = async (value) => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getMerchantPenaltyRule`, {
      token,
      merchant_id: value.merchant_id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { rule: {}, loading: false };
      }
      return { rule: res.data.rule, loading: false };
    }
    toast.error(res.data.message);
    return { rule: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { rule: {}, loading: false };
  }
};

const checkCashierFee = async (payload, bankid) => {
  let API = '';
  if (bankid === bankID) {
    API = 'cashier/checkMerchantFee';
  } else {
    API = 'cashier/interBank/checkMerchantFee';
  }
  try {
    const res = await axios.post(`${API_URL}/${API}`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { fee: {}, loading: false };
      }
      return { fee: res.data.fee, loading: false };
    }
    toast.error(res.data.message);
    return { fee: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { fee: {}, loading: false };
  }
};

export { fetchCashierMerchantList, checkCashierFee, getPenaltyRule };
