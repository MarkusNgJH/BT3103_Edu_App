import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import {combineReducers} from 'redux';
import UserReducer from './reducers/reducer-users';
import ActiveUserReducer from './reducers/reducer-active-user';
import firebase from 'firebase';
// import ActiveProfile from './reducers/profile';

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

const activeProfile = (state = {state: {uid: "R6nSbDVly8PUnC6jQFcseDS9sgJ3", course: "BT3103", role: "Administrator"}}, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_PROFILE':
      console.log("UPDATE_ACTIVE_PROFILE")
      console.log(action.payload)
      console.log(state)
      return {
        state: action.payload,
        val: action.payload
      };
    default:
      return state;
  }
};

const combReducers = combineReducers({
    users: UserReducer, 
    activeUser: ActiveUserReducer,
    firebase: reducerFirebase,
    activeProfile: activeProfile 
});

const store = createStore(combReducers);

export default store;                