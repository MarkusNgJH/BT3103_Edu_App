import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import store from '../store';
import OverviewInstructor from './overviewInstructor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Overview extends Component {
    render(){
        return(
            <div>
                {this.props.activeProfile.role == "Administrator" ?
                    < OverviewInstructor/>
                :
                this.props.activeProfile.role == "Instructor" ?
                    "Administrator" //insert component here
                :
                    "Student" //insert component here
                }    
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return{
        firebase: state.firebase,
        activeProfile: state.activeProfile.val
    };
}    

export default connect(mapStateToProps)(Overview); 