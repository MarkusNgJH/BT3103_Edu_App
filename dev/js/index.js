import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';
import UserReducer from './reducers/reducer-users';
import App from './components/app';
import firebase from 'firebase';
//wrapping createStore in {} makes it usuable without declaring a var
var db = firebase.database();
db.ref("/").on("value", data => {
  if (data.val()) {
    store.dispatch({ type: "SET_VAL", payload: data.val() });
    //  console.log('dispatched & displaying getstate:')
    //  console.log(store.getState());
  }
});

const reducer = (state = {}, action) => {
    switch(action.type) {
    case 'SET_VAL':
      return {
        state,
        val: action.payload
        };
                      
  // Handle other actions here
  default:
  return state;
    }
  };

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

export default store;
// we assign a store to provider which supplies data to the componenets in App