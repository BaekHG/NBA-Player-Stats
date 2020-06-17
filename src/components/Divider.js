import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
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
