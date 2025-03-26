import { ViewStateService } from './view-state.service';

export class ViewState {
  layoutRoots?: LayoutRoot[] | null;
}

export class LayoutRoot {
  active: boolean = false;
  layoutColumns: LayoutColumn[] = [];
  parentViewId: number | null = null;
  title: string | null = null;
}

export interface LayoutColumn {
  active: boolean;
  contentContainerGroups: ContentContainerGroup[];
}

export interface ContentContainerGroup {
  active: boolean;
  contentContainers: ContentContainer[];
}

export interface ContentContainer {
  active: boolean;
  gisbasComponentId: number;
  domainContent: DomainContent;
}

export class DomainContent {
  id: number | null = null;
  title: string | null = null;
  shortTitle: string | null = null;
  parentLayoutRootTitle: string | null = null;
}

export class LayoutActivePathIndexes {
  contentContainerIndex: number;
  contentContainerGroupIndex: number;
  layoutColumnIndex: number;
  layoutRootIndex: number;

  constructor() {
    this.contentContainerIndex = 0;
    this.contentContainerGroupIndex = 0;
    this.layoutColumnIndex = 0;
    this.layoutRootIndex = 0;
  }
}

export interface ActionFunctions {
  [key: string]: ActionFn;
}

export type ActionFn = (viewStateService: ViewStateService) => LayoutColumn[];
