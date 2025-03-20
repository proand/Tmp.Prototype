export interface ViewState {
  layouts?: LayoutRoot[];
}

export interface LayoutRoot {
  active: boolean;
  layoutColumns: LayoutColumn[];
  parentSectionId: number;
  title: string;
}

export interface LayoutColumn {
  active: boolean;
  containerGroups: ContentContainerGroup[];
}

export interface ContentContainerGroup {
  active: boolean;
  activeDomainContentId: number;
  containers: ContentContainer[];
}

export interface ContentContainer {
  active: boolean;

  // Which Angular component (in the gisbas domain) to use for rendering this domain content
  gisbasComponentId: number;
  contentContainerId: number;

  // Data from domaine component with gisbasComponentId === 0
  domainContent: {
    id: number;
    title: string;
    shortTitle: string;
  };
}

export class ViewStateActionData {
  activeDomainContentId?: number;
  contentContainerIndex?: number;
  contentContainerGroupIndex?: number;
  layoutColumnIndex?: number;
}
