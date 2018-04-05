import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import store from '../store';
import OverviewInstructor from './overviewInstructor';
import OverviewAdministrator from './overviewAdministrator';
import OverviewStudent from './overviewStudent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Overview extends Component {
    render(){
        return(
            <div>
                {this.props.activeProfile.role == "Instructor" ?
                    < OverviewInstructor/>
                :
                this.props.activeProfile.role == "Administrator" ?
                    <OverviewAdministrator/>
                :
                    <OverviewStudent/>
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