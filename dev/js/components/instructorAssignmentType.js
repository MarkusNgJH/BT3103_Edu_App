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
import Icon from 'material-ui/Icon';
import Delete from 'material-ui-icons/Delete';
import Stepper from './stepper';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Close from 'material-ui-icons/Close'; 
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
    Cell,
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

var divStyle = {
    padding: "1px"
};

class InstructorAssignmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignmentType: "",
            selectedVideo: "",
            favourites: [],
            steps: ["InstructorAssignmentType"],
            snackOpen: false,
            vertical: null,
            horizontal: null,
        }
        // this.state.favourites = Object.keys(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType)
        this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(chip) {
        if (chip == "video") {
            this.setState({selectedVideo: ""})
        }
        if (chip == "assignmentType") {
            this.setState({selectedAssignmentType: "", selectedVideo: ""})
        }
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

    selectedAssignmentType(data) {
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if (this.state.selectedAssignmentType == "") {
            this.setState({ selectedAssignmentType: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({ selectedAssignmentType: data.Name, steps: array })
        }
        console.log(this.state.steps)
    }

    selectedVideo(data) {
        if (this.state.selectedVideo == "") {
            this.setState({ selectedVideo: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({ selectedVideo: data.Name, steps: array })
        }
    }

    backStep() {
        if (this.state.steps.length == 2) {
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({ steps: array });
            this.setState({ selectedAssignmentType: "" })
        }
        else if (this.state.steps.length == 3) {
            var array = this.state.steps;
            array.splice(-1, 1);
            this.setState({ steps: array });
            this.setState({ selectedVideo: "" })
        }

    }
    reset() {
        var array = this.state.steps;
        this.setState({ steps: ["InstructorAssignmentType"], selectedVideo: "", selectedAssignmentType: "" });
    }

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

    render() {
        console.log("My favourites:", this.state.favourites)
        const { vertical, horizontal, snackOpen } = this.state;
        return (
            <div>
                <Paper className="chip_container">
                <div className="chip">
                InstructorAssignmentType
                </div>
                {this.state.selectedAssignmentType == "" ?
                <div></div>
                :
                <div className="chip_spacer">>></div>
                }
                {this.state.selectedAssignmentType == "" ?
                <div></div>
                :
                <div className="chip">
                {this.state.selectedAssignmentType}
                <button onClick={() => this.handleDelete("assignmentType")}>
                    <Close />
                </button>
                </div>
                }
                {this.state.selectedVideo == "" ?
                <div></div>
                :
                <div className="chip_spacer">>></div>
                }
                {this.state.selectedVideo == "" ?
                <div></div>
                :
                <div className="chip">
                {this.state.selectedVideo}
                <button onClick={() => this.handleDelete("video")}>
                    <Close />
                </button>
                </div>
                }
                </Paper>
                <Grid container spacing={24} direction="row" align="center">
                    <Grid item xs={12}>
                        <Paper>
                        <div style={divStyle}>
                        {/* <h2>Chart08</h2> */}
                        <h2>Submission Per Type</h2>
                        <p>Monitor Percentage of Submission Per Assignment Type</p>
                        <Divider />
                        </div>
                        <ResponsiveContainer width="90%" height={380}>
                        <BarChart
                            width={730}
                            height={250}
                            // data={this.props.firebase.val.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.instructorAssignmentType.chart08.data}
                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis
                                dataKey="Name"
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
                            <Bar dataKey="Value" fill="#8884d8"
                            onClick={(data, index) => this.selectedAssignmentType(data)}>
                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data.map((entry, index) => (
                                <Cell
                                key={entry['Name']}
                                fill={entry.Name == this.state.selectedAssignmentType ? '#87f2de' : (entry.Value < 1 ? '#d68995' : '#71afe2')}
                                // strokeWidth={entry.assignment == this.state.selectedAssignment ? 2 : 0}
                                // stroke="red"
                                />
                            ))}
                            </Bar>
                        </BarChart>
                        </ResponsiveContainer>
                        {this.isFav("chart08") == true ?
                            <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08", "chart08 has been removed!") }}>Remove</Button>
                            :
                            <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08", "BarChart", "Which type of assignments do my students seem to be struggling with?", "Name", "Value", ["Value"], "chart08 has been added!") }}>Favourite</Button>
                        }
                    </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignmentType == "PathProblem" ?
                                <div>
                                    <div style={divStyle}>
                                        {/* <h2>Chart09</h2> */}
                                        <h2>Total Plays/ Fast-Forwards</h2>
                                        <p>Identify PathProblem that Students Have Complete Comfortably</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="plays" fill="#8884d8"/>
                                            <Bar dataKey="rate" fill="#82ca9d"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart09") == true ?
                                        <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart09", "chart09 has been removed!") }}>Remove</Button>
                                        :
                                        <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart09", "BarChart", "Which videos have my students watched and how is the pace for them?", "Name", "", ["plays", "rate"], "chart09 has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignmentType == "PathProblem" ?
                                <div>
                                    <div style={divStyle}>
                                        {/* <h2>Chart10</h2> */}
                                        <h2>Total Pauses/Playbacks</h2>
                                        <p>Identify PathProblems that Students Students May Be Struggling With</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="pauses" fill="#8884d8" onClick={(data, index) => this.selectedVideo(data)}/>
                                            <Bar dataKey="playbacks" fill="#82ca9d" onClick={(data, index) => this.selectedVideo(data)} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart10") == true ?
                                        <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10", "chart10 has been removed!") }}>Remove</Button>
                                        :
                                        <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10", "BarChart", "Which videos do my students seem to be struggling with?", "Name", "", ["pauses", "playbacks"], "chart10 has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper>
                            {this.state.selectedVideo == "AWS Lambda Lab - Part 4 (7:28)" ?
                                <div>
                                    <div style={divStyle}>
                                        {/* <h2>chart11</h2> */}
                                        <h2>Area of Pauses</h2>
                                        <p>Investigate Time Period where Pauses Occured for Assignment Z</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="90%" height={380}>
                                        <BarChart width={730} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart11.data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Value" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart11") == true ?
                                        <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart11", "chart11 has been removed!") }}>Remove</Button>
                                        :
                                        <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart11", "BarChart", "Which part of the video do my students struggle with/is valuable to them?", "Name", "", ["Value"], "chart11 has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={this.state.snackOpen}
                        onClose={this.handleClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.message}</span>}
                    />
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
        usersTable: state.firebase.val.usersTable.usersTable
    };
}

export default connect(mapStateToProps)(InstructorAssignmentType);

