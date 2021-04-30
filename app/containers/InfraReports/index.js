/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import axios from 'axios';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';
import { Helmet } from 'react-helmet';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import { toast } from 'react-toastify';
import Header from 'components/Header/index';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Card from 'components/Card';
import ActionBar from 'components/ActionBar';
import FormGroup from 'components/FormGroup';
import A from 'components/A';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Table from 'components/Table';
import Button from 'components/Button';
import Row from 'components/Row';
import Col from 'components/Col';
import DashCards from 'components/DashCrads'
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import history from 'utils/history.js';
import SelectInput from 'components/SelectInput';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';

import { API_URL, CURRENCY, STATIC_URL } from '../App/constants';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
//enable the following line and disable the next line to test for tomorrow
var today = new Date(new Date().setDate(new Date().getDate() + 1));
//var today =new Date();
today.setHours(0, 0, 0, 0);
today = today.getTime();

const styles = () => ({
  root: {
    display: 'block',
    marginTop: '20px',
  },
  appBar: {
    backgroundColor:'goldenrod',
    padding:'15px',
    color: "white",
    fontSize:'30px',
  },
  drawer: {
    zIndex: 0,
    position: "relative",
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: "relative",

  }
});





class PartnerReports extends Component {
  constructor(props) {
    super();
    this.state = {
      token: localStorage.getItem('logged'),
      cashiers:[],
      bank_id: localStorage.getItem('bankId'),
      selectedCashierDetails: {},
      datearray:[],
      datestats: [],
      merchantlist:[],
      from:new Date(),
      to:new Date(),
      type:'branch',
  
      totalBranches: 0,
      totalCashiers:0,
      bankTrans:0,
      feeGenerated: 0,
      cashInHand: 0,
      commissionGenerated: 0,
      cashReceived: 0,
      crfeeGenerated: 0,
      crcommissionGenerated: 0,
      cashPaid: 0,
      cpfeeGenerated: 0,
      cpcommissionGenerated: 0,
  
      totalPartners: 0,
      totalPartnerBranches: 0,
      totalPartnerCashiers:0,
      partnerTrans:0,
      partnerFee:0,
      partnerCommission:0,

      totalBankMerchants:0,
      totalMerchantBranches:0,
      totalMerchantStaff:0,
      totalMerchantCashier:0,
      merchantFee:0,
      merchantCommission:0,
      merchantInvoiceCreated:0,
      invoicePaid: 0,
      amountPaid: 0,
      
      history: [],
      datelist: [],
      branches:[],
      filter: 'daterange',
      empty:false,
      amountGenerated:0,
      amountPaid:0,
      amountPaidBC:0,
      amountPaidMC:0,
      amountPaidPC:0,
      amountPaidUS:0,
      billGenerated:0,
      billPaid:0,
      billPaidBC:0,
      billPaidMC:0,
      billPaidPC:0,
      billPaidUS:0,
      billPending:0,
      amountPending:0,
      merchantstats:[]
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
    this.componentRef = React.createRef();

    this.child = React.createRef();
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);


  toggleType = (type) => {
    console.log(type);
    if(this.state.type !== type){
      this.setState(
        {
          type:type,
          empty:true,
        }
      );
    }
  };

  toggle = (type) => {
    if(this.state.filter !== type){
      this.setState(
        {
          filter:type,
          empty:true,
        }
      );
    }
  };

  getBranches = async() => {
    try {
      const res = await axios.post(`${API_URL}/getBanks`, { token: this.state.token, bank_id: this.state.bank_id });
      if (res.status == 200) {
          return ({branches:res.data.banks,loading:false});
      }
    } catch(err){
      console.log(err);
    }
  }

  fetchMerchantList = async () => {
    try {
      const res = await axios.post(`${API_URL}/infra/listMerchants`, {
        token: this.state.token,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
          return { list: [], loading: false };
        }
        return { list: res.data.list, loading: false };
      }
      return { list: [], loading: false };
    } catch (err) {
      return { list: [], loading: false };
    }
  };

  getdays = async(from,to) => {
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    function getdates(){
      var dateArray = new Array();
      var currentDate = from;
      while (currentDate <= to) {
          dateArray.push(new Date (currentDate));
          currentDate = addDays(currentDate, 1);
      }
      return dateArray;
    }
    const res = await getdates();
    return res;
  };
  
  getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates;
  };

