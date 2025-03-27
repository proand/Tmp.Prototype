import { ContentFromDomain, LayoutRoot } from './view-state.models';

export class SharedLayoutData {
  activeGisbasComponentId = 0;
  contentFromDomain = new ContentFromDomain();
  layoutActivePathIndexes = new LayoutActivePathIndexes();
  newLayoutRoot = new LayoutRoot();
}

class LayoutActivePathIndexes {
  contentContainerIndex = 0;
  contentContainerGroupIndex = 0;
  layoutColumnIndex = 0;
  layoutRootIndex = 0;
}
