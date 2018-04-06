import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import store from '../store';
import Loader from './loader';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';

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
                    <Grid container spacing={40} justify="center" alignItems="center">
                    <Grid item xs={6} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Assignment Type
                                </Typography>
                                <Typography color="textSecondary">
                                    Analysis by different asssignment types
                                </Typography>
                                {/* <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography> */}
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => this.handleClick('instructorAssignmentType')}
                                    component={Link} to="/instructorAssignmentType"
                                    variant="raised" size="small"
                                    color={this.chooseColor(1, 2)}> {this.chooseText(1, 2)}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Assignments
                                </Typography>
                                <Typography color="textSecondary">
                                    Submission behaviour accross all assignments
                                </Typography>
                                <LinearProgress style={{height: 20}} variant="determinate" value={80} />
                                {/* <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography> */}
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => { this.handleClick('instructorAssignmentCat') }}
                                    component={Link} to="/instructorAssignmentCat"
                                    variant="raised"
                                    size="small"
                                    color={this.chooseColor(5, 2)}> {this.chooseText(5, 2)}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Student Identifier
                                </Typography>
                                <Typography color="textSecondary">
                                    Identify high- and low- performing students
                                </Typography>
                                {/* <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography> */}
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => { this.handleClick('instructorStudentIdentifier') }}
                                    component={Link} to="/instructorStudentIdentifier"
                                    variant="raised"
                                    size="small"
                                    color={this.chooseColor(5, 2)} > {this.chooseText(5, 2)}
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