import { ViewStateUpdateAction } from './view-state-action.enum';
import { LayoutColumn, ViewStateActionData } from './view-state.models';

export const ViewStateUpdateActions: ViewStateUpdateActions = {
  [ViewStateUpdateAction.addContentWithinGroup]: (t: ViewStateActionData, c: LayoutColumn[]) => {
    // c[t.layoutColumnIndex].containerGroups[t.contentContainerGroupIndex].containers.push({
    //   isActive: true,
    //   contentId: 105,
    //   gisbasComponentId: 0,
    //   title: 'title',
    //   shortTitle: 'shortTitle',
    // });
    return c;
  },

  [ViewStateUpdateAction.moveContentWithinGroup]: (t: ViewStateActionData, c: LayoutColumn[]) => {
    // TODO: t.layoutColumnIndex as number not good!
    //       Rens data ViewStateService og send inn kun et data object, inkl. columns
    c[t.layoutColumnIndex as number].containerGroups[
      t.contentContainerGroupIndex as number
    ].containers.reverse();
    return c;
  },

  [ViewStateUpdateAction.setContentToActive]: (t: ViewStateActionData, c: LayoutColumn[]) => {
    // console.log('t', t);
    // console.log('c', c);

    const group =
      c[t.layoutColumnIndex as number].containerGroups[t.contentContainerGroupIndex as number];

    setAlleGroupsToInactive(c);
    c[t.layoutColumnIndex as number].active = true;
    group.active = true;

    group.containers.forEach((container) => (container.active = false));

    group.containers[t.contentContainerIndex as number].active = true;
    group.activeDomainContentId = t.activeDomainContentId as number;

    return c;
  },
};

function setAlleGroupsToInactive(columns: LayoutColumn[]) {
  if (columns) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].active = false;

      for (let j = 0; j < columns[i].containerGroups.length; j++) {
        columns[i].containerGroups[j].active = false;

        // for (let k = 0; k < columns[i].containerGroups[j].containers.length; k++) {
        //   columns[i].containerGroups[j].containers[k].active = false;
        // }
      }
    }
  }
}

interface ViewStateUpdateActions {
  [key: string]: UpdateViewStateFn;
}

type UpdateViewStateFn = (target: ViewStateActionData, columns: LayoutColumn[]) => LayoutColumn[];

export function RunViewStateUpdateAction(
  fn: UpdateViewStateFn,
  target: ViewStateActionData,
  columns: LayoutColumn[],
) {
  fn(target, columns);
}
