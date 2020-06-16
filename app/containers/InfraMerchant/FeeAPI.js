import axios from 'axios';
import { API_URL } from '../App/constants';

const token = localStorage.getItem('logged');
const getInfraMerchantRules = async (ruleType, merchantId) => {
  try {
    let URL = '';
    if (ruleType === 'revenue') {
      URL = `${API_URL}/infra/merchantFee/getRules`;
    } else {
      URL = `${API_URL}/infra/commission/getRules`;
    }
    const res = await axios.post(URL, { token, merchant_id: merchantId });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.rule, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const merchantInfraRuleApi = async (props, ruleType, ruleStatus, payload) => {
  let URL = '';
  if (ruleType === 'Revenue') {
    URL = `${API_URL}/infra/merchantFee/${ruleStatus}`;
  } else {
    URL = `${API_URL}/infra/commission/${ruleStatus}`;
  }
  try {
    const res = await axios.post(URL, payload);
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
      } else {
        notify(res.data.message, 'success');
        props.refreshRuleList();
        props.onClose();
      }
    } else {
      notify(res.data.message, 'error');
    }
  } catch (e) {
    notify('Something went wrong');
  }
};

export { getInfraMerchantRules, merchantInfraRuleApi };
