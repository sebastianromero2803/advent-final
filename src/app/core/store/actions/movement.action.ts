import { createAction, props } from "@ngrx/store";
import { Movement } from '../models/movement.model';

export const storeMovement = createAction(
  "[Store Movement] Store movement information",
  props<{ storePayload: Movement }>()
);

export const deleteMovement = createAction(
  "[Delete Movement] Delete movement information",
  props<{ deletePayload: Movement }>()
);