import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import profile from './UpdateProfileReducer';
import currentCohort from './CurrentCohortReducer';
import currentLecture from './CurrentLectureReducer';
import currentQuiz from './CurrentQuizReducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
  profile,
  currentCohort,
  currentLecture,
  currentQuiz,
});

export default RootReducer;
