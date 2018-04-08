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
    }

    selectedAssignment(data) {
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if (this.state.selectedAssignment == "") {
            this.setState({ selectedAssignment: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({ selectedAssignment: data.Name, steps: array })
        }
        console.log(this.state.steps)
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
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)} />

                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <h3>Chart01</h3>
                        <h4>Assignments completed by Student</h4>
                        <PieChart
                            width={730}
                            height={250}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <Pie
                                data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart01.data}
                                cx="50%" cy="50%"
                                dataKey="Value" nameKey="Name" outerRadius={100} fill="#8884d8" label
                                onClick={(data, index) => this.selectedAssignment(data)} />
                        </PieChart>
                    </Grid>
                    {this.state.selectedAssignment ?
                        <div>
                            <Grid item xs={12}>
                                <h3>Chart02</h3>
                                <h4>Assignment Tracking</h4>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart02.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="Name"
                                        label={
                                            <AxisLabel axisType="xAxis" width={600} height={300}>
                                                Student
                        </AxisLabel>
                                        }
                                    />
                                    <YAxis
                                        dataKey="Value"
                                        label={
                                            <AxisLabel axisType="yAxis" width={600} height={300}>
                                                Number of Subsmission
                        </AxisLabel>
                                        }
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Value" fill="#8884d8" />
                                </BarChart>
                            </Grid>
                        </div>
                        :
                        <div>
                            <Grid item xs={12}>
                                <h3>Chart03</h3>
                                <h4>Date of Submissison</h4>
                                <LineChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart03.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="name"
                                        label={
                                            <AxisLabel axisType="xAxis" width={600} height={300}>
                                                Student
                        </AxisLabel>
                                        }
                                    />
                                    <YAxis
                                        dataKey="Value"
                                        label={
                                            <AxisLabel axisType="yAxis" width={600} height={300}>
                                                Number of Days Taken
                        </AxisLabel>
                                        }
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line dataKey="Value" fill="#8884d8" />
                                </LineChart>
                            </Grid>

                            <Grid item xs={12}>
                                <h3>Chart04</h3>
                                <h4>Time Lapse Since Work Done</h4>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].studentAssignment.chart04.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="Name"
                                        label={
                                            <AxisLabel axisType="xAxis" width={600} height={300}>
                                                Student
                        </AxisLabel>
                                        }
                                    />
                                    <YAxis
                                        dataKey="Value"
                                        label={
                                            <AxisLabel axisType="yAxis" width={600} height={300}>
                                                Number of Days Taken
                        </AxisLabel>
                                        }
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Value" fill="#8884d8" />
                                </BarChart>
                            </Grid>
                        </div>
                    }

                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView
    };
}

export default connect(mapStateToProps)(studentAssignment);


