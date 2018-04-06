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

class studentAssignmentType extends React.Component {
    render() {
        const state = store.getState();
        return (
            <div>
                <h3>Chart05</h3>
                <h4>Question Type</h4>
                <Grid container spacing={8}>
                <Grid item xs={12}>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignmentType.chart05.data}
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
                        Number of Submissions
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8"/>
                </BarChart>
                </Grid>
                
                {/* <Grid item xs={12}>
                <h3>Chart06</h3>
                <h4>Which Students Appear To Be High-Achieving/Do More Than What Is Required?</h4>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="student_name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        Student
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        Number of Subsmission
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                </Grid> */}
                        
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

export default connect(mapStateToProps)(studentAssignmentType); 

