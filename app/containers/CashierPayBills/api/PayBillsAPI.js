import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../App/constants';

const token = localStorage.getItem('cashierLogged');
const getUserInvoices = async mobile => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getUserInvoices`, {
      token,
      mobile,
    });
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

const getInvoiceDetails = async number => {
  try {
    const res = await axios.post(`${API_URL}/cashier/getInvoiceDetails`, {
      token,
      number,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { details: {}, loading: false };
      }
      return { details: res.data.invoice, loading: false };
    }
    toast.error(res.data.message);
    return { details: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { details: {}, loading: false };
  }
};

const payInvoice = async values => {
  try {
    const res = await axios.post(`${API_URL}/cashier/payInvoice`, {
      token,
      ...values,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      }
      toast.success(res.data.message);
    }
    toast.error(res.data.message);
  } catch (err) {
    toast.error('Something went wrong');
  }
};

export { getUserInvoices, getInvoiceDetails, payInvoice };
