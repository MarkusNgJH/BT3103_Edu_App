import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import {PieChart, BarChart, Bar, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import AppFrame from './AppFrame';
// import Store from '../index.js';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleChange.bind(this);
    }
    componentDidMount() {
        const rootRef = firebase.database().ref('sampleData01');
        rootRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items){
                newState.push({
                    id: item,
                    level: items[item].level,
                    numPlayers: items[item].Players
                });
            }
            this.setState({
                items: newState
            });
        });
        // everytime data changes on valueRef, assign value to speed.
    }
    render() {
        return (
            <div> 
                <ul>
                {this.state.items.map((item) => {
                    return (
                        <li key={item.id}>
                            <h3>Level:{item.level}</h3>
                            <p>Players:{item.numPlayers}</p>
                        </li>
                    )
                })} 
                </ul>
                <BarChart width={700} height={400} data={this.state.items}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis label={{ value: 'Players', angle: -90, position: 'insideLeft' }} />
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey= 'numPlayers' fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {charts : state}
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;