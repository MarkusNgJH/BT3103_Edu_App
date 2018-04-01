import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import {combineReducers} from 'redux';
import UserReducer from './reducers/reducer-users';
import ActiveUserReducer from './reducers/reducer-active-user';
import firebase from 'firebase';

const reducerNewCharts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL_newCharts':
      return {
        state,
        val: action.payload
      };

    // Handle other actions here
    default:
      return state;
  }
};

const reducerAcheivement = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL_acheivements':
       console.log("reducer-Set-Val (achievements)")
       console.log(state)
       console.log(action.payload)
      return {
        state,
        val: action.payload
      };

    // Handle other actions here
    default:
      return state;
  }
};

const reducerAllUsers = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL_allUsers':
       console.log("reducer-Set-Val (all users)")
       console.log(state)
       console.log(action.payload)
      return {
        state,
        val: action.payload
      };

    // Handle other actions here
    default:
      return state;
  }
};

const combReducers = combineReducers({
    users: UserReducer, 
    activeUser: ActiveUserReducer,
    reCharts: reducerNewCharts,
    acheivement: reducerAcheivement,
    allUsers: reducerAllUsers
});

const store = createStore(combReducers);

export default store;
                