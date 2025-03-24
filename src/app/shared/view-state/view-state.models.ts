export class ViewState {
  layoutRoots?: LayoutRoot[] | null;
}

export class LayoutRoot {
  active = true;
  layoutColumns: LayoutColumn[] = [];
  parentviewId: number | null = null;
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

export class ActiveLayoutPath {
  contentContainerIndex?: number;
  contentContainerGroupIndex?: number;
  layoutColumnIndex?: number;
}
