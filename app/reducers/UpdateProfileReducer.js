const UpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE' :
      return action.profile;
    default :
      return state;
  }
};

export default UpdateProfileReducer;
