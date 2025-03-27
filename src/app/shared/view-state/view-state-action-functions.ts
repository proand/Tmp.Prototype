import { ViewStateActionUtilities } from './view-state-action-utility-functions';
import { ViewStateAction } from './view-state-action.enum';
import { ActionFn } from './models/action-functions.models';
import { SharedLayoutData } from './models/shared-layout-data.model';
import { ViewState } from './models/view-state.models';
import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

export const ViewStateActionFunctionsMap = new Map<number, ActionFn>();

const util = new ViewStateActionUtilities();

ViewStateActionFunctionsMap.set(
  ViewStateAction.addContentFromDomain,
  (state: ViewState, data: SharedLayoutData) => {
    // console.log('### ActionFn: addContentFromDomain');
    // console.log('### addContentFromDomain: state', state);
    // console.log('### addContentFromDomain: data', data);
    if (!state.layoutRoots) {
      state.layoutRoots = [util.getNewLayoutRootFromSharedLayoutData(data)];
    }
    util.getContentContainerByIndex(state, data).contentFromDomain = data.contentFromDomain;
  },
);

ViewStateActionFunctionsMap.set(
  ViewStateAction.openGisbasComponent,
  (state: ViewState, data: SharedLayoutData) => {
    // console.log('### ActionFn: openGisbasComponent');
    // console.log('### openGisbasComponent: state', state);
    // console.log('### openGisbasComponent: data', data);
    if (data.activeGisbasComponentId === GisbasComponentId.StandardSok) {
      data.layoutActivePathIndexes.layoutColumnIndex = 1;
    }
    if (data.activeGisbasComponentId === GisbasComponentId.InfokortToksikologi) {
      data.layoutActivePathIndexes.layoutColumnIndex = 2;
    }
    if (state.layoutRoots) {
      util.getLayoutColumnByIndex(state, data).active = true;
      util.createContentContainerGroupByIndex(state, data);
    }
  },
);
