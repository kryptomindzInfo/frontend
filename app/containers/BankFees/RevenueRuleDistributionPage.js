import React from 'react';
import axios from 'axios';

import { Grid, TextField, Typography, withStyles } from '@material-ui/core';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MaterialButton from '@material-ui/core/Button';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Divider from '@material-ui/core/Divider';
import AddBranchModal from './AddBranchDialog';

import { API_URL } from '../App/constants';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    table: {
      minWidth: 700,
    },
    bankBranches: {
      padding: '3%',
      fontWeight: 600,
    },
    border : {
        border : '1px solid #000',
        padding : theme.spacing.unit * 2
    }
  });

class RevenueRuleDistubutionPage extends React.Component {
    success = () => toast.success(this.state.notification);

    error = () => toast.error(this.state.notification);
    
    warn = () => toast.warn(this.state.notification);
    state = {
        open : false,
        revenuePercentage: 0,
        revenueAmount : 0,
        
        name : "", trans_type: "", active : "", ranges : "", bank_id: "", token: "",

        standardRevenueSharingRule: {
            claim: 0,
            send: 0,
        },

        branchWithSpecificRevenue : [
            // {branchId : "branch 1", branchName: "Pranoy biswas", claim : 0, send : 0},
            // {branchId : "branch 1", branchName: "Pranoy biswas", claim : 0, send : 0}
        
        ],
        token : window.localStorage.getItem("bankLogged"),
        bankBranchesTable: true
    }


    saveRevenueSharingRules = () => {


      // if(this.state.branchWithSpecificRevenue.length == 0) {
      //     this.setState({
      //       notification: 'Please ',
      //       editRulesLoading: false
      //     });
      //   return  this.error();
      // }



        if(this.props.revenueData) {
            // this.editRxrRules(this.props.revenueData.fee._id);


            axios.post(`${API_URL}/save-revenue-sharing-rules/${this.props.revenueData.fee._id}`, {
                standardRevenueSharingRule : this.state.standardRevenueSharingRule,
                branchWithSpecificRevenue : this.state.branchWithSpecificRevenue
            }).then(d => {
                this.setState({
                    notification: 'Rule updated successfully',
                    editRulesLoading: false
                  });
                  this.success();
            }).catch(err => {
                console.log(err);
            })
            


        }else {
            this.setState({
                notification: 'Please add revenue rule first',
                editRulesLoading: false
              });
              this.error();
        }


      }

    componentWillReceiveProps(props) {
        const { state}= this;
        console.log(props, state)
        const {selectedBankFeeId, revenueData} = props;

        const {name, trans_type, active, bank_id} = props.bankFeeDetails;

        let fixed_amount = "";
        let percentage = "";

        if(revenueData) {

            const ranges = JSON.parse(revenueData.fee.ranges);
            console.log(ranges)
            fixed_amount = ranges[0].fixed_amount;
            percentage = ranges[0].percentage;


            const {branchWithSpecificRevenue ,standardRevenueSharingRule} = revenueData.fee;

            this.setState( prevState => ({ ...state , name, trans_type, active, bank_id,selectedBankFeeId,revenueAmount: fixed_amount,
              standardRevenueSharingRule : standardRevenueSharingRule ?  standardRevenueSharingRule : prevState.standardRevenueSharingRule


              , revenuePercentage: percentage,
              
              branchWithSpecificRevenue : branchWithSpecificRevenue ? branchWithSpecificRevenue : prevState.branchWithSpecificRevenue
            
            }));
    
        }else {

          this.setState( { ...state , name, trans_type, active, bank_id,selectedBankFeeId,revenueAmount:fixed_amount , revenuePercentage: percentage });


        }


       
        

        // //find branches
        // axios.post(`${API_URL}/getBranches`, {token : this.state.token}).then(d => {
        //     let branchWithSpecificRevenue = [];
        //     const {branches} = d.data;
        //     branchWithSpecificRevenue = branches.map(b => ({
        //         branchId : b.bcode, branchName: b.name, claim : 0, send : 0
        //     }))




        // }).catch(err => {
        //     console.log(err);
        // })

        




    }

    saveRevenue = () => {
     
    
      if ((this.state.revenueAmount != "") || (this.state.revenuePercentage != "" ))
      {
      
      console.log(this.props.revenueData);
        if(this.props.revenueData) {
            this.editRrRules(this.props.revenueData.fee._id);
        }else {
            this.createRevenueRule()
        }
      }
      else
      {
        toast.error("Fields cannot be empty");
        console.log("Empty revenue");

      }

    }




