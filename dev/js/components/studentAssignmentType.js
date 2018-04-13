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
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import { Paper } from 'material-ui';
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
    Cell,
    Label
} from "recharts";
import { BarChart, Bar } from "recharts";
import { Typography } from 'material-ui';
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

class studentAssignmentType extends React.Component {
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

    render() {
        const state = store.getState();
        const { vertical, horizontal, snackOpen } = this.state;

        return (
            <div>
                <Grid container spacing={24} direction="row" align="center">

                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h3>Chart05</h3>
                                <h4>Assignment Type</h4>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={380}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignmentType.chart05.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >

                                    <XAxis dataKey="Name" hide={true}>
                                        <Label value="Assignment Type" offset={0} position="insideBottom" />
                                    </XAxis>

                                    <YAxis dataKey="Value">
                                        <Label value="Number of Submissions" angle={-90} offset={20} position="insideBottomLeft" />
                                    </YAxis>

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Bar name="Percentage of Assignment submitted" dataKey="Value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                            {this.isFav("chart05") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart05", "Chart05 has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart05", "BarChart", "Chart05", "Question Type", "Name", "Value", ["Value"], "Chart05 has been added!") }}>Favourite</Button>
                            }
                        </Paper>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <h3>Chart06</h3>
                        <h4>Which Students Appear To Be High-Achieving/Do More Than What Is Required?</h4>
                        <BarChart
                            width={730}
                            height={250}
                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorStudentIdentifier.chart13.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis
                                dataKey="student_name"
                                label={
                                    <AxisLabel axisType="xAxis" width={600} height={300}>
                                        Student
                        </AxisLabel>
                                }
                            />
                            <YAxis
                                dataKey="value"
                                label={
                                    <AxisLabel axisType="yAxis" width={600} height={300}>
                                        Number of Subsmission
                        </AxisLabel>
                                }
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </Grid> */}

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

export default connect(mapStateToProps)(studentAssignmentType);


