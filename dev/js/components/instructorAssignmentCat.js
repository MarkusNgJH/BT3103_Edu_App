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
import Bookmark from 'material-ui-icons/Bookmark';
import store from '../store';
import Stepper from './stepper';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Loader from './loader';
import HorLoader from './horLoader';
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
            selectedAssignmentID: "",
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
        this.setState({
            selectedAssignment: data.assignment,
            selectedAssignmentID: data.assignmentID
        });
        // if (this.state.selectedAssignment == "") {
        //     this.setState({ selectedAssignment: data, steps: [...this.state.steps, data.assignment] })
        //     store.dispatch({ type: "SET_LOADER", payload: true });
        //     let url = 'https://d1pvj1k2kj.execute-api.us-west-2.amazonaws.com/prod/instructor_assignment?message=' + data.assignmentID;
        //     fetch(url, { mode: "no-cors" }).then(function (response) {
        //         console.log("Fetched ", url);
        //     });
        // }
        // else {
        //     var array = this.state.steps;
        //     array.splice(-1, 1, data.assignment);
        //     this.setState({ selectedAssignment: data.assignment, steps: array });
        //     console.log(data.assignment);
        //     store.dispatch({ type: "SET_LOADER", payload: true });
        //     let url = 'https://d1pvj1k2kj.execute-api.us-west-2.amazonaws.com/prod/instructor_assignment?message=' + data.assignmentID;
        //     fetch(url, { mode: "no-cors" }).then(function (response) {
        //         console.log("Fetched ", url);
        //     });
        // }
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
        // console.log(chartName, "is NOT in favourites");
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
        const { vertical, horizontal, snackOpen } = this.state;
        const comp = this;
        return (
            <div>
                <Paper className="chip_container" id="breadcrumbs">
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
                            {this.state.selectedAssignment.length > 30 ?
                                this.state.selectedAssignment.substring(0, 26) + "..."
                                :
                                this.state.selectedAssignment
                            }
                            <button onClick={this.handleDelete}>
                                <Close />
                            </button>
                        </div>
                    }
                </Paper>
                <Grid container spacing={24} alignItems="stretch" justify="center" align="center">

                    {/** CHART 01*/}
                    <Grid item xs={12} md={9}>
                        <Paper>
                            <div style={divStyle}>
                                <div className="chartTopRow">
                                    <div className="blank"/>
                                    <div className="chartTitleSubtitle">
                                        <h2>
                                            Assignment Submissions
                                            <img src={require('../../../public/drilldownSmall.png')} height={20} style={{marginTop:"5px"}}/>
                                        </h2>
                                        <p>Track the Number of Submissions for each Assignment</p>
                                    </div>
                                    <div className="favButtonContainer">
                                        {this.isFav("chart01") == true ?
                                            <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart01", "Chart has been removed!") }}>Remove</Button>
                                            :
                                            <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart01", "BarChart", "Assignment Submissions", "What is the proportion of submission for each assignment?", "assignment", "value", ["value"], "Chart has been added!") }}>Favourite</Button>

                                        }
                                    </div>
                                </div>
                                <Divider />
                            </div>
                            <div className="chartTop" />
                            <ResponsiveContainer width="90%" height={220}>
                                <BarChart
                                    width={730} height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="assignment"
                                        label={{ value: "Assignments (in chronological order)", position: "insideBottom" }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="value"
                                        label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft" }}
                                    />

                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.1 }} />
                                    {/* <Legend verticalAlign="top" align="right" /> */}
                                    <Bar name="Submission Count" dataKey="value"
                                        onClick={(data, index) =>
                                            this.selectedAssignment(data)
                                        }>
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data.map((entry, index) => (
                                            <Cell
                                                key={entry.assignment}
                                                fill={entry.assignment == this.state.selectedAssignment ? '#87f2de' : (entry.value < 20 ? '#d68995' : '#71afe2')}
                                            />
                                        ))}
                                    </Bar>
                                    <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" strokeDasharray="3 3" label={{ value: "Expected Submissions", position: "top" }} />
                                    {/* <Line name="Expected number" type='monotone' dataKey='expected' stroke='#ff7300' dot={false} /> */}
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="chartBottom" />
                        </Paper>
                    </Grid>

                    {/** CHART 01 Additional Data (show who have not submitted an assignment)*/}
                    {this.state.selectedAssignment != "" ?
                        <Grid item xs={12} md={3}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <span />
                                        <h2>Names List</h2>
                                        <span />
                                    </div>
                                    <p>Students Who Have Not Submitted "
                                        {this.state.selectedAssignment.length > 20 ?
                                            this.state.selectedAssignment.substring(0, 16) + "..."
                                        :
                                            this.state.selectedAssignment
                                        }
                                    "</p>
                                    <Divider />
                                </div>
                                <div style={{ height: 190 }}>
                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.additionaldata.map(
                                        function (entry, index) {
                                            if (entry.assignment == comp.state.selectedAssignment) {
                                                if (entry.value == "All submitted") {
                                                    return (
                                                        <div className="hori-vert-center">
                                                            <h3>
                                                                All submitted.
                                                            </h3>
                                                        </div>
                                                    )
                                                } else {
                                                    var res = entry.value.split(", ")
                                                    return (
                                                        <ol style={{ height: "90%", overflow: "auto" }}>
                                                            {res.map(function (name, index2) {
                                                                return (
                                                                    <li style={{ margin: "10px" }}>{name}</li>
                                                                )
                                                            })}
                                                        </ol>
                                                    )
                                                }
                                            }
                                        }
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                    :
                        <Grid item xs={12} md={3}>
                        </Grid>
                    }

                    {/** CHART 02*/}
                    {this.state.selectedAssignment == "" ?
                        <Grid item xs={6}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="blank"/>
                                        <div className="chartTitleSubtitle">
                                            <h2>Submission Across Days</h2>
                                            <p>Evaluate Whether Deadlines Are Reasonable</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {comp.isFav("chart02") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart02", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart02", "BarChart", "Submission Window", "Evaluate Whether Deadline is Reasonable for Assignments", "days_lapsed", "value", ["value"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="chartTop" />
                                <ResponsiveContainer width="90%" height={220}>
                                    <BarChart
                                        width={730} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart02.data}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <XAxis
                                            dataKey="days_lapsed"
                                            label={{ value: "Number of Days Elapsed", position: 'insideBottom', offset: -4 }}
                                        />
                                        <YAxis
                                            dataKey="value"
                                            label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft" }}
                                        />

                                        <Tooltip cursor={{ fill: 'red', fillOpacity: 0.05 }} />
                                        {/* <Legend verticalAlign="top" align="right" /> */}
                                        <Bar name="Submission Count" dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="chartBottom" />
                            </Paper>
                        </Grid>
                        :
                        <span></span>

                    }

                    {/** CHART 03*/}
                    {this.state.selectedAssignment == "" ?
                        <Grid item xs={6}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="blank"/>
                                        <div className="chartTitleSubtitle">
                                            <h2>Submission Across Time</h2>
                                            <p>Monitor Student's Submission over Time</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart03") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart03", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart03", "AreaChart", "Submission Across Time", "Monitor Student's Submission over Time", "date_time", "", ["value"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="chartTop" />
                                <ResponsiveContainer width="90%" height={220}>
                                    <AreaChart width={730} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart03.data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis label={{ value: "Date" }} dataKey="date_time" tick={false} />
                                        <YAxis label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                        {/* <Legend verticalAlign="top" align="right" /> */}
                                        <Tooltip />
                                        <Area name="Submission Count" type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="chartBottom" />
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {this.props.activeLoader.showLoader ?
                        <div style={{ margin: "auto", width: "100%" }}>
                            <p> Loading... Please Wait </p>
                            <HorLoader />
                        </div>

                        :
                        <span></span>
                    }

                    {/** Dynamic Drilldown: Submission Window*/}
                    {this.state.selectedAssignment ?
                        <Grid item xs={6}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="blank"/>
                                        <div className="chartTitleSubtitle">
                                            <h2>Submission Across Days</h2>
                                            <p>Evaluate Whether Deadline is Reasonable for Assignment "
                                                {this.state.selectedAssignment.length > 30 ?
                                                    this.state.selectedAssignment.substring(0, 26) + "..."
                                                :
                                                    this.state.selectedAssignment
                                                }
                                            "</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart04") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart04", "Chart has been removed!") }}>Remove</Button>
                                            :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart04", "BarChart", "Submission Window", "Is there sufficient days to complete assignment " + this.state.selectedAssignment + "?", "day_lapsed_from_assignmentX", "value", ["value"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="chartTop" />
                                <ResponsiveContainer width="90%" height={220}>
                                    <BarChart
                                        width={730} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.drillDowns.chart02DD[this.state.selectedAssignmentID]}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <XAxis
                                            dataKey="days_lapsed"
                                            label={{ value: "Number of Days Elapsed", position: 'insideBottom', offset: -4 }}
                                        />
                                        <YAxis
                                            dataKey="value"
                                            label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft" }}
                                        />

                                        <Tooltip />
                                        <Bar name="Submission Count" dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="chartBottom" />
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {/** Dynamic Drilldown: Submission Across Time*/}
                    {this.state.selectedAssignment ?
                        <Grid item xs={6}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="blank"/>
                                        <div className="chartTitleSubtitle">
                                            <h2>Submission Across Time</h2>
                                            <p>Monitor Student's Submission over Time for "
                                                {this.state.selectedAssignment.length > 30 ?
                                                    this.state.selectedAssignment.substring(0, 26) + "..."
                                                :
                                                    this.state.selectedAssignment
                                                }
                                            "</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart06") == true ?
                                                <Button style={{ float: "right", margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart06", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ float: "right", margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart06", "AreaChart", "Submission Across Time", "Monitor Student's Submission over Time for " + this.state.selectedAssignment + "?", "date_time", "", ["value"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="chartTop" />
                                <ResponsiveContainer width="90%" height={220}>
                                    <AreaChart width={730} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.drillDowns.chart03DD[this.state.selectedAssignmentID]}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis label={{ value: "Date" }} dataKey="date_time" tick={false} />
                                        <YAxis name="Date" label={{ value: "Submission Count", angle: -90, position: "insideBottomLeft", offset: 12 }} domain={[0, 36]} />
                                        <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" strokeDasharray="3 3" label={{ value: "Expected Submissions", position: "top" }} />
                                        <Tooltip />
                                        <Area name="Submission Count" type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="chartBottom" />
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {/* prediction */}
                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <div className="chartTopRow">
                                    <div className="blank"/>
                                    <div className="chartTitleSubtitle">
                                        <h2>Forecast Submissions Duration</h2>
                                        <p>Forecast Number of Days Needed for Latest Assignment</p>
                                    </div>
                                    <div className="favButtonContainer">
                                        {this.isFav("prediction") == true ?
                                            <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("prediction", "Chart has been removed!") }}>Remove</Button>
                                            :
                                            <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("prediction", "BarChart", "Forecast Submissions Duration", "Forecast Number of Days Needed for Latest Assignment", "student_name", "value", ["value"], "Chart has been added!") }}>Favourite</Button>
                                        }
                                    </div>
                                </div>
                                <Divider />
                            </div>
                            <div className="chartTop" />
                            <ResponsiveContainer width="90%" height={220}>
                                <BarChart
                                    width={730} height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.prediction.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="student_name"
                                        label={{ value: "Students", position: "insideBottom" }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="value"
                                        label={{ value: "Number of Days to Submit", angle: -90, position: "insideBottomLeft", fontSize: 12 }}
                                    />

                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.1 }} />
                                    <Bar name="Number of Days to Submit" dataKey="value">
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.prediction.data.map((entry, index) => (
                                                <Cell
                                                    key={entry.assignment}
                                                    fill={entry.assignment == this.state.selectedAssignment ? '#87f2de' : (entry.value > 5 ? '#d68995' : '#71afe2')}
                                                />
                                            ))}
                                    </Bar>
                                    <ReferenceLine y={5} strokeWidth={4} stroke="#e0b13c" strokeDasharray="3 3" label={{ value: "Expected Submissions", position: "top" }} />
                                    {/* <Line name="Expected number" type='monotone' dataKey='expected' stroke='#ff7300' dot={false} /> */}
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="chartBottom" />
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
        myFavourites: state.myFavourites.favourites,
        activeLoader: state.activeLoader,
    };
}

export default connect(mapStateToProps)(InstructorAssignmentCat);