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
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <div className="card-title">
                                    Student Assignment
                                </div>
                                <div className="card-sub-title">
                                    Student Assignment
                                </div>
                                <Divider />
                                <div className="card-stat">
                                    50/100
                                </div>
                                <div className="card-stat-bar-container">
                                    <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => this.handleClick('StudentAssignment')}
                                    component={Link} to="/studentAssignment"
                                    variant="raised" size="small"
                                    color={this.chooseColor(1, 2)}> {this.chooseText(1, 2)}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <div className="card-title">
                                    Student Assignment Type
                                </div>
                                <div className="card-sub-title">
                                    Student Assignment Type
                                </div>
                                <Divider />
                                <div className="card-stat">
                                    50/100
                                </div>
                                <div className="card-stat-bar-container">
                                    <LinearProgress style={{height: 20}} className="progress-bar" variant="determinate" value={50} />
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => { this.handleClick('StudentAssignmentType') }}
                                    component={Link} to="/studentAssignmentType"
                                    variant="raised"
                                    size="small"
                                    color={this.chooseColor(5, 2)}> {this.chooseText(5, 2)}
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

function mapStateToProps(state){
    return{
        activeLoader: state.activeLoader
    };
}    

export default connect(mapStateToProps)(GridExample); 