import { MOVE_TO_NEXT_STEP } from "./action.Types";

export function nextStep(step, data) {
  return {
    type: MOVE_TO_NEXT_STEP,
    step,
    data,
  };
}
