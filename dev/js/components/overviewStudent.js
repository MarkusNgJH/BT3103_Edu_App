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
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary">
                                    Metrics 1
                                </Typography>
                                <Typography variant="headline" component="h2">
                                    Student Behaviour
                                </Typography>
                                <Typography color="textSecondary">
                                    See how you behave 
                                </Typography>
                                <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography>
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
                                <Typography color="textSecondary">
                                    Metrics 2
                                </Typography>
                                <Typography variant="headline" component="h2">
                                    Student Assignmnet
                                </Typography>
                                <Typography color="textSecondary">
                                    See Student Assignment
                                </Typography>
                                <Typography component="p">
                                    insert information here<br />
                                    {'"detail"'}
                                </Typography>
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
        )
    }
}
export default GridExample