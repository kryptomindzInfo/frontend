import axios from 'axios';
import { API_URL } from '../App/constants';
import notify from 'components//Notify';
const token = localStorage.getItem('bankLogged');

const fetchTypeList = async (id,type) => {
  try {
    const res = await axios.post(`${API_URL}/bank/getMerchant${type}List`,{ token,merchant_id: id });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.list, loading: false };
    }
  } catch (e) {
    notify('Could not fetch zones!', 'error');
    return { list: [], loading: false };
  }
};

const fetchSubzoneListByZone = async (zoneId) => {
  try {
    const res = await axios.post(`${API_URL}/bank/listMerchantSubzonesByZoneId`, {
      token,
      zone_id: zoneId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.subzones, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const fetchBranchListBySubzone = async (subzoneId) => {
  try {
    const res = await axios.post(`${API_URL}/bank/listMerchantBranchesBySubzoneId`, {
      token,
      subzone_id: subzoneId,
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], loading: false };
      }
      return { list: res.data.branches, loading: false };
    }
    notify(res.data.message, 'error');
    return { list: [], loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], loading: false };
  }
};

const checkStatsbydate = async (id,date,type) => {
  try {
    const res = await axios.post(`${API_URL}/bank/${type}/getMerchantStatsBydate`,{
      token,
      id:id,
      date:date,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
          bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
        bill_paid_by_MC:res.data.bill_paid_by_MC,
        amount_paid_by_MC:res.data.amount_paid_by_MC,
        bill_paid_by_BC:res.data.bill_paid_by_BC,
        amount_paid_by_BC:res.data.amount_paid_by_BC,
        bill_paid_by_PC:res.data.bill_paid_by_PC,
        amount_paid_by_PC:res.data.amount_paid_by_PC,
        bill_paid_by_US:res.data.bill_paid_by_US,
        amount_paid_by_US:res.data.amount_paid_by_US,
        
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  }
};

const checkStatsbyperiod = async (id,period,type) => {
  try {
    const res = await axios.post(`${API_URL}/bank/${type}/getMerchantStatsByPeriod`,{
      token,
      id:id,
      period_name:period,
    });
    if (res.status === 200) {
      console.log(res);
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { 
          bills_paid: 0,
					amount_generated: 0,
					bill_generated: 0,
					amount_paid: 0,
          bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
        };
      }
      return { 
        bill_generated: res.data.bill_generated,
        amount_generated: res.data.amount_generated,
        amount_paid: res.data.amount_paid,
        bill_paid: res.data.bill_paid,
        bill_paid_by_MC:res.data.bill_paid_by_MC,
        amount_paid_by_MC:res.data.amount_paid_by_MC,
        bill_paid_by_BC:res.data.bill_paid_by_BC,
        amount_paid_by_BC:res.data.amount_paid_by_BC,
        bill_paid_by_PC:res.data.bill_paid_by_PC,
        amount_paid_by_PC:res.data.amount_paid_by_PC,
        bill_paid_by_US:res.data.bill_paid_by_US,
        amount_paid_by_US:res.data.amount_paid_by_US,
        
      };
    }
    notify(res.data.message, 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
          amount_paid_by_MC:0,
          bill_paid_by_BC:0,
          amount_paid_by_BC:0,
          bill_paid_by_PC:0,
          amount_paid_by_PC:0,
          bill_paid_by_US:0,
          amount_paid_by_US:0,
    };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { 
      bills_paid: 0,
			amount_generated: 0,
			bill_generated: 0,
			amount_paid: 0,
      bill_paid_by_MC:0,
      amount_paid_by_MC:0,
      bill_paid_by_BC:0,
      amount_paid_by_BC:0,
      bill_paid_by_PC:0,
      amount_paid_by_PC:0,
      bill_paid_by_US:0,
      amount_paid_by_US:0,
    };
  }
};

const getBillPeriods = async (id,type) => {
  try {
    const res = await axios.post(`${API_URL}/${type}/getMerchantSettings`, {
      token,
      merchant_id:id
    });
    if (res.status === 200) {
      if (res.data.status === 0) {
        notify(res.data.message, 'error');
        return { list: [], default_bill_period: {}, loading: false };
      }
      return {
        list: res.data.setting.bill_period,
        default_bill_period: res.data.setting.default_bill_period,
        loading: false,
      };
    }
    notify(res.data.message, 'error');
    return { list: [], default_bill_period: {}, loading: false };
  } catch (err) {
    notify('Something went wrong', 'error');
    return { list: [], default_bill_period: {}, loading: false };
  }
};

export {

  checkStatsbyperiod,
  checkStatsbydate,
  fetchTypeList,
  fetchBranchListBySubzone,
  fetchSubzoneListByZone,
  getBillPeriods,
};
