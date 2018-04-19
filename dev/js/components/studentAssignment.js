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
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import Close from 'material-ui-icons/Close';

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
    Label
} from "recharts";
import { BarChart, Bar } from "recharts";
import { Paper } from 'material-ui';
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

class studentAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignment: "",
            favourites: [],
            steps: ["studentAssignment"],
            snackOpen: false,
            vertical: null,
            horizontal: null,
        }
        // this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites; // Pulls from fb, comment out this for launch
        this.state.favourites = this.props.myFavourites // pulls from local store, use this for demo
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(chip) {
        if (chip == "assignmentType") {
            this.setState({ selectedAssignment: "" })
        }
        // if (chip == "video") {
        //     this.setState({ selectedVideo: "" })
        // }
    }

    selectedAssignment(data) {
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if (this.state.selectedAssignment == "") {
            this.setState({ selectedAssignment: data["payload"]["Name"], steps: [...this.state.steps, data["payload"]["Name"]] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data["payload"]["Name"]);
            this.setState({ selectedAssignment: data["payload"]["Name"], steps: array })
        }
        console.log(this.state.steps)
        console.log(data["payload"]["Name"])
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
        this.setState({ steps: ["InstructorAssignment"], selectedAssignment: "" });
    }

    isFav(chartName) {
        for (var i = 0; i < this.state.favourites.length; i++) {
            if (typeof (this.state.favourites[i]) == 'object') {
                if (this.state.favourites[i]["chart"] == chartName) {
                    // console.log(chartName, "is in favourites");
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
        // console.log("Successfully added", chart)
        // console.log("Updated favs:", this.state.favourites)
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

    render() {
        const state = store.getState();
        const { vertical, horizontal, snackOpen } = this.state;

        return (
            <div>
                <Paper className="chip_container" id="breadcrumbs">
                    <div className="chip">
                        StudentAssignment
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
                            <button onClick={() => this.handleDelete("assignmentType")}>
                                <Close />
                            </button>
                        </div>
                    }
                </Paper>
                <Grid container spacing={24} direction="row" align="center" justify="space-between">
                    <Grid item xs={12} sm={9} md={6} xl={4}>
                        <Paper>
                            <div style={divStyle}>
                                <h3>Assignment Type</h3>
                                <p>Measure Submission Rate by Assignment Type</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={280}>
                                <BarChart
                                    // layout="vertical"
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignmentType.chart05.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >

                                    <XAxis dataKey="Name"
                                        type="category"
                                    />
                                    {/* <Label value="Assignment Type" offset={0} position="insideBottom" /> */}

                                    <YAxis dataKey="Value"
                                        type="number"
                                        width={20}
                                    // <Label value="Submission Count" angle={-90} offset={20} position="insideBottomLeft" />
                                    />

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Bar name="Submission Rate (%)" dataKey="Value" fill="#8884d8" >
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignmentType.chart05.data.map((entry, index) => (
                                            <Cell
                                                key={entry['Name']}
                                                fill={entry.Name == this.state.selectedAssignment ? '#87f2de' : (entry.Value < 100 ? '#d68995' : '#71afe2')}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            {/* {this.isFav("chart05") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart05", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart05", "BarChart", "Chart05", "Question Type", "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>  {/*chart01*/}
                        <Paper>
                            <div style={divStyle}>
                                <h3>Assignment</h3>
                                <p>Track Assignment by Completion Status</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={280}>
                                <PieChart
                                    width={730}
                                    height={250}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <Pie
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart01.data}
                                        dataKey="Value" outerRadius={100} nameKey="Name"
                                        onClick={(data, index) => this.selectedAssignment(data)}
                                    // onClick={(data, index) => console.log(data)}
                                    >
                                        
                                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart01.data.map(
                                            function (entry, index) {
                                                return (
                                                    <Cell
                                                        key={entry.Name}
                                                        fill={entry.Name == "Uncompleted" ? "#d68995" : "#71afe2"}
                                                    />
                                                )
                                            })}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* {this.isFav("chart01") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart01", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart01", "PieChart", "Chart01", "Assignments completed by Student", "", "", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>

                    <Grid item xs={6} zeroMinWidth> {/*chart03*/}
                        <Paper>
                            <div style={divStyle}>
                                <h3>Assignment</h3>
                                <p>Track Number of Submissions per Date</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart03.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis dataKey="Name" hide={true}>
                                        <Label value="Date" offset={-5} position="insideBottom" />
                                    </XAxis>

                                    <YAxis dataKey="Value">
                                        <Label value="Number of Assignments Submitted" angle={-90} offset={0} position="insideBottomLeft" />
                                    </YAxis>

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Line name="Assignments Submitted" dataKey="Value" fill="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                            {/* {this.isFav("chart03") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart03", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart03", "LineChart", "Chart03", "Date of Submissison", "name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>

                    <Grid item xs={6} zeroMinWidth>
                        <Paper>
                            <div style={divStyle}>
                                <h3>Assignment</h3>
                                <p>Track Number of Days to Complete Assignments</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart04.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis dataKey="Name">
                                        <Label value="Number of Days Lapsed" offset={-3} position="insideBottom" />
                                    </XAxis>

                                    <YAxis dataKey="Value">
                                        <Label value="Number of Assignments" angle={-90} offset={0} position="insideBottomLeft" />
                                    </YAxis>

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar name="Number of Assignments" dataKey="Value" fill="#8884d8" />
                                    <Tooltip cursor={{ fill: 'red', fillOpacity: 0.05 }} />
                                </BarChart>
                            </ResponsiveContainer>
                            {/* {this.isFav("chart04") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart04", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart04", "BarChart", "Chart04", "Time Lapse Since Work Done", "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>

                    {this.state.selectedAssignment ?
                        <Grid item xs={6}> {/* chart02 */}
                            <Paper>
                                <div style={divStyle}>
                                    <h3>Assignment</h3>
                                    <p>Identify Assignments by Status</p>
                                    <Divider />
                                </div>
                                <ResponsiveContainer width="90%" height={280}>
                                    <div align="center" style={{ height: "inherit", width: "auto" }}>
                                        <div style={{ float: "left", width: "50%", height: "inherit" }}>
                                            <Typography variant="subheading" style={{ backgroundColor: "lightgreen" }}>
                                                <strong>Completed</strong>
                                            </Typography>

                                            <ol style={{ height: "90%", overflow: "auto", margin: "0", padding: "auto" }}>
                                                {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart02.data.map(function (entry, index) {
                                                    if (entry.Value == 1) {
                                                        return (
                                                            <li style={{ margin: "6px", padding: "5px", textAlign: "left" }}>{entry.Name}</li>
                                                        )
                                                    }
                                                })}
                                            </ol>
                                        </div>

                                        <div style={{ float: "left", width: "50%", height: "inherit" }}>
                                            <Typography variant="subheading" style={{ backgroundColor: "orange" }}>
                                                <strong>Uncompleted</strong>
                                            </Typography>

                                            <ol style={{ height: "90%", overflow: "auto" }}>
                                                {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart02.data.map(function (entry, index) {
                                                    if (entry.Value == 0) {
                                                        return (
                                                            <li style={{ margin: "6px", textAlign: "left" }}>{entry.Name}</li>
                                                        )
                                                    }
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                </ResponsiveContainer>
                                {/* {this.isFav("chart02") == true ?
                                    <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart02", "Chart has been removed!") }}>Remove</Button>
                                    :
                                    <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart02", "BarChart", "Chart02", "Assignment Tracking", "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                                } */}
                            </Paper>
                        </Grid>
                        :
                        <span></span>
                    }
                </Grid> {/*End of main Grid*/}
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

export default connect(mapStateToProps)(studentAssignment);


