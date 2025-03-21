export class ViewState {
  layouts?: LayoutRoot[] | null;
}

export class LayoutRoot {
  active = true;
  layoutColumns: LayoutColumn[] = [];
  parentSectionId: number | null = null;
  title: string | null = null;
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
  parentLayoutRootTitle: string | null = null;
}

export class ViewStateActionData {
  activeDomainContentId?: number;
  contentContainerIndex?: number;
  contentContainerGroupIndex?: number;
  layoutColumnIndex?: number;
}
