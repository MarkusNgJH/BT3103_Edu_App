import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import App from './components/app';
import firebase from 'firebase';
import store from "./store";
//wrapping createStore in {} makes it usuable without declaring a var

var config = {
    apiKey: "AIzaSyDQQWrnzVTRzEpe22LQBtP16ic78AA1bag",
    authDomain: "bt3103-education-app-2.firebaseapp.com",
    databaseURL: "https://bt3103-education-app-2.firebaseio.com",
    projectId: "bt3103-education-app-2",
    storageBucket: "bt3103-education-app-2.appspot.com",
    messagingSenderId: "821115163051"
  };

try {
    firebase.initializeApp(config);
} catch (error) { }

var db = firebase.database();
db.ref("/").on("value", data => {
    if (data.val()) {
        store.dispatch({ type: "SET_VAL", payload: data.val() });
        console.log("dispatched & displaying getstate:");
        console.log(store.getState());
    }
});

let update_data = function () {

    let url = "https://xr9f801bi1.execute-api.us-west-2.amazonaws.com/prod/bt3103proj" // Instructor 
    // let url = "https://xcjnxteifi.execute-api.us-west-2.amazonaws.com/prod/bt3103prog-part2" // Instructor 
    // let url = "https://25o6knbtxb.execute-api.us-west-2.amazonaws.com/prod/bt3103proj-student1" // Student
    fetch(url, { mode: "no-cors" }).then(function (response) {
        console.log("Updated chart data", response);
    });
};
// Update the local time every 30 mins.
// setInterval(update_data, 180000); // remeber to comment out this in order to update firebase with live data 

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// we assign a store to provider which supplies data to the componenets in App