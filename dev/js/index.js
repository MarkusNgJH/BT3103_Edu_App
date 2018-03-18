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
//wrapping createStore in {} makes it usuable without declaring a var
const store = createStore(allReducers);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// we assign a store to provider which supplies data to the componenets in App