  getBranchDailyReport = async(after,before,branch) => {
    try{
      const res = await axios.post(`${API_URL}/infra/getBankDailyReport`, {
        token: this.state.token,
        partner_id: branch._id,
        bank_id: branch._id,
        start:after,
        end: before,
      });
      if (res.status == 200) {
        return ({
          branch: branch,
          reports: res.data.bankreport,
          partnerreports: res.data.partnerreport,
          totalbranch: res.data.totalBranch,
          totalcashier: res.data.totalCashier,
          totalpartner: res.data.totalPartner,
          totalpartnercashier:res.data.partnerCashier,
          totalpartnerbranch:res.data.partnerBranch,
          totalmerchant: res.data.totalMerchant,
          totalmerchantcashier:res.data.merchantCashiers,
          totalmerchantstaff:res.data.merchantStaff,
          totalmerchantbranch:res.data.merchantBranch,
          merchantfee:res.data.merchantFeeGenerated,
          merchantcommission:res.data.merchantCommissionGenerated,
          paid: res.data.invoicePaid,
          amountpaid : res.data.amountPaid,
          invoicecreated: res.data.invoiceCreated,
        });
      }
    } catch (err){
      console.log(err);
    }
    
      
  };
  
  getBranchStatsByDate = async(date,blist) => {
    const stats = blist.map(async (branch) => {
      const after = new Date(date);
      const before = new Date(date);
      after.setHours(0,0,0,0);
      before.setHours(23,59,59,0);
      const cashiedatestats = await this.getBranchDailyReport(after,before,branch);
      return ({cashiedatestats:cashiedatestats});
    });
    const result= await Promise.all(stats);
    return(result);
  }

