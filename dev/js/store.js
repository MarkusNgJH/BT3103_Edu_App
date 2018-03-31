import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import {combineReducers} from 'redux';
import UserReducer from './reducers/reducer-users';
import ActiveUserReducer from './reducers/reducer-active-user';
import firebase from 'firebase';

const reducerFirebase = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL':
      return {
        state,
        val: action.payload
      };
    default:
      return state;
  }
};

const combReducers = combineReducers({
    users: UserReducer, 
    activeUser: ActiveUserReducer,
    firebase: reducerFirebase
});

const store = createStore(combReducers);

export default store;
                