import { ViewStateService } from './view-state.service';
import { ViewStateAction } from './view-state-action.enum';
import { ActionFn, ActionFunctions } from './view-state.models';

const addDomainContent: ActionFn = (viewStateService: ViewStateService) => {
  const columns = viewStateService.layoutColumns;
  console.log('### ActionFn addDomainContent!');
  const indexs = viewStateService.layoutActivePathIndexes;

  columns[indexs.layoutColumnIndex].contentContainerGroups[
    indexs.contentContainerGroupIndex
  ].contentContainers[indexs.contentContainerIndex].domainContent = viewStateService.domainContent;
  return columns;
};

const openGisbasComponent: ActionFn = (viewStateService: ViewStateService) => {
  const columns = viewStateService.layoutColumns;
  console.log('### ActionFn addInfokortContentContainer!');
  const indexs = viewStateService.layoutActivePathIndexes;

  columns[indexs.layoutColumnIndex].active = true;
  columns[indexs.layoutColumnIndex].contentContainerGroups[indexs.contentContainerGroupIndex] =
    viewStateService.createContentContainerGroup();
  return columns;
};

// TODO: seperate file
export const ViewStateActionFunctions: ActionFunctions = {
  [ViewStateAction.addDomainContent]: addDomainContent,
  [ViewStateAction.openGisbasComponent]: openGisbasComponent,
};
