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
import AddPartnerModal from './AddPartnerDialog';


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
    bid: localStorage.getItem('bankId'),
    type: this.props.bankFeeDetails.type,
    open : false,
    partneropen: false,
    ruleId: this.props.bankFeeDetails._id,
    name: this.props.bankFeeDetails.name,
    revenuePercentage: this.props.bankFeeDetails.infra_share.percentage || 0,
    revenueAmount : this.props.bankFeeDetails.infra_share.fixed || 0,
    fixed: 0,
    percentage: 0,
    standardRevenueSharingRule: {
      claim: 0,
      send: 0,
    },
    branchWithSpecificRevenue : [],
    standardPartnerRevenueSharingRule: {
      claim: 0,
      send: 0,
    },
    partnerWithSpecificRevenue : [],
    status: this.props.bankFeeDetails.status,
    token : window.localStorage.getItem("bankLogged"),
    bankBranchesTable: true,
    activetab: 'branch'
  };

  saveRevenueSharingRules = () => {
    if(this.props.revenueData) {
      axios.post(`${API_URL}/bank/interBank/updateOtherBankShares`, {
        token: this.state.token,
        rule_id: this.state.ruleId,
        other_bank_share: {
            fixed: this.state.fixed,
            percentage: this.state.percentage,
        },
      }).then(d => {
        this.setState({
          notification: 'Rule updated successfully',
          editRulesLoading: false
        });
        this.success();
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.setState({
        notification: 'Please add revenue rule first',
        editRulesLoading: false
      });
      his.error();
    }
  };

  saveRevenueSharingRulesForBranchAndPartner = () => {
    if(this.props.revenueData) {
      // this.editRxrRules(this.props.revenueData.fee._id);
      axios.post(`${API_URL}/bank/updateRevenueSharingRules`, {
        type: this.props.bankFeeDetails.type,
        bank_id: this.state.bid,
        token: this.state.token,
        revenue_sharing_rule : { 
          branch_share: this.state.standardRevenueSharingRule,
          specific_branch_share: this.state.branchWithSpecificRevenue,
          partner_share: this.state.standardPartnerRevenueSharingRule,
          specific_partner_share: this.state.partnerWithSpecificRevenue,
        },
      }).then(d => {
        this.setState({
          notification: 'Rule updated successfully',
          editRulesLoading: false
        });
        this.success();
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.setState({
        notification: 'Please add revenue rule first',
        editRulesLoading: false
      });
      his.error();
    }
  }

  componentWillReceiveProps(props) {
    const {state} = this;
    const {selectedBankFeeId, revenueData, share} = props;
    let fixed_infra = "";
    let percentage_infra = "";
    let fixed_other_bank = "";
    let percentage_other_bank = "";
    if(revenueData) {
      const infrashare = revenueData.status === 0 ? revenueData.infra_share : revenueData.infra_approval_status === 2 ? revenueData.edited.infra_share : revenueData.infra_share;
      fixed_infra = infrashare.fixed;
      percentage_infra = infrashare.percentage;
      const otherbankshare = revenueData.other_bank_share;
      fixed_other_bank = otherbankshare.fixed;
      percentage_other_bank = otherbankshare.percentage;
      console.log(otherbankshare.fixed);
      this.setState( prevState => (
        {
          ...state ,
          selectedBankFeeId,
          revenueAmount: fixed_infra,
          revenuePercentage: percentage_infra,
          fixed: fixed_other_bank,
          percentage: percentage_other_bank,
        }
      ));
    }else {
      this.setState(
        {
          ...state,
          selectedBankFeeId,
          revenueAmount: fixed_infra,
          revenuePercentage: percentage_infra,
          fixed: fixed_other_bank,
          percentage: percentage_other_bank,
        }
      );
    }
    if(share) {
      const {specific_branch_share ,branch_share, partner_share, specific_partner_share} = share;
      this.setState( prevState => (
        {
          standardRevenueSharingRule : branch_share ?  branch_share : prevState.branch_share, 
          branchWithSpecificRevenue : specific_branch_share ? specific_branch_share : prevState.specific_branch_share,
          standardPartnerRevenueSharingRule: partner_share ? partner_share : prevState.partner_share,
          partnerWithSpecificRevenue: specific_partner_share ? specific_partner_share : prevState.specific_partner_share,
        }
        ));
    }
  }


  saveRevenue = () => {
    if ((this.state.revenueAmount != "") || (this.state.revenuePercentage != "" )){
      this.createRevenueRule();
    } else {
      toast.error("Fields cannot be empty");
      console.log("Empty revenue");
    }
  }

  showRevenueRuleDistributionPage = () => {
    axios.post(`${API_URL}/getOne`, { token:this.state.token, page_id: this.props.bankFeeDetails._id, type: 'bank', page: 'interbankrule' })
    .then(d => {
      console.log(d);
      const {data} = d
      if(data.code == 1) {
        this.setState({
          revenueData: data
        })
      } else {
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
    axios.post(`${API_URL}/bank/interBank/sendShareForApproval`, {
        token: this.state.token,
        rule_id: this.state.ruleId,
        infra_share: {
            fixed: this.state.revenueAmount,
            percentage: this.state.revenuePercentage,
        },
    })
    .then(res => {
      if (res.status == 200) {
        if (res.data.error) {
          throw res.data.error;
        } else {
          this.setState(
            {
              notification: 'Rule sent for Approval',
            },
            () => {
              this.success();
              let ba = this.state.bank;
              let history = this.props.history;
              setTimeout(() =>  {
                //   history.push('/bank/fees/');
                console.log("from");
                this.props.showRevenueRuleDistributionPage({_id: this.state.selectedBankFeeId, name: this.state.name})
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
  
  getBranchDetailsFromModal = (branchDetails) => {
    if(this.state.branchWithSpecificRevenue.map(d => d.branch_code).includes(branchDetails[0].bcode)) return alert("Branch already saved")
    this.setState(prevState => ({
      ...prevState,
      branchWithSpecificRevenue: [
        ...prevState.branchWithSpecificRevenue,
        { branch_code : branchDetails[0].bcode, branch_name: branchDetails[0].name, claim : 0, send : 0 }
      ]
    }))
    this.setState({open : false});
  }

  getPartnerDetailsFromModal = (partnerDetails) => {
    if(this.state.partnerWithSpecificRevenue.map(d => d.partner_code).includes(partnerDetails[0].code)) return alert("Partner already saved")
    this.setState(prevState => ({
      ...prevState,
      partnerWithSpecificRevenue: [
        ...prevState.partnerWithSpecificRevenue,
        { partner_code : partnerDetails[0].code, partner_name: partnerDetails[0].name, claim : 0, send : 0 }
      ]
    }))
    this.setState({partneropen : false});
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
              variant="h5"
              style={{ color: 'white' }}
            >
                { "Revenue Rule Distribution ( " +this.state.name + " )"}
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
              style={{ paddingLeft: '3%' }}
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
              disabled={this.props.revenueData.infra_approval_status === 2}
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
              {this.props.revenueData.infra_approval_status === 1 ? "Update" : this.props.revenueData.infra_approval_status === 2 ? "Pending" : "Send for Approval"}
            </MaterialButton>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.border}>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle"
                      // style={{ paddingLeft: '3%', color: '#417505' }}
                    >
                      Standard Revenue Sharing With Other Banks
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Percentage%"
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => {
                        const val = e.target.value;
                        this.setState({
                          percentage: val
                        })
                      }}
                      value={this.state.percentage}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">and</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Fixed"
                      disabled={this.state.trans_type === 'Wallet to Non Wallet'}
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => {
                        const val = e.target.value;
                        this.setState({
                          fixed: val
                        })
                      }}
                        value={this.state.fixed}
                    />
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={12} style={{textAlign: 'right'}}>
                <MaterialButton
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '13px',
                  }}
                  className={classes.button}
                  onClick={this.saveRevenueSharingRules}
                  type="button"
                >
                  Update
                </MaterialButton>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid
          style={{
            margin: '2%',
            border: '1px solid #d0d6d1',
            paddingTop: '3%',
            display: `${
              this.state.type === 'IBWW' || this.state.type === 'IBWM-C' || this.state.type === 'IBWM-F' ? 'none' : 'flex'
            }`,
          }}
          container
          spacing={16}
        >
          <Grid item md={12}>
            <span
              className={`${
                this.state.activetab ===  'branch' ? 'ActiveTab' : 'InactiveTab'
              } `}
              // className={classes.bankBranches}
              onClick={() => this.setState({activetab : 'branch'})}
            >
              Bank Branches
            </span>
            <span
              className={`${
                this.state.activetab === 'partner' ? 'ActiveTab' : 'InactiveTab'
              } `}
              onClick={() => this.setState({activetab : 'partner'})}
            >
              Bank Partner
            </span>
          </Grid>
          {this.state.activetab === 'branch' ? (
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
                      disabled={this.state.type === 'IBNWW'}
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
                      disabled={this.state.type === 'IBWNW'}
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
                  <Grid item></Grid>
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
                        {d.branch_code}
                      </Grid>
                      <Grid item xs={2}>
                        {d.branch_name}
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="number"
                          label="claim%"
                          disabled={this.state.type === 'IBNWW'}
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
                          disabled={this.state.type === 'IBWNW'}
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
                        <Button 
                          onClick={() => {
                            // let {branchWithSpecificRevenue} = this.state;
                            this.setState(prevState => ({
                              ...prevState,
                              branchWithSpecificRevenue: prevState.branchWithSpecificRevenue.filter(b => b.branch_code !== d.branch_code)
                            }))
                          }}
                        >
                          delete
                        </Button>
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
                        onClick={this.saveRevenueSharingRulesForBranchAndPartner}
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
          ) : null }
          {this.state.activetab === 'partner' ? (
            <Grid container spacing={16}>
            <Grid item xs={12}>
              <div className={classes.border}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle"
                      // style={{ paddingLeft: '3%', color: '#417505' }}
                    >
                      Standard Revenue Sharing with Partners
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="claim%"
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      disabled={this.state.type === 'IBNWW'}
                      onChange={(e) => {
                        const val = e.target.value;
                          this.setState((prevState) => ({
                            standardPartnerRevenueSharingRule: {...prevState.standardPartnerRevenueSharingRule, claim: val}
                            }))
                          }}
                      value={this.state.standardPartnerRevenueSharingRule.claim}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">and</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="send%"
                      disabled={this.state.type === 'IBWNW'}
                      className={classNames(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => {
                        const val = e.target.value;
                        this.setState((prevState) => ({
                          standardPartnerRevenueSharingRule: {...prevState.standardPartnerRevenueSharingRule, send: val}
                        }))
                      }}
                        value={this.state.standardPartnerRevenueSharingRule.send}
                    />
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.border}>
                <Grid container>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="subtitle">Partners with specific revenue sharing</Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => this.setState({partneropen : true})}>Add Partner</Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}  style={{paddingTop: 32}} alignItems="center">
                    {this.state.partnerWithSpecificRevenue.map((d,i) => (
                      <>
                      <Grid item xs={2}>
                        {d.partner_code}
                      </Grid>
                      <Grid item xs={2}>
                        {d.partner_name}
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="number"
                          label="claim%"
                          disabled={this.state.type === 'IBNWW'}
                          className={classNames(classes.textField, classes.dense)}
                          margin="dense"
                          variant="outlined"
                          onChange={(e) => {
                            const val = e.target.value;
                            // this.setState({
                            //     revenueAmount: val
                            // })
                            let {partnerWithSpecificRevenue} = this.state;
                            partnerWithSpecificRevenue[i].claim = val;
                            this.setState({partnerWithSpecificRevenue})
                          }}
                            value={d.claim}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="number"
                          label="send%"
                          disabled={this.state.type === 'IBWNW'}
                          className={classNames(classes.textField, classes.dense)}
                          margin="dense"
                          variant="outlined"
                          onChange={(e) => {
                            const val = e.target.value;
                            // this.setState({
                            //     revenueAmount: val
                            // })
                            let {partnerWithSpecificRevenue} = this.state;
                            partnerWithSpecificRevenue[i].send = val;
                            this.setState({partnerWithSpecificRevenue})
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
                        <Button 
                          onClick={() => {
                            // let {branchWithSpecificRevenue} = this.state;
                            this.setState(prevState => ({
                              ...prevState,
                              partnerWithSpecificRevenue: prevState.partnerWithSpecificRevenue.filter(b => b.partner_code !== d.partner_code)
                            }))
                          }}
                        >
                          delete
                        </Button>
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
                        onClick={this.saveRevenueSharingRulesForBranchAndPartner}
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
          ) : null }
        </Grid>
        <AddBranchModal open={this.state.open} bank_id={this.state.bid} handleClose={() => this.setState({open : false})} getBranchDetailsFromModal={this.getBranchDetailsFromModal}/>
        <AddPartnerModal partneropen={this.state.partneropen} bank_id={this.state.bid} handleClose={() => this.setState({partneropen : false})} getPartnerDetailsFromModal={this.getPartnerDetailsFromModal}/>
      </Grid>
    }
}

export default withStyles(styles)(RevenueRuleDistubutionPage);
