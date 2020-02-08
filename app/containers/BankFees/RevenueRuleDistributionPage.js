import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { Grid, Typography, TextField, withStyles } from '@material-ui/core';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MaterialButton from '@material-ui/core/Button';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Wrapper from 'components/Wrapper';
import BankHeader from 'components/Header/BankHeader';
import BankSidebarTwo from 'components/Sidebar/BankSidebarTwo';
import Container from 'components/Container';
import Loader from 'components/Loader';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Table from 'components/Table';
import A from 'components/A';
import MiniPopUp from 'components/MiniPopUp';
import Row from 'components/Row';
import Col from 'components/Col';
import FormGroup from 'components/FormGroup';

import { API_URL, STATIC_URL, CURRENCY } from '../App/constants';




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
        revenuePercentage: "",
        revenueAmount : "",
        
        name : "", trans_type: "", active : "", ranges : "", bank_id: "", token: "",

        standardRevenueSharingRule: {
            claim: 0,
            send: 0,
        },

        branchWithSpecificRevenue : [
            {branchId : "branch 1", branchName: "Pranoy biswas", claim : 0, send : 0},
            {branchId : "branch 1", branchName: "Pranoy biswas", claim : 0, send : 0}
        
        ],
        token : window.localStorage.getItem("bankLogged")
    }


    saveRevenueSharingRules = () => {
        if(this.props.revenueData) {
            // this.editRxrRules(this.props.revenueData.fee._id);


            axios.post(`${API_URL}/save-revenue-sharing-rules/${this.props.revenueData.fee._id}`, {
                standardRevenueSharingRule : this.state.standardRevenueSharingRule,
                branchWithSpecificRevenue : this.state.branchWithSpecificRevenue
            }).then(d => {
                this.setState({
                    notification: 'Rules updated',
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

        }



      

        

        //find branches
        axios.post(`${API_URL}/getBranches`, {token : this.state.token}).then(d => {
            let branchWithSpecificRevenue = [];
            const {branches} = d.data;
            branchWithSpecificRevenue = branches.map(b => ({
                branchId : b.bcode, branchName: b.name, claim : 0, send : 0
            }))
            this.setState( { ...state , name, trans_type, active, bank_id,selectedBankFeeId,revenueAmount : fixed_amount, revenuePercentage: percentage,branchWithSpecificRevenue });



        }).catch(err => {
            console.log(err);
        })

        




    }

    saveRevenue = () => {

        if(this.props.revenueData) {
            this.editRrRules(this.props.revenueData.fee._id);
        }else {
            this.createRevenueRule()
        }


    }






    createRevenueRule = () => {
        this.setState({ createRulesLoading: true });
        let { name, trans_type, active, bank_id, token, revenuePercentage, revenueAmount, selectedBankFeeId } = this.state;
    
        const ranges = [{
          trans_from: 0,
          trans_to: 0,
          fixed_amount: revenuePercentage,
          percentage: revenueAmount,
        }];
    
        axios
          .post(`${API_URL}/createRules`, {
            name,
            trans_type,
            active,
            ranges,
            bank_id,
            token,
            selectedBankFeeId
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
                    setTimeout(function() {
                    //   history.push('/bank/fees/');
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
                  setTimeout(function(){
                    // history.push('/bank/fees/');
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
                  // style={{ margin: '1% 0 1% 22%', color: 'white' }}
                >
                  Revenue Rule Distribution (Fee Rule)
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
                    Send for Approval
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
                      this.state.bankBranchesTable ? 'block' : 'none'
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
                        Update
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
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <div className={classes.border}>
                            <Grid container>
                                <Grid item xs={12} container justify="space-between" alignItems="center">
                                    <Grid item>
                                    <Typography variant="body2">Branches with specific revenue sharing</Typography>
                                    </Grid>
                                    <Grid item></Grid>
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
                                                            branchWithSpecificRevenue[i].send = val;
                                                            this.setState({branchWithSpecificRevenue})
                                                        }}
                                                        value={d.send}
                                                    />
                                                </Grid>
                                                <Grid item xs={2} >
                                                   <Button onClick={() => {
                                                    let {branchWithSpecificRevenue} = this.state;
                                                    branchWithSpecificRevenue[i].claim = 0;
                                                    branchWithSpecificRevenue[i].send = 0;
                                                    this.setState({branchWithSpecificRevenue})

                                                }}> reset</Button>
                                                </Grid>
                                                
                                            
                                            </>
                                        ))}
                                    </Grid>
                                
                            </Grid>
                    </div>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
         
    }
}

export default withStyles(styles)(RevenueRuleDistubutionPage);