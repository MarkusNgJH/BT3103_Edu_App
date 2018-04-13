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
    Cell,
    ReferenceLine
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
        if (this.state.favourites.length == 0) {
            this.state.favourites = [{ chart: "chart0" }]
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

                    {this.props.activeProfile.role == "Instructor" ?
                        this.state.favourites.map(function (chart, index) {
                            return (
                                // Start of AssignmentType charts 08-11
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
                                                                    {chart["dataKey"].map(function (dk, index) {
                                                                        return (
                                                                            <Bar name="Number of Submissions" dataKey={dk}>
                                                                                {chartData[index].data.map((entry, index) => (
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

                                                                            {chart["dataKey"].map(function (dk, index) {
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

                                                                                {chart["dataKey"].map(function (dk, index) {
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
                                                                                    {chart["dataKey"].map(function (dk, index) {
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
                                                                                        {chart["dataKey"].map(function (dk, index) {
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
                                                                                            {chart["dataKey"].map(function (dk, index) {
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
                                                                                                {chart["dataKey"].map(function (dk, index) {
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
                                                                            chart["chart"] == "chart012" ?
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
                                                                                                {chart["dataKey"].map(function (dk, index) {
                                                                                                    return (
                                                                                                        <Bar name="Number of Submissions" dataKey="value" fill="#3498DB">
                                                                                                            {chartData[index].data.map((entry, index) => (
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
        usersTable: state.firebase.val.usersTable.usersTable,
        activeProfile: state.activeProfile.val,
        myFavourites: state.myFavourites.favourites
    }
}

export default connect(mapStateToProps)(Dashboard);