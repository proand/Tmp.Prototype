import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { SharedLayoutData } from './models/shared-layout-data.model';
import { LayoutRoot, ViewState } from './models/view-state.models';
import { ViewStateAction } from './view-state-action.enum';
import { ViewStateActionFunctionsMap } from './view-state-action-functions';
import { ViewStateActionUtilities } from './view-state-action-utility-functions';

const util = new ViewStateActionUtilities();

//
// DEMO
//
const MOCK_URL_ViewState = `${environment.apiBaseUrl}/ViewStateDataLoggedInUserAlice`;
// const MOCK_URL_ViewState = `${environment.apiBaseUrl}/ViewStateDataLoggedInUserBob`;
//

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  private http = inject(HttpClient);
  private _viewState: WritableSignal<ViewState> = signal(new ViewState());
  private _initialViewStateLoaded: WritableSignal<boolean> = signal(false);

  //
  // DEMO
  // - Bob er et innspill til diskusjon (endre MOCK_URL_ViewState for å få Bobs data)
  // - Blir en del av viewState hvis den blir med i GISBAS-appen
  //
  showLayoutMenu = false; // Alice
  // private _showLayoutMenu = true; // Bob
  //

  sharedLayoutData = new SharedLayoutData();

  constructor() {
    this.getInitialViewState().subscribe((state) => {
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
    const root = util.createLayoutRoot(parentViewId, this.sharedLayoutData);
    this.updateLayoutRootIndex(parentViewId);
    this.sharedLayoutData.newLayoutRoot = root;
    return root;
  }

  updateLayoutRootIndex(index: number) {
    this.sharedLayoutData.layoutActivePathIndexes.layoutRootIndex = index;
  }

  openGisbasComponent(componentId: number) {
    this.sharedLayoutData.activeGisbasComponentId = componentId;
    this.updateViewState(ViewStateAction.openGisbasComponent);
  }

  /**
   * NB!
   *
   * The ViewState object and the SharedLayoutData object
   * is mutated by reference in
   * - ViewStateActionFunctionsMap functions
   * - ViewStateActionUtilities methods
   */
  updateViewState(actionFn: number) {
    this._viewState.update((state) => {
      const fn = ViewStateActionFunctionsMap.get(actionFn);

      if (fn === undefined) {
        throw new Error('ViewStateActionFunctionsMap.get(actionFn) === undefined');
      } else {
        fn(state, this.sharedLayoutData);
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
}
