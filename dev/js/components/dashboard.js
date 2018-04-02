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

class RechartsChartComp extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const s = store.getState()
        const fireb = s.firebase.state.val
        console.log(fireb)
        console.log(s.firebase.currentView)
        return (
            <div>
                
                <h1>Your current view is {s.firebase.currentView}</h1>
                <Grid container spacing={8}>
                <Grid item xs={6}>
                <BarChart
                    width={600}
                    height={300}
                    data={fireb.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart04}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="Name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        xAxis
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        yAxis
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
                </Grid>
                <Grid item xs={6}>
                <BarChart
                    width={600}
                    height={300}
                    data={fireb.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart05}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="Name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        xAxis
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        yAxis
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
                </Grid>
                <Grid item xs={6}>
                <BarChart
                    width={600}
                    height={300}
                    data={fireb.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart07}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="Name"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        xAxis
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="Value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        yAxis
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Value" fill="#8884d8" />
                </BarChart>
                </Grid>
                </Grid>
            </div> 

        );
    }
}

const mapStateToProps = state => {
    return { 
        firebase: state.firebase.val, 
        currentView: state.firebase.state.currentView
    }
}


const Dashboard = connect(mapStateToProps)(RechartsChartComp)

export default Dashboard;