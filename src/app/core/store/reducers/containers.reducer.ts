import { Action, createReducer, on } from "@ngrx/store";
import { MovementsState } from '../models/movement.model';
import { storeContainerList } from '../actions/containers.actios';

const initialState: MovementsState = {
  movements: []
};

const _containerListReducer = createReducer(
  initialState,
  on( storeContainerList, (state, { storePayload }) => ({
    ...state,
    movements: storePayload
  }))
);

export function containerReducer(state: MovementsState | undefined, action: Action) {
  return _containerListReducer(state, action);
}
