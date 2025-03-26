import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import {
  ActionFn,
  ContentContainer,
  ContentContainerGroup,
  DomainContent,
  LayoutActivePathIndexes,
  LayoutColumn,
  LayoutRoot,
  ViewState,
} from './view-state.models';

// import { ViewStateActionFunctions } from './view-state-action-functions';
import { ViewStateAction } from './view-state-action.enum';
import { ViewStateActionFunctions } from './view-state-action-functions';
import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

//
// DEMO
//
const MOCK_URL_ViewState = `${environment.apiBaseUrl}/ViewStateDataLoggedInUserAlice`;
// const MOCK_URL_ViewState = `${environment.apiBaseUrl}/ViewStateDataLoggedInUserBob`;

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  private http = inject(HttpClient);
  private layoutRootFromViewComponent: LayoutRoot = new LayoutRoot();

  private _viewState: WritableSignal<ViewState> = signal(new ViewState());
  private _initialViewStateLoaded: WritableSignal<boolean> = signal(false);

  //
  // DEMO
  // - Denne verdien må leses fra bruker config
  //
  private columnCount = 3;
  //

  //
  // DEMO
  // - Bob er et innspill til diskusjon (endre MOCK_URL_ViewState for å få Bobs data)
  //
  showLayoutMenu = false; // Alice
  // private _showLayoutMenu = true; // Bob
  //

  activeGisbasComponentId: number = 0;
  domainContent: DomainContent = new DomainContent();
  layoutColumns: LayoutColumn[] = [];
  layoutActivePathIndexes: LayoutActivePathIndexes = new LayoutActivePathIndexes();

  constructor() {
    this.getInitialViewState().subscribe((state) => {
      // console.log('0. state', state);

      this._viewState.set(state);
      this._initialViewStateLoaded.set(true);
    });
  }

  get initialViewStateLoaded(): Signal<boolean> {
    return this._initialViewStateLoaded;
  }

  get viewState(): Signal<ViewState> {
    return this._viewState;
  }

  createLayoutRoot(parentViewId: number): LayoutRoot {
    this.updateLayoutRootIndex(parentViewId);
    this.layoutRootFromViewComponent = {
      active: true,
      layoutColumns: this.createLayoutColumns(),
      parentViewId: parentViewId,
      title: null,
    };
    return this.layoutRootFromViewComponent;
  }

  createContentContainerGroup(): ContentContainerGroup {
    this.updateContentContainerGroupIndex(0);
    return {
      active: true,
      contentContainers: [this.createContentContainer()],
    };
  }

  updateContentContainerIndex(index: number) {
    this.layoutActivePathIndexes.contentContainerIndex = index;
  }

  updateContentContainerGroupIndex(index: number) {
    this.layoutActivePathIndexes.contentContainerGroupIndex = index;
  }

  updateLayoutColumnIndex(index: number) {
    this.layoutActivePathIndexes.layoutColumnIndex = index;
  }

  updateLayoutRootIndex(index: number) {
    this.layoutActivePathIndexes.layoutRootIndex = index;
  }

  openGisbasComponent() {
    this.updateViewState(ViewStateAction.openGisbasComponent);
  }

  updateViewState(actionFn: number) {
    this.layoutActivePathIndexes = this.updateActivePathBasedOnPrActionRules(actionFn);

    this._viewState.update((state) => {
      const layoutRootIndex = this.layoutActivePathIndexes.layoutRootIndex;

      this.layoutColumns =
        layoutRootIndex !== undefined &&
        state.layoutRoots &&
        state.layoutRoots[layoutRootIndex].layoutColumns
          ? state.layoutRoots[layoutRootIndex].layoutColumns
          : [];

      if (this.layoutColumns.length > 0) {
        this.callActionFunction(ViewStateActionFunctions[actionFn], this);
      } else if (state) {
        if (actionFn === ViewStateAction.addDomainContent) {
          this.layoutRootFromViewComponent.title = this.domainContent.parentLayoutRootTitle;
          this.layoutColumns = this.layoutRootFromViewComponent.layoutColumns;
          state.layoutRoots = [this.layoutRootFromViewComponent];
          this.callActionFunction(ViewStateActionFunctions[actionFn], this);
        }
      }
      return state;
    });
  }

  private getInitialViewState(): Observable<ViewState> {
    return this.http.get<ViewState>(MOCK_URL_ViewState).pipe(
      delay(1000),
      // tap((state) => console.log('getInitialViewState()', state)),
      catchError((error) => {
        throw error;
      }),
    );
  }

  private createLayoutColumns() {
    const columns = [];
    for (let i = 0; i < this.columnCount; i++) {
      if (i === 0) {
        columns.push(this.createLayoutColumn());
      } else {
        columns[i] = {
          active: false,
          contentContainerGroups: [],
        };
      }
    }
    return columns;
  }

  private createLayoutColumn(): LayoutColumn {
    this.updateLayoutColumnIndex(0);
    return {
      active: true,
      contentContainerGroups: [this.createContentContainerGroup()],
    };
  }

  private createContentContainer(): ContentContainer {
    this.updateContentContainerIndex(0);
    return {
      active: true,
      gisbasComponentId: this.activeGisbasComponentId,
      domainContent: {
        id: null,
        title: null,
        shortTitle: null,
        parentLayoutRootTitle: null,
      },
    };
  }

  private updateActivePathBasedOnPrActionRules(actionFn: number): LayoutActivePathIndexes {
    if (
      actionFn === ViewStateAction.openGisbasComponent &&
      this.activeGisbasComponentId === GisbasComponentId.StandardSok
    ) {
      this.layoutActivePathIndexes.layoutColumnIndex = 1;
    }
    if (
      actionFn === ViewStateAction.openGisbasComponent &&
      this.activeGisbasComponentId === GisbasComponentId.InfokortToksikologi
    ) {
      this.layoutActivePathIndexes.layoutColumnIndex = 2;
    }
    return this.layoutActivePathIndexes;
  }

  private setAllContentContainersToInactive(layoutColumns: LayoutColumn[]) {
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

  private callActionFunction(fn: ActionFn, viewStateService: ViewStateService) {
    fn(viewStateService);
  }
}
