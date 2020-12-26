import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../App/constants';

const token = localStorage.getItem('cashierLogged');
const bankID = localStorage.getItem('bankId');
const getUserInvoices = async (mobile, merchant_id) => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getUserInvoices`, {
      token,
      mobile,
      merchant_id,
    });
    console.log(res);
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoices, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const getInvoiceDetails = async (number, merchant_id) => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getInvoiceDetails`, {
      token: token,
      number: number,
      merchant_id: merchant_id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoice, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const getInvoiceByCustomerCode = async (customerCode, merchant_id) => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getInvoicesForCustomerCode`, {
      token: token,
      customer_code: customerCode,
      merchant_id: merchant_id,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.invoice, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const payInvoice = async (values, bankid,fun,fun2) => {
  let API = '';
  if (bankid === bankID) {
    API = 'cashier/payInvoice';
  } else {
    API = 'cashier/interBank/payInvoice';
  }
  try {
    const res = await axios.post(`${API_URL}/${API}`, {
      token,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        fun2();
      } else {
        fun2();
        fun();
        toast.success(res.data.message);
      }
    }
  } catch (err) {
    fun2();
    toast.error('Something went wrong');
  }
};

export { getUserInvoices, getInvoiceDetails, payInvoice, getInvoiceByCustomerCode};
