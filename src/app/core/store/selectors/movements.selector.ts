import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovementsState } from '../models/movement.model';

export const movementSelector =
  createFeatureSelector<MovementsState>("storeMovement");

export const getMovementsInfo = createSelector(
  movementSelector,
  (state: MovementsState) => {
    return { movements: state.movements } as MovementsState;
  }
);