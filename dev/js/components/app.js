import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import Recharts from '../containers/gridList';
import PageTwo from './page-two';
import LoginPage from './loginPage';
import UidPage from './uid';
import ProfileSetting from './profileSetting';
import Dashboard from './dashboard';
import Overview from './overview';
import instructorAssignmentType from './instructorAssignmentType';
import instructorAssignmentCat from './instructorAssignmentCat';
import instructorStudentIdentifier from './instructorStudentIdentifier';
import administratorActivity from './administratorActivity';
import administratorPerformance from './administratorPerformance';
import StudentAssignment from './studentAssignment';
import StudentAssignmentType from './studentAssignmentType';
import store from '../store';


require('../../scss/style.scss');
const provider = new firebase.auth.GoogleAuthProvider();

// Real time pulling data function here. setInterval()

class App extends Component {
    constructor() {
        super();
        this.state = {
            speed: 11,
            user: "Instructor B",
            uid: "default",
            view: "instructor"
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
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
    changeLogOut() {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        const state = store.getState()
        const routes = (
            <div className="mainContent">
                {/* Tell the page which component to display depending on the URL path */}
                <Switch>
                    <Route exact path='/' component={Overview} />
                    <Route exact path='/mydashboard' component={Dashboard} />
                    <Route exact path='/profilesetting' component={ProfileSetting} />
                    <Route exact path='/instructorAssignmentType' component={instructorAssignmentType} />
                    <Route exact path='/instructorAssignmentCat' component={instructorAssignmentCat} />
                    <Route exact path='/instructorStudentIdentifier' component={instructorStudentIdentifier} />
                    <Route exact path='/instructorAssignmentType' component={instructorAssignmentType} />
                    <Route exact path='/administratorActivity' component={administratorActivity} />
                    <Route exact path='/administratorPerformance' component={administratorPerformance} />
                    <Route exact path='/studentAssignment' component={StudentAssignment} />
                    <Route exact path='/studentAssignmentType' component={StudentAssignmentType} />
                </Switch>
            </div>
        )

        return (
            <div id="main">
                {this.state.user ?
                    <div className="mainContent">
                        <AppFrame uid={this.state.uid} email={this.state.user} view={this.state.view} changeUid={this.changeUid.bind(this)} changeView={this.changeView.bind(this)} changeLogOut={this.changeLogOut.bind(this)} logout={this.logout.bind(this)} body={routes} />
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