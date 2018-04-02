import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import ActiveProfile from './profile';

const allReducers = combineReducers({
    users: UserReducer, 
    activeUser: ActiveUserReducer,
    activeProfile: ActiveProfile
});

export default allReducers; 
//we need to specify what we are sending out when we use "export default"
//allReducer combines all Reducers
// combines all reducers into 1 datafile for the Store
//users is now the piece of data in reducer-user.js