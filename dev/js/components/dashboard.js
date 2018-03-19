import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
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
        const output = this.state.items
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
            </div>
        );
    }
}

export default Dashboard;