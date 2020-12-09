import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from './constants';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export const postRequest = async (url, token, values) => {
  try {
    const res = await axios.post(`${API_URL}/${url}`, {
      token,
      ...values,
    });
    console.log(res);
    if (res.status === 200) {
      return { data: res, loading: false };
    }
  } catch (err) {
    toast.error('Something went wrong');
    return { data: {}, loading: false };
  }
};

export const getRequest = async (url, token, values) => {
  try {
    const res = await axios.get(`${API_URL}/${url}`, {
      token,
      ...values,
    });
    if (res.status === 200) {
      return { data: res, loading: false };
    }
  } catch (err) {
    toast.error('Something went wrong');
    return { data: {}, loading: false };
  }
};
