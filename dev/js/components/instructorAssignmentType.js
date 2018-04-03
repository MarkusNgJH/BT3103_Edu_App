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

class InstructorAssignmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignmentType: "",
            selectedVideo: ""
        }
    }

    selectedAssignmentType(data){
        this.setState({selectedAssignmentType: data.Name})
    }

    selectedVideo(data){
        this.setState({selectedVideo: data.Name})
    }

    render() {
        return (
            <div>
                <Grid container spacing={8}>
                <Grid item xs={12}>
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
                    onClick={(data, index) => this.selectedAssignmentType(data)} />
                </BarChart>
                </Grid>
                
                <div>
                {this.state.selectedAssignmentType ?
                    <div>
                        {this.state.selectedAssignmentType} selected
                        <Grid item xs={6}>
                        <BarChart width={730} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="plays" fill="#8884d8" onClick={(data, index) => this.selectedVideo(data)}/>
                        <Bar dataKey="rate" fill="#82ca9d" />
                        </BarChart>
                        </Grid>

                        <Grid item xs={6}>
                        <BarChart width={730} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart10.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pauses" fill="#8884d8" />
                        <Bar dataKey="playbacks" fill="#82ca9d" />
                        </BarChart>
                        </Grid>
                        {this.state.selectedVideo ?
                            <Grid item xs={6}>
                            <BarChart width={730} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart11.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Value" fill="#8884d8" />
                            </BarChart>
                            </Grid>
                            :
                            <div></div>
                        }
                    </div>
                    :
                    <div></div>
                }
                </div>
                
                </Grid>
                
            </div> 

        );
    }
}

function mapStateToProps(state){
    return{
        firebase: state.firebase,
        activeProfile: state.activeProfile.val,
        activeView: state.activeView
    };
}    

export default connect(mapStateToProps)(InstructorAssignmentType); 

