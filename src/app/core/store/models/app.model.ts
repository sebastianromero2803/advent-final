import { MovementsState } from './movement.model';
import { storeContainerList } from '../actions/containers.actios';

export interface AppState {
  storeMovement: MovementsState;
  storeContainerList: MovementsState;
}
