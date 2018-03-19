import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import Recharts from '../containers/recharts';
import Dashboard from './dashboard';
require('../../scss/style.scss');

var config = {
    apiKey: "AIzaSyAp5KgeDweFK8PQ1l6o-V2eaqLeOYN0GlY",
    authDomain: "bt3103-edu-app.firebaseapp.com",
    databaseURL: "https://bt3103-edu-app.firebaseio.com",
    projectId: "bt3103-edu-app",
    storageBucket: "bt3103-edu-app.appspot.com",
    messagingSenderId: "478259615153"
};
try {
    firebase.initializeApp(config);
} catch (error) { }


// new syntax for esx to create functions
class App extends Component {
    constructor() {
        super();
        this.state = {
            speed: 11
        };
    }
    componentDidMount() {
        const rootRef = firebase.database().ref("/");
        const valueRef = rootRef.child('value');
        valueRef.on('value', (snapshot) => {
            this.setState({
                speed: snapshot.val()
            });
        });
        // everytime data changes on valueRef, assign value to speed.
    }
    render() {

        const body = (
            <div>
                <h2> Username List: </h2>
                {/* <UserList /> */}
                <hr />
                <h2> User Details:</h2>
                {/* <UserDetail /> */}
                <h2> Print Database:</h2>
                <hr />
                <Recharts/>
            </div>
        )
        return (
            <div>
                <AppFrame children={body} />
                <h2> <Dashboard /> </h2>
            </div>
        );
    }
}

export default App;

//component is the dumb part just specifying the layout
//container is the part connecting the provider and component