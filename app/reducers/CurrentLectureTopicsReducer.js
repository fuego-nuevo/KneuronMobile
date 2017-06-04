const CurrentLectureTopicsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_LECTURE_TOPICS' :
      return action.topics;
    default :
      return state;
  }
};

export default CurrentLectureTopicsReducer;
