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
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
    Brush,
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

var divStyle = {
    padding: "1px"
};

class administratorPerformance extends React.Component {
    render() {
        const state = store.getState();
        return (
            <div>
                <Grid container spacing={40} direction="row" align="center">
                    {/** CHART 01 */}
                    {/* <Grid item xs={12}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Assignments completion rate</h2>
                                <p>({this.props.activeProfile.course})</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={380}>
                                <PieChart width={730} height={250} >
                                    <Pie
                                        dataKey="value"
                                        fill="#8884d8"
                                        data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.chart01.data}
                                        outerRadius={80}
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid> */}

                    {/** CHART 02 */}
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item xs={12} md={10}>
                                <Paper>
                                    <div style={divStyle}>
                                        <h2>Performance across Cohorts</h2>
                                        <p>Assignments submission rate</p>
                                        <Divider />
                                    </div>
                                    <ResponsiveContainer width="90%" height={240}>
                                        <BarChart
                                            width={730}
                                            height={250}
                                            data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.chart02.data}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            layout="vertical"
                                        >
                                            <XAxis
                                                type="number"
                                                dataKey="Value"
                                                label={{ value: 'Submission Rate (%)', position: 'insideBottom' }}
                                                height={50}
                                                />
                                            />
                                            <YAxis
                                                dataKey="Name"
                                                type="category"
                                                width={180}
                                            />
                                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                            <Tooltip />
                                            {/* <Legend verticalAlign="top" align="right" /> */}
                                            <Bar dataKey="Value">
                                            {this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.chart02.data.map((entry, index) => (
                                            <Cell
                                                key={entry.Name}
                                                fill={entry.Name == this.props.activeProfile.course ? '#edc62a' : '#e8e65c'}
                                            />
                                            ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    {/** CHART 03 */}
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Performance by Individual Courses (%)</h2>
                                <p>Assignments submission rate</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={300}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.chart03.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    syncId="individualCourses"
                                >
                                    <XAxis
                                        dataKey="Name"
                                        label={{ value: "Courses", position: "insideBottom" }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="Progress"
                                        label={{ value: "Submission Rate (%)", angle: -90, position: "insideLeft" }}
                                    />
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <Tooltip />
                                    <Legend verticalAlign="top" align="right" />
                                    <Bar dataKey="Progress" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/** CHART 04 */}
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <div style={divStyle}>
                                <h2>Performance by Individual Courses (count)</h2>
                                <p>Count of Assignment Submissions</p>
                                <Divider />
                            </div>
                            <ResponsiveContainer width="90%" height={300}>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={this.props.firebase.val[this.props.activeProfile.uid][this.props.activeProfile.course].adminPerformance.chart04.data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    syncId="individualCourses"
                                >
                                    <XAxis
                                        dataKey="Name"
                                        label={{ value: "Courses", position: "insideBottom" }}
                                        ticks={[0]}
                                    />
                                    <YAxis
                                        dataKey="Completed"
                                        label={
                                            <AxisLabel axisType="yAxis" width={600} height={300}>
                                                Submission Count
                                            </AxisLabel>
                                        }
                                    />
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <Tooltip />
                                    <Legend verticalAlign="top" align="right" />
                                    <Bar dataKey="Completed" stackId="a" fill="#8884d8" />
                                    <Bar dataKey="Uncompleted" stackId="a" fill="#76a8dd" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

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

export default connect(mapStateToProps)(administratorPerformance);


