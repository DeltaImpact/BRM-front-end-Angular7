import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import { State } from "./root-state";

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log(action.type, "\n  state:", state);
    // console.log("action", action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = [logger];
