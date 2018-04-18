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

var wordcloudProp = (imageName) => {
    return (
        // "./" + imageName
        "/BT3103_Edu_App/dev/js/components/" + imageName
    )
}

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
        console.log(chartName, "is NOT in favourites");
        return false;
    }

    addToFavourites(chart, type, title, subtitle, xAxis, yAxis, dataKey, message, ddparam1 = "") {
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
            dataKey: dataKey,
            ddparam1: ddparam1
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
            this.setState({ selectedAssignmentType: data.Name, steps: array })
        }
        console.log(this.state.steps)
        // console.log(msg)
        this.drilldown(msg)
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
        console.log(msg)
        this.drilldown(msg)
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

    drilldown(chartName) {
        var api = " https://hcvb86chkl.execute-api.us-west-2.amazonaws.com/prod/instructor_assignmentType?message=" + chartName
        fetch(api, { mode: "no-cors" }).then(function (response) {
            console.log("Fetched ", response);
        });
    }

    render() {
        console.log("My favourites:", this.state.favourites)
        const { vertical, horizontal, snackOpen } = this.state;
        const multiple100 = (tick) => { return (tick * 100) }
        const wordCloudArr = [
            "AWS Lambda Lab - Part 1.png", "AWS Lambda Lab - Part 2.png", "AWS Lambda Lab - Part 3.png",
            "AWS Lambda Lab - Part 4.png", "AWS Lambda Lab - Part 5.png", "Introduction to AWS Lambda.png",
            "Real-time Charts Tutorial.png"
        ]
        const comp = this;
        return (
            <div>
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
                            {this.state.selectedAssignment}
                            <button onClick={() => this.handleDelete("assignment")}>
                                <Close />
                            </button>
                        </div>
                    }
                </Paper>
                <Grid container spacing={24} direction="row" align="center">
                    {/* Chart 08 */}
                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Submission Per Type</h2>
                                <p>Monitor Percentage of Submissions for Each Assignment Type</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={280}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="Name"
                                    />

                                    <YAxis
                                        label={{ value: "Submission Rate (%)", angle: -90, position: "insideBottomLeft" }}
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
                            {this.isFav("chart08") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08", "BarChart", "Submission Per Type", "Monitor Percentage of Submission Per Assignment Type", "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            }
                        </Paper>
                    </Grid>

                    {/* Chart 09 */}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignmentType == "PathProblem" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Total Plays/ Fast-Forwards</h2>
                                        <p>Identify PathProblem that Students Have Completed Comfortably</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="85%" height={280}>
                                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                                            <XAxis dataKey="Name" tick={false} label={{ value: "Assignments" }} />/>
                                            <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                            <Tooltip />
                                            <Legend verticalAlign="top" align="right" />
                                            <Bar name="# of Plays" dataKey="plays" fill="#8884d8" />
                                            <Bar name="# of Fast Forwards" dataKey="rate" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart09") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart09", "Chart has been removed!") }}>Remove</Button>
                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart09", "BarChart", "Total Plays/ Fast-Forwards", "Which videos have my students watched and how is the pace for them?", "Name", "", ["plays", "rate"], "Chart has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/* Chart 10 */}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignmentType == "PathProblem" ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Total Pauses/Playbacks</h2>
                                        <p>Identify PathProblems that Students May Be Struggling With</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="85%" height={280}>
                                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data}>
                                            <XAxis dataKey="Name" tick={false} label={{ value: "Assignments" }} />/>
                                            <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                            <Tooltip />
                                            <Legend verticalAlign="top" align="right" />
                                            <Bar name="# of Pauses" dataKey="pauses" fill="#8884d8" onClick={(data, index) => this.selectedVideo(data, "chart10_" + data["assignmentId"])} />
                                            <Bar name="# of Playbacks" dataKey="playbacks" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart10") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10", "Chart has been removed!") }}>Remove</Button>
                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10", "BarChart", "Total Pauses/Playbacks", "Identify PathProblems that Students Students May Be Struggling With", "Name", "", ["pauses", "playbacks"], "Chart has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/* Chart 10DD */}
                    {this.state.selectedVideo ?
                        <Grid item xs={6}>
                            <Paper>
                                <div style={divStyle}>
                                    <h2>Time period of video</h2>
                                    <p>Identify Which Parts Students Paused At For {comp.state.selectedVideo}</p>
                                    <Divider />
                                </div>

                                <ResponsiveContainer width="85%" height={280}>
                                    <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].tempDDNode.chart10DD.data}>
                                        <XAxis dataKey="days_lapsed" tick={false} label={{ value: "Time into video" }} />/>
                                    <YAxis label={{ value: "Number of pauses", angle: -90, position: "insideBottomLeft", offset: 18 }} />
                                        <Tooltip />
                                        <Legend verticalAlign="top" align="right" />
                                        <Bar name="# of pauses" dataKey="value" fill="#8884d8" ></Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                {this.isFav("chart10DD") == true ?
                                    <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10DD", "Chart has been removed!") }}>Remove</Button>
                                    :
                                    <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10DD", "BarChart", "Total Pauses/Playbacks", "Identify PathProblems that Students Students May Be Struggling With", "days_lapsed", "", ["value"], "Chart has been added!") }}>Favourite</Button>
                                }
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {/* chart8DD */}
                    {/* Number of submission for each assignment of XXX Type */}
                    <Grid item xs={6}>
                        <Paper>
                            {this.state.selectedAssignmentType ?
                                <div>
                                    <div style={divStyle}>
                                        <h2>Total Submissions</h2>
                                        <p>Number of Submissions for {this.state.selectedAssignmentType}'s Assignments</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="85%" height={280}>
                                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].tempDDNode.chart08DD.data}>
                                            <XAxis dataKey="assignment" tick={false} label={{ value: "Assignments" }} />/>
                                            <YAxis label={{ value: "Count", angle: -90, position: "insideBottomLeft", offset: 12 }} />
                                            <Tooltip />
                                            <Legend verticalAlign="top" align="right" />
                                            <Bar name="Num of Submission" dataKey="value" fill="#8884d8" onClick={(data, index) => this.selectedAssignment(data)}>
                                                {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].tempDDNode.chart08DD.data.map((entry, index) => (
                                                    <Cell
                                                        key={entry['assignment']}
                                                        fill={entry.assignment == this.state.selectedAssignment ? '#87f2de' : (entry.value < entry.expected ? '#d68995' : '#71afe2')}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {this.isFav("chart08DD") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08DD", "Chart has been removed!") }}>Remove</Button>
                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08DD", "BarChart", "Total Submissions", "Number of Submissions per " + this.state.selectedAssignmentType + "'s Assignment", "assignment", "", ["value"], "Chart has been added!") }}>Favourite</Button>
                                    }
                                </div>
                                :
                                <div></div>
                            }
                        </Paper>
                    </Grid>

                    {/* chart08DDAdd */}
                    {/* name List of those who did not submit assignment */}
                    {this.state.selectedAssignment ?
                        <Grid item xs={6}>
                            <Paper>
                                <div>
                                    <div style={divStyle}>
                                        <h2>Name list of students</h2>
                                        <p>Identify Students Who Have Not Submitted {this.state.selectedAssignment}</p>
                                        <Divider />
                                    </div>

                                    <ResponsiveContainer width="85%" height={280}>
                                        <div align="center" style={{ height: "inherit", width: "auto" }}>

                                            <div style={{ width: "90%", height: "inherit" }}>
                                                <Typography variant="subheading" style={{ backgroundColor: "orange" }}>
                                                    <strong>Uncompleted</strong>
                                                </Typography>

                                                {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].tempDDNode.chart08DD.additionaldata.map(function (entry, index) {
                                                    if (entry.assignment == comp.state.selectedAssignment) {
                                                        if (entry.value == "All submitted") {
                                                            return (
                                                                <div>
                                                                    <h2>All submitted {comp.state.selectedAssignment}</h2>
                                                                </div>
                                                            )

                                                        } else {
                                                            var res = entry.value.split(", ")
                                                            return (
                                                                <ol style={{ height: "90%", overflow: "auto" }}>
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
                                    {this.isFav("chart08DDAdd") == true ?
                                        <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08DDAdd", "Chart has been removed!") }}>Remove</Button>
                                        :
                                        <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08DDAdd", "BarChart", "Name list of students", "Name list of those who have not submitted " + this.state.selectedAssignment, "", "", [], "Chart has been added!", this.state.selectedAssignment) }}>Favourite</Button>
                                    }
                                </div>
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }

                    {/* Word Cloud chart */}
                    {this.state.selectedAssignmentType == "PathProblem" ?
                        this.state.selectedAssignment ?
                            <Grid item xs={6}>
                                <Paper>
                                    <div style={divStyle}>
                                        <h2>Word Cloud</h2>
                                        <p>Identify Answers Which Most Students Give For {this.state.selectedAssignment}</p>
                                        <Divider />
                                    </div>

                                    {/* <ResponsiveContainer width="90%" height={350}>
                                        
                                    </ResponsiveContainer> */}
                                    {wordCloudArr.map(function (wordCloud, index) {
                                        if (wordCloud.slice(0, -4) == comp.state.selectedAssignment.split(" (")[0]) {
                                            console.log(wordcloudProp(wordCloud))
                                            return (
                                                <div id="wordmap2" key={index} align="center" >
                                                    <img src={wordcloudProp(wordCloud)} />
                                                </div>
                                            )
                                        }
                                    })}
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
        usersTable: state.firebase.val.usersTable.usersTable,
        myFavourites: state.myFavourites.favourites
    };
}

export default connect(mapStateToProps)(InstructorAssignmentType);


