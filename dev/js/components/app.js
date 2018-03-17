import React, {Component} from 'react';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
require('../../scss/style.scss');

var config = {
    apiKey: "AIzaSyD9ECClGpGSF6KW30daXa37BiUqWrIpDxA",
    authDomain: "testfirebasebuild.firebaseapp.com",
    databaseURL: "https://testfirebasebuild.firebaseio.com",
    projectId: "testfirebasebuild",
    storageBucket: "testfirebasebuild.appspot.com",
    messagingSenderId: "214448176410"
  };
  try {
    firebase.initializeApp(config);
  } catch (error) {}
  
var db = firebase.database().ref();

// new syntax for esx to create functions
class App extends Component {
    constructor() {
        super();
        this.state = {
            speed: 11
        };
    }
    componentDidMount(){
        const rootRef = firebase.database().ref().child('testfirebasebuild');
        const valueRef = rootRef.child('value');
        valueRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
        // everytime data changes on valueRef, assign value to speed.
    }
    render(){
        return(
            <div>
                <h2> Username List: </h2>
                <UserList />
                <hr/>
                <h2> User Details:</h2>    
                <UserDetail />
                <h2> Print Database:</h2>    
                <h2> {this.state.speed} </h2>
            </div>
        );
    }
}

export default App; 

//component is the dumb part just specifying the layout
//container is the part connecting the provider and component