import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import StudentAssignment from './studentAssignment';
import StudentAssignmentType from './studentAssignmentType';
import store from '../store';
import Loader from './loader';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    buttonColorDefault: {
        color: "white",
        background: 'linear-gradient(45deg, #FFBF00 30%, #FACC2E 90%)',
    },
    buttonColorSecondary: {
        color: "white",
        background: 'linear-gradient(45deg, #FF0000 30%, #FF4000 90%)',
    }
};

class StudentOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 50);
    }

    chooseColor(val, threshold) {
        if (val > threshold) {
            return "default"
        }
        else {
            return "secondary"
        }
    }

    chooseText(val, threshold) {
        if (val > threshold) {
            return "Explore"
        }
        else {
            return "Investigate"
        }
    }

    handleClick(viewtype) {
        console.log("Updating currentView")
        store.dispatch({
            type: "SET_VIEW",
            payload: viewtype
        })
    }

    buttonColor(val, threshold) {
        if (val > threshold) {
            return this.props.classes.buttonColorDefault
        }
        else {
            return this.props.classes.buttonColorSecondary
        }
    }

    render() {
        return (
            <div>
                <h1> Overview </h1>
                {this.props.activeLoader.showLoader ?
                    <div><Loader /></div>
                    :
                    <div>
                        <Grid container spacing={8} justify="center">
                            <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                                <Card>
                                    <CardContent>
                                        <div className="card-title" align="center">
                                            Student Assignment
                                        </div>

                                        <div className="card-sub-title" align="center">
                                            Analysis of Student's Performance by Assignments
                                        </div>

                                        <Divider />
                                        <br />

                                        <div align="center">
                                            <Typography variant="headline" component="h2">
                                                Completed:
                                            </Typography>
                                        </div>

                                        <div className="card-stat" align="center">
                                            {parseFloat(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.overallStats.stats01["Value"])}%
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{ height: 20 }} className="progress-bar" variant="determinate" value={parseFloat(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.overallStats.stats01["Value"])} />
                                        </div>

                                        <div style={{ padding: 10 }}/>
                                        <Divider />

                                        <div align="center">
                                            <Typography variant="headline" component="h2">
                                                You are at the
                                            </Typography>
                                        </div>

                                        <div align="center">
                                            <span className="card-stat" style={{ margin: "0px", display: "inline-table" }}>
                                                {parseInt(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.overallStats.stats02["Value"])}
                                            </span>
                                            <span style={{ color: "#000", margin: "auto", display: "inline-table", paddingLeft:"7px" }}>Percentile</span>
                                        </div>
                                    </CardContent>
                                    <CardActions className="cardButtonContainer">
                                        <Button
                                            onClick={() => this.handleClick('StudentAssignment')}
                                            component={Link} to="/studentAssignment"
                                            variant="raised" size="small"
                                            className={this.buttonColor(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.overallStats.stats02["Value"].slice(0,-1),
                                                50
                                            )}
                                        > 
                                            {this.chooseText(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.overallStats.stats02["Value"].slice(0,-1),
                                                 50)}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

StudentOverview.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        activeLoader: state.activeLoader,
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(StudentOverview)); 