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
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Close from 'material-ui-icons/Close';
import Delete from 'material-ui-icons/Delete';
import store from '../store';
import Stepper from './stepper';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import '../../scss/instructorAssignmentCat.scss';

import {
    PieChart, Pie,
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    ComposedChart,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ReferenceLine,
    Cell,
    ResponsiveContainer
} from "recharts";
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

class InstructorAssignmentCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignment: "",
            steps: ["InstructorAssignmentCat"],
            favourites: [],
            snackOpen: false,
            vertical: null,
            horizontal: null,
            // selectedVideo: ""
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo
        this.handleDelete = this.handleDelete.bind(this);
    }

    selectedAssignment(data) {
        if (this.state.selectedAssignment == "") {
            this.setState({ selectedAssignment: data, steps: [...this.state.steps, data] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data);
            this.setState({ selectedAssignment: data, steps: array })
        }
    }

    handleDelete() {
        this.setState({ selectedAssignment: "" })
    }

    backStep() {
        if (this.state.steps.length == 2) {
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({ steps: array });
            this.setState({ selectedAssignment: "" })
        }
    }
    reset() {
        var array = this.state.steps;
        this.setState({ steps: ["InstructorAssignmentCat"], selectedAssignment: "" });
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

    addToFavourites(chart, type, title, xAxis, yAxis, dataKey, message) {
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

    // selectedVideo(data){
    //     this.setState({selectedVideo: data.Name})
    // }

    render() {
        const { vertical, horizontal, snackOpen } = this.state;
        return (
            <div>
                <Paper className="chip_container">
                    <div className="chip">
                        InstructorAssignmentCat
                </div>
                    {this.state.selectedAssignment == "" ?
                        <div></div>
                        :
                        <div className="chip_spacer">>></div>
                    }
                    {this.state.selectedAssignment == "" ?
                        <div></div>
                        :
                        <div className="chip">
                            {this.state.selectedAssignment}
                            <button onClick={this.handleDelete}>
                                <Close />
                            </button>
                        </div>
                    }
                </Paper>
                <Grid container spacing={24} alignItems="stretch" justify="center" align="center">

                    {/* <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/> */}

                    {/** CHART 01*/}
                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Assignment Submissions</h2>
                                <p>What is the proportion of submission for each assignment?</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={380}>
                                <BarChart
                                    width={730} height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="assignment"
                                        label={{ value: "Assignments", position: "insideBottom" }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="value"
                                    // label={{ value: 'Number of Submissions', angle: -90, position: 'insideBottomLeft' }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.1 }} />
                                    <Legend verticalAlign="top" align="right" />
                                    {/* <Bar name="Number of Submissions" dataKey="value" fill="#8884d8"
                    onClick={(data, index) => this.selectedAssignment(data.assignment)} /> */}
                                    <Bar name="Number of Submissions" dataKey="value"
                                        onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data.map((entry, index) => (
                                            <Cell
                                                key={entry.assignment}
                                                fill={entry.assignment == this.state.selectedAssignment ? '#87f2de' : (entry.value < 20 ? '#d68995' : '#71afe2')}
                                            // strokeWidth={entry.assignment == this.state.selectedAssignment ? 2 : 0}
                                            // stroke="red"
                                            />
                                        ))}
                                    </Bar>
                                    <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expected Submissions", position: "top" }} />
                                    {/* <Line name="Expected number" type='monotone' dataKey='expected' stroke='#ff7300' dot={false} /> */}
                                </BarChart>
                            </ResponsiveContainer>
                            {this.isFav("chart01") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart01", "Chart01 has been removed!") }}>Remove</Button>

                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart01", "BarChart", "What is the proportion of submission for each assignment?", "assignment", "value", ["value"], "Chart01 has been added!") }}>Favourite</Button>

                            }
                        </Paper>
                    </Grid>

                    {/** CHART 02*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Submission Window</h2>
                                        <p>Evaluate Whether Deadline is Reasonable for Assignments</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart
                                            width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart02.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <XAxis
                                                dataKey="days_lapsed"
                                                label={{ value: "Number of days elapsed", position: 'insideBottom', offset: -4 }}

                                            />
                                            <YAxis
                                                dataKey="value"
                                            // label={{ value: "Number of submissions", angle: -90, position: 'insideBottomLeft' }}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip cursor={{ fill: 'red', fillOpacity: 0.05 }} />
                                            <Legend verticalAlign="top" align="right" />
                                            <Bar name="Number of Submissions" dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart02") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart02", "Chart02 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart02", "BarChart", "Is there sufficient days to complete assignments?", "assignment", "value", ["value"], "Chart02 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>}
                        </Paper>
                    </Grid>

                    {/** CHART 03*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Submission Across Time</h2>
                                        <p>Monitor Student's Submission over Time</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <AreaChart width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart03.data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="date_time" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart03") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart03", "Chart03 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart03", "BarChart", "How are my student behaviour in submitting my assignments?", "assignment", "value", ["value"], "Chart03 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/** CHART 04*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "Follow the directions in the details link to get a free AWS account. Then submit the string SUCCESSFUL. " ?
                                <div>
                                    <div style={divStyle}>
                                        {/* <h2>Chart04</h2> */}
                                        <h2>Submission Window</h2>
                                        <p>Evaluate Whether Deadline is Reasonable for Assignment X "{this.state.selectedAssignment}"?</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart
                                            width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart04.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <XAxis
                                                dataKey="day_lapsed_from_assignmentX"
                                            />
                                            <YAxis
                                                dataKey="value"
                                                label={
                                                    <AxisLabel axisType="yAxis" width={600} height={300}>
                                                        yAxis
                        </AxisLabel>
                                                }
                                            />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart04") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart04", "Chart04 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart01", "BarChart", "Is there sufficient days to complete assignment " + "{this.state.selectedAssignment}" + "?", "assignment", "value", ["value"], "Chart04 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/** CHART 06*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "Follow the directions in the details link to get a free AWS account. Then submit the string SUCCESSFUL. " ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Submission Across Time</h2>
                                        <p>Monitor Student's Submission over Time for "{this.state.selectedAssignment}"?</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <AreaChart width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart06.data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="date_time" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart06") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart06", "Chart06 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart06", "BarChart", "How are my student behaviour in submitting assignment" + "{this.state.selectedAssignment}" + "?", "assignment", "value", ["value"], "Chart06 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/** CHART 05*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "AWS Lambda Lab - Part 2 (7:13)" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Submission Window</h2>
                                        <p>Evaluate Whether Deadline is Reasonable for "{this.state.selectedAssignment}"?</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart
                                            width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart05.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <XAxis
                                                dataKey="day_lapsed_from_assignmentX"
                                                label={
                                                    <AxisLabel axisType="xAxis" width={600} height={300}>
                                                        xAxis
                                            </AxisLabel>
                                                }
                                            />
                                            <YAxis
                                                dataKey="value"
                                                label={
                                                    <AxisLabel axisType="yAxis" width={600} height={300}>
                                                        yAxis
                                            </AxisLabel>
                                                }
                                            />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart05") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart05", "Chart05 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart05", "BarChart", "Is there sufficient days to complete assignment " + "{this.state.selectedAssignment}" + "?", "assignment", "value", ["value"], "Chart5 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/** CHART 07*/}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignment == "AWS Lambda Lab - Part 2 (7:13)" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Submission Across Time</h2>
                                        <p>Monitor Student's Submission over Time for "{this.state.selectedAssignment}"?</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={380}>
                                        <AreaChart width={730} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart07.data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="date_time" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart07") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart07", "Chart07 has been removed!") }}>Remove</Button>

                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart07", "BarChart", "How are my student behaviour in submitting assignment" + "{this.state.selectedAssignment}" + "?", "assignment", "value", ["value"], "Chart07 has been added!") }}>Favourite</Button>

                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        autoHideDuration="2500"
                        disableWindowBlurListener="true"
                        open={this.state.snackOpen}
                        onClose={this.handleClose}
                        message={this.state.message}
                        style={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
                    />

                    {/** End of Grid container*/}
                </Grid>

            </div>
        );
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

export default connect(mapStateToProps)(InstructorAssignmentCat);