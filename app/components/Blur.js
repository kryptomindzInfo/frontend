import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const blurStyles = makeStyles(() => ({
  featureNotAvailable: {
    width: '100%',
    height: '100%',
    filter: 'blur(.5rem)',
    cursor: 'not-allowed',
  },
}));

function Blur(props) {
  const classes = blurStyles();
  const { children, isValidFee } = props;
  return (
    <Fragment>
      <div className={!isValidFee ? classes.featureNotAvailable : ''}>
        {children}
      </div>
      <Grid
        style={{
          cursor: 'not-allowed',
          position: 'absolute',
          top: '50%',
        }}
        hidden={isValidFee}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Icon fontSize="large">error</Icon>
        <Typography variant="h4" noWrap align="center">
          This feature is not available.
        </Typography>
      </Grid>
    </Fragment>
  );
}

export default Blur;
