import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import {combineReducers} from 'redux';
import UserReducer from './reducers/reducer-users';
import ActiveUserReducer from './reducers/reducer-active-user';
import firebase from 'firebase';

const reducerNewCharts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL_newCharts':
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

const reducerAcheivement = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL_acheivements':
       console.log("reducer-Set-Val")
       console.log(state)
       console.log(action.payload)
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

const reducerUid = (state = { uid: '0'}, action) => {
  switch (action.type) {
    case 'SET_VAL_uid':
      console.log("reducer-Set-UID")
      console.log(state)
      console.log(action.payload)
      return {
        state,
        uid: action.payload
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
    uid: reducerUid,
});

const store = createStore(combReducers);

export default store;
                