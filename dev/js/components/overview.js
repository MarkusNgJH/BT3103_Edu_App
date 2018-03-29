import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

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

  render(){
    return(
      <div>
      <h1> This is the Overview </h1>  
      <Grid container spacing={8}>
        <Grid item xs={6}>
            <Card>
                <CardContent>
                <Typography color="textSecondary">
                    Word of the Day
                </Typography>
                <Typography variant="headline" component="h2">
                    Metrics 1
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={6}>
            <Card>
                <CardContent>
                <Typography color="textSecondary">
                    Word of the Day
                </Typography>
                <Typography variant="headline" component="h2">
                Metrics 2
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
         <Grid item xs={6}>
            <Card>
                <CardContent>
                <Typography color="textSecondary">
                    Word of the Day
                </Typography>
                <Typography variant="headline" component="h2">
                Metrics 3
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
         </Grid>
         <Grid item xs={6}>
            <Card>
                <CardContent>
                <Typography color="textSecondary">
                    Word of the Day
                </Typography>
                <Typography variant="headline" component="h2">
                Metrics 4
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
         </Grid>
      </Grid>
      </div>  
    )
  }
}
export default GridExample