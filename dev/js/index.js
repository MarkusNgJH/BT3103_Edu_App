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

var db = firebase.database();
db.ref("/newCharts").on("value", data => {
    if (data.val()) {
        store.dispatch({ type: "SET_VAL_newCharts", payload: data.val() });
        console.log("dispatched & displaying getstate:");
        console.log(store.getState());
    }
});
db.ref("/DevTeam").on("value", data => {
    if (data.val()) {
        store.dispatch({ type: "SET_VAL_acheivements", payload: data.val() });
        console.log("acheivement getstate:");
        console.log(store.getState().acheivement.val);
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