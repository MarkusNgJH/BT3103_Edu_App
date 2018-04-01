import { createStore } from 'redux';
import { combineReducers } from 'redux';
import firebase from 'firebase';

const reducerFirebase = (state = {}, action) => {
  switch (action.type) {
    case 'SET_VAL':
      return {
        state,
        val: action.payload
      }
    case 'SET_VIEW':
      return {
        state,
        currentView: action.payload
      }
    default:
      return state;
  }
};

const combReducers = combineReducers({
  firebase: reducerFirebase
});

const store = createStore(combReducers);

export default store;
