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
    buttonColorDefault: {
        color: "white",
        background: 'linear-gradient(45deg, #FFBF00 30%, #FACC2E 90%)',
    },
    buttonColorSecondary: {
        color: "white",
        background: 'linear-gradient(45deg, #FF0000 30%, #FF4000 90%)',
    }
};

class AdminOverview extends Component {
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
                                <strong>Top Courses </strong>
                                <ol>
                                    {Object.keys(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"]).map((course) =>{
                                            if(course[0]=="C")
                                            return(
                                                <li> {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"][course] }</li>
                                            )}
                                    )}
                                    {/* <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course1}</li>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course2}</li>
                                    <li>{this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Top_Course(s)"].Course3}</li> */}
                                </ol>
                                <strong> Bottom Courses </strong>
                                <ol>
                                    {Object.keys(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Bottom_Course(s)"]).map((course) =>{
                                            if(course[0]=="C")
                                            return(
                                                <li> {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats03["Bottom_Course(s)"][course] }</li>
                                            )}
                                    )}
                                </ol>
                                </div>
                                <Button
                                    onClick={() => this.handleClick('administratorPerformance')}
                                    component={Link} to="/administratorPerformance"
                                    variant="raised" 
                                    size="small"
                                    className={this.buttonColor(
                                        this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats02["Value"].slice(0,-1),
                                        50
                                    )}
                                > 
                                    {this.chooseText(
                                        this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.overallStats.stats02["Value"].slice(0,-1),
                                        50
                                    )}
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
                                <div style={{paddingTop: "50px"}}>
                                    <div className="card-admin-activity1">
                                        <strong>
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.overallStats.stats04["Name"]}:<br />
                                        </strong>
                                    </div>
                                    <div className="card-admin-activity2">
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.overallStats.stats04["Value"]}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => { this.handleClick('administratorActivity') }}
                                    component={Link} to="/administratorActivity"
                                    variant="raised"
                                    size="small"
                                    className={this.buttonColor(5,2)}
                                > 
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

AdminOverview.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        activeLoader: state.activeLoader,
        activeProfile: state.activeProfile.val,
        firebase: state.firebase
    };
}    

export default connect(mapStateToProps)(withStyles(styles)(AdminOverview)); 