import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import App from './components/app';
import firebase from 'firebase';
import store from "./store";
import Favicon from 'react-favicon';
//wrapping createStore in {} makes it usuable without declaring a var

var config = {
    apiKey: "AIzaSyCxq1LkoNLRvkRH5sW63B4NGWniVqQarWM",
    authDomain: "edusparks-7f8bc.firebaseapp.com",
    databaseURL: "https://edusparks-7f8bc.firebaseio.com",
    projectId: "edusparks-7f8bc",
    storageBucket: "edusparks-7f8bc.appspot.com",
    messagingSenderId: "589628670686"
  };

// old firebase
// var config = {
// apiKey: "AIzaSyDQQWrnzVTRzEpe22LQBtP16ic78AA1bag",
// authDomain: "bt3103-education-app-2.firebaseapp.com",
// databaseURL: "https://bt3103-education-app-2.firebaseio.com",
// projectId: "bt3103-education-app-2",
// storageBucket: "bt3103-education-app-2.appspot.com",
// messagingSenderId: "821115163051"
//   };

try {
    firebase.initializeApp(config);
} catch (error) { }

var db = firebase.database();
db.ref("/").on("value", data => {
    if (data.val()) {
        // console.log("BEFORE");
        // console.log(store.getState());
        store.dispatch({ type: "SET_VAL", payload: data.val() });
        store.dispatch({ type: "SET_LOADER", payload: false});
        console.log("dispatched & displaying getstate:");
        console.log(store.getState());
    }
});

let update_data = function () {
    let urlInstructorAssignmentType = "https://hcvb86chkl.execute-api.us-west-2.amazonaws.com/prod/instructor_assignmentType";
    let urlInstructorAssignmentCat = "https://d1pvj1k2kj.execute-api.us-west-2.amazonaws.com/prod/instructor_assignment";
    let urlInstructorIdentifier = "https://wl70qbpfcd.execute-api.us-west-2.amazonaws.com/prod/instructor_student";
    let urlStudentAssignment = "https://60kp1426q6.execute-api.us-west-2.amazonaws.com/first/studentAssignment_populate";
    let urlStudentAssignmentType = "https://ez7lil7zde.execute-api.us-west-2.amazonaws.com/first/studentAssignmentType_populate";
    let urlAdminActivity = "https://7wkx465txa.execute-api.us-west-2.amazonaws.com/first/adminActivity";
    let urlAdminPerformance = "https://gcy0jhhn40.execute-api.us-west-2.amazonaws.com/1/adminPerformance";
    console.log("fetching live data...")
    fetch(urlInstructorAssignmentType, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlInstructorAssignmentType", response);
    });
    fetch(urlInstructorAssignmentCat, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlInstructorAssignmentCat", response);
    });
    fetch(urlInstructorIdentifier, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlInstructorIdentifier", response);
    });
    fetch(urlStudentAssignment, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlStudentAssignment", response);
    });
    fetch(urlStudentAssignmentType, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlStudentAssignmentType", response);
    });
    fetch(urlAdminActivity, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlAdminActivity", response);
    });
    fetch(urlAdminPerformance, { mode: "no-cors" }).then(function (response) {
        console.log("updated urlAdminPerformance", response);
    });
};

// Retrieve live data every 2 hours.
setInterval(update_data, 7200000);

ReactDOM.render(
    <div>
        <Favicon url="http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/lightning-icon.png" />
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);
// we assign a store to provider which supplies data to the componenets in App