import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function horLoader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {/* <LinearProgress />
      <br /> */}
      <LinearProgress color="secondary" />
    </div>
  );
}

horLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(horLoader);