import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import Recharts from '../containers/recharts';
import TheNewBoston from './thenewboston';
import PageTwo from './page-two';
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
                <Switch>
                    <Route exact path='/' component={TheNewBoston} />
                    <Route exact path='/page2' component={PageTwo} />
                </Switch>
                <hr />
                <h4>"<strong>{this.state.speed}</strong>" is rendered from Firebase and will be seen on every page.</h4>
            </div>
        )
        return (
            <div>
                <AppFrame children={body} />
            </div>
        );
    }
}

export default App;

//component is the dumb part just specifying the layout
//container is the part connecting the provider and component