import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "@app-core/store/models/app.model";
import { movementReducer } from "./reducers/movements.reducer";
import { containerReducer } from './reducers/containers.reducer';

export const reducers: ActionReducerMap<AppState> = {
  storeMovement: movementReducer,
  storeContainerList: containerReducer
};
