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
    ruleId: this.props.bankFeeDetails._id,
    name: this.props.bankFeeDetails.name,
    revenuePercentage: this.props.bankFeeDetails.infra_share.percentage || 0,
    revenueAmount : this.props.bankFeeDetails.infra_share.fixed || 0,
    fixed: 0,
    percentage: 0,
    status: this.props.bankFeeDetails.status,
    token : window.localStorage.getItem("bankLogged"),
    bankBranchesTable: true
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

  componentWillReceiveProps(props) {
    const {state} = this;
    const {selectedBankFeeId, revenueData} = props;
    let fixed_infra = "";
    let percentage_infra = "";
    let fixed_other_bank = "";
    let percentage_other_bank = "";
    console.log(revenueData);
    if(revenueData) {
      console.log(revenueData);
      const infrashare = revenueData.status === 0 ? revenueData.infra_share : revenueData.infra_approval_status === 2 ? revenueData.edited.infra_share : revenueData.infra_share;
      fixed_infra = infrashare.fixed;
      percentage_infra = infrashare.percentage;
      const otherbankshare = revenueData.other_bank_share;
      fixed_other_bank = otherbankshare.fixed;
      percentage_other_bank = otherbankshare.percentage;
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
            fixed: this.state.revenuePercentage,
            percentage: this.state.revenueAmount,
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

    axios.post(`${API_URL  }/editBankBankRule`, {
      name,
      trans_type, active, ranges, bank_id, token, rule_id,selectedBankFeeId
    })
    .then(res => {
      if(res.status == 200){
        if(res.data.error){
          throw res.data.error;
        } else {
          //console.log(res.data);
          this.setState({
            notification: 'Bank Rule Updated'
          }, () => {
            this.success();
            let ba = this.state.bank;
            let history = this.props.history;
            setTimeout(() => {
            // history.push('/bank/fees/');
              this.props.showRevenueRuleDistributionPage({trans_type,_id: selectedBankFeeId , name })
            }, 1000);
          });
        }
      } else {
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
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <div className={classes.border}>
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
              </div>
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
          </Grid>
        </Grid>
      </Grid>
    }
}

export default withStyles(styles)(RevenueRuleDistubutionPage);
