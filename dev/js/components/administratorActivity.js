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

import {
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
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

class administratorActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: "",
            favourites: [],
            steps: ["AdministratorActivity"]
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
    
    selectedActivity(data){
        console.log("Selected Activity")
        console.log(data)
        // var newSteps = this.state.steps.push(data.Name)
        if(this.state.selectedActivity == ""){
            this.setState({selectedActivity: data.date, steps: [...this.state.steps, data.date] })
        }
        else{
            var array = this.state.steps;
            array.splice(-1, 1, data.date);
            this.setState({selectedActivity: data.date, steps: array })
        }
        console.log(this.state.steps)
    }

    backStep(){
        if(this.state.steps.length == 2){
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({steps: array });
            this.setState({selectedActivity: ""})
        }
    }

    reset(){
        var array = this.state.steps;
        this.setState({steps: ["AdministratorActivity"], selectedActivity: ""});
    }


    render() {
        const state = store.getState();
        return (
            <div>
                <h3>Chart05</h3>
                <h4>Title05</h4>
                <Grid container spacing={8}>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid item xs={12}>
                <BarChart
                    width={730}
                    height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.chart05.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="date"
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
                        Number of Submissions
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" onClick={(data, index) => this.selectedActivity(data)} />
                </BarChart>
                </Grid>
                {this.state.selectedActivity == "2018-02-21" ?
                <div>
                <Grid item xs={12}>
                <h3>Chart06</h3>
                <h4>Title06</h4>
                <LineChart
                    width={730}
                    height={500}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminActivity.chart06.data}
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="All Other Junior (NCC2018)" fill="#8884d8" />
                    <Line dataKey="CHIJ St Nicholas Girls School (NCC2018)" fill="#82ca9d" />
                    <Line dataKey="Clementi Town Secondary School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Crest Secondary School (NCC2018)" fill="#82ca9d" />
                    <Line dataKey="Dunman HS - Junior (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Holy Innocents HS (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Junyuan Secondary School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Maris Stella High School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="NUSHS - Junior (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Nan Hua High School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="National JC - Junior (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Ping Yi Secondary School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Queensway Secondary School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Sch of Science and Technology  (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Seng Kang Secondary School (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Singapore Chinese Girls Sch (NCC2018)" fill="#8884d8" />
                    <Line dataKey="Temasek JC - Junior (NCC2018)" fill="#8884d8" />
                    <Line dataKey="West Spring Secondary School (NCC2018)" fill="#8884d8" />
                </LineChart>
                </Grid>
                </div>
                :
                <div> </div>
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
        activeView: state.activeView,
        usersTable: state.firebase.val.usersTable.usersTable
    };
} 

export default connect(mapStateToProps)(administratorActivity); 


