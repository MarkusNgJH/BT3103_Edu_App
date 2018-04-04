import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class HorizontalLinearStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    activeStep: 0
  };

  handleBack = () => {
    this.props.backStep()
  };

  handleReset = () => {
    this.props.reset()
  };

  render() {
    const { classes } = this.props;
    const steps = this.props.steps;
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props} active={true}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
            <div>
                <Button variant="raised" onClick={this.handleReset} className={classes.button}>
                    Reset
                </Button>
                <Button variant="raised" onClick={this.handleBack} className={classes.button}>
                    Back
                </Button>
            </div>
        </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinearStepper);