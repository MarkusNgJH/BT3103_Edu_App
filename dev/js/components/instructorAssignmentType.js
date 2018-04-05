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

class InstructorAssignmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignmentType: "",
            selectedVideo: "",
            steps: ["InstructorAssignmentType"],
        }
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
        return (
            <div>
                <Grid container spacing={8}>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid item xs={12}>
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
                    onClick={(data, index) => this.selectedAssignmentType(data)} />
                </BarChart>
                </Grid>
                
                <div>
                {this.state.selectedAssignmentType == "PathProblem"?
                    <div>
                        {/* <Button variant="raised" color="secondary" onClick={() => this.setState({selectedAssignmentType: ""})}>
                            Clear Selection <Delete />
                        </Button> */}
                        <Grid item xs={6}>
                        <h3>Chart09</h3>
                        <h4>Which videos have my students watched and how is the pace for them? </h4>
                        <BarChart width={400} height={250} data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignmentType.chart09.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="plays" fill="#8884d8" onClick={(data, index) => this.selectedVideo(data)} />
                        <Bar dataKey="rate" fill="#82ca9d" onClick={(data, index) => this.selectedVideo(data)} />
                        </BarChart>
                        </Grid>

                        <Grid item xs={6}>
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
                        </Grid>
                        {this.state.selectedVideo == "AWS Lambda Lab - Part 1 (5:55)" ?
                            <div>
                            <Grid item xs={6}>
                            {/* <Button variant="raised" color="secondary" onClick={() => this.setState({selectedVideo: ""})}>
                            Clear Selection <Delete />
                            </Button> */}
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
                            </Grid>
                            </div>
                            :
                            <div> No drilldown available for selected Video. Please select another Video. </div>
                        }
                    </div>
                    :
                    <div> No drilldown available for selected Assignment. Please select another Assignment. </div>
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

