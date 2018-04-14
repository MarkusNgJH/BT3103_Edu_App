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
    }
};

class GridExample extends Component {
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1> Overview </h1>
                {this.props.activeLoader.showLoader ?
                    <div><Loader /></div>
                    :
                    <div>
                        <Grid container spacing={40} justify="center">
                            <Grid item xs={6} sm={4} xl={3}>
                                <Card className="card">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignments
                                        </div>
                                        <div className="card-sub-title">
                                            Submission behaviour accross assignments
                                        </div>
                                        <Divider />
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
                                        <Button
                                            onClick={() => { this.handleClick('instructorAssignmentCat') }}
                                            component={Link} to="/instructorAssignmentCat"
                                            variant="raised"
                                            size="small"
                                            color={this.chooseColor(5, 2)}>
                                            {this.chooseText(5, 2)}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={4} xl={3}>
                                <Card className="card">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignment Type
                                        </div>
                                        <div className="card-sub-title">
                                            Analysis by asssignment types
                                        </div>
                                        <Divider />
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
                                        <Button
                                            onClick={() => this.handleClick('instructorAssignmentType')}
                                            component={Link} to="/instructorAssignmentType"
                                            variant="raised" size="small"
                                            color={this.chooseColor(1, 2)}>
                                            {this.chooseText(1, 2)}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={4} xl={3}>
                                {/* <Card style={{ height: "525px" }}> */}
                                <Card className="card">
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Student Identifier
                                        </div>
                                        <div className="card-sub-title">
                                            Identify high and low performing students
                                        </div>
                                        <div style={{ paddingTop: "15px", paddingBottom: "25px", paddingLeft: "auto", paddingRigh: "auto" }}>

                                            <Divider />
                                            <div style={{ float: "left", width: "50%" }}>
                                                <Typography variant="subheading" align="left" style={{ padding: "5px" }}>
                                                    <strong>Top </strong>
                                                </Typography>
                                                <Typography variant="subheading" align="left" >
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][1]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][2]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Top"][3]}
                                                </Typography>
                                            </div>

                                            <div align="left" style={{ float: "left", width: "50%", paddingBottom: "20px" }}>
                                                <Typography variant="subheading" align="left" style={{ padding: "5px" }}>
                                                    <strong>Bottom </strong>
                                                </Typography>
                                                <Typography variant="subheading" align="left" >
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][1]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][2]}
                                                    <br />
                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.overallStats["Bottom"][3]}
                                                </Typography>
                                            </div>
                                        </div>


                                        {/* <div className="card-stat">
                                            50/100
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
                                        </div> */}
                                        {/* <div align="center">
                                            <List>
                                                <ListItem style={{ padding: '10px', margin: '0px', textAlign: "center" }}>
                                                    <ListItemText primary="Chart01" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: '10px', margin: '0px', textAlign: "center" }}>
                                                    <ListItemText primary="Chart02" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: '10px', margin: '0px', textAlign: "center" }}>
                                                    <ListItemText primary="Chart03" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: '10px', margin: '0px', textAlign: "center" }}>
                                                    <ListItemText primary="Chart04" />
                                                </ListItem>
                                            </List>
                                        </div> */}

                                        <Button
                                            onClick={() => { this.handleClick('instructorStudentIdentifier') }}
                                            component={Link} to="/instructorStudentIdentifier"
                                            variant="raised"
                                            size="small"
                                            color={this.chooseColor(5, 2)}>
                                            {this.chooseText(5, 2)}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeLoader: state.activeLoader,
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView
    };
}

export default connect(mapStateToProps)(GridExample); 