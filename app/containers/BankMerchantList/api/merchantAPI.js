import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../App/constants';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const token = localStorage.getItem('bankLogged');
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

const merchantVisiblity = (id, value, fun) =>{
  axios
  .post(`${API_URL}/bank/changeMerchantAcces`, {
    token,
    merchant_id : id,
    is_private: value,
  })
  .then(res => {
    if(res.status == 200){
      if(res.data.status === 0){
        throw res.data.message;
      }else{
        toast.success(res.data.message);
        fun();
      }
    }else{
      toast.error(res.data.message);
    }
  })
  .catch(err => {
    toast.error('Something went wrong');
  });

};

const fetchMerchantdetails = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/bank/getMerchantById`, {
      token,
      merchant_id: id,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { merchant: {}, loading: false };
      }
      return { merchant: res.data.merchant, loading: false };
    }
    toast.error(res.data.message);
    return { merchant: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { merchant: {}, loading: false };
  }
};

// Revenue Rule APIs

const createMerchantRule = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/createRule`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshRuleList();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};

const createInterBankMerchantRule = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/createRule`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshRuleList();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};

const editMerchantRule = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/editRule`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshRuleList();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};

const editInterBankMerchantRule = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/editRule`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        props.refreshRuleList();
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
};

const getRules = async (merchantId, page) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/getAll`, { token, merchant_id: merchantId, page: page });
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

const getInterBankRules = async (merchantId, page) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/getAll`, { token, merchant_id: merchantId, page: page });
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

const getInterBankSharing = async (merchantId, type) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/getRevenueShareForInterBank`, { token, merchant_id: merchantId, type: type });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { share: {}, loading: false };
      }
      return { share: res.data, loading: false };
    }
    toast.error(res.data.message);
    return { share: {}, loading: false };
  } catch (err) {
    toast.error('Something went wrong');
    return { share: {}, loading: false };
  }
};

const addInfraShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/addInfraShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return res.data.rule;
    }
    toast.error(res.data.message);
    return { status: 0, loading: false };
  } catch (e) {
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

const addInterBankInfraShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/addInfraShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return res.data.rule;
    }
    toast.error(res.data.message);
    return { status: 0, loading: false };
  } catch (e) {
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

const editInfraShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/editInfraShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.error);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return { status: 1, rule: res.data.rule, loading: false };
    }
    toast.error(res.data.error);
    return { status: 0, loading: false };
  } catch (e) {
    console.log("hi");
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

const editInterBankInfraShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/editInfraShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.error);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return { status: 1, rule: res.data.rule, loading: false };
    }
    toast.error(res.data.error);
    return { status: 0, loading: false };
  } catch (e) {
    console.log("hi");
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

const updatePartnerShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/updatePartnersShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return res.data.rule;
    }
    toast.error(res.data.message);
    return { status: 0, loading: false };
  } catch (e) {
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

const updateOtherBankShare = async (props, payload) => {
  try {
    const res = await axios.post(`${API_URL}/bank/merchantRule/interBank/updateOtherBankShare`, {
      token,
      ...payload,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        toast.error(res.data.message);
        return { status: 0, loading: false };
      }
      toast.success(res.data.message);
      props.refreshRuleList();
      return res.data.rule;
    }
    toast.error(res.data.message);
    return { status: 0, loading: false };
  } catch (e) {
    toast.error('Something went wrong');
    return { status: 0, loading: false };
  }
};

export {
  createMerchant,
  editMerchant,
  fetchMerchantList,
  createMerchantRule,
  createInterBankMerchantRule,
  getRules,
  getInterBankRules,
  editMerchantRule,
  editInterBankMerchantRule,
  addInfraShare,
  editInfraShare,
  updatePartnerShare,
  editInterBankInfraShare,
  addInterBankInfraShare,
  updateOtherBankShare,
  getInterBankSharing,
  fetchMerchantdetails,
  merchantVisiblity,
};
