import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux'; 
import allReducers from './reducers';
import UserReducer from './reducers/reducer-users';
import App from './components/app'; 
import firebase from 'firebase';
//wrapping createStore in {} makes it usuable without declaring a var
const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <App />    
    </Provider> ,
    document.getElementById('root')
);
// we assign a store to provider which supplies data to the componenets in App