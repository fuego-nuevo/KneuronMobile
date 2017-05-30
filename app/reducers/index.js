import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import profile from './UpdateProfileReducer';
import currentCohort from './CurrentCohortReducer';
import currentLecture from './CurrentLectureReducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
  profile,
  currentCohort,
  currentLecture,
});

export default RootReducer;
