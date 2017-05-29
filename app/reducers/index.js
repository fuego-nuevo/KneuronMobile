import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import profile from './UpdateProfileReducer';


const RootReducer = combineReducers({
  auth: AuthReducer,
  profile,
});

export default RootReducer;
