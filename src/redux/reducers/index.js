import { MOVE_TO_NEXT_STEP } from "../action/action.Types";

const initialState = {
  nextStep: 1,
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_TO_NEXT_STEP:
      return {
        nextStep: action.step,
        data: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
