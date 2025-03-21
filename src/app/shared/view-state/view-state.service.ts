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

  // private _viewState: WritableSignal<ViewState | null> = signal(null);
  private _viewState: WritableSignal<ViewState> = signal(new ViewState());

  private _activeGisbasComponentId: WritableSignal<number> = signal(0);
  private _canShowLayoutRoot: WritableSignal<boolean> = signal(false);

  // TODO: should this be assigned somewhere else, and have a setter here?
  private _layoutIndex = 0;

  //
  // DEMO
  // - Bob er et innspill til diskusjon (endre MOCK_URL_ViewState for å få Bobs data)
  //
  private _showLayoutMenu = false; // Alice
  // private _showLayoutMenu = true; // Bob
  //

  constructor() {
    this.getInitialViewState().subscribe((state) => {
      console.log('state', state);

      this._viewState.set(state);
      this._canShowLayoutRoot.set(true);
    });
  }

  get viewState(): Signal<ViewState> {
    return this._viewState;
  }

  get showLayoutMenu(): boolean {
    return this._showLayoutMenu;
  }

  get canShowLayoutRoot(): Signal<boolean> {
    return this._canShowLayoutRoot;
  }

  // TODO: tror ikke jeg trenger denne...
  get activeGisbasComponentId(): Signal<number> {
    return this._activeGisbasComponentId;
  }
  set activeGisbasComponentId(value: number) {
    this._activeGisbasComponentId.set(value);
  }

  set layoutIndex(value: number) {
    this._layoutIndex = value;
  }

  getNewLayoutRoot(parentSectionId: number): LayoutRoot {
    return this.createNewLayoutRoot(parentSectionId);
  }

  // TODO: where and how to update state?
  //   - maybe private newLayoutRoots: LayoutRoot[];
  //   - when ready (domain-content loaded etc.) -> this.stateService.updateState();
  updateStateWithDomainContent(domainContent: DomainContent) {
    this._viewState.update((state) => {
      console.log('domainContent', domainContent);
      console.log('this.newLayoutRoot', this.newLayoutRoot);

      if (state?.layouts) {
        console.log('state?.layouts', state?.layouts);
        state.layouts.push(this.newLayoutRoot);
      } else if (state) {
        console.log('state.layouts', state.layouts);

        // TODO: This is just dummy-code!
        //       Improved ViewStateAction logic comes later
        // ----
        this.newLayoutRoot.title = domainContent.parentLayoutRootTitle;
        this.newLayoutRoot.layoutColumns[0].containerGroups[0].activeDomainContentId =
          domainContent.id;
        this.newLayoutRoot.layoutColumns[0].containerGroups[0].containers[0].domainContent =
          domainContent;
        // ----

        state.layouts = [this.newLayoutRoot];
      }
      return state;
    });
  }
  // updateState(newLayoutRoot: LayoutRoot) {
  //   this._viewState.update((state) => {
  //     if (state?.layouts) {
  //       state.layouts.push(newLayoutRoot);
  //     } else if (state) {
  //       state.layouts = [newLayoutRoot];
  //     }
  //     return state;
  //   });
  // }

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
      layoutColumns: [this.createNewLayoutColumn()],
      parentSectionId: parentSectionId,
      title: null,
    };
    return this.newLayoutRoot;
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
      activeDomainContentId: null,
      containers: [this.createNewContentContainer()],
    };
  }

  private createNewContentContainer(): ContentContainer {
    return {
      active: true,
      gisbasComponentId: this._activeGisbasComponentId(),
      domainContent: {
        id: null,
        title: null,
        shortTitle: null,
        parentLayoutRootTitle: null,
      },
    };
  }
}
