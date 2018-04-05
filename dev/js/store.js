import { createStore } from 'redux';
import { combineReducers } from 'redux';
import firebase from 'firebase';
// import ActiveProfile from './reducers/profile';

const reducerFirebase = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL':
      return {
        ...state,
        val: action.payload
      }
    default:
      return state;
  }
};

const activeProfile = (state = {val: {uid: "R6nSbDVly8PUnC6jQFcseDS9sgJ3", course: "BT3103", role: "Instructor"}}, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_PROFILE':
      console.log("UPDATE_ACTIVE_PROFILE")
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        val: action.payload
      };
    default:
      return state;
  }
};

const activeView = (state = {}, action) => {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        currentView: action.payload
      }
  
    default:
      return state;
  }
};

const myFavourites = (state = {}, action) => {
  switch (action.type) {
    case "SET_FAV":
      return {
        ...state,
        favourites: action.payload
      }

    default:
      return state;
  }
};

const combReducers = combineReducers({
    firebase: reducerFirebase,
    activeProfile: activeProfile, 
    activeView: activeView,
});

const store = createStore(combReducers);

export default store;                
