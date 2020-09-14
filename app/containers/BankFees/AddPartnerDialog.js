import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { API_URL } from '../App/constants';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class AddPartnerDialog extends React.Component {
  state = {
    open: false,
    branchId: '',
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onFetchClick = () => {
    const { partnerCode } = this.state;
    axios
      .post(`${API_URL}/getPartner/${partnerCode}`, {
        bank_id: this.props.bank_id,
      })
      .then(d => {
        const { data } = d;
        if (data.status == 0) return alert('Partner not found');

        this.props.getPartnerDetailsFromModal(data.partner);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.partneropen}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.handleClose}
          >
            Please enter Parter Code
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label="Partner code"
              style={{ width: 300 }}
              value={this.state.partnerCode}
              onChange={e => {
                const val = e.target.value;
                this.setState({ partnerCode: val });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onFetchClick} color="primary">
              fetch partner details
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddPartnerDialog;
