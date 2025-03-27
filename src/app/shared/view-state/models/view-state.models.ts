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
  contentFromDomain: ContentFromDomain;
}

export class ContentFromDomain {
  id: number | null = null;
  title: string | null = null;
  shortTitle: string | null = null;
  parentLayoutRootTitle: string | null = null;
}
