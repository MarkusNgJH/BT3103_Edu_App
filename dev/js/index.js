import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import allReducers from './reducers';
import UserReducer from './reducers/reducer-users';
import App from './components/app';
import firebase from 'firebase';
import store from "./store";
//wrapping createStore in {} makes it usuable without declaring a var

var config = {
    apiKey: "AIzaSyDDPOX8IjXbhO9pTJUEF5gTCcWjQwsHh5E",
    authDomain: "bt3103-education-app.firebaseapp.com",
    databaseURL: "https://bt3103-education-app.firebaseio.com",
    projectId: "bt3103-education-app",
    storageBucket: "bt3103-education-app.appspot.com",
    messagingSenderId: "549069820798"
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

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// we assign a store to provider which supplies data to the componenets in App