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
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Delete from 'material-ui-icons/Delete';
import store from '../store';
import Stepper from './stepper';
import Paper from 'material-ui/Paper';
import '../../scss/instructorAssignmentCat.scss';

import {
    PieChart, Pie,
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    ComposedChart,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ReferenceLine,
    Cell,
    ResponsiveContainer
  } from "recharts";
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

class InstructorAssignmentCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAssignment: "",
            steps: ["InstructorAssignmentCat"]
            // selectedVideo: ""
        }
    }

    selectedAssignment(data){
        if(this.state.selectedAssignment == ""){
            this.setState({selectedAssignment: data, steps: [...this.state.steps, data] })
        }
        else{
            var array = this.state.steps;
            array.splice(-1, 1, data);
            this.setState({selectedAssignment: data, steps: array })
        }
    }

    backStep(){
        if(this.state.steps.length == 2){
            var array = this.state.steps;
            array.splice(-1, 1); //remove last element
            this.setState({steps: array });
            this.setState({selectedAssignment: ""})
        }
    }
    reset(){
        var array = this.state.steps;
        this.setState({steps: ["InstructorAssignmentCat"], selectedAssignment: ""});
    }

    // selectedVideo(data){
    //     this.setState({selectedVideo: data.Name})
    // }

    render() {
        return (
            <div>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid container spacing={24} alignItems="stretch" justify="center" align="center">

                {/** CHART 01*/}
                <Grid item xs={12}>
                <Paper>
                <div style={divStyle}>
                <h2>Chart01</h2>
                <p>What is the proportion of submission for each assignment?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="assignment"
                    label={{value:"Assignments", position:"insideBottom"}}
                    ticks={[0]}
                    />
                    <YAxis
                    dataKey="value"
                    // label={{ value: 'Number of Submissions', angle: -90, position: 'insideBottomLeft' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip cursor={{fill: 'red', fillOpacity: 0.1}} />
                    <Legend verticalAlign="top" align="right" />
                    {/* <Bar name="Number of Submissions" dataKey="value" fill="#8884d8"
                    onClick={(data, index) => this.selectedAssignment(data.assignment)} /> */}
                    <Bar name="Number of Submissions" dataKey="value"
                    onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data.map((entry, index) => (
                            <Cell
                            key={entry.assignment}
                            fill={entry.assignment == this.state.selectedAssignment ? '#87f2de' : (entry.value < 20 ? '#d68995' : '#71afe2')}
                            // strokeWidth={entry.assignment == this.state.selectedAssignment ? 2 : 0}
                            // stroke="red"
                            />
                        ))}
                    </Bar>
                    <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{value: "Expected Submissions", position: "top"}} />
                    {/* <Line name="Expected number" type='monotone' dataKey='expected' stroke='#ff7300' dot={false} /> */}
                </BarChart>
                </ResponsiveContainer>
                </Paper>
                </Grid>
                
                {/** CHART 02*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "" ?
                <div>
                <div style={divStyle}>
                <h2>Chart02</h2>
                <p>Is there sufficient days to complete assignments?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart02.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="days_lapsed"
                    label={{ value: "Number of days elapsed", position: 'insideBottom', offset: -4}}
                    />
                    <YAxis
                    dataKey="value"
                    // label={{ value: "Number of submissions", angle: -90, position: 'insideBottomLeft' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip cursor={{fill: 'red', fillOpacity: 0.05}} />
                    <Legend verticalAlign="top" align="right" />
                    <Bar name="Number of Submissions" dataKey="value" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>}
                </Paper>
                </Grid>

                {/** CHART 03*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "" ?
                <div>
                <div style={divStyle}>
                <h2>Chart03</h2>
                <p>How are my student behaviour in submitting my assignments?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <AreaChart width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart03.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date_time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>
                }
                </Paper>
                </Grid>
                
                {/** CHART 04*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "Follow the directions in the details link to get a free AWS account. Then submit the string SUCCESSFUL. " ?
                <div>
                <div style={divStyle}>
                <h2>Chart04</h2>
                <p>Is there sufficient days to complete assignment "{this.state.selectedAssignment}"?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart04.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="day_lapsed_from_assignmentX"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        xAxis
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        yAxis
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>
                }
                </Paper>
                </Grid>

                {/** CHART 06*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "Follow the directions in the details link to get a free AWS account. Then submit the string SUCCESSFUL. " ?
                <div>
                <div style={divStyle}>
                <h2>Chart06</h2>
                <p>How are my student behaviour in submitting assignment "{this.state.selectedAssignment}"?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <AreaChart width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart06.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date_time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>
                }
                </Paper>
                </Grid>

                {/** CHART 05*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "AWS Lambda Lab - Part 2 (7:13)" ?
                <div>
                <div style={divStyle}>
                <h2>Chart05</h2>
                <p>Is there sufficient days to complete assignment "{this.state.selectedAssignment}"?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <BarChart
                    width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart05.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis
                    dataKey="day_lapsed_from_assignmentX"
                    label={
                        <AxisLabel axisType="xAxis" width={600} height={300}>
                        xAxis
                        </AxisLabel>
                    }
                    />
                    <YAxis
                    dataKey="value"
                    label={
                        <AxisLabel axisType="yAxis" width={600} height={300}>
                        yAxis
                        </AxisLabel>
                    }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>
                }
                </Paper>
                </Grid>

                {/** CHART 07*/}
                <Grid item xs={6}>
                <Paper>
                {this.state.selectedAssignment == "AWS Lambda Lab - Part 2 (7:13)" ?
                <div>
                <div style={divStyle}>
                <h2>Chart07</h2>
                <p>How are my student behaviour in submitting assignment "{this.state.selectedAssignment}"?</p>
                </div>
                <ResponsiveContainer width="90%" height={380}>
                <AreaChart width={730} height={250}
                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart07.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date_time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
                :
                <div></div>
                }
                </Paper>
                </Grid>

                {/** End of Grid container*/}
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

export default connect(mapStateToProps)(InstructorAssignmentCat);