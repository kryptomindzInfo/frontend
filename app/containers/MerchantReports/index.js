import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import BankHeader from '../../components/Header/BankHeader';
import Container from '../../components/Container';
import Table from '../../components/Table';
import Card from '../../components/Card';
import Col from '../../components/Col';
import DashCards from '../../components/DashCrads';
import Row from '../../components/Row';
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import FormGroup from '../../components/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import Footer from '../../components/Footer';
import {
  fetchTypeList,
  getBillPeriods,
  checkStatsbydate,
  checkStatsbyperiod,
  fetchSubzoneListByZone,
  fetchBranchListBySubzone,
} from './MerchantAPI'
import Loader from '../../components/Loader';

const today = new Date();
const ReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const bankName =  localStorage.getItem('bankName');
  const bankLogo = localStorage.getItem('bankLogo');
  const merchantName = JSON.parse(localStorage.getItem('selectedMerchant')).name;
  const merchantid = JSON.parse(localStorage.getItem('selectedMerchant'))._id;
  const [periodList, setPeriodList] = useState([]);
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [typeList, setTypeList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [subzoneList, setSubzoneList] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [amountGenerated, setAmountGenerated] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [amountPaidBC, setAmountPaidBC] = useState();
  const [amountPaidMC, setAmountPaidMC] = useState();
  const [amountPaidPC, setAmountPaidPC] = useState();
  const [amountPaidUS, setAmountPaidUS] = useState();
  const [billGenerated, setBillGenerated] = useState();
  const [billPaid, setBillPaid] = useState();
  const [billPaidBC, setBillPaidBC] = useState();
  const [billPaidMC, setBillPaidMC] = useState();
  const [billPaidPC, setBillPaidPC] = useState();
  const [billPaidUS, setBillPaidUS] = useState();
  const [billPending, setBillPending] = useState();
  const [amountPending, setAmountPending] = useState();
  const [selectedZone, setSelectedZone] = useState();
  const [selectedSubZone, setSelectedSubZone] = useState();
  const [filter, setFilter] = useState('daterange');
  const [type, setType] = useState('zone');
  const [csvData, setcsvData] = useState([
    ["BillNo","Name","Amount","Mobile","DueDate"]
  ]);

  const fetchCSVData = async(list) => {
    const csvlist = list.map(async (invoice) => {
        return ([invoice.number,invoice.name,invoice.amount,invoice.mobile,invoice.due_date]);
    });
    const result= await Promise.all(csvlist);
    return({res:result, loading:false});
  };

  const refreshMerchantSettings = async () => {
    setLoading(true);
    getBillPeriods(merchantid).then((data) => {
      setPeriodList(data.list);
    });
  };

  const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates
  };

  const getStatsBydate = async(list,date) => {
    const statlist = list.map(async (item) => {
        const data = await checkStatsbydate(item._id,date,type);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  const getStatsByPeriod = async(list,period) => {
    const statlist = list.map(async (item) => {
        const data = await checkStatsbyperiod(item._id,period.period_name,type);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  const getTypeStatsBydate = async(datelist,typelist) => {
    const statlistbydate = datelist.map(async (date) => {
        const tomorrow = new Date(date)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const data = await getStatsBydate(typelist,tomorrow);
        console.log(data.res);
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

  const getTypeStatsByperiod = async(periodlist,typelist) => {
    const statlistbyperiod = periodlist.map(async (period) => {
        const data = await getStatsByPeriod(typelist,period);
        // console.log(data.res);
        return ({
            period:period.period_name,
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
    const result= await Promise.all(statlistbyperiod);
    return({res:result, loading:false});
  };

  const getCardValues = (list) => {
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

  const getReportByPeriod = async() => {
    setLoading(true);
    const periodlist = await periodList.slice(periodStart,periodEnd+1);
    console.log(periodlist);
    const zonelist = await fetchTypeList(merchantid,'zone');
    setZoneList(zonelist.list);
    const subzonelist = await fetchTypeList(merchantid,'subzone');
    setSubzoneList(subzonelist.list);
    let typelist = {};
    if (type === 'zone') {
      typelist = zonelist;
    } else if (type === 'subzone') {
      typelist = await fetchSubzoneListByZone(selectedZone);
    } else {
      typelist = await fetchBranchListBySubzone(selectedSubZone);
    }
    setTypeList(typelist.list);
    const typestats = await getTypeStatsByperiod(periodlist,typelist.list);
    const cardValues = await getCardValues(typestats.res);
    setAmountGenerated(cardValues.amount_generated);
    setAmountPaid(cardValues.amount_paid);
    setBillGenerated(cardValues.bill_generated);
    setBillPaid(cardValues.bill_paid);
    setBillPaidBC(cardValues.bill_paid_BC);
    setBillPaidMC(cardValues.bill_paid_MC);
    setBillPaidPC(cardValues.bill_paid_PC);
    setBillPaidUS(cardValues.bill_paid_US);
    setAmountPaidBC(cardValues.amount_paid_BC);
    setAmountPaidPC(cardValues.amount_paid_PC);
    setAmountPaidMC(cardValues.amount_paid_MC);
    setAmountPaidUS(cardValues.amount_paid_US);
    setBillPending(cardValues.bill_generated-cardValues.bill_paid);
    setAmountPending(cardValues.amount_generated-cardValues.amount_paid);
    setTypeStats(typestats.res);
    setLoading(typestats.loading);
  };


  const getReportByDateRange = async() => { 
  setLoading(true);
  const start = startOfDay(new Date(startDate));
  const end = endOfDay(new Date(endDate));
  const dateslist = await getDatesBetweenDates(start, end);
  const zonelist = await fetchTypeList(merchantid,'zone');
  setZoneList(zonelist.list);
  const subzonelist = await fetchTypeList(merchantid,'subzone');
  setSubzoneList(subzonelist.list);
  let typelist = {};
  if (type === 'zone') {
    typelist = zonelist;
  } else if (type === 'subzone') {
    typelist = await fetchSubzoneListByZone(selectedZone);
  } else {
    typelist = await fetchBranchListBySubzone(selectedSubZone);
  }
  setTypeList(typelist.list);
  const typestats = await getTypeStatsBydate(dateslist,typelist.list);
  console.log(typestats);
  const cardValues = await getCardValues(typestats.res);
  setAmountGenerated(cardValues.amount_generated);
  setAmountPaid(cardValues.amount_paid);
  setAmountPaidBC(cardValues.amount_paid_BC);
  setAmountPaidPC(cardValues.amount_paid_PC);
  setAmountPaidMC(cardValues.amount_paid_MC);
  setAmountPaidUS(cardValues.amount_paid_US);
  setBillGenerated(cardValues.bill_generated);
  setBillPaid(cardValues.bill_paid);
  setBillPaidBC(cardValues.bill_paid_BC);
  setBillPaidMC(cardValues.bill_paid_MC);
  setBillPaidPC(cardValues.bill_paid_PC);
  setBillPaidUS(cardValues.bill_paid_US);
  setTypeStats(typestats.res);
  setLoading(typestats.loading);
};

const getData = (i) => {
    return typeStats[i].data.map((date,index) => {
        return (
          <tr>
            <td>{typeList[index].name}</td>
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
          </tr>
        );
    });
};

const toggle = (type) => {
  setAmountGenerated(0);
  setAmountPaid(0);
  setBillGenerated(0);
  setBillPaid(0);
  setBillPending(0);
  setAmountPending(0);
  setTypeStats([]);
  setFilter(type);
};

const toggleType = (type) => {
  if(type==='subzone'){
    setSelectedZone(zoneList[0]._id)
  } else if (type==='branch'){
    setSelectedSubZone(subzoneList[0]._id)
  }
  setAmountGenerated(0);
  setAmountPaid(0);
  setBillGenerated(0);
  setBillPaid(0);
  setBillPending(0);
  setAmountPending(0);
  setTypeStats([]);
  setType(type);
};


  useEffect(() => {
    refreshMerchantSettings();
    getReportByDateRange();
  }, []);


  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    
    <Fragment>
      <Helmet>
        <title>Merchant Dashboard | Cashier | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
        <BankHeader />
      <Container verticalMargin>
      <Card style={{marginBottom:'10px'}}>
          <div style={{display:'flex', justifyContent:'space-between',marginBottom:'10px'}}>
          <h3 style={{color:"green", textAlign:'center' }}><b>{merchantName} Report</b> </h3> 
          <div
                style={{
                  justifyContent: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Row>
                  <Col cW="33%">
                      <Button
                        className={type === 'zone' ? 'active' : ''}
                        onClick={()=>{toggleType('zone')}}
                        style={{marginLeft:'5px'}}
                      >
                      Zone
                    </Button>
                  </Col>
                  <Col cW="33%">
                      <Button
                        className={type === 'subzone' ? 'active' : ''}
                        onClick={()=>{toggleType('subzone')}}
                        style={{marginLeft:'5px'}}
                      >
                        Subzone
                      </Button>
                  </Col>
                  <Col cW="33%">
                    <Button
                        className={type === 'branch' ? 'active' : ''}
                        onClick={()=>{toggleType('branch')}}
                        style={{marginLeft:'5px'}}
                      >
                        Branch
                      </Button>
                  </Col>
                </Row>

                <Row>
                  <Col cW="33%"></Col>
                  <Col cW="33%">
                      <FormGroup>
                        <SelectInput
                          style={{
                            marginTop:"10px",
                            width:"110px",
                            display: type!=="subzone" ? "none" : "",
                          }}
                          value={selectedZone}
                          onChange={(event)=>{
                            setSelectedZone(event.target.value);
                          }}
                          // name="from"
                          required
                        >
                          {zoneList.map((b,index) => {
                            return (
                              <option key={b._id} value={b._id}>
                                {b.name}
                              </option>
                            );
                        })}
                        </SelectInput>
                      </FormGroup>
                  </Col>
                  <Col cW="33%">
                      <FormGroup>
                        <SelectInput
                          style={{
                            marginTop:"10px" ,
                            width:"110px",
                            display: type!=="branch" ? "none" : "",
                          }}
                          value={selectedSubZone}
                          onChange={(event)=>{
                            setSelectedSubZone(event.target.value);
                          }}
                          // name="from"
                          required
                        >
                          {subzoneList.map((b,index) => {
                            return (
                              <option key={b._id} value={b._id}>
                                {b.name}
                              </option>
                            );
                        })}
                        </SelectInput>
                      </FormGroup>
                  </Col>
                </Row>
              </div>
          </div>
        </Card>
     
            <Row>
              <Col cW='40%'>
              <Card marginBottom="10px" buttonMarginTop="10px" smallValue style={{height:'220px'}}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Button
                  className={filter === 'daterange' ? 'active' : ''}
                  onClick={()=>{toggle('daterange')}}
                  style={{marginLeft:'5px'}}
                >
                  Date Range
                </Button>
                <Button
                  className={filter === 'period' ? 'active' : ''}
                  onClick={()=>{toggle('period')}}
                  style={{marginLeft:'5px'}}
                >
                  Period
                </Button>
              </div>
        
                <Container>
                {filter === 'daterange' ? (
                  <div>
                  <h2 style={{color:"green"}}><b>Date Range</b></h2> 
                  <Row>
                    <Col cW='48%'>
                      <FormGroup>
                       <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                       >
                         <KeyboardDatePicker
                           id="date-picker-dialog"
                           size="small"
                           fullWidth
                           inputVariant="outlined"
                           format="dd/MM/yyyy"
                           required
                           maxDate={endDate}
                           InputLabelProps={{
                           shrink: true,
                           }}
                           value={
                              startDate
                             }
                           onChange={date =>
                            setStartDate(date)
                           }
                            KeyboardButtonProps={{
                           'aria-label': 'change date',
                                                       }}
                         />
                       </MuiPickersUtilsProvider>
                     </FormGroup>                  
                    </Col>
                    <Col cW='4%'>To</Col> 
                    <Col cW='48%'>
                      <FormGroup>
                       <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                       >
                         <KeyboardDatePicker
                           id="date-picker-dialog"
                           size="small"
                           fullWidth
                           minDate={startDate}
                           inputVariant="outlined"
                           format="dd/MM/yyyy"
                           required
                           InputLabelProps={{
                           shrink: true,
                           }}
                           value={
                              endDate
                             }
                           onChange={date =>
                            setEndDate(date)
                           }
                            KeyboardButtonProps={{
                           'aria-label': 'change date',
                                                       }}
                         />
                       </MuiPickersUtilsProvider>
                     </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{marginTop:"20px",margin:'auto'}}>
                      <Button
                        style={{padding:'9px',marginTop:"20px"}}
                        onClick={()=>getReportByDateRange()}
                      >
                        Get Report
                      </Button>
                  </Row>
                </div>
                ):""}
                 {filter === 'period' ? (
                  <div>
                  <h2 style={{color:"green"}}><b>Period Range</b></h2> 
                  <Row>
                   
                    <Col cW='48%'>
                    <FormGroup>
                      <SelectInput
                        style={{marginTop:"10px"}}
                        value={periodStart}
                        onChange={(event)=>{
                          setPeriodStart(event.target.value);
                        }}
                        name="from"
                        required
                      >
                        {periodList.map((b,index) => {
                          return (
                            <option key={b._id} name={b.period_name} value={index}>
                              {b.period_name}
                            </option>
                          );
                      })}
                      </SelectInput>
                    </FormGroup>
                    
                    </Col>
                    <Col cW='4%'>To</Col> 
                    <Col cW='48%'>
                    <FormGroup>
                      <SelectInput
                        style={{marginTop:"10px"}}
                        value={periodEnd}
                        onChange={(event)=>{
                          setPeriodEnd(event.target.value);
                        }}
                        name="from"
                        required
                      >
                        {periodList.map((b,index) => {
                          return (
                            <option key={b._id} value={index}>
                              {b.period_name}
                            </option>
                          );
                      })}
                      </SelectInput>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row style={{marginTop:"20px",margin:'auto'}}>
                      <Button
                        style={{padding:'9px'}}
                        onClick={()=>getReportByPeriod()}
                      >
                        Get Report
                      </Button>
                  </Row>
                </div>
                ):""}
              </Container>
              </Card>
              </Col>
              <Col  cW='30%'>
              </Col>
              <Col  cW='30%'>
              </Col>
            </Row>
            {filter === 'period' ? (
            <div>
              <Row>
                <Col>
                  <DashCards title='Invoice Created' no={billGenerated} amount={amountGenerated}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Uploaded' no={0} amount={0}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid' no={billPaid} amount={amountPaid}/>
                </Col>       
                <Col>
                <DashCards title='Invoice Pending' no={billPending} amount={amountPending}/> 
                </Col>
              </Row>
              <Row>
                <Col>
                  <DashCards title='Invoice Paid By Bank' no={billPaidBC} amount={amountPaidBC}/>
                </Col>
                <Col>
                <DashCards title='Invoice Paid By Partner' no={billPaidPC} amount={amountPaidPC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By Merchant' no={billPaidMC} amount={amountPaidMC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By User' no={billPaidUS} amount={amountPaidUS}/>
                </Col>      
              </Row>
            </div>
            
            ): (
              <div>
              <Row>
                <Col>
                  <DashCards title='Invoice Created' no={billGenerated} amount={amountGenerated}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Uploaded' no={0} amount={0}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid' no={billPaid} amount={amountPaid}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Pending' no={billGenerated-billPaid} amount={amountGenerated-amountPaid}/>
                </Col>        
              </Row>
              <Row>
                <Col>
                  <DashCards title='Invoice Paid By Bank' no={billPaidBC} amount={amountPaidBC}/>
                </Col>
                <Col>
                <DashCards title='Invoice Paid By Partner' no={billPaidPC} amount={amountPaidPC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By Merchant' no={billPaidMC} amount={amountPaidMC}/>
                </Col>
                <Col>
                  <DashCards title='Invoice Paid By User' no={billPaidUS} amount={amountPaidUS}/>
                </Col>      
              </Row>

            </div>
            )}
          
            <Card bigPadding style={{width:'100%'}}>  
            {typeStats && typeStats.length > 0 ? (
              typeStats.map((filtertype,index)=>{
              return(
                <div>
                  {filter === 'daterange' ? (
                     <h3 style={{color:"green" ,textAlign:"left"}}><b>{`${new Date(filtertype.date).getDate()}/${new Date(filtertype.date).getMonth()+1}/${new Date(filtertype.date).getUTCFullYear()}`}</b></h3>
                  ):(
                    <h3 style={{color:"green" ,textAlign:"left"}}><b>{filtertype.period}</b></h3>
                  )} 
                 
                  <Table marginTop="34px">
                      <thead>
                      <tr>
                        <th>{type}</th>
                          <th>Invoice Created</th>
                          <th>Invoice Uploaded</th>
                          <th>Invoice Paid By Bank</th>
                          <th>Invoice Paid By Partner</th>
                          <th>Invoice Paid By User</th>
                          <th>Invoice Paid By Merchant</th>
                          <th>Invoice Pending</th>
                        </tr>
                    </thead> 
                    <tbody>
                      {getData(index)}
                      <tr>
                        <td className="green">Total</td>
                        <td className="green">
                          <Row>No. {typeStats[index].bill_generated}</Row>
                          <Row>XOF {typeStats[index].amount_generated}</Row>
                        </td>
                        <td className="green">
                          <Row>No. 0</Row>
                          <Row>XOF 0</Row>
                        </td>
                        <td className="green">
                          <Row>No. {typeStats[index].bill_paid_BC}</Row>
                          <Row>XOF {typeStats[index].amount_paid_BC}</Row>
                        </td>
                  
                        <td className="green">
                          <Row>No. {typeStats[index].bill_paid_PC}</Row>
                          <Row>XOF {typeStats[index].amount_paid_PC}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {typeStats[index].bill_paid_US}</Row>
                          <Row>XOF {typeStats[index].amount_paid_US}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {typeStats[index].bill_paid_MC}</Row>
                          <Row>XOF {typeStats[index].amount_paid_MC}</Row>
                        </td>
                        <td className="green">
                          <Row>No. {typeStats[index].bill_generated-typeStats[index].bill_paid}</Row>
                          <Row>XOF {typeStats[index].amount_generated-typeStats[index].amount_paid}</Row>
                        </td>
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
 
            
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'80px'}}>
          <h4 style={{textAlign:'center'}}>Report generated at {`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`} </h4>
        </Card>
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default ReportPage;