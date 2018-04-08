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
                        <Grid container spacing={40} justify="center" alignItems="stretch">
                            <Grid item xs={6} sm={4} xl={3}>
                                <Card>
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignment Type
                                        </div>
                                        <div className="card-sub-title">
                                            Analysis by different asssignment types
                                        </div>
                                        <Divider />
                                        <div className="card-stat">
                                            50/100
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
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
                                <Card>    
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Assignments
                                        </div>
                                        <div className="card-sub-title">
                                            Submission behaviour accross assignments
                                        </div>
                                        <Divider />
                                        <div className="card-stat">
                                            50/100
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
                                        </div>
                                        <Button
                                            onClick={() => { this.handleClick('instructorAssignmentCat') }}
                                            component={Link} to="/instructorAssignmentCat"
                                            variant="raised"
                                            size="small"
                                            color={this.chooseColor(5, 2)}>
                                            {this.chooseText(5, 2)}
                                        </Button>


                                        {/* <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography> */}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={4} xl={3}>
                                {/* <Card style={{ height: "525px" }}> */}
                                <Card>
                                    <CardContent align="center">
                                        <div className="card-title">
                                            Student Identifier
                                        </div>
                                        <div className="card-sub-title">
                                            Identify high and low performing students
                                        </div>
                                        <Divider />
                                        <div className="card-stat">
                                            50/100
                                        </div>
                                        <div className="card-stat-bar-container">
                                            <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
                                        </div>
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
        activeProfile: state.activeProfile
    };
}

export default connect(mapStateToProps)(GridExample); 