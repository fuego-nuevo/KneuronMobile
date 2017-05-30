const CurrentLectureReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_LECTURE' :
      return action.lecture;
    default :
      return state;
  }
};

export default CurrentLectureReducer;
