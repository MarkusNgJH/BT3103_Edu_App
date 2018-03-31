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
        this.state = {
            items: []
        }
        this.chartsArr = [];
        // var ind = 0
        // for (var key in props.newCharts) {
        //     // console.log('within loop')
        //     // console.log(key, props.newCharts[key])
        //     if (this.props.newCharts[key].style == 'recharts') {
        //     this.chartsArr[ind] = this.props.newCharts[key]
        //         ind = ind + 1
        //     }

        // }
    }

    // componentDidMount() {
    //     const rootRef = firebase.database().ref('sampleData01');
    //     rootRef.on('value', (snapshot) => {
    //         let items = snapshot.val();
    //         let newState = [];
    //         for (let item in items) {
    //             newState.push({
    //                 id: item,
    //                 level: items[item].level,
    //                 numPlayers: items[item].Players
    //             });
    //         }
    //         this.setState({
    //             items: newState
    //         });
    //     });
    //     // everytime data changes on valueRef, assign value to speed.   
    // }

    // componentWillReceiveProps(newProps) {
    //     console.log("componentWillReceiveProps")
    //     console.log(newProps)
    //     if (newProps != this.props) {
    //         this.props = newProps
    //         var ind = 0
    //         for (var key in this.props.newCharts) {
    //             if (this.props.newCharts[key].style == 'recharts') {
    //                 this.chartsArr[ind] = this.props.newCharts[key]
    //                 ind = ind + 1
    //             }
    //         }
    //     }
    // }

    render() {
        // const output = this.state.items
        return (
            <div>
                <Grid container spacing={8}>
                <Grid item xs={6}>
                <BarChart
                    width={600}
                    height={300}
                    data={this.props.firebase.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart04}
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
                    data={this.props.firebase.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart05}
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
                    data={this.props.firebase.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart07}
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
    return { firebase: state.firebase.val }
}


const Dashboard = connect(mapStateToProps)(RechartsChartComp)

export default Dashboard;