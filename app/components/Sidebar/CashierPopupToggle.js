import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';

const dialogContentStyles = makeStyles(theme => ({
  toggleButtonGroup: {
    color: 'green',
    marginTop: '10px',
  },
  toggleButton: {
    width: '150px',
    background: '#1a841b',
    color: '#fff',
    '&:hover': {
      background: '#1a841b',
      color: '#fff',
    },
  },
  toggleButtonDisabled: {
    color: '#1a841b',
    border: '1px solid #1a841b',
  },
}));

const CashierPopupToggle = ({ handleToggleChange }) => {
  const classes = dialogContentStyles();
  const [isWallet, setIsWallet] = React.useState(false);
  const handleOnchange = (e, value) => {
    if (value === 'wallet') {
      handleToggleChange(true);
      setIsWallet(true);
    }
    if (value === 'nonWallet') {
      handleToggleChange(false);
      setIsWallet(false);
    }
  };
  return (
    <div>
      <Grid xs={12} md={12} container direction="column" alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            className={classes.toggleButtonGroup}
            size="small"
            value="center"
            onChange={handleOnchange}
            exclusive
          >
            <ToggleButton
              value="wallet"
              className={
                isWallet ? classes.toggleButton : classes.toggleButtonDisabled
              }
            >
              To Wallet
            </ToggleButton>
            <ToggleButton
              value="nonWallet"
              className={
                !isWallet ? classes.toggleButton : classes.toggleButtonDisabled
              }
            >
              To Non Wallet
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default CashierPopupToggle;
