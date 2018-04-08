import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import AdministratorActivity from './administratorActivity';
import AdministratorPerformance from './administratorPerformance';
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
                                    Performance
                                </div>
                                <div className="card-sub-title">
                                    Performance of cohort
                                </div>
                                <Divider />
                                <div className="card-admin-performance-rankings">
                                Top Courses
                                <ol>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course1}</li>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course2}</li>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course3}</li>
                                </ol>
                                Bottom Courses
                                <ol>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Bottom_Course(s)"].Course1}</li>
                                </ol>
                                </div>
                                <Button
                                    onClick={() => this.handleClick('administratorPerformance')}
                                    component={Link} to="/administratorPerformance"
                                    variant="raised" size="small"
                                    color={this.chooseColor(1, 2)}> {this.chooseText(1, 2)}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} xl={3} xs={6}>
                        <Card className="card">
                            <CardContent align="center">
                                <div className="card-title">
                                    Activity
                                </div>
                                <div className="card-sub-title">
                                    Activity tracking of Achievements
                                </div>
                                <Divider />
                                <div className="card-admin-activity1">
                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.overallStats.stats03["Name"]}:<br />
                                </div>
                                <div className="card-admin-activity2">
                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.overallStats.stats03["Value"]}
                                </div>
                                <Button
                                    onClick={() => { this.handleClick('administratorActivity') }}
                                    component={Link} to="/administratorActivity"
                                    variant="raised"
                                    size="small"
                                    color={this.chooseColor(5, 2)}> {this.chooseText(5, 2)}
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

function mapStateToProps(state){
    return{
        activeLoader: state.activeLoader,
        activeProfile: state.activeProfile.val,
        firebase: state.firebase
    };
}    

export default connect(mapStateToProps)(GridExample); 