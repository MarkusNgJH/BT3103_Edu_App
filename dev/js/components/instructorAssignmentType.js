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
import Typography from 'material-ui/Typography';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

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
    ResponsiveContainer,
    ReferenceLine
} from "recharts";
import { BarChart, Bar } from "recharts";
import { type } from 'os';
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

const wordCloudArr = [
    "AWS Lambda Lab - Part 1.png", "AWS Lambda Lab - Part 2.png", "AWS Lambda Lab - Part 3.png",
    "AWS Lambda Lab - Part 4.png", "AWS Lambda Lab - Part 5.png", "Introduction to AWS Lambda.png",
    "Real-time Charts Tutorial.png"
]

var divStyle = {
    padding: "1px"
};

class InstructorAssignmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignmentType: "",
            selectedAssignment: "",
            selectedVideo: "",
            favourites: [],
            steps: ["InstructorAssignmentType"],
            snackOpen: false,
            vertical: null,
            horizontal: null,
            message: ""
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch 
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo  
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(chip) {
        if (chip == "assignment") {
            this.setState({ selectedAssignment: "", selectedAssignment: "" })
        }
        if (chip == "video") {
            this.setState({ selectedVideo: "" })
        }
        if (chip == "assignmentType") {
            this.setState({ selectedAssignmentType: "", selectedVideo: "", selectedAssignment: "" })
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
        // console.log(chartName, "is NOT in favourites");
        return false;
    }

    addToFavourites(chart, type, title, subtitle, xAxis, yAxis, dataKey, message, drilldown, ddparam1 = "") {
        console.log("Adding", chart);
        if(drilldown == "") {
            drilldown = this.state.selectedAssignmentType
        }
        console.log("My drilldown is: " + drilldown)
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
            dataKey: dataKey,
            ddparam1: ddparam1,
            drilldown: drilldown
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

    selectedAssignmentType(data, msg = "") {
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if (this.state.selectedAssignmentType == "") {
            this.setState({ selectedAssignmentType: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({ selectedAssignmentType: data.Name, selectedAssignment: "", selectedVideo: "", steps: array })
        }
        console.log(this.state.steps)
    }

    selectedAssignment(data) {
        if (this.state.selectedAssignment == "") {
            this.setState({ selectedAssignment: data.assignment, steps: [...this.state.steps, data.assignment] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.assignment);
            this.setState({ selectedAssignment: data.assignment, steps: array })
        }
    }

    selectedVideo(data, msg = "") {
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
        console.log("My favourites:", this.state.favourites)
        const { vertical, horizontal, snackOpen } = this.state;
        const multiple100 = (tick) => { return (tick * 100) }
        const comp = this;
        return (
            <div>
                {/** Breadcrumb */}
                <Paper className="chip_container" id="breadcrumbs">
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
                            <button onClick={() => this.handleDelete("assignment")}>
                                <Close />
                            </button>
                        </div>
                    }
                </Paper>

                <Grid container spacing={24} direction="row" align="center">
                    {/* Chart 08 */}
                    <Grid item xs={12} md={5}>
                        <Paper>
                            <div style={divStyle}>
                                <div className="chartTopRow">
                                    <div className="chartTitleSubtitleLeft">
                                        <h2>
                                            Submission Per Type
                                            <img src={require('../../../public/drilldownSmall.png')} height={20} style={{marginTop:"5px"}}/>    
                                        </h2>
                                        <p>Monitor Submission Rate by Assignment Type</p>
                                    </div>
                                    <div className="favButtonContainer">
                                        {this.isFav("chart08") == true ?
                                            <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08", "Chart has been removed!") }}>Remove</Button>
                                            :
                                            <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08", "BarChart", "Submission Per Type", "Monitor Percentage of Submission Per Assignment Type", "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                                        }
                                    </div>
                                </div>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="95%" height={240}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="Name"
                                        tick={{fontSize: 12}}
                                    />

                                    <YAxis
                                        label={{ value: "Submission Rate (%)", angle: -90, position: "insideBottomLeft", fontSize: 12}}
                                        tickFormatter={multiple100} />

                                    <Tooltip />
                                    <Bar dataKey="Value" fill="#8884d8" name="% Submitted"
                                        onClick={(data, index) => this.selectedAssignmentType(data, "chart08_" + data["Name"])}>
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data.map((entry, index) => (
                                            <Cell
                                                key={entry['Name']}
                                                fill={entry.Name == this.state.selectedAssignmentType ? '#87f2de' : (entry.Value * 100 < 100 ? '#d68995' : '#71afe2')}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                        </Paper>
                    </Grid>

                    {/* chart8DD */}
                    {/* Number of submission for each assignment of XXX Type */}
                    <Grid item xs={12} md={4}>
                        <Paper>
                            {this.state.selectedAssignmentType ?
                                <div>
                                    <div style={divStyle}>
                                        <div className="chartTopRow">
                                            <div className="chartTitleSubtitleLeft">
                                                <h2>
                                                    Total Submissions
                                                    <img src={require('../../../public/drilldownSmall.png')} height={20} style={{marginTop:"5px"}}/>
                                                </h2>
                                                <p>Submissions for {this.state.selectedAssignmentType} Assignments</p>
                                            </div>
                                            <div className="favButtonContainer">
                                                {this.isFav("chart08DD") == true ?
                                                    <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08DD", "Chart has been removed!") }}>Remove</Button>
                                                    :
                                                    <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08DD", "BarChart", "Total Submissions", "Number of Submissions per " + this.state.selectedAssignmentType + "'s Assignment", "assignment", "", ["value"], "Chart has been added!") }}>Favourite</Button>
                                                }
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="95%" height={240}>
                                        <BarChart width={400} height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.drillDowns[this.state.selectedAssignmentType].data}>
                                            <XAxis dataKey="assignment" tick={false} label={{ value: "Assignments", fontSize: 12 }} />/>
                                            <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12, fontSize: 12 }} />
                                            <Tooltip />
                                            <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{ value: "Expected Submissions", position: "top" }} />
                                            <Bar name="Num of Submission" dataKey="value" fill="#8884d8" onClick={(data, index) => this.selectedAssignment(data)}>
                                                {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.drillDowns[this.state.selectedAssignmentType].data.map((entry, index) => (
                                                    <Cell
                                                        key={entry['assignment']}
                                                        fill={entry['assignment'] == this.state.selectedAssignment? '#87f2de' : (entry.value < entry.expected ? '#d68995' : '#71afe2')}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>

                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/* chart08DDAdd */}
                    {/* name List of those who did not submit assignment */}
                    {this.state.selectedAssignmentType ?
                        this.state.selectedAssignment ?
                            <Grid item xs={12} md={3}>
                                <Paper>
                                    <div>
                                        <div style={divStyle}>
                                            <div className="chartTopRow">
                                                <div className="chartTitleSubtitleLeft">
                                                    <h2>Name List</h2>
                                                    <p>Students Who Have Not Submitted</p>
                                                </div>
                                                <div className="favButtonContainer">
                                                    {this.isFav("chart08DDAdd") == true ?
                                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08DDAdd", "Chart has been removed!") }}>Remove</Button>
                                                        :
                                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08DDAdd", "BarChart", "Name list of students", "Name list of those who have not submitted " + this.state.selectedAssignment, "", "", [], "Chart has been added!", this.state.selectedAssignment) }}>Favourite</Button>
                                                    }   
                                                </div>
                                            </div>
                                            <Divider />
                                        </div>

                                        <ResponsiveContainer width="95%" height={240}>
                                            <div align="center" style={{ height: "inherit", width: "auto" }}>

                                                <div style={{ width: "90%", height: "inherit" }}>

                                                    {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.drillDowns[this.state.selectedAssignmentType].additionalData.map(
                                                        function (entry, index) {
                                                            if (entry.assignment == comp.state.selectedAssignment) {
                                                                if (entry.value == "All submitted") {
                                                                    return (
                                                                        <div className="hori-vert-center">
                                                                            All submitted.
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    var res = entry.value.split(", ")
                                                                    return (
                                                                        <ol style={{margin: 5, height: "90%", overflowY: "auto" }}>
                                                                            {res.map(function (name, index2) {
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

                                    </div>
                                </Paper>
                            </Grid>
                            :
                            <span></span>
                        :
                        <span></span>
                    }

                    {/* Chart 09 */}
                    {this.state.selectedAssignmentType == "PathProblem" ?
                        <Grid item xs={12} md={4}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="chartTitleSubtitleLeft">
                                            <h2>Total Plays/Fast-Forwards</h2>
                                            <p>Identify Videos that Students Completed Comfortably</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart09") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart09", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart09", "BarChart", "Total Plays/ Fast-Forwards", "Which videos have my students watched and how is the pace for them?", "Name", "", ["plays", "rate"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>

                                <ResponsiveContainer width="95%" height={240}>
                                    <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                                        <XAxis dataKey="Name" tick={false} label={{ value: "Assignments", fontSize: 12}} />/>
                                        <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12, fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend verticalAlign="top" align="right" />
                                        <Bar name="# of Plays" dataKey="plays" fill="#8884d8" />
                                        <Bar name="# of Fast Forwards" dataKey="rate" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>

                            </Paper>
                        </Grid>
                        :
                        <div></div>
                    }

                    {/* Chart 10 */}
                    {this.state.selectedAssignmentType == "PathProblem" ?
                        <Grid item xs={12} md={4}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="chartTitleSubtitleLeft">
                                            <h2>
                                                Total Pauses/Playbacks
                                                <img src={require('../../../public/drilldownSmall.png')} height={20} style={{marginTop:"5px"}}/>
                                            </h2>
                                            <p>Identify Videos that Students May Struggle With</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart10") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10", "BarChart", "Total Pauses/Playbacks", "Identify PathProblems that Students Students May Be Struggling With", "Name", "", ["pauses", "playbacks"], "Chart has been added!") }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>

                                <ResponsiveContainer width="95%" height={240}>
                                    <BarChart
                                        width={400} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data}>
                                        <XAxis dataKey="Name" tick={false} label={{ value: "Assignments", fontSize: 12 }} />/>
                                        <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12, fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend verticalAlign="top" align="right" />
                                        <Bar
                                            name="# of Pauses" dataKey="pauses" fill="#8884d8"
                                            onClick={(data, index) => this.selectedVideo(data, "chart10_" + data["assignmentId"])}>
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data.map((entry, index) => (
                                                <Cell
                                                    key={entry.Name}
                                                    fill={entry.Name == this.state.selectedVideo ? '#87f2de' : "#8884d8"}
                                                />
                                            ))}
                                        </Bar>
                                        <Bar name="# of Playbacks" dataKey="playbacks" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>

                            </Paper>
                        </Grid>
                        :
                        <div></div>
                    }

                    {/* Number of Pauses by Time Period */}
                    {this.state.selectedVideo ?
                        <Grid item xs={12} md={4}>
                            <Paper>
                                <div style={divStyle}>
                                    <div className="chartTopRow">
                                        <div className="chartTitleSubtitleLeft">
                                            <h2>Time Period of Video</h2>
                                            <p>Identify Which Parts Students Paused At For "
                                            {comp.state.selectedVideo.length > 20 ?
                                                comp.state.selectedVideo.substring(0, 16) + "..."
                                            :
                                                comp.state.selectedVideo
                                            }
                                            "</p>
                                        </div>
                                        <div className="favButtonContainer">
                                            {this.isFav("chart10DD") == true ?
                                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10DD", "Chart has been removed!") }}>Remove</Button>
                                                :
                                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10DD", "BarChart", "Total Pauses/Playbacks", "Identify Which Parts Students Paused At For " + comp.state.selectedVideo, "Name", "", ["Value"], "Chart has been added!", comp.state.selectedVideo) }}>Favourite</Button>
                                            }
                                        </div>
                                    </div>
                                    <Divider />
                                </div>

                                <ResponsiveContainer width="95%" height={240}>
                                    <BarChart width={400} height={250}
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.drillDowns[this.state.selectedVideo]}>
                                        <XAxis dataKey="Name" tick={false} label={{ value: "Time into video", fontSize: 12 }} />/>
                                        <YAxis label={{ value: "Number of pauses", angle: -90, position: "insideBottomLeft", offset: 18, fontSize: 12 }} />
                                        <Tooltip />
                                        <Bar name="# of pauses" dataKey="Value" fill="#8884d8" >
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.drillDowns[this.state.selectedVideo].map((entry, index4) => (
                                                <Cell
                                                    key={entry.Name}
                                                    fill={
                                                        comp.maxCount(entry.Value, this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.drillDowns[this.state.selectedVideo]) 
                                                        == true ? 
                                                        '#d68995' : '#71afe2'
                                                    }
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {/* Word Cloud chart */}
                    {this.state.selectedAssignmentType == "PathProblem" ?
                        this.state.selectedVideo ?
                            <Grid item xs={12} md={6}>
                                <Paper>
                                    <div style={divStyle}>
                                        <h2>Word Cloud</h2>
                                        <p>Identify Answers Which Most Students Give For "
                                            {this.state.selectedVideo.length > 20 ?
                                                this.state.selectedVideo.substring(0, 16) + "..."
                                            :
                                                this.state.selectedVideo
                                            }
                                        "</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="95%" height={350}>
                                        <div id="wordclouddiv" style={{ height: "100%", width: "100%" }}>
                                            {wordCloudArr.map(function (wordCloud, index) {
                                                if (wordCloud.slice(0, -4) == comp.state.selectedVideo.split(" (")[0]) {
                                                    return (
                                                        <img src={require('../../scss/' + wordCloud)} style={{ height: "100%", width: "100%" }} />

                                                    )
                                                }
                                            })}
                                        </div>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                            :
                            <span></span>
                        :
                        <span></span>
                    }
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

        );
    }
}

function mapStateToProps(state) {
    return {
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView,
        myFavourites: state.myFavourites.favourites
    };
}

export default connect(mapStateToProps)(InstructorAssignmentType);