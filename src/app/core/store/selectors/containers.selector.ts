import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovementsState } from '../models/movement.model';

export const containersSelector = 
  createFeatureSelector<MovementsState>("storeContainerList");

export const getContainersList = createSelector(
  containersSelector,
  (state: MovementsState) => {
    return { movements: state.movements } as MovementsState;
  }
);