  getDateStats = async(dlist,blist) => {
    const stats = dlist.map(async (date) => {
      const cashiedatestats = await this.getBranchStatsByDate(date,blist);
      return ({
        cashiedatestats: cashiedatestats,
        totalCih: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashInHand : 0), 0
        ).toFixed(2),
        totalFee: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalFee : 0), 0
        ).toFixed(2),
        totalComm: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalCommission : 0), 0
        ).toFixed(2),
        totalCr: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashReceived : 0), 0
        ).toFixed(2),
        totalCrf: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashReceivedFee : 0), 0
        ).toFixed(2),
        totalCrc: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashReceivedComm : 0), 0
        ).toFixed(2),
        totalCp: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashPaid : 0), 0
        ).toFixed(2),
        totalCpf: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashPaidFee : 0), 0
        ).toFixed(2),
        totalCpc: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cashPaidComm : 0), 0
        ).toFixed(2),
        totalBankTrans: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalTrans : 0), 0
        ).toFixed(2),
        totalBranch: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalbranch, 0
        ),
        totalCashier:cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalcashier, 0
        ),


        totalPartnerFee: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.partnerreports[0].totalFee : 0), 0
        ).toFixed(2),
        totalPartnerComm: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.partnerreports[0].totalCommission : 0), 0
        ).toFixed(2),
        totalPartnerTrans: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.partnerreports[0].totalTrans : 0), 0
        ).toFixed(2),
        totalPartnerBranch: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalpartnerbranch, 0
        ),
        totalPartnerCashier: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalpartnercashier, 0
        ),
        totalPartner: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalpartner, 0
        ),

        totalMerchant: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalmerchant, 0
        ),
        totalMerchantFee: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.merchantfee, 0
        ).toFixed(2),
        totalMerchantComm:cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.merchantcommission, 0
        ).toFixed(2),
        totalInvoicePaid:  cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.paid, 0
        ),
        totalInvoiceAmount:  cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.amountpaid, 0
        ),
        totalInvoiceCreated:  cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.invoicecreated, 0
        ),
        totalMerchantBranch: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalmerchantbranch, 0
        ),
        totalMerchantCashier: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalmerchantcashier, 0
        ),
        totalMerchantStaff: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.totalmerchantstaff, 0
        ),
      })
    });
    const result= await Promise.all(stats);
    return({
      res:result,
      loading:false,
    });
  };

  formatDate = date => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var isoformat = date;


    var readable = new Date(isoformat);
    var m = readable.getMonth(); // returns 6
    var d = readable.getDate(); // returns 15
    var y = readable.getFullYear();
    var h = readable.getHours();
    var mi = readable.getMinutes();
    var mlong = months[m];
    return (
      {
        date: d + ' ' + mlong + ' ' + y,
        time: h + ':' + mi,
      }
    )
  };

  checkStatsbydate = async (id,date) => {
    try {
      const res = await axios.post(`${API_URL}/infra/getMerchantStatsBydate`,{
        token: this.state.token, 
        merchant_id:id,
        date:date,
      });
      if (res.status === 200) {
        if (res.data.status === 0) {
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

  getStatsBydate = async(list,date) => {
    const statlist = list.map(async (item) => {
        const data = await this.checkStatsbydate(item._id,date);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  getTypeStatsBydate = async(datelist,typelist) => {
    const statlistbydate = datelist.map(async (date) => {
        const tomorrow = new Date(date)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const data = await this.getStatsBydate(typelist,tomorrow);
        return ({
            date:date,
            data:data.res,
            amount_generated: data.res.reduce((a, b) => a + b.amount_generated, 0),
            bill_generated: data.res.reduce((a, b) => a + b.bill_generated, 0),
            amount_paid: data.res.reduce((a, b) => a + b.amount_paid, 0),
            bill_paid: data.res.reduce((a, b) => a + b.bill_paid, 0),
            amount_paid_BC: data.res.reduce((a, b) => a + b.amount_paid_by_BC, 0),
            bill_paid_BC: data.res.reduce((a, b) => a + b.bill_paid_by_BC, 0),
            amount_paid_PC: data.res.reduce((a, b) => a + b.amount_paid_by_PC, 0),
            bill_paid_PC: data.res.reduce((a, b) => a + b.bill_paid_by_PC, 0),
            amount_paid_US: data.res.reduce((a, b) => a + b.amount_paid_by_US, 0),
            bill_paid_US: data.res.reduce((a, b) => a + b.bill_paid_by_US, 0),
            amount_paid_MC: data.res.reduce((a, b) => a + b.amount_paid_by_MC, 0),
            bill_paid_MC: data.res.reduce((a, b) => a + b.bill_paid_by_MC, 0),
        });
    })
    const result= await Promise.all(statlistbydate);
    return({res:result, loading:false});
  };


  getData = async() => {
    this.setState(
      {
        loading:true,
      }
    );
    const branches = await this.getBranches();
    const start = startOfDay(new Date(this.state.from));
    const end = endOfDay(new Date(this.state.to));
    const datelist = await this.getDatesBetweenDates(start, end);
    console.log(datelist);
    const datestats =  await this.getDateStats(datelist,branches.branches);
    console.log(datestats)
    this.setState(
      {
        branches: branches.branches,
        datelist: datelist,
        datestats: datestats.res,
        totalBranches: datestats.res[0].totalBranch,
        totalCashiers:datestats.res[0].totalCashier,
        bankTrans: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalBankTrans,10), 0
        ),
        feeGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalFee,10), 0
        ),
        commissionGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalComm,10), 0
        ),
        cashReceived: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCr,10), 0
        ),
        crfeeGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCrf,10), 0
        ),
        crcommissionGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCrc,10), 0
        ),
        cashPaid:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCp,10), 0
        ),
        cpfeeGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCpf,10), 0
        ),
        cpcommissionGenerated:  datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCpc,10), 0
        ),
        cashInHand: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCih,10), 0
        ),
  
        totalPartners: datestats.res[0].totalPartner,
         
        totalPartnerBranches:datestats.res[0].totalPartnerBranch,
          
        totalPartnerCashiers:datestats.res[0].totalPartnerCashier,
        partnerTrans:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalPartnerTrans,10), 0
        ),
        partnerFee:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalPartnerFee,10), 0
        ),
        partnerCommission:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalPartnerComm,10), 0
        ),

        







        totalBankMerchants:datestats.res[0].totalMerchant,
        totalMerchantBranches:datestats.res[0].totalMerchantBranch,
        totalMerchantStaff:datestats.res[0].totalMerchantStaff,
        totalMerchantCashier:datestats.res[0].totalMerchantCashier,
        merchantFee:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalMerchantFee,10), 0
        ),
        merchantCommission:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalMerchantComm,10), 0
        ),
        merchantInvoiceCreated:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalInvoiceCreated,10), 0
        ),
        invoicePaid:datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalInvoicePaid,10), 0
        ),
        amountPaid: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalInvoiceAmount,10), 0
        ),
        loading:datestats.loading,
        empty:datestats.loading
      }
    );
  
  }

  getCardValues = (list) => {
    return ({
      amount_generated: list.reduce((a, b) => a + b.amount_generated, 0),
      bill_generated: list.reduce((a, b) => a + b.bill_generated, 0),
      amount_paid: list.reduce((a, b) => a + b.amount_paid, 0),
      bill_paid: list.reduce((a, b) => a + b.bill_paid, 0),
      amount_paid_BC: list.reduce((a, b) => a + b.amount_paid_BC, 0),
      bill_paid_BC: list.reduce((a, b) => a + b.bill_paid_BC, 0),
      amount_paid_PC: list.reduce((a, b) => a + b.amount_paid_PC, 0),
      bill_paid_PC: list.reduce((a, b) => a + b.bill_paid_PC, 0),
      amount_paid_US: list.reduce((a, b) => a + b.amount_paid_US, 0),
      bill_paid_US: list.reduce((a, b) => a + b.bill_paid_US, 0),
      amount_paid_MC: list.reduce((a, b) => a + b.amount_paid_MC, 0),
      bill_paid_MC: list.reduce((a, b) => a + b.bill_paid_MC, 0),
    });
}

  getMerchantData = async() => {
    console.log('wfwf');
    this.setState(
      {
        loading:true,
      }
    );
    const merchants = await this.fetchMerchantList();
    const start = startOfDay(new Date(this.state.from));
    const end = endOfDay(new Date(this.state.to));
    const datelist = await this.getDatesBetweenDates(start, end);
    const merchantstats = await this.getTypeStatsBydate(datelist,merchants.list);
    console.log(merchantstats);
    const cardValues = await this.getCardValues(merchantstats.res);
    this.setState(
      {
        merchantlist:merchants.list,
        amountGenerated:cardValues.amount_generated,
        amountPaid:cardValues.amount_paid,
        amountPaidBC:cardValues.amount_paid_BC,
        amountPaidMC:cardValues.amount_paid_MC,
        amountPaidPC:cardValues.amount_paid_PC,
        amountPaidUS:cardValues.amount_paid_US,
        billGenerated:cardValues.bill_generated,
        billPaid:cardValues.bill_paid,
        billPaidBC:cardValues.bill_paid_BC,
        billPaidMC:cardValues.bill_paid_MC,
        billPaidPC:cardValues.bill_paid_PC,
        billPaidUS:cardValues.bill_paid_US,
        billPending:cardValues.bill_generated-cardValues.bill_paid,
        amountPending:cardValues.amount_generated-cardValues.amount_paid,
        merchantstats:merchantstats.res,
        loading:merchantstats.loading,
        empty:merchantstats.loading
      }
    );

  }

  getTableData = (i) => {
    return this.state.merchantstats[i].data.map((date,index) => {
        return (
          <tr>
            <td>{this.state.merchantlist[index].name}</td>
            <td>
              <Row>No. {date.bill_generated}</Row>
              <Row>XOF {date.amount_generated}</Row>
            </td>
            <td>
              <Row>No. 0</Row>
              <Row>XOF 0</Row>
            </td>
            <td>
              <Row>No. {date.bill_paid_by_BC}</Row>
              <Row>XOF {date.amount_paid_by_BC}</Row>
            </td>
            <td>
              <Row>No. {date.bill_paid_by_PC}</Row>
              <Row>XOF {date.amount_paid_by_PC}</Row>
            </td>
            <td>
              <Row>No. {date.bill_paid_by_US}</Row>
              <Row>XOF {date.amount_paid_by_US}</Row>
            </td>
            <td>
              <Row>No. {date.bill_paid_by_MC}</Row>
              <Row>XOF {date.amount_paid_by_MC}</Row>
            </td>
            {/* <td>{date.bill_paid}</td>
            <td>{date.amount_paid}</td> */}
            <td>
              <Row>No. {date.bill_generated-date.bill_paid}</Row>
              <Row>XOF {date.amount_generated-date.amount_paid}</Row>
            </td>
            <th><Row>XOF 0</Row></th>
          </tr>
        );
    });
};

  componentDidMount= async() => {
    this.getData();
  };

  render() {
    const { classes } = this.props;
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }

    function inputBlur(e) {
      const { target } = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }

    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return null;
    }
    const dis = this;
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var tempDate = new Date();
    var date =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear()
    const currDate = this.formatDate(tempDate);
    return (
      <Wrapper from="branch">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Reports | AGENCY | E-WALLET</title>
        </Helmet>
       
          <Header activ={'reports'} />
        <Container verticalMargin>

        <Row>
                  <Col cW="8%">
                      <Button
                        className={this.state.type === 'branch' ? 'active' : ''}
                        onClick={()=>{this.toggleType('branch')}}
                        style={{marginLeft:'5px'}}
                      >
                      Bank
                    </Button>
                  </Col>
                  <Col cW="8%">
                    <Button
                        className={this.state.type === 'merchant' ? 'active' : ''}
                        onClick={()=>{this.toggleType('merchant')}}
                        style={{marginLeft:'5px'}}
                      >
                        Merchant
                      </Button>
                  </Col>
                  <Col cW='84%'></Col>
                </Row>
            {this.state.type === 'merchant' ? (
                  <ActionBar
                  marginBottom="15px"
                  marginTop="15px"
                  inputWidth="calc(100% - 241px)"
                  className="clr"
                  // style={{ display: 'none' }}
                >
                <h4 style={{color:"green"}}><b>Select Date for report</b></h4>
                    <Row>
                      <Col cW='20%'>
                        <FormGroup>
                        <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                                                  >
                          <KeyboardDatePicker
                          id="date-picker-dialog"
                          label="From"
                          size="small"
                          maxDate={this.state.to}
                          fullWidth
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          required
                          InputLabelProps={{
                          shrink: true,
                          }}
                          value={
                            this.state.from
                            }
                          onChange={date =>
                          this.setState({
                                from: date,
                          })
                          }
                           KeyboardButtonProps={{
                          'aria-label': 'change date',
                                                      }}
                          />
                        </MuiPickersUtilsProvider>
                        </FormGroup>
                      </Col>
                      <Col  cW='2%'>To</Col>
                      <Col cW='20%'>
                        <FormGroup>
                        <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                                                  >
                          <KeyboardDatePicker
                          id="date-picker-dialog"
                          label="To"
                          size="small"
                          maxDate={new Date()}
                          fullWidth
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          required
                          InputLabelProps={{
                          shrink: true,
                          }}
                          value={
                            this.state.to
                            }
                          onChange={date =>
                            this.setState({
                                  to: date,
                            })
                            }
                           KeyboardButtonProps={{
                          'aria-label': 'change date',
                                                      }}
                          />
                        </MuiPickersUtilsProvider>
                        </FormGroup>
                      </Col>
                      <Col  cW='58%'></Col>
                    </Row>
                    <Row style={{marginTop:'12px'}}>
                      <Col cW='17%'></Col>
                      <Col cw='50%'>
                        <Button style={{padding:'9px'}} onClick={()=>this.getMerchantData()}>Get Report</Button>
                      </Col>
                      <Col cw='25%'></Col>
  
                    </Row>
                    <Row>
                      <Col cW='90%'></Col>
                      <Col cW='10%'>
                        <ReactToPrint
                          style={{float:'right'}}
                        trigger={() => <Button ><PrintIcon/>  Print</Button>}
                        content={() => this.componentRef.current}
                      />
                      </Col>
                    </Row>
              </ActionBar>
            ) : (
              <ActionBar
                marginBottom="15px"
                marginTop="15px"
                inputWidth="calc(100% - 241px)"
                className="clr"
                // style={{ display: 'none' }}
              >
              <h4 style={{color:"green"}}><b>Select Date for report</b></h4>
                  <Row>
                    <Col cW='20%'>
                      <FormGroup>
                      <MuiPickersUtilsProvider
                       utils={DateFnsUtils}
                                                >
                        <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="From"
                        size="small"
                        maxDate={this.state.to}
                        fullWidth
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        required
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={
                          this.state.from
                          }
                        onChange={date =>
                        this.setState({
                              from: date,
                        })
                        }
                         KeyboardButtonProps={{
                        'aria-label': 'change date',
                                                    }}
                        />
                      </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Col>
                    <Col  cW='2%'>To</Col>
                    <Col cW='20%'>
                      <FormGroup>
                      <MuiPickersUtilsProvider
                       utils={DateFnsUtils}
                                                >
                        <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="To"
                        size="small"
                        maxDate={new Date()}
                        fullWidth
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        required
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={
                          this.state.to
                          }
                        onChange={date =>
                          this.setState({
                                to: date,
                          })
                          }
                         KeyboardButtonProps={{
                        'aria-label': 'change date',
                                                    }}
                        />
                      </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Col>
                    <Col  cW='58%'></Col>
                  </Row>
                  <Row style={{marginTop:'12px'}}>
                    <Col cW='17%'></Col>
                    <Col cw='50%'>
                      <Button style={{padding:'9px'}} onClick={()=>this.getData()}>Get Report</Button>
                    </Col>
                    <Col cw='25%'></Col>

                  </Row>
                  <Row>
                    <Col cW='90%'></Col>
                    <Col cW='10%'>
                      <ReactToPrint
                        style={{float:'right'}}
                      trigger={() => <Button ><PrintIcon/>  Print</Button>}
                      content={() => this.componentRef.current}
                    />
                    </Col>
                  </Row>
            </ActionBar>
            )}
           <div ref={this.componentRef}>
          {this.state.empty === false ? (
            <div>
              {this.state.type === 'branch' ? (
                <div>
                   <div style={{backgroundColor:"goldenrod", padding:'10px'}}>
                      <Row style={{marginTop:'15px'}}>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            h4FontSize="16px"
                            textAlign="center"
                            smallValue
                            col
                            style={{height:'120px',marginLeft:'20px'}}
                          >
                            <h4>
                              Bank Agencies
                            </h4>
                            <div className="cardValue">{this.state.totalBranches}</div>
                          </Card>
                        </Col>
                        <Col> 
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Bank Cashiers
                            </h4>
                            <div className="cardValue">{this.state.totalCashiers}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Bank Transactions
                            </h4>
                            <div className="cardValue">{this.state.bankTrans}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Cash In Hand
                            </h4>
                            <div className="cardValue">{this.state.cashInHand}</div>
                          </Card>
                        </Col>
                      
                      
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px', marginRight:'20px'}}
                          >
                            <h4>Revenue</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Fee</h5>
                                <div className="cardValue">{this.state.feeGenerated}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Commission</h5>
                                <div className="cardValue">{this.state.commissionGenerated}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Total</h5>
                                <div className="cardValue"> {(parseFloat(this.state.feeGenerated)+parseFloat(this.state.commissionGenerated)).toFixed(2)}</div>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      
                      </Row>
                      <Row style={{marginTop:'20px'}}>
                      <Col >
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px',marginLeft:'20px'}}
                          >
                            <h4>Cash Paid</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Amount</h5>
                                <div className="cardValue"> {this.state.cashPaid}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Fee</h5>
                                <div className="cardValue">{this.state.cpfeeGenerated}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Commission</h5>
                                <div className="cardValue">{this.state.cpcommissionGenerated}</div>
                              </Col>
                              
                            </Row>
                          </Card>
                        </Col>
                      <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px', marginRight:'20px'}}
                          >
                            <h4>Cash Received</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Amount</h5>
                                <div className="cardValue"> {this.state.cashReceived}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Fee</h5>
                                <div className="cardValue">{this.state.crfeeGenerated}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Commission</h5>
                                <div className="cardValue">{this.state.crcommissionGenerated}</div>
                              </Col>
                              
                            </Row>
                          </Card>
                        </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      </Row>
                      <Row style={{marginTop:'20px'}}>
                        <Col>
                        
                            <Card
                              horizontalMargin="0px"
                              cardWidth="180px"
                              textAlign="center"
                              col
                              smallValue
                              style={{height:'120px',marginLeft:'20px'}}
                            >
                              <h4>
                                Partners
                              </h4>
                              <div className="cardValue">{this.state.totalPartners}</div>
                            </Card>
                          
                          
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            h4FontSize="16px"
                            textAlign="center"
                            smallValue
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Partner Agencies
                            </h4>
                            <div className="cardValue">{this.state.totalPartnerBranches}</div>
                          </Card>
                        </Col>
                        <Col> 
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Partner Cashiers
                            </h4>
                            <div className="cardValue">{this.state.totalPartnerCashiers}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Partner Transactions
                            </h4>
                            <div className="cardValue">{this.state.partnerTrans}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px', marginRight:'20px'}}
                          >
                            <h4>Revenue</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Fee</h5>
                                <div className="cardValue">{this.state.partnerFee}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Commission</h5>
                                <div className="cardValue">{this.state.partnerCommission}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Total</h5>
                                <div className="cardValue"> {(parseFloat(this.state.partnerFee)+parseFloat(this.state.partnerCommission)).toFixed(2)}</div>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                      <Row style={{marginTop:'20px'}}>
                        <Col>
                        
                            <Card
                              horizontalMargin="0px"
                              cardWidth="180px"
                              textAlign="center"
                              col
                              smallValue
                              style={{height:'120px',marginLeft:'20px'}}
                            >
                              <h4>
                                Merchants
                              </h4>
                              <div className="cardValue">{this.state.totalBankMerchants}</div>
                            </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            h4FontSize="16px"
                            textAlign="center"
                            smallValue
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                            Bank Merchant Branches
                            </h4>
                            <div className="cardValue">{this.state.totalMerchantBranches}</div>
                          </Card>
                        </Col>
                        <Col> 
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Bank Merchant Staff
                            </h4>
                            <div className="cardValue">{this.state.totalMerchantStaff}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="180px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px'}}
                          >
                            <h4>
                              Bank Merchant Cashier
                            </h4>
                            <div className="cardValue">{this.state.totalMerchantCashier}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px', marginRight:'20px'}}
                          >
                            <h4>Revenue</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Fee</h5>
                                <div className="cardValue">{this.state.merchantFee}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Commission</h5>
                                <div className="cardValue">{this.state.merchantCommission}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Total</h5>
                                <div className="cardValue">{(parseFloat(this.state.merchantFee)+parseFloat(this.state.merchantCommission)).toFixed(2)}</div>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                      <Row style={{marginTop:'20px',marginBottom:'15px'}}>
                        <Col cW='40%'>
                          <Card
                            horizontalMargin="0px"
                            cardWidth="300px"
                            smallValue
                            textAlign="center"
                            col
                            style={{height:'120px', marginLeft:'20px'}}
                          >
                            <h4>Invoices</h4>
                            <Row>
                              <Col style={{textAlign:'center'}}>
                                <h5>Created</h5>
                                <div className="cardValue">{this.state.merchantInvoiceCreated}</div>
                              </Col>
                              <Col style={{textAlign:'center'}}>
                                <h5>Paid</h5>
                                <div className="cardValue">{this.state.invoicePaid}</div>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col cW='45%'></Col>
                        <Col cW='15%' style={{ marginRight:'30px', marginTop:'30px'}}>
                        
                          
                        </Col>
                      </Row>
                      
                    </div>
                  
                {this.state.datelist.length > 0 
                  ? this.state.datelist.map( (date,i) => {
                  return(
                  <Card style={{ marginTop: '10px' }}>
                  
                    <h3 style={{color:'green'}}><b>{`${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()}`}</b></h3>
                    

                    <div>
                    {this.state.datestats[i].cashiedatestats.length > 0 
                            ? this.state.datestats[i].cashiedatestats.map( (b, index) => {
                              return (
                              <div className={classNames(classes.root)} onClick={()=>{ep.handleDrawerOpen(i)}} >
                              <div className={classNames(classes.appBar)} >
                                    <Row>
                                      <Col cW="5%">
                                        <img
                                          style={{ height: '40px' }}
                                          src={`${STATIC_URL}${b.cashiedatestats.branch.logo}`}
                                        />
                                      </Col>
                                      <Col cW="15%">
                                        {b.cashiedatestats.branch.name}
                                      </Col>
                                      <Col cW="75%"></Col>
                                      <Col cW="5%">
                                      </Col>
                                    </Row>
                              </div>
                              <Drawer
                                className={classNames(classes.drawer)}
                                transitionDuration={0}
                                variant="persistent"
                                anchor="top"
                                open={true}
                                // open={ep.state.drawer[`drawer${i}`]}
                                classes={{
                                  paper: classNames(classes.drawerPaper),
                                }}
                                
                              >
                                <h2 style={{marginTop:'20px'}}>Agencies:</h2>
                                <Row style={{fontSize:'15px'}}>
                                  <Col>Number: {b.cashiedatestats.totalbranch}</Col>
                                  <Col>Cashiers: {b.cashiedatestats.totalcashier}</Col>
                                  <Col>Transactions: {b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalTrans : 0}</Col>
                                  <Col>Fee: {b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalFee.toFixed(2) : 0}</Col>
                                  <Col>Commission: {b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].totalCommission.toFixed(2) : 0}</Col>
                                  <Col>Revenue: {b.cashiedatestats.reports.length > 0 ? (b.cashiedatestats.reports[0].totalFee + b.cashiedatestats.reports[0].totalCommission).toFixed(2) : 0}</Col>
                                </Row>
                                <h2 style={{marginTop:'20px'}}>Partners:</h2>
                                <Row style={{fontSize:'15px'}}>
                                  <Col>Number: {b.cashiedatestats.totalpartner}</Col>
                                  <Col>Agencies: {b.cashiedatestats.totalpartnerbranch}</Col>
                                  <Col>Cashiers: {b.cashiedatestats.totalpartnercashier}</Col>
                                  <Col>Transactions: {b.cashiedatestats.partnerreports.length > 0 ? b.cashiedatestats.partnerreports[0].totalTrans : 0}</Col>
                                  <Col>Fee:  {b.cashiedatestats.partnerreports.length > 0 ? b.cashiedatestats.partnerreports[0].totalFee.toFixed(2) : 0}</Col>
                                  <Col>Commission: {b.cashiedatestats.partnerreports.length > 0 ? b.cashiedatestats.partnerreports[0].totalCommission.toFixed(2) : 0}</Col>
                                  <Col>Revenue: {b.cashiedatestats.partnerreports.length > 0 ? (b.cashiedatestats.partnerreports[0].totalFee + b.cashiedatestats.reports[0].totalCommission).toFixed(2) : 0}</Col>
                                </Row>
                                <h2 style={{marginTop:'20px'}}> Merchants:</h2>
                                <Row style={{fontSize:'15px'}}>
                                  <Col>Number:  {b.cashiedatestats.totalmerchant}</Col>
                                  <Col>Agencies:  {b.cashiedatestats.totalmerchantbranch}</Col>
                                  <Col>Cashiers: {b.cashiedatestats.totalmerchantcashier}</Col>
                                  <Col>Staffs:  {b.cashiedatestats.totalmerchantstaff}</Col>
                                  <Col>Fee: {b.cashiedatestats.merchantfee.toFixed(2)}</Col>
                                  <Col>Commission: {b.cashiedatestats.merchantcommission.toFixed(2)}</Col>
                                  <Col>Revenue: {(b.cashiedatestats.merchantfee + b.cashiedatestats.merchantcommission).toFixed(2)}</Col>
                                </Row>
                                <Row style={{marginTop:'20px', fontSize:'15px'}}>
                                  <Col>Invoice Created:{b.cashiedatestats.invoicecreated}</Col>
                                  <Col>Invoice Paid: {b.cashiedatestats.paid}</Col>
                                </Row>
                              </Drawer>
                              
                            </div>
                            

                          );
                        })
                      : null}
                    </div>
                    
                    {/* <Table
                    marginTop="34px"
                    marginBottom="34px"
                    smallTd
                    textAlign="left"
                  >
                    <thead>
                          <tr>
                            <th>Bank</th>
                            <th>Opening Balance</th>
                            <th>Cash Received</th>
                            <th>Cash Paid</th>
                            <th>Invoice Paid</th>
                            <th>Amount of Invoice Paid</th>
                            <th>Fee Generated</th>
                            <th>Commission Generated</th>
                            <th>Revenue Generated</th>
                            <th>Cash in Hand</th>
                            <th>Closing Balance</th>
                            <th>Discripancy</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.datestats[i].cashiedatestats.length > 0 
                            ? this.state.datestats[i].cashiedatestats.map( (b, index) => {
                              return (
                              <tr key={index} >
                                
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.branch.name}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].opening_balance.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_received.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_paid.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.paid : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.amountpaid : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].fee_generated.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].comm_generated.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? (b.cashiedatestats.reports[0].fee_generated + b.cashiedatestats.reports[0].comm_generated).toFixed(2) : ""}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_in_hand.toFixed(2) : "-"}</div>
                                </td>
                              
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].closing_balance.toFixed(2) : "-"}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].discripancy.toFixed(2) : "-"}</div>
                                </td>
                                
                              </tr>
                              )
                            })

                            : null
                          }
                          <tr style={{textAlign:"center", backgroundColor:'green'}}>
                              <td style={{textAlign:"center", color:'white'}}><b>Total</b></td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalOb}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalCr}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalCp}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalInvoice}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalInvoiceAmount}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalFee}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalComm}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {parseInt(this.state.datestats[i].totalComm) + parseInt(this.state.datestats[i].totalFee)}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalCih}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalCb}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalDis}</b></div>
                              </td>
                            </tr>
                      
                      </tbody>
                  
                  </Table> */}
            
                    
                </Card>
                  )  
                })
                :null}
                </div>
              
              ):(
                <div>
              <Row>
                <Col>
                  <DashCards title='Invoice Created' no={this.state.billGenerated} amount={this.state.amountGenerated}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Uploaded' no={0} amount={0}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid' no={this.state.billPaid} amount={this.state.amountPaid}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Pending' no={this.state.billGenerated-this.state.billPaid} amount={this.state.amountGenerated-this.state.amountPaid}/>
                </Col>        
              </Row>
              <Row>
                <Col>
                  <DashCards title='Invoice Paid By Bank' no={this.state.billPaidBC} amount={this.state.amountPaidBC} row={3}/>
                </Col>
                <Col>
                <DashCards title='Invoice Paid By Partner' no={this.state.billPaidPC} amount={this.state.amountPaidPC} row={3}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By Merchant' no={this.state.billPaidMC} amount={this.state.amountPaidMC} row={3}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By User' no={this.state.billPaidUS} amount={this.state.amountPaidUS} row={3}/>
                </Col>      
              </Row>
              <Row>
                <Col>
                <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
                      <h4>Total Revenue</h4>
                      <Row>
                          <Col >
                              <Row>
                                  Fee:
                              </Row>
                              <Row>
                                  <span className="cardValue" > 0</span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Commission:
                              </Row>
                              <Row>
                                  <span className="cardValue">0</span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Total:
                              </Row>
                              <Row>
                                  <span className="cardValue">0</span>
                              </Row>
                          </Col> 
                      </Row>
                      </Card>
                  </Col>
              </Row>
              <Card bigPadding style={{width:'100%'}}>  
            {this.state.merchantstats && this.state.merchantstats.length > 0 ? (
              this.state.merchantstats.map((filtertype,index)=>{
              return(
                <div>
                 
                     <h3 style={{color:"green" ,textAlign:"left"}}><b>{`${new Date(filtertype.date).getDate()}/${new Date(filtertype.date).getMonth()+1}/${new Date(filtertype.date).getUTCFullYear()}`}</b></h3>
    
                 
                  <Table marginTop="34px">
                      <thead>
                      <tr>
                        <th>Merchant</th>
                          <th>Invoice Created</th>
                          <th>Invoice Uploaded</th>
                          <th>Invoice Paid By Bank</th>
                          <th>Invoice Paid By Partner</th>
                          <th>Invoice Paid By User</th>
                          <th>Invoice Paid By Merchant</th>
                          <th>Invoice Pending</th>
                          <th>Total Revenue</th>
                        </tr>
                    </thead> 
                    <tbody>
                      {this.getTableData(index)}
                      <tr>
                        <td className="green">Total</td>
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_generated}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_generated}</Row>
                        </td>
                        <td className="green">
                          <Row>No. 0</Row>
                          <Row>XOF 0</Row>
                        </td>
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_paid_BC}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_paid_BC}</Row>
                        </td>
                  
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_paid_PC}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_paid_PC}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_paid_US}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_paid_US}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_paid_MC}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_paid_MC}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {this.state.merchantstats[index].bill_generated-this.state.merchantstats[index].bill_paid}</Row>
                          <Row>XOF {this.state.merchantstats[index].amount_generated-this.state.merchantstats[index].amount_paid}</Row>
                        </td>
                        <td className="green"> XOF 0</td>
                      </tr>
    
                    </tbody>
                  </Table>
                </div>
              );
            })
          ) : (
            <h3
              style={{
                textAlign: 'center',
                color: 'grey',
                height: '300px',
              }}
            >
              No invoice found
            </h3>
          )}
        </Card>
 
              </div>
              )}
            </div>
          ) : (
            <Card marginBottom="20px" buttonMarginTop="5px" smallValue style={{height:'300px'}} />
          )} 

          </div> 
        </Container>
        <Footer bankname={this.state.bankName} banklogo={this.state.bankLogo}/>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(PartnerReports);
