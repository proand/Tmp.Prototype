import { ViewState } from './view-state.models';
import { SharedLayoutData } from './shared-layout-data.model';

export interface ActionFunctions {
  [key: string]: ActionFn;
}

export type ActionFn = (state: ViewState, data: SharedLayoutData) => void;
