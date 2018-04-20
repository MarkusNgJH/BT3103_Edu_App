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
import CustomToolTip from './customAdminActivityTooltip'

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
    Brush
} from "recharts";
import { BarChart, Bar } from "recharts";
import Paper from 'material-ui/Paper';
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

class administratorActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: "",
            favourites: [],
            steps: ["AdministratorActivity"],
            selected: {} // to store dataset of the selected bar
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
        // console.log(chartName, "is NOT in favourites");
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

    selectedActivity(data) {
        console.log("Selected Activity")
        console.log(data)
        // var newSteps = this.state.steps.push(data.Name)
        if (this.state.selectedActivity == "") {
            this.setState({ selectedActivity: data.payload["Name"], steps: [...this.state.steps, data.date] })
        }
        else {
            var array = this.state.steps;
            array.splice(-1, 1, data.payload["Name"]);
            this.setState({ selectedActivity: data.payload["Name"], steps: array })
        }
        console.log(this.state.steps)

        var dataArr = this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.chart06.data
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i]["Name"] == data.payload["Name"]) {
                // console.log("Found the data!")
                // console.log(dataArr[i])
                var arr = []

                for (var key in dataArr[i]) {
                    if (dataArr[i][key] !== data.payload["Name"]) {
                        var temp = {
                            name: key,
                            value: dataArr[i][key]
                        }
                        arr.push(temp)
                    }
                }
                // console.log(arr)

                this.setState({
                    selected: arr
                })
                break;
            }
        }
    }

    backStep() {
        if (this.state.steps.length == 2) {
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({ steps: array });
            this.setState({ selectedActivity: "" })
        }
    }

    reset() {
        var array = this.state.steps;
        this.setState({ steps: ["AdministratorActivity"], selectedActivity: "" });
    }

    render() {
        const state = store.getState();
        return (
            <div>

                {/** CHART 05 */}
                <Grid container spacing={24} direction="row" align="center">
                    <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Total Activity Across Time</h2>
                                <h4>Track Total Daily Activity </h4>
                                <p>{this.props.activeProfile.course}</p>
                            </div>

                            <ResponsiveContainer width="90%" height={240}>
                                <LineChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.chart05.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    syncId="individualDates"
                                >
                                    <XAxis dataKey="Name" />
                                    <YAxis
                                        dataKey="Value"        
                                        label={{ value: "Number of Activities", angle: -90, position: "insideBottomLeft" }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip cursor={{ stroke: 'orange', strokeWidth: 3 }} />
                                    <Line dataKey="Value" fill="#8884d8" stroke="#8884d8" activeDot={{ onClick: (data, index) => this.selectedActivity(data) }} />
                                    <Brush />
                                </LineChart>
                            </ResponsiveContainer>
                            <div>
                            <div style={divStyle}>
                                <h2>Cohort Activity Across Time</h2>
                                <h4>Track Daily Activity by Course</h4>
                            </div>
                            <ResponsiveContainer width="90%" height={240}>
                                <LineChart
                                    width={730}
                                    height={500}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.chart06.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    syncId="individualDates"
                                >
                                    <XAxis dataKey="Name" />
                                    <YAxis
                                    label={{ value: "Number of Activities", angle: -90, position: "insideBottomLeft" }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip cursor={{ stroke: 'orange', strokeWidth: 3 }} content ={CustomToolTip}/>
                                    <Line dataKey="All Other Junior (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="CHIJ St Nicholas Girls School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Clementi Town Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Crest Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Dunman HS - Junior (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Holy Innocents HS (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Junyuan Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Maris Stella High School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="NUSHS - Junior (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Nan Hua High School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="National JC - Junior (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Ping Yi Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Queensway Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Sch of Science and Technology  (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Seng Kang Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Singapore Chinese Girls Sch (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="Temasek JC - Junior (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                    <Line dataKey="West Spring Secondary School (NCC2018)" fill="#e56d49" stroke="#e56d49" />
                                </LineChart>
                            </ResponsiveContainer>
                            </div>
                            {/* {this.isFav("chart05") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart05", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart05", "LineChart", "Cohort activity across time", this.props.activeProfile.course, "Name", "Value", ["Value"], "Chart has been added!") }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>

                    {/** CHART 06 */}
                    {/* {this.state.selectedActivity == "2018-02-21" ? */}
                    <Grid item xs={12}>
                        <Paper>
                            
                            {/* {this.isFav("chart06") == true ?
                                <Button style={{ margin: "5px" }} size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart06", "Chart has been removed!") }}>Remove</Button>
                                :
                                <Button style={{ margin: "5px" }} size="small" color="secondary" variant="raised" onClick={() => {
                                    this.addToFavourites("chart06", "LineChart", "Courses' activity across time", "", "Name", "",
                                        ["All Other Junior (NCC2018)", "CHIJ St Nicholas Girls School (NCC2018)", "Clementi Town Secondary School (NCC2018)", "Crest Secondary School (NCC2018)", "Dunman HS - Junior (NCC2018)",
                                            "Junyuan Secondary School (NCC2018)", "Maris Stella High School (NCC2018)", "NUSHS - Junior (NCC2018)", "Nan Hua High School (NCC2018)", "National JC - Junior (NCC2018)", "Ping Yi Secondary School (NCC2018)",
                                            "Queensway Secondary School (NCC2018)", "Sch of Science and Technology  (NCC2018)", "Seng Kang Secondary School (NCC2018)", "Singapore Chinese Girls Sch (NCC2018)",
                                            "Temasek JC - Junior (NCC2018)", "West Spring Secondary School (NCC2018)"],
                                        "Chart has been added!")
                                }}>Favourite</Button>
                            } */}
                        </Paper>
                    </Grid>
                    {/* :
                        <div> </div>
                    } */}
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
        myFavourites: state.myFavourites.favourites
    };
}

export default connect(mapStateToProps)(administratorActivity);


