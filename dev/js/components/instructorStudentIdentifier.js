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
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

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

    constructor(props) {
        super(props);
        this.state = {
            favourites: [],
            snackOpen: false,
            vertical: null,
            horizontal: null,
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo
    }

    topStudentSubmissions(data) {
        var result = []
        // console.log('topStudentSubmissions')
        // console.log(data)
        for (var i in data) {
            // console.log(data[i])
            result.push(data[i].value)
        }
        var totalStudent = result.length
        result.sort(function (a, b) { return b - a })
        // console.log(result[Math.round(totalStudent/4)])
        return (result[Math.round(totalStudent / 4)])
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

    addToFavourites(chart, type, title, subtitle, xAxis, yAxis, dataKey, message) {
        console.log("Adding", chart);
        this.setState({
            snackOpen: true,
            vertical: 'bottom',
            horizontal: 'right',
            message: message
        });
        this.state.favourites.push({
            chart: chart,
            type: type,
            title: title,
            subtitle: subtitle,
            xAxis: xAxis || "",
            yAxis: yAxis || "",
            dataKey: dataKey
        })

        store.dispatch({
            type: "SET_FAV",
            payload: this.state.favourites
        })
        console.log("Successfully added", chart)
        console.log("Updated favs:", this.state.favourites)
    }

    removeFromFavourites(chart, message) {
        console.log("Removing", chart)

        this.setState({
            snackOpen: true,
            vertical: 'bottom',
            horizontal: 'right',
            message: message
        });

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

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

    render() {
        const state = store.getState();
        const { vertical, horizontal, snackOpen } = this.state;
        return (
            <div>
                <Grid container spacing={24} direction="row" align="center">
                    {/* chart 12 */}
                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Student Submissions</h2>
                                <p>Monitor Total Submission of Each Student</p>
                            </div>
                            <Divider />
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
                                            value: "Student",
                                            position: "insideBottom"
                                        }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="value"
                                        label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                    />

                                    <Tooltip />
                                    <Bar name="Number of Submissions" dataKey="value" fill="#3498DB">
                                        onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart12.data.map((entry, index) => (
                                            <Cell key={entry.student_name} fill={entry.value < 20 ? '#d68995' : '#71afe2'} />
                                        ))}
                                    </ Bar>
                                    <ReferenceLine strokeDasharray="3 3" y={20} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expectation", position: "insideTop" }} />
                                    <Legend verticalAlign="top" align="right" />
                                </BarChart>
                            </ ResponsiveContainer>
                            {this.isFav("chart12") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart12", "Chart12 has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart12", "BarChart", "Student Submission", "Monitor Total Submission of Each Student", "Name", "", ["Value"], "Chart12 has been added!") }}>Favourite</Button>
                            }
                        </Paper>
                    </Grid>

                    {/* chart 13 */}
                    <Grid item xs={6}>
                        <Paper>
                            <div style={divStyle}>
                                <h2> Progress of Latest Assignment </h2>
                                <p>Identify Possible Achievers</p>
                                <Divider />
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
                                            value: "Student",
                                            position: "insideBottom",
                                        }
                                        }
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="value"
                                        label={{ value: "Number of Submissions", angle: -90, position: "insideBottomLeft" }}
                                    />

                                    <Tooltip />
                                    <Bar name="Number of Submissions" dataKey="value" fill="#66CDAA">
                                        onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data.map((entry, index) => (
                                            <Cell key={entry.student_name} fill={entry.value > this.topStudentSubmissions(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data) ? '#66CDAA' : '#3498DB'} />
                                        ))}
                                    </Bar>
                                    <ReferenceLine strokeDasharray="3 3"
                                        y={this.topStudentSubmissions(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data)}
                                        strokeWidth={4} stroke="#e0b13c" label={{ value: "75 Percentile", position: "insideTop" }} />
                                    <Legend verticalAlign="top" align="right" />
                                </BarChart>
                            </ResponsiveContainer>
                            {this.isFav("chart13") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart13", "Chart13 has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart13", "BarChart", "Progress of Latest Submission", "Identify Possible Achievers", "student_name", "value", ["value"], "Chart13 has been added!") }}>Favourite</Button>
                            }
                        </Paper>
                    </Grid>

                    {/* chart 14 */}
                    <Grid item xs={6}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Submission Duration</h2>
                                <p>Identify Distribution of Time Taken for Submission</p>
                                <Divider />
                            </div>

                            <ResponsiveContainer width="90%" height={380}>
                                <BarChart
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart14.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="student_name"
                                        label={{
                                            value: "Student",
                                            position: "insideBottom",
                                        }
                                        }
                                        ticks={[0]}

                                    />
                                    <YAxis
                                        dataKey="value"
                                        label={{ value: "Number of Days", angle: -90, position: "insideBottomLeft" }}
                                    />

                                    <Tooltip />
                                    <Bar name="Number of Days Taken" dataKey="value" fill="#3498DB" />>
                                    <Legend verticalAlign="top" align="right" />
                                </BarChart>
                            </ResponsiveContainer>
                            {this.isFav("chart14") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart14", "Chart14 has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart14", "BarChart", "Submission Duration", "Identify Distribution of Time Taken for Submission", "student_name", "value", ["value"], "Chart14 has been added!") }}>Favourite</Button>
                            }
                        </Paper>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        autoHideDuration={2500}
                        disableWindowBlurListener={true}
                        open={this.state.snackOpen}
                        onClose={this.handleClose}
                        message={this.state.message}
                        style={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
                    />
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView,
        usersTable: state.firebase.val.usersTable.usersTable,
        myFavourites: state.myFavourites.favourites
    };
}

export default connect(mapStateToProps)(instructorStudentIdentifier);


