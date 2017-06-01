const CurrentQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_QUIZ' :
      return action.quizzes;
    default :
      return state;
  }
};

export default CurrentQuizReducer;
