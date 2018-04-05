import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import RechartsComp from './RechartsChart.js';
import Grid from 'material-ui/Grid';
import store from '../store';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Delete from 'material-ui-icons/Delete';
import Stepper from './stepper';

import {
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { BarChart, Bar } from "recharts";
const AxisLabel = ({
    axisType,
    x = 0,
    y = 0,
    width,
    height,
    stroke,
    children
  }) => {
    const isVert = axisType === "yAxis";
    const cx = isVert ? x + 20 : x + width / 2;
    const cy = isVert ? height / 2 + y : y + height;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
      <text
        x={cx}
        y={cy}
        transform={`rotate(${rot})`}
        textAnchor="middle"
        stroke={stroke}
      >
        {children}
      </text>
    );
  };

class studentAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignment: "",
            favourites: [],
            steps: ["studentAssignment"],
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites
    }

    selectedAssignment(data){
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if(this.state.selectedAssignment == ""){
            this.setState({selectedAssignment: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else{
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({selectedAssignment: data.Name, steps: array })
        }
        console.log(this.state.steps)
    }

    backStep(){
        if(this.state.steps.length == 2){
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({steps: array });
            this.setState({selectedAssignment: ""})
        }
    }

    reset(){
        var array = this.state.steps;
        this.setState({steps: ["InstructorAssignment"], selectedAssignment: ""});
    }

    render() {
        const state = store.getState();
        return (
            <div>
                <Grid container spacing={8}>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid item xs={12}>
                <h3>Chart01</h3>
                <h4>Assignments completed by Student</h4>
                <PieChart
                    width={730}
                    height={250}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <Pie
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart01.data} 
                    cx="50%" cy="50%"
                    dataKey="Value" nameKey="Name" outerRadius={100} fill="#8884d8" label
                    onClick={(data, index) => this.selectedAssignment(data)}/>
                </PieChart>
                </Grid>
                {this.state.selectedAssignment ?
                <div> 
                    <Grid item xs={12}>
                <h3>Chart02</h3>
                <h4>Assignment Tracking</h4>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart02.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="Name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        Student
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        Number of Subsmission
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
                </Grid>
                </div>
                :
                <div> 
                    <Grid item xs={12}>
                <h3>Chart03</h3>
                <h4>Date of Submissison</h4>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart03.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        Student
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        Number of Days Taken
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8"/>
                </BarChart>
                </Grid>

                <Grid item xs={12}>
                <h3>Chart04</h3>
                <h4>Time Lapse Since Work Done</h4>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart04.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="Name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        Student
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        Number of Days Taken
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8"/>
                </BarChart>
                </Grid>
                </div>
                }
                 
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView
    };
}    

export default connect(mapStateToProps)(studentAssignment); 


