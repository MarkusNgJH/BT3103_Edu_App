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