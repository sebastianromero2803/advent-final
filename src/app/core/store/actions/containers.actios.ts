import { createAction, props } from "@ngrx/store";
import { Movement } from '../models/movement.model';

export const storeContainerList = createAction(
  "[Container List] Store container list",
  props<{ storePayload: Movement[] }>()
);
