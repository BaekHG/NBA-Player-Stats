import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    width: '100%',
    marginTop: 70,
    marginBottom: 70,
    display: 'flex',
    justifyContent: 'center',
  },
  divider: {
    width: '30%',
    height: 3,
    backgroundColor: '#3a3636',
  },
});

const Divider = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.divider} />
  </div>
);

export default withStyles(styles)(Divider);
