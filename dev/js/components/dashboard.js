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
import Paper from 'material-ui/Paper';

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
    ResponsiveContainer
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

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: []
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch 
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo  
        this.isFav = this.isFav.bind(this);
    }

    isFav(chartName) {
        for (var i = 0; i < this.state.favourites.length; i++) {
            if (typeof (this.state.favourites[i]) == 'object') {
                if (this.state.favourites[i]["chart"] == chartName) {
                    console.log(chartName, "is in favourites");
                    return true;
                }
            }
        }
        console.log(chartName, "is NOT in favourites");
        return false;
    }

    addToFavourites(chart) {
        console.log("Adding", chart);
        this.state.favourites.push(chart)

        store.dispatch({
            type: "SET_FAV",
            payload: this.state.favourites
        })
        console.log("Successfully added", chart)
    }

    removeFromFavourites(chart) {
        console.log("Removing", chart)

        var newFav = this.state.favourites.filter(function (c) { return (c["chart"] != chart) })
        this.setState({
            favourites: newFav
        })

        store.dispatch({
            type: "SET_FAV",
            payload: newFav
        })
        console.log("Successfully removed", chart)
    }

    getChart(chartName, activeUserId, activeCourse) {
        var courses = this.props.firebase[activeUserId]
        // Scan thru each course and find the correct chart 
        for (var course in courses) {
            if (activeCourse == course) {
                for (var group in courses[activeCourse]) {
                    for (var chart in courses[activeCourse][group]) {
                        if (chartName == chart) {
                            console.log(courses[activeCourse][group][chart])
                            return courses[activeCourse][group][chart]
                        }
                    }
                }
            }
        }
    }

    render() {
        const activeUserId = this.props.activeProfile.uid
        const activeCourse = this.props.activeProfile.course
        const chartData = this.state.favourites.map((chart) => {
            return (this.getChart(chart["chart"], activeUserId, activeCourse))
        })
        console.log(chartData)
        console.log("Favourites:", this.state.favourites)

        return (
            <div>
                <h1>{this.props.usersTable[activeUserId].userDisplayName}'s Dashboard</h1>

                <Grid container spacing={24} direction="row" align="center">
                    {this.state.favourites.map(function (chart, index) {
                        {chart["chart"] == "chart08" ? 
                            <h1>Chart08</h1>
                        :
                        chart["chart"] == "chart09" ?
                            <div>chart09</div>
                        :
                        chart["chart"] == "chart10" ? 
                            <div>chart10</div>
                        :
                        chart["chart"] == "chart10" ?
                            <div>chart11</div>
                        :
                            <h2>You have not added in any charts!</h2>
                        }
                    })}

                </Grid>
                {/* <Grid container spacing={8}>
                <Grid item xs={6}>
                <BarChart
                    width={600}
                    height={300}
                    data={this.props.firebase[activeUserId].R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.HighLowPerformance.data.chart04}
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
                    <Bar dataKey="Value" fill="#8884d8" onClick={(data, index) => console.log(data, index)} />
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
                </Grid> */}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        firebase: state.firebase.val,
        usersTable: state.firebase.val.usersTable.usersTable,
        activeProfile: state.activeProfile.val,
        myFavourites: state.myFavourites.favourites
    }
}

export default connect(mapStateToProps)(Dashboard);