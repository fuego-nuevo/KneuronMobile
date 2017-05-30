const CurrentCohortReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_COHORT' :
      return action.cohort;
    default :
      return state;
  }
};

export default CurrentCohortReducer;
