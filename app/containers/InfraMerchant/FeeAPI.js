import axios from 'axios';
import { API_URL } from '../App/constants';
import { toast } from 'react-toastify';

const token = localStorage.getItem('logged');
const getInfraMerchantRules = async (bankType, ruleType, merchantId) => {
  try {
    let URL = '';
    if (bankType === 'interbank') {
      URL = `${API_URL}/infra/merchantRule/interBank/getAll`;
    } else {
      URL = `${API_URL}/infra/merchantRule/getAll`;
    }
    const res = await axios.post(URL, { token, merchant_id: merchantId, page: ruleType});
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { list: [], loading: false };
      }
      return { list: res.data.rules, loading: false };
    }
    toast.error(res.data.message);
    return { list: [], loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { list: [], loading: false };
  }
};

const merchantInfraRuleApi = async (bankType, ruleStatus, payload) => {
  let URL = '';
  if (bankType === 'interbank') {
    URL = `${API_URL}/infra/merchantRule/interBank/${ruleStatus}`;
  } else {
    URL = `${API_URL}/infra/merchantRule/${ruleStatus}`;
  }
  try {
    payload.token = token;
    const res = await axios.post(URL, payload);
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};

export { getInfraMerchantRules, merchantInfraRuleApi };
