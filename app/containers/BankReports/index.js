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
import BankHeader from 'components/Header/BankHeader';
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
import history from 'utils/history.js';
import SelectInput from 'components/SelectInput';

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




export default class PartnerReports extends Component {
  constructor(props) {
    super();
    this.state = {
      token: localStorage.getItem('bankLogged'),
      bankName: localStorage.getItem('bankName'),
      bankLogo: localStorage.getItem('bankLogo'),
      cashiers:[],
      admin: localStorage.getItem('admin'),
      bank_id: localStorage.getItem('bankId'),
      selectedCashierDetails: {},
      datearray:[],
      cancelled: 0,
      pending: 0,
      datestats: [],
      merchantlist:[],
      accepted: 0,
      from:new Date(),
      to:new Date(),
      cashReceived: 0,
      openingBalance: 0,
      paidInCash:0,
      closingBalance: 0,
      cashPaid: 0,
      feeGenerated: 0,
      type:'branch',
      cashInhand: 0,
      pending: 0,
      accepted: 0,
      declined: 0,
      invoicePaid: 0,
      invoiceAmount:0,
      commissionGenerated: 0,
      closingTime: null,
      history: [],
      datelist: [],
      branches:[],
      filter: 'daterange',
      periodstart: '',
      periodend: '',
      empty:false,
      amountGenerated:0,
      amountPaid:0,
      amountPaidBC:0,
      amountPaidMC:0,
      amountPaidPC:0,
      amountPaidUS:0,
      billGenerated:0,
      feeGeneratedByUS :0,
      commissionGeneratedByUS:0,
      feeGeneratedByBC:0,
      commissionGeneratedByBC:0,
      feeGeneratedByPC:0,
      commissionGeneratedByPC:0,
      feeGeneratedByMC:0,
      commissionGeneratedByMC:0,
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
    let api = '';
    if(this.state.type === 'branch'){
      api = 'getBranches';
    } else {
      api = 'bank/listPartners';
    }
    try {
      const res = await axios.post(`${API_URL}/${api}`, { token: this.state.token, bank_id: this.state.bank_id });
      if (res.status == 200) {
        if(this.state.type === 'branch'){
          return ({branches:res.data.branches,loading:false});
        } else {
          return ({branches:res.data.partners,loading:false});
        }
      }
    } catch(err){
      console.log(err);
    }
  }

  fetchMerchantList = async () => {
    try {
      const res = await axios.post(`${API_URL}/bank/listMerchants`, {
        bank_id: this.state.bank_id,
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
    let api = '';
    if(this.state.type === 'branch'){
      api = 'bank/getPartnerBranchDailyReport';
    } else {
      api = 'bank/getPartnerDailyReport';
    }
    try{
      const res = await axios.post(`${API_URL}/${api}`, {
        token: this.state.token,
        partner_id: branch._id,
        branch_id: branch._id,
        start:after,
        end: before,
      });
      if (res.status == 200) {
        return ({
          branch: branch,
          reports: res.data.reports,
          accepted: res.data.accepted,
          pending: res.data.pending,
          declined: res.data.decline,
          paid: res.data.invoicePaid,
          amountpaid : res.data.amountPaid,
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
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_in_hand : 0), 0
        ).toFixed(2),
        totalOb: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].opening_balance : 0), 0
        ).toFixed(2),
        totalCb: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].closing_balance : 0), 0
        ).toFixed(2),
        // totalDis: cashiedatestats.reduce(
        //   (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].descripency : 0), 0
        // ).toFixed(2),
        totalCr: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_received : 0), 0
        ).toFixed(2),
        totalCp: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].cash_paid : 0), 0
        ).toFixed(2),
        totalDis: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].discripancy : 0), 0
        ).toFixed(2),
        totalFee: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].fee_generated : 0), 0
        ).toFixed(2),
        totalComm: cashiedatestats.reduce(
          (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].comm_generated : 0), 0
        ).toFixed(2),
        // totalPic: cashiedatestats.reduce(
        //   (a, b) => a + (b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].paid_in_cash : 0), 0
        // ),
        totalRa: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.accepted, 0
        ),
        totalRp: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.pending, 0
        ),
        totalRd: cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.declined, 0
        ),
        totalInvoice:  cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.paid, 0
        ),
        totalInvoiceAmount:  cashiedatestats.reduce(
          (a, b) => a + b.cashiedatestats.amountpaid, 0
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
      const res = await axios.post(`${API_URL}/bank/getBankMerchantStatsBydate`,{
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
            fee_generated_by_US:0,
            commission_generated_by_US:0,
            fee_generated_by_BC:0,
            commission_generated_by_BC:0,
            fee_generated_by_PC:0,
            commission_generated_by_PC:0,
            fee_generated_by_MC:0,
            commission_generated_by_MC:0,
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
          fee_generated_by_US:res.data.fee_generated_by_US,
          commission_generated_by_US:res.data.commission_generated_by_US,
          fee_generated_by_BC:res.data.fee_generated_by_BC,
          commission_generated_by_BC:res.data.commission_generated_by_BC,
          fee_generated_by_PC:res.data.fee_generated_by_PC,
          commission_generated_by_PC:res.data.commission_generated_by_PC,
          fee_generated_by_MC:res.data.fee_generated_by_MC,
          commission_generated_by_MC:res.data.commission_generated_by_MC,
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
        fee_generated_by_US:0,
        commission_generated_by_US:0,
        fee_generated_by_BC:0,
        commission_generated_by_BC:0,
        fee_generated_by_PC:0,
        commission_generated_by_PC:0,
        fee_generated_by_MC:0,
        commission_generated_by_MC:0,
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
        fee_generated_by_US:0,
        commission_generated_by_US:0,
        fee_generated_by_BC:0,
        commission_generated_by_BC:0,
        fee_generated_by_PC:0,
        commission_generated_by_PC:0,
        fee_generated_by_MC:0,
        commission_generated_by_MC:0,
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
            fee_generated_by_US: data.res.reduce((a, b) => a + b.fee_generated_by_US, 0),
            commission_generated_by_US: data.res.reduce((a, b) => a + b.commission_generated_by_US, 0),
            fee_generated_by_BC: data.res.reduce((a, b) => a + b.fee_generated_by_BC, 0),
            commission_generated_by_BC: data.res.reduce((a, b) => a + b.commission_generated_by_BC, 0),
            fee_generated_by_PC: data.res.reduce((a, b) => a + b.fee_generated_by_PC, 0),
            commission_generated_by_PC: data.res.reduce((a, b) => a + b.commission_generated_by_PC, 0),
            fee_generated_by_MC: data.res.reduce((a, b) => a + b.fee_generated_by_US, 0),
            commission_generated_by_MC: data.res.reduce((a, b) => a + b.commission_generated_by_MC, 0),
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
    this.setState(
      {
        branches: branches.branches,
        datelist: datelist,
        datestats: datestats.res,
        openingBalance: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalOb,10), 0
        ),
        closingBalance: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCb,10), 0
        ),
        paidInCash: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalPic,10), 0
        ),
        cashReceived: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCr,10), 0
        ),
        cashPaid: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCp,10), 0
        ),
        cashInhand: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalCih,10), 0
        ),
        feeGenerated: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalFee,10), 0
        ),
        commissionGenerated: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalComm,10), 0
        ),
        pending : datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalRp,10), 0
        ),
        accepted: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalRa,10), 0
        ),
        declined: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalRd,10), 0
        ),
        invoicePaid: datestats.res.reduce(
          (a, b) => a + parseFloat(b.totalInvoice,10), 0
        ),
        invoiceAmount:datestats.res.reduce(
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
      fee_generated_by_US: list.reduce((a, b) => a + b.fee_generated_by_US, 0),
      commission_generated_by_US: list.reduce((a, b) => a + b.commission_generated_by_US, 0),
      fee_generated_by_BC: list.reduce((a, b) => a + b.fee_generated_by_BC, 0),
      commission_generated_by_BC: list.reduce((a, b) => a + b.commission_generated_by_BC, 0),
      fee_generated_by_PC: list.reduce((a, b) => a + b.fee_generated_by_PC, 0),
      commission_generated_by_PC: list.reduce((a, b) => a + b.commission_generated_by_PC, 0),
      fee_generated_by_MC: list.reduce((a, b) => a + b.fee_generated_by_US, 0),
      commission_generated_by_MC: list.reduce((a, b) => a + b.commission_generated_by_MC, 0),
    });
}

  getMerchantData = async() => {
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
        feeGeneratedByUS: cardValues.fee_generated_by_US,
        commissionGeneratedByUS: cardValues.commission_generated_by_US,
        feeGeneratedByBC:cardValues.fee_generated_by_BC,
        commissionGeneratedByBC:cardValues.commission_generated_by_BC,
        feeGeneratedByPC:cardValues.fee_generated_by_PC,
        commissionGeneratedByPC:cardValues.commission_generated_by_PC,
        feeGeneratedByMC:cardValues.fee_generated_by_MC,
        commissionGeneratedByMC:cardValues.commission_generated_by_MC,
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
            <td> XOF 0</td>
          </tr>
        );
    });
};

  componentDidMount= async() => {
    this.getData();
  };

  render() {
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
       
          <BankHeader />
        <Container verticalMargin>

        <Row>
                  <Col cW="8%">
                      <Button
                        className={this.state.type === 'branch' ? 'active' : ''}
                        onClick={()=>{this.toggleType('branch')}}
                        style={{marginLeft:'5px'}}
                      >
                      Agency
                    </Button>
                  </Col>
                  <Col cW="8%">
                      <Button
                        className={this.state.type === 'partner' ? 'active' : ''}
                        onClick={()=>{this.toggleType('partner')}}
                        style={{marginLeft:'5px'}}
                      >
                        Partner
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
                  <Col cW='76%'></Col>
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
            <Card marginBottom="20px" buttonMarginTop="5px" smallValue style={{height:'90px'}}>
              <Row>
                <Col>
                  <h4 style={{color:"green",marginBottom:"20px",textAlign:'center'}}><b>Bank Name : </b>{this.state.bankName} </h4> 
                </Col>
              </Row>
      
          </Card>
          {this.state.empty === false ? (
            <div>
              {this.state.type === 'branch' || this.state.type === 'partner'  ? (
                <div>
                  <div className="clr">
                  <Row>
                  <Col>
                    <Card
                      style={{height:'120px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Opening Balance</h4>
                      <div className="cardValue">{CURRENCY}: {this.state.openingBalance}</div>
                    </Card>
                  </Col>
                  <Col>
                  <Card
                      style={{height:'120px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Paid in Cash</h4>
                      <div className="cardValue">{CURRENCY}: {this.state.cashPaid}</div>
                    </Card>
                  </Col>
                  <Col>
                  <Card
                      style={{height:'120px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Cash Recieved</h4>

                      <div className="cardValue">{CURRENCY}: {this.state.cashReceived}</div>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      style={{height:'120px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Cash in Hand</h4>

                      <div className="cardValue">{CURRENCY}: {this.state.cashInhand}</div>
                    </Card>
                  </Col>
                </Row>
                  <Row style={{marginTop:'5px',marginBottom:'0px'}}>
                    <Col cW='40%'>
                    <Card
                      style={{height:'120px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Invoices Paid</h4>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <h5>Number</h5>
                          <div className="cardValue">{this.state.invoicePaid}</div>
                        </Col>
                        <Col style={{textAlign:'center'}}>
                          <h5>Amount</h5>
                          <div className="cardValue">{CURRENCY}: {this.state.invoiceAmount}</div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>   
                  <Col cW='60%'>
                  <Card
                      style={{height:'140px'}}
                      marginBottom="10px"
                      buttonMarginTop="32px"
                      textAlign="center"
                      bigPadding
                      smallValue
                    >
                      <h4>Revenue Collected</h4>
                      <Row>
                        <Col>
                          <h5>Fee</h5>
                          <div className="cardValue">{CURRENCY}: {this.state.feeGenerated}</div>
                        </Col>
                        <Col>
                          <h5>Commission</h5>
                          <div className="cardValue">{CURRENCY}: {this.state.commissionGenerated}</div>
                        </Col>
                        <Col>
                          <h5>Total</h5>
                          <div className="cardValue">{CURRENCY}: {(parseFloat(this.state.commissionGenerated, 10)+parseFloat(this.state.feeGenerated, 10)).toFixed(2)}</div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                </div>
                {this.state.datelist.length > 0 
                  ? this.state.datelist.map( (date,i) => {
                  return(
                  <Card style={{ marginTop: '10px' }}>
                  
                    <h3 style={{color:'green'}}><b>{`${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()}`}</b></h3>
                    <Table
                    marginTop="34px"
                    marginBottom="34px"
                    smallTd
                    textAlign="left"
                  >
                    <thead>
                          <tr>
                            <th>{this.state.type === 'branch' ? 'Agency' : 'Partner'}</th>
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
                            {/* <th>Requests Approved</th>
                            <th>Requests Declined</th>
                            <th>Requests Pending</th> */}
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
                                {/* <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.reports.length > 0 ? b.cashiedatestats.reports[0].paid_in_cash.toFixed(2) : "-"}</div>
                                </td> */}
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
                                {/* <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.accepted}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.declined}</div>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  <div className="labelGrey">{b.cashiedatestats.pending}</div>
                                </td> */}
                                
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
                              {/* <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>XOF {this.state.datestats[i].totalPic}</b></div>
                              </td> */}
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
                              {/* <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>{this.state.datestats[i].totalRa}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>{this.state.datestats[i].totalRd}</b></div>
                              </td>
                              <td style={{textAlign:"center"}}>
                                <div className="labelGrey" style={{textAlign:"center", color:'white'}}><b>{this.state.datestats[i].totalRp}</b></div>
                              </td> */}
                              
                            </tr>
                      </tbody>
                  
                  </Table>
            
                    
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
                  <DashCards title='Invoice Paid By Bank' no={this.state.billPaidBC} amount={this.state.amountPaidBC} row={3} fee={this.state.feeGeneratedByBC} commission={this.state.commissionGeneratedByBC}/>
                </Col>
                <Col>
                <DashCards title='Invoice Paid By Partner' no={this.state.billPaidPC} amount={this.state.amountPaidPC} row={3}  fee={this.state.feeGeneratedByPC} commission={this.state.commissionGeneratedByPC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By Merchant' no={this.state.billPaidMC} amount={this.state.amountPaidMC}  row={3}  fee={this.state.feeGeneratedByMC} commission={this.state.commissionGeneratedByMC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By User' no={this.state.billPaidUS} amount={this.state.amountPaidUS}  row={3}  fee={this.state.feeGeneratedByUS} commission={this.state.commissionGeneratedByUS}/>
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
                                  <span className="cardValue">
                                    {
                                      this.state.feeGeneratedByBC +
                                      this.state.feeGeneratedByPC+
                                      this.state.feeGeneratedByMC +
                                      this.state.feeGeneratedByUS
                                    }
                                  </span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Commission:
                              </Row>
                              <Row>
                                  <span className="cardValue">
                                    {
                                      this.state.commissionGeneratedByBC +
                                      this.state.commissionGeneratedByPC+
                                      this.state.commissionGeneratedByMC +
                                      this.state.commissionGeneratedByUS
                                    }
                                  </span>
                              </Row>
                          </Col>
                          <Col >
                              <Row>
                                  Total:
                              </Row>
                              <Row>
                                  <span className="cardValue">
                                    {
                                      this.state.feeGeneratedByBC +
                                      this.state.feeGeneratedByPC+
                                      this.state.feeGeneratedByMC +
                                      this.state.feeGeneratedByUS +
                                      this.state.commissionGeneratedByBC +
                                      this.state.commissionGeneratedByPC+
                                      this.state.commissionGeneratedByMC +
                                      this.state.commissionGeneratedByUS
                                    }
                                  </span>
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
