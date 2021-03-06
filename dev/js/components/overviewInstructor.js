import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import store from '../store';
import Loader from './loader';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
    barColor: {
        color: "#000"
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

class InstructorOverview extends Component {
    constructor(props) {
        super(props);
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
        // const classes = this.props;
        console.log("my props: " + this.props.classes.buttonColor)
        return (
            <div>
                <h1> Overview </h1>
                {this.props.activeLoader.showLoader ?
                    <div><Loader /></div>
                    :
                    <div>
                        <Grid container spacing={40} className="cards-container">
                            <Grid item xs={6} sm={4} xl={3}>
                                <Card className="card" align="center">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignments
                                        </div>
                                        <div className="card-sub-title">
                                            Submission behaviour accross assignments
                                        </div>
                                        <Divider />

                                        <div align="center" className="card-stat-description">
                                            <Typography variant="subheading">
                                                <strong>Latest Assignment:</strong>
                                            </Typography>
                                            <span>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Name"]}</span>
                                        </div>

                                        <div className="card-stat-description">
                                            Number of submissions:
                                        </div>
                                        <div className="card-stat">
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Current Submission"]}
                                            /
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Total Expected Submission"]}
                                        </div>

                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{ height: 20 }} className="progress-bar" variant="determinate" value={
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Current Submission"] / this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Total Expected Submission"] * 100
                                            } />
                                        </div>

                                    </CardContent>
                                    <CardActions className="cardButtonContainer">
                                        <Button
                                            onClick={() => { this.handleClick('instructorAssignmentCat') }}
                                            component={Link} to="/instructorAssignmentCat"
                                            variant="raised"
                                            size="small"
                                            className={this.buttonColor(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Current Submission"],
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Total Expected Submission"] / 2)}
                                        >
                                            {this.chooseText(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Current Submission"],
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.overallStats["Total Expected Submission"] / 2
                                            )}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={4} xl={3}>
                                <Card className="card" align="center">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignment Type
                                        </div>
                                        <div className="card-sub-title">
                                            Analysis by asssignment types
                                        </div>
                                        <Divider />
                                        <div align="center" style={{ paddingTop: "10px" }}>
                                            <Typography variant="subheading">
                                                <strong>Total submissions:</strong>
                                            </Typography>
                                        </div> <br/>
                                        <div className="card-stat">
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Total Submissions"]}
                                            /
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Expected Submissions Received"]}
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{ height: 20 }} className="progress-bar" variant="determinate" value={
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Total Submissions"] / this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Expected Submissions Received"] * 100
                                            } />
                                        </div>
                                    </CardContent>
                                    <CardActions className="cardButtonContainer">
                                        <Button
                                            onClick={() => this.handleClick('instructorAssignmentType')}
                                            component={Link} to="/instructorAssignmentType"
                                            variant="raised" 
                                            size="small"
                                            className={this.buttonColor(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Total Submissions"],
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Expected Submissions Received"] / 2
                                            )}
                                        >
                                            {this.chooseText(
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Total Submissions"],
                                                this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.overallStats["Expected Submissions Received"] / 2
                                            )}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={4} xl={3}>
                                <Card className="card">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Student Identifier
                                        </div>
                                        <div className="card-sub-title">
                                            Identify high and low performing students
                                        </div>
                                        <Divider />

                                        <div align="center">
                                            <div style={{ float: "left", width: "50%", paddingBottom: "20px" }}>
                                                <Typography variant="subheading" align="center" style={{ padding: "10px" }}>
                                                    <strong>Top</strong>
                                                </Typography>
                                                <Typography variant="subheading" align="center" >
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][1]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][2]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][3]}
                                                </Typography>
                                            </div>

                                            <div align="center" style={{ float: "right", width: "50%", paddingBottom: "20px" }}>
                                                <Typography variant="subheading" align="center" style={{ padding: "10px" }}>
                                                    <strong>Bottom </strong>
                                                </Typography>
                                                <Typography variant="subheading" align="center" >
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][1]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][2]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][3]}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardActions className="cardButtonContainer">
                                        <Button
                                            onClick={() => { this.handleClick('instructorStudentIdentifier') }}
                                            component={Link} to="/instructorStudentIdentifier"
                                            variant="raised"
                                            size="small"
                                            className={this.buttonColor(5,2)}
                                        >
                                            {this.chooseText(5, 2)}
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

InstructorOverview.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        activeLoader: state.activeLoader,
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView
    };
}

export default connect(mapStateToProps)(withStyles(styles)(InstructorOverview)); 