import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import profile from './UpdateProfileReducer';
import currentCohort from './CurrentCohortReducer';


const RootReducer = combineReducers({
  auth: AuthReducer,
  profile,
  currentCohort,
});

export default RootReducer;
