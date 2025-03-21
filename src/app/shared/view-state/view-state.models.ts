export class ViewState {
  layouts?: LayoutRoot[] | null;
}

export interface LayoutRoot {
  active: boolean;
  layoutColumns: LayoutColumn[];
  parentSectionId: number;
  title: string | null;
}

export interface LayoutColumn {
  active: boolean;
  containerGroups: ContentContainerGroup[];
}

export interface ContentContainerGroup {
  active: boolean;
  activeDomainContentId: number | null;
  containers: ContentContainer[];
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
}

export class ViewStateActionData {
  activeDomainContentId?: number;
  contentContainerIndex?: number;
  contentContainerGroupIndex?: number;
  layoutColumnIndex?: number;
}
