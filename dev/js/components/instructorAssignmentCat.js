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
    Cell
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
                <Grid container spacing={8}>
                <Stepper steps={this.state.steps} backStep={this.backStep.bind(this)} reset={this.reset.bind(this)}/>
                <Grid item xs={12}>
                <h3>Chart01</h3>
                <h4>What is the proportion of submission for each assignment?</h4>
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
                    <Tooltip cursor={{fill: 'red', fillOpacity: 0.05}} />
                    <Legend verticalAlign="top" align="right" />
                    {/* <Bar name="Number of Submissions" dataKey="value" fill="#8884d8"
                    onClick={(data, index) => this.selectedAssignment(data.assignment)} /> */}
                    <Bar name="Number of Submissions" dataKey="value"
                    onClick={(data, index) => this.selectedAssignment(data.assignment)}>
                        {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].instructorAssignment.chart01.data.map((entry, index) => (
                            <Cell key={entry.assignment} fill={entry.value < 20 ? '#d68995' : '#71afe2' }/>
                        ))}
                    </Bar>
                    <ReferenceLine y={33} strokeWidth={4} stroke="#e0b13c" label={{value: "Expected Submissions", position: "top"}} />
                    {/* <Line name="Expected number" type='monotone' dataKey='expected' stroke='#ff7300' dot={false} /> */}
                </BarChart>
                </Grid>
                
                {this.state.selectedAssignment == "" ?
                    <div>
                    <Grid item xs={12}>
                    <h3>Chart02</h3>
                    <h4>Is there sufficient days to complete assignments?</h4>
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
                    </Grid>
                    <Grid item xs={12}>
                    <h3>Chart03</h3>
                    <h4>How are my student behaviour in submitting my assignments?</h4>
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
                    </Grid>
                    </div>
                :
                    this.state.selectedAssignment == "Follow the directions in the details link to get a free AWS account. Then submit the string SUCCESSFUL. " ?
                        <div>
                        {/* <Button variant="raised" color="secondary" onClick={() => this.setState({selectedAssignment: ""})}>
                            Clear Selection <Delete />
                        </Button> */}
                        <Grid item xs={12}>
                        <h3>Chart04</h3>
                        <h4>Is there sufficient days to complete assignment "{this.state.selectedAssignment}"?</h4>
                        <br />
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
                        </Grid>
                        <Grid item xs={12}>
                        <h3>Chart06</h3>
                        <h4>How are my student behaviour in submitting assignment "{this.state.selectedAssignment}"?</h4>
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
                        </Grid>
                        </div>
                    :
                        this.state.selectedAssignment == "AWS Lambda Lab - Part 2 (7:13)" ?
                            <div>
                            {/* <Button variant="raised" color="secondary" onClick={() => this.setState({selectedAssignment: ""})}>
                                Clear Selection <Delete />
                            </Button> */}
                            <Grid item xs={12}>
                            <h3>Chart05</h3>
                            <h4>Is there sufficient days to complete assignment "{this.state.selectedAssignment}"?</h4>
                            <br />
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
                            </Grid>
                            <Grid item xs={12}>
                            <h3>Chart07</h3>
                            <h4>How are my student behaviour in submitting assignment "{this.state.selectedAssignment}"?</h4>
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
                            </Grid>
                            </div>
                        :
                            <div>No drilldown available for selected Assignment. Please select another assignment.</div>
                }

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