    showRevenueRuleDistributionPage = () => {
      // this.setState({ revenueRuleDistributionPage: 'true', selectedBankFeeId: bankFee._id, bankFeeDetails: bankFee });
      // console.log(bankFeeId);
  
      axios.get(`${API_URL}/getRevenueFeeFromBankFeeId/${this.state.selectedBankFeeId}`).then(d => {
        const {data} = d
        console.log(data);
        if(data.code == 1) {
          this.setState({
            revenueData: data
          })
        }else {
          this.setState({
            revenueData: ""
          })
        }
  
      }).catch(err => {
        console.log(err);
      })
  
    };
  



    createRevenueRule = () => {
        this.setState({ createRulesLoading: true });
        let { name, trans_type, active, bank_id, token, revenuePercentage, revenueAmount, selectedBankFeeId } = this.state;
    
        const ranges = [{
          trans_from: 0,
          trans_to: 0,
          fixed_amount: revenueAmount,
          percentage: revenuePercentage
        }];
    
        axios
          .post(`${API_URL}/bank/sendShareForApproval`, {
            trans_type,
            token,
            percentage: this.state.revenuePercentage,
            fixed: this.state.revenueAmount,
          })
          .then(res => {
            if (res.status == 200) {
              if (res.data.error) {
                throw res.data.error;
              } else {
                this.setState(
                  {
                    notification: 'Rule added',
                  },
                  () => {
                    this.success();
                    let ba = this.state.bank;
                    let history = this.props.history;
                    setTimeout(() =>  {
                    //   history.push('/bank/fees/');

                      //get revenue rule and put it into state
                      console.log("kia")
                      this.props.showRevenueRuleDistributionPage({_id: selectedBankFeeId})

                    }, 1000);
                  },
                );
              }
            } else {
              const error = new Error(res.data.error);
              throw error;
            }
            this.setState({
              createRulesLoading: false,
            });
          })
          .catch(err => {
            this.setState({
              notification: err.response ? err.response.data.error : err.toString(),
              createRulesLoading: false,
            });
            this.error();
          });
      };








      editRrRules = (rrId) => {

          this.setState({
            editRulesLoading: true
          });
    
    
          let { name, trans_type, active, bank_id, token, revenuePercentage, revenueAmount, selectedBankFeeId } = this.state;
        //   let {name, trans_type, active, ranges, bank_id, token} = this.state;
    
    let rule_id = rrId;
       const  ranges = [{
              trans_from: 0,
              trans_to: 0,
              fixed_amount: revenueAmount,
              percentage: revenuePercentage,
        }];
    
    
        axios
          .post(`${API_URL  }/editRule`, {
            name,
            trans_type, active, ranges, bank_id, token, rule_id,selectedBankFeeId
          })
          .then(res => {
            if(res.status == 200){
              if(res.data.error){
                throw res.data.error;
              }else{
                //console.log(res.data);
                this.setState({
                  notification: 'Rule updated'
                }, () => {
                  this.success();
                  let ba = this.state.bank;
                  let history = this.props.history;
                  setTimeout(() => {
                    // history.push('/bank/fees/');
                    this.props.showRevenueRuleDistributionPage({_id: selectedBankFeeId})
                  }, 1000);
              });
              }
            }else{
              const error = new Error(res.data.error);
              throw error;
            }
            this.setState({
              editRulesLoading: false
            });
          })
          .catch(err => {
            this.setState({
              notification: (err.response) ? err.response.data.error : err.toString(),
              editRulesLoading: false
            });
            this.error();
          });
        //}
      };



      getBranchDetailsFromModal = (branchDetails) => {

        console.log(branchDetails);
        console.log(this.state.branchWithSpecificRevenue);
        if(this.state.branchWithSpecificRevenue.map(d => d.branchId).includes(branchDetails[0].bcode)) return alert("Branch already saved")

        this.setState(prevState => ({
          ...prevState,
          branchWithSpecificRevenue: [
            ...prevState.branchWithSpecificRevenue,
            { branchId : branchDetails[0].bcode, branchName: branchDetails[0].name, claim : 0, send : 0 }
          ]
        }))

        this.setState({open : false});

      }







