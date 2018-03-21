import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import {combineReducers} from 'redux';
import UserReducer from './reducers/reducer-users';
import ActiveUserReducer from './reducers/reducer-active-user';
import firebase from 'firebase';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL':
    //   console.log("reducer-Set-Val")
    //   console.log(state)
    //   console.log(action.payload)
      return {
        state,
        val: action.payload
      };

    // Handle other actions here
    default:
    //   console.log("reducer-default")
      return state;
  }
};

const combReducers = combineReducers({
    users: UserReducer, 
    activeUser: ActiveUserReducer,
    reCharts: reducer
});

const store = createStore(combReducers);

export default store;
                