import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
  progress: {
    // margin: theme.spacing.unit * 2,
    marginLeft: '50%',
    marginTop: '25%'
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} size={200} thickness={4} position="center"/>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);