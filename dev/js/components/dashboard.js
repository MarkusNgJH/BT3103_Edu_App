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

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: []
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch 
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo  
        if(this.state.favourites.length == 0) {
            this.state.favourites = [{chart:"chart0"}]
        }
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
                        return (
                            chart["chart"] == "chart08" ?
                                <Grid item xs={12}>
                                    <Paper>
                                        <div style={divStyle}>
                                            <h2>Submission Per Type</h2>
                                            <p>{chart["title"]}</p>
                                            <Divider />
                                        </div>
                                        <ResponsiveContainer width="90%" height={380}>
                                            <BarChart
                                                width={730}
                                                height={250}
                                                data={chartData[index].data}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <XAxis
                                                    dataKey={chart["xAxis"]}
                                                />
                                                <YAxis
                                                    dataKey={chart["yAxis"]}
                                                    label={
                                                        <AxisLabel axisType="yAxis" width={600} height={300}>
                                                            {chart["yAxis"]}
                                                        </AxisLabel>
                                                    }
                                                />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                {chart["dataKey"].map(function (dk, index) {
                                                    return (
                                                        <Bar dataKey={dk} fill="#8884d8">
                                                            {chartData[index].data.map((entry, index) => (
                                                                <Cell
                                                                    key={entry['Name']}
                                                                    fill={entry.Value < 1 ? '#d68995' : '#71afe2'}
                                                                />
                                                            ))}
                                                        </Bar>
                                                    )
                                                })}

                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>
                                :
                                chart["chart"] == "chart09" ?
                                    <Grid item xs={6}>
                                        <Paper>
                                            <div style={divStyle}>
                                                <h2>{chart["title"]}</h2>
                                                <p>{chart["subtitle"]}</p>
                                                <Divider />
                                            </div>
                                            <ResponsiveContainer width="90%" height={380}>
                                                <BarChart
                                                    width={730}
                                                    height={250}
                                                    data={chartData[index].data}
                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <XAxis
                                                        dataKey={chart["xAxis"]}
                                                    />
                                                    <YAxis
                                                        dataKey={chart["yAxis"]}
                                                        label={
                                                            <AxisLabel axisType="yAxis" width={600} height={300}>
                                                                {chart["yAxis"]}
                                                            </AxisLabel>
                                                        }
                                                    />
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <Tooltip />
                                                    {chart["dataKey"].map(function (dk, index) {
                                                        if (dk == "plays") {
                                                            return (<Bar dataKey={dk} fill="#8884d8"></Bar>)
                                                        } else {
                                                            return (<Bar dataKey={dk} fill="#82ca9d"></Bar>)
                                                        }
                                                    })}
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Paper>
                                    </Grid>
                                    :
                                    chart["chart"] == "chart10" ?
                                        <Grid item xs={6}>
                                            <Paper>
                                                <div style={divStyle}>
                                                    {/* <h2>Chart10</h2> */}
                                                    <h2>{chart["title"]}</h2>
                                                    <p>{chart["subtitle"]}</p>
                                                    <Divider />
                                                </div>

                                                <ResponsiveContainer width="90%" height={380}>
                                                    <BarChart width={400} height={250} data={chartData[index].data}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey={chart["xAxis"]} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        {chart["dataKey"].map(function (dk, index) {
                                                            if (dk == "pauses") {
                                                                return (<Bar dataKey={dk} fill="#8884d8"></Bar>)
                                                            } else {
                                                                return (<Bar dataKey={dk} fill="#82ca9d"></Bar>)
                                                            }
                                                        })}
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </Paper>
                                        </Grid>
                                        :
                                        chart["chart"] == "chart11" ?
                                            <Grid item xs={12}>
                                                <Paper>
                                                    <div style={divStyle}>
                                                        {/* <h2>chart11</h2> */}
                                                        <h2>{chart["title"]}</h2>
                                                        <p>{chart["subtitle"]}</p>
                                                        <Divider />
                                                    </div>

                                                    <ResponsiveContainer width="90%" height={380}>
                                                        <BarChart width={730} height={250} data={chartData[index].data}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey={chart["xAxis"]} />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            {chart["dataKey"].map(function (dk, index) {
                                                                return (<Bar dataKey={dk} fill="#8884d8"></Bar>)
                                                            })}
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </Paper>
                                            </Grid>
                                        :
                                        <h2 style={{ marginLeft: "30%"}}>You have not added any charts to your Dashboard.</h2>
                        )
                    })}

                </Grid>
            </div>

        );
    }
}

// {chart["chart"] == "chart08" ?
//     <Grid item xs={12}>
//         <Paper>
//             <div style={divStyle}>
//                 <h2>Submission Per Type</h2>
//                 <p>Monitor Percentage of Submission Per Assignment Type</p>
//                 <Divider />
//             </div>
//             <ResponsiveContainer width="90%" height={380}>
//                 <BarChart
//                     width={730}
//                     height={250}
//                     data={chartData[index].data}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                     <XAxis
//                         dataKey={chart["xAxis"]}
//                     />
//                     <YAxis
//                         dataKey={chart["yAxis"]}
//                         label={
//                             <AxisLabel axisType="yAxis" width={600} height={300}>
//                                 {chart["yAxis"]}
//                             </AxisLabel>
//                         }
//                     />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Tooltip />
//                     {chart["dataKey"].map(function (dk, index) {
//                         if (index % 2 == 0) {
//                             <Bar dataKey={dk} fill="#8884d8"></Bar>
//                         } else {
//                             <Bar dataKey={dk} fill="#71afe2"></Bar>
//                         }
//                     })}
//                     {/* <Bar dataKey="Value" fill="#8884d8">
//                                                     {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data.map((entry, index) => (
//                                                         <Cell
//                                                             key={entry['Name']}
//                                                             fill={entry.Name == this.state.selectedAssignmentType ? '#87f2de' : (entry.Value < 1 ? '#d68995' : '#71afe2')}
//                                                         />
//                                                     ))}
//                                                 </Bar> */}
//                 </BarChart>
//             </ResponsiveContainer>
//         </Paper>
//     </Grid>
//     :
//     chart["chart"] == "chart09" ?
//         <div>chart09</div>
//         :
//         chart["chart"] == "chart10" ?
//             <div>chart10</div>
//             :
//             chart["chart"] == "chart10" ?
//                 <div>chart11</div>
//                 :
//                 <h2>You have not added in any charts!</h2>
// }

const mapStateToProps = state => {
    return {
        firebase: state.firebase.val,
        usersTable: state.firebase.val.usersTable.usersTable,
        activeProfile: state.activeProfile.val,
        myFavourites: state.myFavourites.favourites
    }
}

export default connect(mapStateToProps)(Dashboard);