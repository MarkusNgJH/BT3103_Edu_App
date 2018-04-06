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
import Paper from 'material-ui/Paper';

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

class InstructorAssignmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignmentType: "",
            selectedVideo: "",
            favourites: [],
            steps: ["InstructorAssignmentType"],
        }
        // this.state.favourites = Object.keys(this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType)
        this.state.favourites = this.props.usersTable[this.props.activeProfile.uid].favourites
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

    addToFavourites(chart, type, dataKey) {
        console.log("Adding", chart);
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

    removeFromFavourites(chart) {
        console.log("Removing", chart)

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
    
    selectedAssignmentType(data){
        console.log(this.state.steps)
        // var newSteps = this.state.steps.push(data.Name)
        if(this.state.selectedAssignmentType == ""){
            this.setState({selectedAssignmentType: data.Name, steps: [...this.state.steps, data.Name] })
        }
        else{
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({selectedAssignmentType: data.Name, steps: array })
        }
        console.log(this.state.steps)
    }

    selectedVideo(data){
        if(this.state.selectedVideo == ""){
            this.setState({selectedVideo: data.Name, steps: [...this.state.steps, data.Name]})
        }
        else{
            var array = this.state.steps;
            array.splice(-1, 1, data.Name);
            this.setState({selectedVideo: data.Name, steps: array })
        }
    }

    backStep(){
        if(this.state.steps.length == 2){
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({steps: array });
            this.setState({selectedAssignmentType: ""})
        }
        else if(this.state.steps.length == 3){
            var array = this.state.steps;
            array.splice(-1, 1);
            this.setState({steps: array });
            this.setState({selectedVideo: ""})
        }

    }
    reset(){
        var array = this.state.steps;
        this.setState({steps: ["InstructorAssignmentType"], selectedVideo: "", selectedAssignmentType: ""});
    }

    render() {
        console.log("My favourites:", this.state.favourites)
        return (
            <div>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid container spacing={8} direction="row" align="center">
                    <Grid item xs={12}>
                        <Paper>
                        <h3>Chart08</h3>
                        <h4>Which type of assignments do my students seem to be struggling with?</h4>
                        <BarChart
                            width={730}
                            height={250}
                            // data={this.props.firebase.val.R6nSbDVly8PUnC6jQFcseDS9sgJ3.BT3103.instructorAssignmentType.chart08.data}
                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <XAxis
                                dataKey="Name"
                                label={
                                    <AxisLabel axisType="xAxis" width={600} height={300}>
                                        xAxis
                                    </AxisLabel>
                                }
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
                            <Legend />
                            <Bar dataKey="Value" fill="#8884d8"
                            onClick={(data, index) => this.selectedAssignmentType(data)}>
                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart08.data.map((entry, index) => (
                                <Cell
                                key={entry['Name']}
                                fill={entry['Name'] == this.state.selectedAssignmentType ? '#87f2de' : '#71afe2'}
                                // strokeWidth={entry.assignment == this.state.selectedAssignment ? 2 : 0}
                                // stroke="red"
                                />
                            ))}
                            </Bar>
                        </BarChart>
                        {this.isFav("chart08") == true ?
                            <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart08") }}>Remove</Button>
                            :
                            <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart08", "BarChart", "Which type of assignments do my students seem to be struggling with?", "Name", "Value", ["Value"]) }}>Favourite</Button>
                        }
                    </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper>
                    {this.state.selectedAssignmentType == "PathProblem" ?
                        <div>
                        <h3>Chart09</h3>
                        <h4>Which videos have my students watched and how is the pace for them?</h4>
                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="plays" fill="#8884d8" onClick={(data, index) => this.selectedVideo(data)} />
                            <Bar dataKey="rate" fill="#82ca9d" onClick={(data, index) => this.selectedVideo(data)} />
                        </BarChart>
                        {this.isFav("chart09") == true ?
                            <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart09") }}>Remove</Button>
                            :
                            <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart09", "BarChart", "Which videos have my students watched and how is the pace for them?", "Name", "", ["plays", "rate"]) }}>Favourite</Button>
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
                        <h3>Chart10</h3>
                        <h4>Which videos do my students seem to be struggling with?</h4>
                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pauses" fill="#8884d8" />
                            <Bar dataKey="playbacks" fill="#82ca9d" />
                        </BarChart>
                        {this.isFav("chart10") == true ?
                            <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart10") }}>Remove</Button>
                            :
                            <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart10", "BarChart", "Which videos do my students seem to be struggling with?", "Name", "", ["pauses", "playbacks"]) }}>Favourite</Button>
                        }
                        </div>
                        :
                        <div></div>
                    }
                    </Paper>
                    </Grid>

                    <Grid item xs={12}>
                    <Paper>
                    {this.state.selectedVideo == "AWS Lambda Lab - Part 1 (5:55)" ?
                    <div>
                        <h3>Chart11</h3>
                        <h4>Which part of the video do my students struggle with/is valuable to them?</h4>
                        <BarChart width={730} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart11.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Value" fill="#8884d8" />
                        </BarChart>
                        {this.isFav("chart11") == true ?
                            <Button size="small" color="primary" variant="raised" onClick={() => { this.removeFromFavourites("chart11") }}>Remove</Button>
                            :
                            <Button size="small" color="secondary" variant="raised" onClick={() => { this.addToFavourites("chart11", "BarChart", "Which part of the video do my students struggle with/is valuable to them?", "Name", "", ["Value"]) }}>Favourite</Button>
                        }
                    </div>
                    :
                    <div></div>
                    }
                    </Paper>
                    </Grid>
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

