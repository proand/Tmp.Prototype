import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import {
  ContentContainer,
  ContentContainerGroup,
  DomainContent,
  LayoutColumn,
  LayoutRoot,
  ViewState,
} from './view-state.models';

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
  private newLayoutRoot: LayoutRoot = new LayoutRoot();

  private _activeGisbasComponentId: WritableSignal<number> = signal(0);
  private _canShowLayoutRoot: WritableSignal<boolean> = signal(false);
  private _layoutIndex = 0; // Used by LayoutMenuItemComponent
  private _viewState: WritableSignal<ViewState> = signal(new ViewState());

  //
  // DEMO
  // - Bob er et innspill til diskusjon (endre MOCK_URL_ViewState for å få Bobs data)
  //
  private _showLayoutMenu = false; // Alice
  // private _showLayoutMenu = true; // Bob
  //

  //
  // DEMO
  // - Denne verdien må leses fra bruker config
  //
  private columnCount = 3;
  //

  constructor() {
    this.getInitialViewState().subscribe((state) => {
      // console.log('state', state);

      this._viewState.set(state);
      this._canShowLayoutRoot.set(true);
    });
  }

  get activeGisbasComponentId(): Signal<number> {
    return this._activeGisbasComponentId;
  }

  set activeGisbasComponentId(value: number) {
    this._activeGisbasComponentId.set(value);
  }

  get canShowLayoutRoot(): Signal<boolean> {
    return this._canShowLayoutRoot;
  }

  set layoutIndex(value: number) {
    this._layoutIndex = value;
  }

  get viewState(): Signal<ViewState> {
    return this._viewState;
  }

  get showLayoutMenu(): boolean {
    return this._showLayoutMenu;
  }

  getNewLayoutRoot(parentSectionId: number): LayoutRoot {
    return this.createNewLayoutRoot(parentSectionId);
  }

  //
  //
  //
  // DEMO
  // - All code for state handling is WIP!
  //
  updateStateWithDomainContent(domainContent: DomainContent) {
    this._viewState.update((state) => {
      // console.log('domainContent', domainContent);
      // console.log('this.newLayoutRoot', this.newLayoutRoot);

      if (state?.layouts) {
        // console.log('state?.layouts', state?.layouts);
        state.layouts.push(this.newLayoutRoot);
      } else if (state) {
        // console.log('state.layouts', state.layouts);

        // TODO: This is just dummy-code!
        //       Improved ViewStateAction logic comes later
        // ----
        this.newLayoutRoot.title = domainContent.parentLayoutRootTitle;
        this.newLayoutRoot.layoutColumns[0].containerGroups[0].containers[0].domainContent =
          domainContent;
        // ----

        state.layouts = [this.newLayoutRoot];
      }
      return state;
    });
  }

  updateStateWithContentContainerWhenActiveGisbasComponentIdIsSameAsTheNewOne() {
    console.log('updateStateWithContentContainerWhenActiveGisbasComponentIdIsSameAsTheNewOne');
  }
  //
  // /DEMO
  //
  //
  //
  //

  private getInitialViewState(): Observable<ViewState> {
    return this.http.get<ViewState>(MOCK_URL_ViewState).pipe(
      delay(1000),
      // tap((state) => console.log('getInitialViewState()', state)),
      catchError((error) => {
        throw error;
      }),
    );
  }

  private createNewLayoutRoot(parentSectionId: number): LayoutRoot {
    this.newLayoutRoot = {
      active: true,
      layoutColumns: this.createNewLayoutColumns(),
      parentSectionId: parentSectionId,
      title: null,
    };
    return this.newLayoutRoot;
  }

  private createNewLayoutColumns() {
    const columns = [];
    for (let i = 0; i < this.columnCount; i++) {
      if (i === 0) {
        columns.push(this.createNewLayoutColumn());
      } else {
        columns[i] = {
          active: true,
          containerGroups: [],
        };
      }
    }
    return columns;
  }

  private createNewLayoutColumn(): LayoutColumn {
    return {
      active: true,
      containerGroups: [this.createNewContentContainerGroup()],
    };
  }

  private createNewContentContainerGroup(): ContentContainerGroup {
    return {
      active: true,
      containers: [this.createNewContentContainer()],
    };
  }

  private createNewContentContainer(): ContentContainer {
    return {
      active: true,
      gisbasComponentId: this.activeGisbasComponentId(),
      domainContent: {
        id: null,
        title: null,
        shortTitle: null,
        parentLayoutRootTitle: null,
      },
    };
  }
}
