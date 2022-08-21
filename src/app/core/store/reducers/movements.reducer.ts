import { Movement, MovementsState } from '../models/movement.model';
import { storeMovement } from '@app-core/store/actions/movement.action';
import { createReducer, on, Action } from '@ngrx/store';
import { deleteMovement } from '../actions/movement.action';

const initialState: MovementsState = {
  movements: []
};

const _movementReducer = createReducer(
  initialState,
  on(storeMovement, (state, { storePayload }) => {
    const condition = state.movements.find((container) => container.containerId === storePayload.containerId);
    if(condition === undefined) {
      const movements = [...state.movements];
      movements.push(storePayload);
      return { ...state, movements };
    }
    return state;
  }),
  on(deleteMovement, (state, { deletePayload }) => {
    const movements = [...state.movements];
    const index = movements.findIndex((container) => container.containerId === deletePayload.containerId);
    movements.splice(index, 1);
    return { ...state, movements };
  })
);

export function movementReducer(state: MovementsState | undefined, action: Action) {
  return _movementReducer(state, action);
}
