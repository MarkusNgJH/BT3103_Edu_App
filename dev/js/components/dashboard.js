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
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';

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
    Cell,
    ReferenceLine,
    AreaChart,
    Area
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
            favourites: [],
            selectedAssignment: ""
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch 
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo  
        if (this.state.favourites.length == 0) {
            this.state.favourites = [{ chart: "chart0" }]
        }
    }

    getChart(chartName, activeUserId, activeCourse, drilldownName = "", ddparam = "") {
        var courses = this.props.firebase[activeUserId]
        var chartDD = ["chart02DD", "chart03DD", "chart08DD", "chart10DD"]
        // Scan thru each course and find the correct chart 
        for (var course in courses) { // course = BT3103 
            if (activeCourse == course) {
                for (var card in courses[activeCourse]) { // card = instructorAssignmentType 
                    for (var chart in courses[activeCourse][card]) { // chart = chart08
                        if (chartName.slice(0, 7) == chart || chartName == chart) {
                            if (chartName.indexOf("DD") != -1) { // chartXXDD or chartXXDDAdd charts
                                for (var drilldown in courses[activeCourse][card][chart].drillDowns) { // CodeCombat_Problems, PathProblem, Profile, Text
                                    console.log("DD is " + drilldown)
                                    if ((drilldownName == drilldown) || (ddparam == drilldown)) { // chartXXDDAdd charts or chartXXDD charts
                                        console.log(chartName.slice(-3))
                                        return courses[activeCourse][card][chart].drillDowns
                                    }
                                }

                            } else { // normal or prediction charts 
                                console.log(chartName + " Not a drilldown chart!~~")
                                if (chartName == chart) {
                                    return courses[activeCourse][card][chart]
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    topStudentSubmissions(data) {
        var result = []
        for (var i in data) {
            result.push(data[i].value)
        }
        var totalStudent = result.length
        result.sort(function (a, b) { return b - a })
        return (result[Math.round(totalStudent / 4)])
    }

    selectedAssignment(data) {
        this.setState({ selectedAssignment: data.assignment })
    }

    maxCount(val, arr) {
        var max = val;
        arr.map(function (entry, index) {
            if (entry.Value > max) {
                max = entry.Value
            }
        })

        if (max == val) {
            return true
        } else {
            return false
        }
    }

    render() {
        const activeUserId = this.props.activeProfile.uid
        const activeCourse = this.props.activeProfile.course
        const chartData = this.state.favourites.map((chart) => {
            return (this.getChart(chart["chart"], activeUserId, activeCourse, chart["drilldown"], chart["ddparam1"]))
        })
        console.log(chartData)
        console.log("Favourites:", this.state.favourites)
        const comp = this;

        return (
            <div>
                <h1>{this.props.firebase[this.props.activeProfile.uid][this.props.activeProfile.course].displayName}'s Dashboard</h1>

                <Grid container spacing={24} direction="row" align="center">

                    {this.props.activeProfile.role == "Instructor" ?
                        this.state.favourites.map(function (chart, index) {
                            return (
                                // Start of AssignmentType charts 08-11
                                chart["chart"] == "chart08" ?
                                    <Grid item xs={12} sm={9} md={6}>
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
                                                        label={{ value: "Submission Rate (%)", angle: -90, position: "insideBottomLeft" }}
                                                        tickFormatter={(tick) => { return (tick * 100) }} />
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <Tooltip />
                                                    {chart["dataKey"].map(function (dk, index2) {
                                                        return (
                                                            <Bar key={index2} dataKey={dk} fill="#8884d8">
                                                                {chartData[index].data.map((entry, index3) => (
                                                                    <Cell
                                                                        key={entry['Name']}
                                                                        fill={entry.Value * 100 < 100 ? '#d68995' : '#71afe2'}
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
                                                        <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <Tooltip />
                                                        {chart["dataKey"].map(function (dk, index2) {
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
                                                            {chart["dataKey"].map(function (dk, index2) {
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
                                                                {chart["dataKey"].map(function (dk, index2) {
                                                                    return (<Bar dataKey={dk} fill="#8884d8"></Bar>)
                                                                })}
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </Paper>
                                                </Grid>
                                                // End of AssignmentType charts 
                                                :
                                                // START of AssignmentCat charts 01-07
                                                chart["chart"] == "chart01" ?
                                                    <Grid item xs={12}>
                                                        <Paper>
                                                            <div style={divStyle}>
                                                                <h2>{chart["title"]}</h2>
                                                                <p>{chart["subtitle"]}</p>
                                                                <Divider />
                                                            </div>
                                                            <ResponsiveContainer width="90%" height={380}>
                                                                <BarChart
                                                                    width={730} height={250}
                                                                    data={chartData[index].data}
                                                                >
                                                                    <XAxis
                                                                        dataKey={chart["xAxis"]}
                                                                        label={{ value: "Assignments", position: "insideBottom" }}
                                                                        ticks={[0]}
                                                                    />
                                                                    <YAxis
                                                                        dataKey={chart["yAxis"]}
                                                                        label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                    />

                                                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.1 }} />
                                                                    <Legend verticalAlign="top" align="right" />
                                                                    {chart["dataKey"].map(function (dk, index2) {
                                                                        return (
                                                                            <Bar name="Number of Submissions" dataKey={dk}>
                                                                                {chartData[index].data.map((entry, index3) => (
                                                                                    <Cell
                                                                                        key={entry.assignment}
                                                                                        fill={entry.value < 20 ? '#d68995' : '#71afe2'}
                                                                                    />
                                                                                ))}
                                                                            </Bar>
                                                                        )
                                                                    })}
                                                                    <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expected Submissions", position: "top" }} />
                                                                </BarChart>
                                                            </ResponsiveContainer>
                                                        </Paper>
                                                    </Grid>
                                                    :
                                                    chart["chart"] == "chart02" ?
                                                        <Grid item xs={6}>
                                                            <Paper>
                                                                <div>
                                                                    <div style={divStyle}>
                                                                        <h2>{chart["title"]}</h2>
                                                                        <p>{chart["subtitle"]}</p>
                                                                        <Divider />
                                                                    </div>
                                                                    <ResponsiveContainer width="90%" height={280}>
                                                                        <BarChart
                                                                            width={730} height={250}
                                                                            data={chartData[index].data}
                                                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                        >
                                                                            <XAxis
                                                                                dataKey={chart["xAxis"]}
                                                                                label={{ value: "Number of Days Elapsed", position: 'insideBottom', offset: -2 }}

                                                                            />
                                                                            <YAxis
                                                                                dataKey={chart["yAxis"]}
                                                                                label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                            />

                                                                            <Tooltip cursor={{ fill: 'red', fillOpacity: 0.05 }} />
                                                                            <Legend verticalAlign="top" align="right" />

                                                                            {chart["dataKey"].map(function (dk, index2) {
                                                                                return (
                                                                                    <Bar name="Number of Submissions" dataKey={dk} fill="#8884d8">
                                                                                    </Bar>
                                                                                )
                                                                            })}

                                                                        </BarChart>
                                                                    </ResponsiveContainer>
                                                                </div>
                                                            </Paper>
                                                        </Grid>
                                                        :
                                                        chart["chart"] == "chart03" ?
                                                            <Grid item xs={6}>
                                                                <Paper>
                                                                    <div>
                                                                        <div style={divStyle}>
                                                                            <h2>{chart["title"]}</h2>
                                                                            <p>{chart["subtitle"]}</p>
                                                                            <Divider />
                                                                        </div>
                                                                        <ResponsiveContainer width="90%" height={280}>
                                                                            <AreaChart width={730} height={250}
                                                                                data={chartData[index].data}
                                                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                                                <defs>
                                                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                                    </linearGradient>
                                                                                </defs>
                                                                                <XAxis label={{ value: "Date" }} dataKey={chart["xAxis"]} tick={false} />
                                                                                <YAxis label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                                                                <Legend verticalAlign="top" align="right" />
                                                                                <Tooltip />

                                                                                {chart["dataKey"].map(function (dk, index2) {
                                                                                    return (
                                                                                        <Area name="Number of Submissions" type="monotone" dataKey={dk} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                                                                    )
                                                                                })}

                                                                            </AreaChart>
                                                                        </ResponsiveContainer>
                                                                    </div>
                                                                </Paper>
                                                            </Grid>
                                                            :
                                                            chart["chart"] == "chart04" ?
                                                                <Grid item xs={6}>
                                                                    <Paper>
                                                                        <div>
                                                                            <div style={divStyle}>
                                                                                <h2>{chart["title"]}</h2>
                                                                                <p>{chart["subtitle"]}</p>
                                                                                <Divider />

                                                                            </div>
                                                                            <ResponsiveContainer width="90%" height={280}>
                                                                                <BarChart
                                                                                    width={730} height={250}
                                                                                    data={chartData["index"].data}
                                                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                >
                                                                                    <XAxis
                                                                                        dataKey={chart["xAxis"]}
                                                                                        label={{ value: "Number of Days Elapsed", position: 'insideBottom', offset: -4 }}
                                                                                    />
                                                                                    <YAxis
                                                                                        dataKey={chart["yAxis"]}
                                                                                        label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                                    />

                                                                                    <Tooltip />
                                                                                    <Legend verticalAlign="top" align="right" />
                                                                                    {chart["dataKey"].map(function (dk, index2) {
                                                                                        return (
                                                                                            <Bar name="Number of Days Elapsed" dataKey={dk} fill="#8884d8">
                                                                                            </Bar>
                                                                                        )
                                                                                    })}
                                                                                </BarChart>
                                                                            </ResponsiveContainer>
                                                                        </div>
                                                                    </Paper>
                                                                </Grid>
                                                                :
                                                                chart["chart"] == "chart06" ?
                                                                    <Grid item xs={6}>
                                                                        <Paper>
                                                                            <div>
                                                                                <div style={divStyle}>
                                                                                    <h2>{chart["title"]}</h2>
                                                                                    <p>{chart["subtitle"]}</p>
                                                                                    <Divider />
                                                                                </div>
                                                                                <ResponsiveContainer width="90%" height={280}>
                                                                                    <AreaChart width={730} height={250}
                                                                                        data={chartData[index].data}
                                                                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                                                        <defs>
                                                                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                                            </linearGradient>
                                                                                        </defs>
                                                                                        <XAxis label={{ value: "Date" }} dataKey={chart["xAxis"]} tick={false} />
                                                                                        <YAxis name="Date" label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                                                                        <Legend verticalAlign="top" align="right" />
                                                                                        <Tooltip />

                                                                                        {chart["dataKey"].map(function (dk, index2) {
                                                                                            return (
                                                                                                <Area name="Number of Submissions" type="monotone" dataKey={dk} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                                                                            )
                                                                                        })}

                                                                                    </AreaChart>
                                                                                </ResponsiveContainer>
                                                                            </div>
                                                                        </Paper>
                                                                    </Grid>
                                                                    :
                                                                    chart["chart"] == "chart05" ?
                                                                        <Grid item xs={6}>
                                                                            <Paper>
                                                                                <div>
                                                                                    <div style={divStyle}>
                                                                                        <h2>{chart["title"]}</h2>
                                                                                        <p>{chart["subtitle"]}</p>
                                                                                        <Divider />
                                                                                    </div>
                                                                                    <ResponsiveContainer width="90%" height={280}>
                                                                                        <BarChart
                                                                                            width={730} height={250}
                                                                                            data={chartData[index].data}
                                                                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                        >
                                                                                            <XAxis
                                                                                                dataKey={chart["xAxis"]}
                                                                                                label={"Number of Days Elapsed"}
                                                                                            />
                                                                                            <YAxis
                                                                                                dataKey={chart["yAxis"]}
                                                                                                label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                                            />
                                                                                            <Tooltip />
                                                                                            <Legend verticalAlign="top" align="right" />
                                                                                            {chart["dataKey"].map(function (dk, index2) {
                                                                                                return (
                                                                                                    <Bar name="Number of Days Elapsed" dataKey={dk} fill="#8884d8" />
                                                                                                )
                                                                                            })}
                                                                                        </BarChart>
                                                                                    </ResponsiveContainer>
                                                                                </div>
                                                                            </Paper>
                                                                        </Grid>
                                                                        :
                                                                        chart["chart"] == "chart07" ?
                                                                            <Grid item xs={6}>
                                                                                <Paper>
                                                                                    <div>
                                                                                        <div style={divStyle}>
                                                                                            <h2>{chart["title"]}</h2>
                                                                                            <p>{chart["subtitle"]}</p>
                                                                                            <Divider />
                                                                                        </div>
                                                                                        <ResponsiveContainer width="90%" height={280}>
                                                                                            <AreaChart width={730} height={250}
                                                                                                data={chartData[index].data}
                                                                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                                                                <defs>
                                                                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                                                    </linearGradient>
                                                                                                </defs>
                                                                                                <XAxis label={{ value: "Date" }} dataKey={chart["xAxis"]} tick={false} />
                                                                                                <YAxis label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft", offset: 12 }} />

                                                                                                <Tooltip />
                                                                                                <Legend verticalAlign="top" align="right" />
                                                                                                {chart["dataKey"].map(function (dk, index2) {
                                                                                                    return (
                                                                                                        <Area name="Number of Submissions" type="monotone" dataKey={dk} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                                                                                    )
                                                                                                })}
                                                                                            </AreaChart>
                                                                                        </ResponsiveContainer>
                                                                                    </div>
                                                                                </Paper>
                                                                            </Grid>
                                                                            // End of AssignmentCat charts 
                                                                            :
                                                                            // Start of StudentIdentifier charts 12-14
                                                                            chart["chart"] == "chart12" ?
                                                                                <Grid item xs={12}>
                                                                                    <Paper>
                                                                                        <div style={divStyle}>
                                                                                            <h2>{chart["title"]}</h2>
                                                                                            <p>{chart["subtitle"]}</p>
                                                                                        </div>
                                                                                        <Divider />
                                                                                        <ResponsiveContainer width="90%" height={380}>
                                                                                            <BarChart
                                                                                                // width={730}
                                                                                                // height={250}
                                                                                                data={chartData[index].data}
                                                                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                            >
                                                                                                <XAxis
                                                                                                    dataKey={chart["xAxis"]}
                                                                                                    label={{ value: "Student", position: "insideBottom" }}
                                                                                                    ticks={[0]}
                                                                                                />
                                                                                                <YAxis
                                                                                                    dataKey="value"
                                                                                                    label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                                                />

                                                                                                <Tooltip />
                                                                                                {chart["dataKey"].map(function (dk, index2) {
                                                                                                    return (
                                                                                                        <Bar name="Number of Submissions" dataKey="value" fill="#3498DB">
                                                                                                            {chartData[index].data.map((entry, index3) => (
                                                                                                                <Cell key={entry.student_name} fill={entry.value < 20 ? '#d68995' : '#71afe2'} />
                                                                                                            ))}
                                                                                                        </ Bar>
                                                                                                    )
                                                                                                })}
                                                                                                <ReferenceLine strokeDasharray="3 3" y={20} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expectation", position: "insideTop" }} />
                                                                                                <Legend verticalAlign="top" align="right" />
                                                                                            </BarChart>
                                                                                        </ ResponsiveContainer>
                                                                                    </Paper>
                                                                                </Grid>
                                                                                :
                                                                                chart["chart"] == "chart13" ?
                                                                                    <Grid item xs={6}>
                                                                                        <Paper>
                                                                                            <div style={divStyle}>
                                                                                                <h2>{chart["title"]}</h2>
                                                                                                <p>{chart["subtitle"]}</p>
                                                                                                <Divider />
                                                                                            </div>

                                                                                            <ResponsiveContainer width="90%" height={380}>
                                                                                                <BarChart
                                                                                                    // width={730}
                                                                                                    // height={250}
                                                                                                    data={chartData[index].data}
                                                                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                                >
                                                                                                    <XAxis
                                                                                                        dataKey={chart["xAxis"]}
                                                                                                        label={{
                                                                                                            value: "Student",
                                                                                                            position: "insideBottom",
                                                                                                        }
                                                                                                        }
                                                                                                        ticks={[0]}
                                                                                                    />
                                                                                                    <YAxis
                                                                                                        dataKey={chart["yAxis"]}
                                                                                                        label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                                                                                    />

                                                                                                    <Tooltip />

                                                                                                    {chart["dataKey"].map(function (dk, index2) {
                                                                                                        return (
                                                                                                            <Bar name="Number of Submissions" dataKey={dk} fill="#66CDAA">
                                                                                                                {chartData[index].data.map((entry, index3) => (
                                                                                                                    <Cell key={entry.student_name} fill={entry.value > comp.topStudentSubmissions(chartData[index].data) ? '#66CDAA' : '#3498DB'} />
                                                                                                                ))}
                                                                                                            </Bar>
                                                                                                        )
                                                                                                    })}

                                                                                                    <ReferenceLine strokeDasharray="3 3"
                                                                                                        y={comp.topStudentSubmissions(chartData[index].data)}
                                                                                                        strokeWidth={4} stroke="#e0b13c" label={{ value: "75 Percentile", position: "insideTop" }} />

                                                                                                    <Legend verticalAlign="top" align="right" />
                                                                                                </BarChart>
                                                                                            </ResponsiveContainer>
                                                                                        </Paper>
                                                                                    </Grid>
                                                                                    :
                                                                                    chart["chart"] == "chart14" ?
                                                                                        <Grid item xs={6}>
                                                                                            <Paper>
                                                                                                <div style={divStyle}>
                                                                                                    <h2>{chart["title"]}</h2>
                                                                                                    <p>{chart["subtitle"]}</p>
                                                                                                    <Divider />
                                                                                                </div>

                                                                                                <ResponsiveContainer width="90%" height={380}>
                                                                                                    <BarChart
                                                                                                        data={chartData[index].data}
                                                                                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                                    >
                                                                                                        <XAxis
                                                                                                            dataKey={chart["xAxis"]}
                                                                                                            label={{
                                                                                                                value: "Student",
                                                                                                                position: "insideBottom",
                                                                                                            }
                                                                                                            }
                                                                                                            ticks={[0]}

                                                                                                        />
                                                                                                        <YAxis
                                                                                                            dataKey={chart["yAxis"]}
                                                                                                            label={{ value: "Number of Days", angle: -90, position: "insideBottomLeft" }}
                                                                                                        />

                                                                                                        <Tooltip />

                                                                                                        {chart["dataKey"].map(function (dk, index2) {
                                                                                                            return (
                                                                                                                <Bar name="Number of Days Taken" dataKey={dk} fill="#3498DB">
                                                                                                                </Bar>
                                                                                                            )
                                                                                                        })}

                                                                                                        <Legend verticalAlign="top" align="right" />
                                                                                                    </BarChart>
                                                                                                </ResponsiveContainer>
                                                                                            </Paper>
                                                                                        </Grid>
                                                                                        :
                                                                                        chart["chart"] == "chart08DD" ?
                                                                                            <Grid item xs={6}>
                                                                                                <Paper>
                                                                                                    <div style={divStyle}>
                                                                                                        <h2>{chart["title"]}</h2>
                                                                                                        <p>{chart["subtitle"]}</p>
                                                                                                        <Divider />
                                                                                                    </div>

                                                                                                    <ResponsiveContainer width="85%" height={280}>
                                                                                                        <BarChart width={400} height={250} data={chartData[index][chart["drilldown"]].data}>
                                                                                                            <XAxis dataKey={chart["xAxis"]} tick={false} label={{ value: "Assignments" }} />/>
                                                                                                            <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                                                                                            <Tooltip />
                                                                                                            <Legend verticalAlign="top" align="right" />
                                                                                                            <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expected Submissions", position: "top" }} />
                                                                                                            {chart["dataKey"].map(function (dk, index2) {
                                                                                                                return (
                                                                                                                    <Bar key={index2} name="Num of Submission" dataKey={dk} fill="#8884d8" onClick={(data, index3) => comp.selectedAssignment(data)}>
                                                                                                                        {chartData[index][chart["drilldown"]].data.map((entry, index4) => (
                                                                                                                            <Cell
                                                                                                                                key={entry['assignment']}
                                                                                                                                fill={entry.assignment == comp.state.selectedAssignment ? '#87f2de' : (entry.value < entry.expected ? '#d68995' : '#71afe2')}
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
                                                                                            chart["chart"] == "chart08DDAdd" ?
                                                                                                <Grid item xs={6}>
                                                                                                    <Paper>
                                                                                                        <div style={divStyle}>
                                                                                                            <h2>{chart["title"]}</h2>
                                                                                                            <p>{chart["subtitle"]}</p>
                                                                                                            <Divider />
                                                                                                        </div>

                                                                                                        <ResponsiveContainer width="85%" height={280}>
                                                                                                            <div align="center" style={{ height: "inherit", width: "auto" }}>

                                                                                                                <div style={{ width: "90%", height: "inherit" }}>
                                                                                                                    <Typography variant="subheading" style={{ backgroundColor: "orange" }}>
                                                                                                                        <strong>Uncompleted</strong>
                                                                                                                    </Typography>

                                                                                                                    {chartData[index][chart["drilldown"]].additionalData.map(function (entry, index2) {
                                                                                                                        if (entry.assignment == chart["ddparam1"]) {
                                                                                                                            if (entry.value == "All submitted") {
                                                                                                                                return (
                                                                                                                                    <div>
                                                                                                                                        <h2>All submitted {chart["ddparam1"]}</h2>
                                                                                                                                    </div>
                                                                                                                                )

                                                                                                                            } else {
                                                                                                                                var res = entry.value.split(", ")
                                                                                                                                return (
                                                                                                                                    <ol style={{ margin: "0", height: "80%", overflow: "auto" }}>
                                                                                                                                        {res.map(function (name, index3) {
                                                                                                                                            console.log(name)
                                                                                                                                            return (
                                                                                                                                                <li style={{ margin: "10px" }}>{name}</li>
                                                                                                                                            )
                                                                                                                                        })}
                                                                                                                                    </ol>
                                                                                                                                )
                                                                                                                            }
                                                                                                                        }
                                                                                                                    })}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </ResponsiveContainer>
                                                                                                    </Paper>
                                                                                                </Grid>
                                                                                                :
                                                                                                chart["chart"] == "prediction" ?
                                                                                                    <Grid item xs={12}>
                                                                                                        <Paper>
                                                                                                            <div style={divStyle}>
                                                                                                                <h2>{chart["title"]}</h2>
                                                                                                                <p>{chart["subtitle"]}</p>
                                                                                                                <Divider />
                                                                                                            </div>

                                                                                                            <ResponsiveContainer width="85%" height={280}>
                                                                                                                <BarChart
                                                                                                                    width={730} height={250}
                                                                                                                    data={chartData[index].data}
                                                                                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                                                >
                                                                                                                    <XAxis
                                                                                                                        dataKey={chart["xAxis"]}
                                                                                                                        label={{ value: "Students", position: "insideBottom" }}
                                                                                                                        ticks={[0]}
                                                                                                                    />
                                                                                                                    <YAxis
                                                                                                                        dataKey={chart["yAxis"]}
                                                                                                                        label={{ value: "Number of Days to Submit", angle: -90, position: "insideBottomLeft" }}
                                                                                                                    />

                                                                                                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.1 }} />

                                                                                                                    {chart["dataKey"].map(function (dk, index2) {
                                                                                                                        return (
                                                                                                                            <Bar name="Number of Days to Submit" dataKey={dk}
                                                                                                                                onClick={(data, index3) => comp.selectedAssignment(data)}>
                                                                                                                                {chartData[index].data.map((entry, index4) => (
                                                                                                                                    <Cell
                                                                                                                                        key={entry.assignment}
                                                                                                                                        fill={entry.value > 5 ? '#d68995' : '#71afe2'}
                                                                                                                                    />
                                                                                                                                ))}
                                                                                                                            </Bar>
                                                                                                                        )
                                                                                                                    })}
                                                                                                                    <ReferenceLine y={5} strokeWidth={4} stroke="#e0b13c" strokeDasharray="3 3" label={{ value: "Expected Submissions", position: "top" }} />
                                                                                                                </BarChart>
                                                                                                            </ResponsiveContainer>
                                                                                                        </Paper>
                                                                                                    </Grid>
                                                                                                    :
                                                                                                    chart["chart"] == "chart10DD" ?
                                                                                                        <Grid item xs={6}>
                                                                                                            <Paper>
                                                                                                                <div style={divStyle}>
                                                                                                                    <h2>{chart["title"]}</h2>
                                                                                                                    <p>{chart["subtitle"]}</p>
                                                                                                                    <Divider />
                                                                                                                </div>

                                                                                                                <ResponsiveContainer width="85%" height={280}>
                                                                                                                    <BarChart width={400} height={250}
                                                                                                                        data={chartData[index][chart["ddparam1"]]}>
                                                                                                                        <XAxis dataKey={chart["xAxis"]} tick={false} label={{ value: "Time into video" }} />/>
                                                                                                                        <YAxis label={{ value: "Number of pauses", angle: -90, position: "insideBottomLeft", offset: 18 }} />
                                                                                                                        <Tooltip />
                                                                                                                        <Legend verticalAlign="top" align="right" />
                                                                                                                        {chart["dataKey"].map(function (dk, index2) {
                                                                                                                            return (
                                                                                                                                <Bar name="# of pauses" fill="#71afe2" dataKey={dk}>
                                                                                                                                    {chartData[index][chart["ddparam1"]].map((entry, index4) => (
                                                                                                                                        <Cell
                                                                                                                                            key={entry.Name}
                                                                                                                                            fill={comp.maxCount(entry.Value, chartData[index][chart["ddparam1"]]) == true ? '#d68995' : '#71afe2'}
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
                                                                                                        chart["chart"] == "chart01DD1" ?
                                                                                                            <Grid item xs={6}>
                                                                                                                <Paper>
                                                                                                                    <div style={divStyle}>
                                                                                                                        <div className="chartTopRow">
                                                                                                                            <div className="blank" />
                                                                                                                            <div className="chartTitleSubtitle">
                                                                                                                                <h2>{chart["title"]}</h2>
                                                                                                                                <p>{chart["subtitle"]}</p>
                                                                                                                            </div>
                                                                                                                            <div className="favButtonContainer">
                                                                                                                            <Hidden>
                                                                                                                                <Button disabled></Button>
                                                                                                                            </Hidden>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <Divider />
                                                                                                                    </div>
                                                                                                                    <div className="chartTop" />
                                                                                                                    <ResponsiveContainer width="90%" height={220}>
                                                                                                                        <BarChart
                                                                                                                            width={730} height={250}
                                                                                                                            data={chartData[index][chart["drilldown"]][chart["ddparam1"]]}
                                                                                                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                                                                                        >
                                                                                                                            <XAxis
                                                                                                                                dataKey={chart["xAxis"]}
                                                                                                                                label={{ value: "Number of Days Elapsed", position: 'insideBottom', offset: -4 }}
                                                                                                                            />
                                                                                                                            <YAxis
                                                                                                                                dataKey={chart["yAxis"]}
                                                                                                                                label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft" }}
                                                                                                                            />

                                                                                                                            <Tooltip />
                                                                                                                            {chart["dataKey"].map(function (dk, index) {
                                                                                                                                return (
                                                                                                                                    <Bar name="Submission Count" dataKey={dk} fill="#8884d8" />
                                                                                                                                )
                                                                                                                            })}
                                                                                                                        </BarChart>
                                                                                                                    </ResponsiveContainer>
                                                                                                                    <div className="chartBottom" />
                                                                                                                </Paper>
                                                                                                            </Grid>
                                                                                                            :
                                                                                                            chart["chart"] == "chart01DD2" ? 
                                                                                                            <Grid item xs={6}>
                                                                                                                <Paper>
                                                                                                                    <div style={divStyle}>
                                                                                                                        <div className="chartTopRow">
                                                                                                                            <div className="blank" />
                                                                                                                            <div className="chartTitleSubtitle">
                                                                                                                                <h2>{chart["title"]}</h2>
                                                                                                                                <p>{chart["subtitle"]}</p>
                                                                                                                            </div>
                                                                                                                            <div className="favButtonContainer">
                                                                                                                                <Hidden>
                                                                                                                                    <Button disabled></Button>
                                                                                                                                </Hidden>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <Divider />
                                                                                                                    </div>
                                                                                                                    <div className="chartTop" />
                                                                                                                    <ResponsiveContainer width="90%" height={220}>
                                                                                                                        <AreaChart width={730} height={250}
                                                                                                                                data={chartData[index][chart["drilldown"]][chart["ddparam1"]]}
                                                                                                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                                                                                            <defs>
                                                                                                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                                                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                                                                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                                                                                                </linearGradient>
                                                                                                                            </defs>
                                                                                                                            <XAxis label={{ value: "Date" }} dataKey={chart["xAxis"]} tick={false} />
                                                                                                                            <YAxis name="Date" label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft", offset: 12 }} domain={[0, 36]} />
                                                                                                                            <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" strokeDasharray="3 3" label={{ value: "Expected Submissions", position: "top" }} />
                                                                                                                            <Tooltip />
                                                                                                                            {chart["dataKey"].map(function (dk, index) {
                                                                                                                                return (
                                                                                                                                    <Area key={index} name="Submission Count" type="monotone" dataKey={dk} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                                                                                                                )
                                                                                                                            })}
                                                                                                                            
                                                                                                                        </AreaChart>
                                                                                                                    </ResponsiveContainer>
                                                                                                                    <div className="chartBottom" />
                                                                                                                </Paper>
                                                                                                            </Grid>
                                                                                                            :
                                                                                                            <div align="center">
                                                                                                                <h2>You have not added any charts to your Dashboard.</h2>
                                                                                                            </div>

                            )
                        })
                        :
                        this.props.activeProfile.role == "Administrator" ?
                            <div align="center">I am an Administrator</div>
                            :
                            this.props.activeProfile.role == "Student" ?
                                <div align="center">I am a Student</div>
                                :
                                <div></div>
                    }

                </Grid>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        firebase: state.firebase.val,
        activeProfile: state.activeProfile.val,
        myFavourites: state.myFavourites.favourites
    }
}

export default connect(mapStateToProps)(Dashboard);