    render() {
        const {classes} = this.props;
  return <Grid container style={{ width: '74%', border: '1px solid grey' }}>
              <Grid
                container
                style={{ textAlign: 'center', background: '#f5a623', padding : 12 }}
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                <Typography
                  variant="h4"
                   style={{ color: 'white' }}
                >
                  { "Revenue Rule Distribution ( " +this.props.bankFeeDetails.name + " )"}
                </Typography>
                </Grid>
                <Grid item>
                  <Button onClick={this.props.close}>x</Button>
                </Grid>
              </Grid>
              <Grid
                style={{
                  margin: '2%',
                  border: '1px solid #d0d6d1',
                  paddingTop: '3%',
                }}
                container
              >
                <Grid item md={12}>
                  <Typography
                    variant="subtitle1"
                    style={{ paddingLeft: '3%', color: '#417505' }}
                  >
                    Revenue with Infra
                  </Typography>
                </Grid>

                <Grid style={{ margin: '0 0 2% 2%' }} item md={3}>
                  <TextField
                    type="number"
                    label="Percentage"
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    required="true"
                    onChange={(e) => {
                        const val = e.target.value;
                        this.setState({
                            revenuePercentage: val
                        })
                    }}
                    value={this.state.revenuePercentage}
                  />
                </Grid>
                <Grid item md={1}>
                  <Typography
                    style={{ paddingTop: '40%', textAlign: 'center' }}
                  >
                    and
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    type="number"
                    label="Fixed"
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    required="true"
                   
                    onChange={(e) => {
                        const val = e.target.value;
                        this.setState({
                            revenueAmount: val
                        })
                    }}
                    value={this.state.revenueAmount}
                  />
                </Grid>
                <Grid item md={3}>
                  <MaterialButton
                    variant="contained"
                    color="primary"
                    style={{
                      height: '40%',
                      marginTop: '23px',
                      marginLeft: '13%',
                    }}
                    onClick={this.saveRevenue}
                    className={classes.button}
                  >

                    {
                    
                    this.props.revenueData ? this.props.revenueData.fee.status == 1 ? "Update" : "Pending" : "Send for Approval"}
                  </MaterialButton>
                </Grid>
              </Grid>
              <Grid
                style={{
                  margin: '2%',
                  border: '1px solid #d0d6d1',
                  paddingTop: '3%',
                }}
                container
                spacing={16}
              >
                <Grid item md={12}>
                  <span
                    className={`${
                      this.state.bankBranchesTable ? 'ActiveTab' : 'InactiveTab'
                    } `}
                    // className={classes.bankBranches}
                    onClick={this.showBankBranches}
                  >
                    Bank Branches
                  </span>
                  <span
                    className={`${
                      this.state.bankPartnersTable ? 'ActiveTab' : 'InactiveTab'
                    } `}
                    onClick={this.showBankPartners}
                  >
                    Bank Partner
                  </span>
                  <span
                    className={`${
                      this.state.bankMerchantsTable
                        ? 'ActiveTab'
                        : 'InactiveTab'
                    } `}
                    onClick={this.showBankMerchants}
                  >
                    Bank Merchants
                  </span>
                </Grid>
                <MaterialTable
                  style={{
                    display: `${
                      // this.state.bankBranchesTable ? 'block' : 'none'
                      'none'
                    }`,
                  }}
                  className={classes.table}
                >
                  <Grid
                    style={{
                      marginTop: '1%',
                      border: '1px solid #d0d6d1',
                      paddingTop: '3%',
                    }}
                    container
                  >
                    <Grid item md={10}>
                      <Typography
                        variant="subtitle1"
                        style={{ paddingLeft: '3%', color: '#417505' }}
                      >
                        Standard Revenue Sharing with Branches
                      </Typography>
                    </Grid>

                    <Grid style={{ margin: '0 0 2% 2%' }} item md={3}>
                      <TextField
                        id="outlined-dense"
                        label="Claim Percentage"
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        name="claimRevenueRuleDistribution"
                        value={this.state.claimRevenueRuleDistribution}
                      />
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        style={{ paddingTop: '40%', textAlign: 'center' }}
                      >
                        and
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                        id="outlined-dense"
                        label="Send Percentage"
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        name="sendRevenueRuleDistribution"
                        value={this.state.sendRevenueRuleDistribution}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <MaterialButton
                        variant="contained"
                        color="primary"
                        style={{
                          height: '40%',
                          marginTop: '23px',
                          marginLeft: '13%',
                        }}
                        className={classes.button}
                      >
                        Updates
                      </MaterialButton>
                    </Grid>
                  </Grid>
                  <TableHead>
                    <TableRow>
                      <TableCell>Branch ID</TableCell>
                      <TableCell align="right">Branch Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    
                    {/* {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </MaterialTable>
                <MaterialTable
                  style={{
                    display: `${
                      this.state.bankPartnersTable ? 'block' : 'none'
                    }`,
                  }}
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right"></TableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      d
                    {/* {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        
                      </TableRow>
                    ))} */}
                  </TableBody>
                </MaterialTable>

                <Grid container spacing={16}>
                 
                    <Grid item xs={12}>
                        <div className={classes.border}>
                            <Grid container alignItems="center">

                            <Grid item xs={12}>
                              <Typography
                                    variant="subtitle"
                                    // style={{ paddingLeft: '3%', color: '#417505' }}
                                  >
                                    Standard Revenue Sharing with Branches
                                  </Typography>
                              </Grid>

                                <Grid item>
                                <TextField
                                    type="number"
                                    label="claim%"
                                    className={classNames(classes.textField, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        this.setState((prevState) => ({
                                            standardRevenueSharingRule: {...prevState.standardRevenueSharingRule, claim: val}
                                        }))
                                    }}
                                    value={this.state.standardRevenueSharingRule.claim}
                                />
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">and</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        type="number"
                                        label="send%"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin="dense"
                                        variant="outlined"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            this.setState((prevState) => ({
                                                standardRevenueSharingRule: {...prevState.standardRevenueSharingRule, send: val}
                                            }))
                                        }}
                                        value={this.state.standardRevenueSharingRule.send}
                                    />
                                </Grid>
                                <Grid item>
                               
                                
                                
                               
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    
                    <Grid item xs={12}>
                    <div className={classes.border}>
                            <Grid container>
                                <Grid item xs={12} container justify="space-between" alignItems="center">
                                    <Grid item>
                                    <Typography variant="subtitle">Branches with specific revenue sharing</Typography>
                                    </Grid>
                                    <Grid item>
                                      <Button onClick={() => this.setState({open : true})}>Add branch</Button>
                                    </Grid>
                                </Grid>

                                    <Grid container spacing={4}  style={{paddingTop: 32}} alignItems="center">
                                        {this.state.branchWithSpecificRevenue.map((d,i) => (
                                            <>
                                            
                                                <Grid item xs={2}>
                                                    {d.branchId}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {d.branchName}
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        type="number"
                                                        label="claim%"
                                                        className={classNames(classes.textField, classes.dense)}
                                                        margin="dense"
                                                        variant="outlined"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            // this.setState({
                                                            //     revenueAmount: val
                                                            // })
                                                            let {branchWithSpecificRevenue} = this.state;
                                                            branchWithSpecificRevenue[i].claim = val;
                                                            this.setState({branchWithSpecificRevenue})
                                                            



                                                        }}
                                                        value={d.claim}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        type="number"
                                                        label="send%"
                                                        className={classNames(classes.textField, classes.dense)}
                                                        margin="dense"
                                                        variant="outlined"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            
                                                            // this.setState({
                                                            //     revenueAmount: val
                                                            // })
                                                            let {branchWithSpecificRevenue} = this.state;
                                                            branchWithSpecificRevenue[i].send = val;
                                                            this.setState({branchWithSpecificRevenue})
                                                        }}
                                                        value={d.send}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={2} >
                                                   <Button onClick={() => {
                                                    let {branchWithSpecificRevenue} = this.state;
                                                    branchWithSpecificRevenue[i].claim = 0;
                                                    branchWithSpecificRevenue[i].send = 0;
                                                    this.setState({branchWithSpecificRevenue})

                                                }}> reset</Button>
                                                </Grid> */}
                                                <Grid item xs={2} >
                                                   <Button onClick={() => {
                                                    // let {branchWithSpecificRevenue} = this.state;
                                                    this.setState(prevState => ({
                                                      ...prevState,
                                                      branchWithSpecificRevenue: prevState.branchWithSpecificRevenue.filter(b => b.branchId != d.branchId)
                                                    }))

                                                }}> delete</Button>
                                                </Grid>
                                                
                                            
                                            </>
                                        ))}
                                        <Grid item xs={12}><Divider /></Grid>
                                        <Grid item xs={12} style={{textAlign: 'right'}}>
                                        <MaterialButton
                                            variant="contained"
                                            color="primary"
                                            style={{
                                            // height: '40%',
                                            marginTop: '13px',
                                            // marginLeft: '13%',
                                            }}
                                            className={classes.button}
                                            onClick={this.saveRevenueSharingRules}
                                            type="button"
                                        >
                                            Update
                                        </MaterialButton>
                                        </Grid>
                                    </Grid>
                                
                            </Grid>
                    </div>
                    </Grid>
                </Grid>
              </Grid>
              <AddBranchModal open={this.state.open} bank_id={this.state.bank_id} handleClose={() => this.setState({open : false})} getBranchDetailsFromModal={this.getBranchDetailsFromModal}/>
            </Grid>
         
    }
}

export default withStyles(styles)(RevenueRuleDistubutionPage);
