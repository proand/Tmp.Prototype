import { SharedLayoutData } from './models/shared-layout-data.model';
import {
  ContentContainer,
  ContentContainerGroup,
  LayoutColumn,
  LayoutRoot,
  ViewState,
} from './models/view-state.models';

//
// DEMO
// - Denne verdien må leses fra bruker-config
//
const DEMO_config = { columnCount: 3 };
//

export class ViewStateActionUtilities {
  createLayoutRoot(parentViewId: number, data: SharedLayoutData): LayoutRoot {
    return {
      active: true,
      layoutColumns: this.createLayoutColumns(data),
      parentViewId: parentViewId,
      title: null,
    };
  }

  createLayoutColumns(data: SharedLayoutData) {
    const columns = [];
    for (let i = 0; i < DEMO_config.columnCount; i++) {
      if (i === 0) {
        columns.push(this.createLayoutColumn(data));
      } else {
        columns[i] = {
          active: false,
          contentContainerGroups: [],
        };
      }
    }
    return columns;
  }

  createLayoutColumn(data: SharedLayoutData): LayoutColumn {
    return {
      active: true,
      contentContainerGroups: [this.createContentContainerGroup(data)],
    };
  }

  createContentContainerGroup(data: SharedLayoutData): ContentContainerGroup {
    return {
      active: true,
      contentContainers: [this.createContentContainer(data)],
    };
  }

  createContentContainer(data: SharedLayoutData): ContentContainer {
    return {
      active: true,
      gisbasComponentId: data.activeGisbasComponentId,
      contentFromDomain: {
        id: null,
        title: null,
        shortTitle: null,
        parentLayoutRootTitle: null,
      },
    };
  }

  createContentContainerGroupByIndex(state: ViewState, data: SharedLayoutData) {
    const indexs = data.layoutActivePathIndexes;
    this.getLayoutColumnByIndex(state, data).contentContainerGroups[
      indexs.contentContainerGroupIndex
    ] = this.createContentContainerGroup(data);
  }

  getContentContainerByIndex(state: ViewState, data: SharedLayoutData): ContentContainer {
    const indexs = data.layoutActivePathIndexes;
    return this.getContentContainerGroupByIndex(state, data).contentContainers[
      indexs.contentContainerIndex
    ];
  }

  getContentContainerGroupByIndex(state: ViewState, data: SharedLayoutData): ContentContainerGroup {
    const indexs = data.layoutActivePathIndexes;
    return this.getLayoutColumnByIndex(state, data).contentContainerGroups[
      indexs.contentContainerGroupIndex
    ];
  }

  getLayoutColumnByIndex(state: ViewState, data: SharedLayoutData): LayoutColumn {
    const indexs = data.layoutActivePathIndexes;
    return this.getLayoutRootByIndex(state, data).layoutColumns[indexs.layoutColumnIndex];
  }

  getLayoutRootByIndex(state: ViewState, data: SharedLayoutData): LayoutRoot {
    const indexs = data.layoutActivePathIndexes;
    if (state.layoutRoots) {
      return state.layoutRoots[indexs.layoutRootIndex];
    }
    return this.getNewLayoutRootFromSharedLayoutData(data);
  }

  getNewLayoutRootFromSharedLayoutData(data: SharedLayoutData): LayoutRoot {
    const layoutRoot = data.newLayoutRoot;
    layoutRoot.title = data.contentFromDomain.parentLayoutRootTitle;
    return layoutRoot;
  }

  setAllLayoutColumnsAndChildrenToInactive(layoutColumns: LayoutColumn[]) {
    layoutColumns.forEach((column) => {
      column.active = false;
      column.contentContainerGroups.forEach((group) => {
        group.active = false;
        group.contentContainers.forEach((container) => {
          container.active = false;
        });
      });
    });
  }

  setAllLayoutColumnsToInactive(layoutColumns: LayoutColumn[]) {
    layoutColumns.forEach((column) => {
      column.active = false;
    });
  }

  setAllContentContainerGroupsToInactive(column: LayoutColumn) {
    column.contentContainerGroups.forEach((group) => {
      group.active = false;
    });
  }

  setAllContentContainersToInactive(group: ContentContainerGroup) {
    group.contentContainers.forEach((container) => {
      container.active = false;
    });
  }
}
