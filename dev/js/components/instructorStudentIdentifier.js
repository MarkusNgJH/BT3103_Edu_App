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
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';


import {
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Cell
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
var divStyle = {
    padding: "1px"
  };

class instructorStudentIdentifier extends React.Component {

    topStudentSubmissions(data){
        var result = []
        // console.log('topStudentSubmissions')
        // console.log(data)
        for(var i in data){
            // console.log(data[i])
            result.push(data[i].value)
        }
        var totalStudent = result.length
        result.sort(function(a, b){return b-a})
        // console.log(result[Math.round(totalStudent/4)])
        return(result[Math.round(totalStudent/4)])
    }

    render() {
        const state = store.getState();
        return (
            <div>
                <Grid container spacing={8} direction="row" align="center">
                <Grid item xs={12}>
                <Paper>
                <div style={divStyle}>
                <h2>Student Submissions</h2>
                <p>Monitor Total Submission of Each Student</p>
                </div>
                <Divider inset />
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    // width={730}
                    // height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart12.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="student_name"
                    label={{
                        value:"Student",
                        position: "insideBottom"
                    }}
                    ticks={[0]}
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel width={40} height={380}axisType="yAxis">
                        Number of Submissions
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3498DB">
                    onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart12.data.map((entry, index) => (
                            <Cell key={entry.student_name} fill={entry.value < 20 ? '#d68995' : '#71afe2' }/>
                        ))}
                    </ Bar>
                    <ReferenceLine strokeDasharray="3 3" y={20} strokeWidth={4} stroke="#e0b13c" label={{value: "Expectation", position: "insideTop"}} />
                </BarChart>
                </ ResponsiveContainer>
                </Paper>
                </Grid>
                
                <Grid item xs={6}>
                <Paper>
                <div style={divStyle}>
                <h2> Progress of Latest Assignment </h2>
                <p>Identify Possible Achievers</p>
                <Divider inset />
                </div>
                
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    // width={730}
                    // height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="student_name"
                    label={{
                        value:"Student",
                        position: "insideBottom",
                    }
                    }
                    ticks={[0]}
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel width={40} height ={380} axisType="yAxis">
                        Number of Subsmission
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#66CDAA">
                    onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data.map((entry, index) => (
                            <Cell key={entry.student_name} fill={entry.value > this.topStudentSubmissions(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data) ? '#66CDAA' : '#3498DB' }/>
                        ))}
                    </Bar>
                    {/* {this.topStudentSubmissions(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data)} */}
                    <ReferenceLine strokeDasharray="3 3" 
                    y={this.topStudentSubmissions(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data)} 
                    strokeWidth={4} stroke="#e0b13c" label={{value: "75 Percentile", position: "insideTop"}} />
                </BarChart>
                </ResponsiveContainer>
                </Paper>
                </Grid>

                <Grid item xs={6}>
                <Paper>
                <div style={divStyle}>
                <h2>Submission Duration</h2>
                <p>Idntify Distribution of Time Taken for Submission</p>
                <Divider inset />
                </div>
                
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    // width={730}
                    // height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart14.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="student_name"
                    label={{
                        value:"Student",
                        position: "insideBottom",
                    }
                    }
                    ticks={[0]}
                    
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel width={40} height ={380} axisType="yAxis">
                        Number of Days Taken
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Bar dataKey="value" fill="#3498DB">

                    </Bar>
                </BarChart>
                </ResponsiveContainer>
                </Paper> 
                </Grid>    
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

export default connect(mapStateToProps)(instructorStudentIdentifier); 


