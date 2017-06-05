import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import profile from './UpdateProfileReducer';
import currentCohort from './CurrentCohortReducer';
import CurrentLecture from './CurrentLectureReducer';
import CurrentLectureTopics from './CurrentLectureTopicsReducer';
import currentQuiz from './CurrentQuizReducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
  profile,
  currentCohort,
  CurrentLecture,
  CurrentLectureTopics,
  currentQuiz,
});

export default RootReducer;
