import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import Recharts from '../containers/gridList';
import TheNewBoston from './thenewboston';
import PageTwo from './page-two';
import LoginPage from './loginPage';
import UidPage from './uid';
import ProfileSetting from './profileSetting';
import Overview from './overview';

require('../../scss/style.scss');
const provider = new firebase.auth.GoogleAuthProvider();


// new syntax for esx to create functions
class App extends Component {
    constructor() {
        super();
        this.state = {
            speed: 11,
            user: "Instructor B",
            uid: "",
            view: "administrator"
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        const rootRef = firebase.database().ref("/Instructor");
        var branch = this.state.user;
        console.log("branch is")
        console.log(branch)
        const valueRef = rootRef.child(String(branch));
        valueRef.on('value', (snapshot) => {
            this.setState({
                speed: snapshot.val()
            });
        });
        // everytime data changes on valueRef, assign value to speed.
    }
    componentWillMount() { //persists the login auth
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user: user.email, uid: this.state.uid });
            } 
          });
    }

    handleChange(e) {
        /* ... */
    }
    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }
    login() {
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                console.log(user.email)
                console.log(user.uid)
                this.setState({
                    user: user.email
                });
                console.log(this.state.user)
                const rootRef = firebase.database().ref("/Instructor");
                var branch = this.state.user;
                console.log("branch is")
                console.log(branch)
                const valueRef = rootRef.child(String(branch));
                valueRef.on('value', (snapshot) => {
                    this.setState({
                        speed: snapshot.val()
                    });
                });
            });
    }
    changeUid(newValue) {
        this.setState({
          uid: newValue,
        });
      }
    changeView(newValue) {
        this.setState({
          view: newValue,
        });
      }
    changeLogOut(){
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        const body = (
            <div>
                {/* Tell the page which component to display depending on the URL path */}
                <Switch>
                    <Route exact path='/' component={TheNewBoston} />
                    <Route exact path='/page2' component={PageTwo} />
                    <Route exact path='/profileSetting' component={ProfileSetting} />
                    <Route exact path='/overview' component={ProfileSetting} />
                </Switch>
                {/*  */}

                <hr />
                <h4>"<strong>{this.state.speed}</strong>" is rendered from Firebase and will be seen on every page.</h4>
            </div>
        )
        return (
            <div id="main">
                {this.state.user ?
                    <div>
                        {this.state.uid.length != 0 ?
                            <div> 
                                <AppFrame uid={this.state.uid} email={this.state.user} view={this.state.view}
                                changeLogOut={this.changeLogOut.bind(this)}  body={body}/> <br />
                                (AppFrame) state uid is
                                {this.state.uid}
                                <br/>
                                (AppFrame) View Type is
                                {this.state.view}
                                <ProfileSetting 
                                uid={this.state.uid} changeUid={this.changeUid.bind(this)} 
                                view={this.state.view} changeView={this.changeView.bind(this)} 
                                />
                            </div>
                            :
                            <div>
                                <button onClick={this.logout}>Log Out</button> <br /><br />
                                <UidPage uid={this.state.uid} changeUid={this.changeUid.bind(this)} body={body}/> <br />
                                (UidPage)state uid is
                                {this.state.uid}
                                <Overview />
                                {this.props.body}
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <LoginPage login={this.login} />
                    </div>
                }

            </div>
        );
    }
}

export default App;

//component is the dumb part just specifying the layout
//container is the part connecting the provider and component