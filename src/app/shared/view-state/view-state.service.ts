import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { LayoutRoot, ViewState } from './view-state.models';

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

  private _viewState: WritableSignal<ViewState | null> = signal(null);
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
      // console.log('state', state);
      this._viewState.set(state);
      this._canShowLayoutRoot.set(true);
    });
  }

  get viewState(): Signal<ViewState | null> {
    return this._viewState;
  }

  set layoutIndex(value: number) {
    this._layoutIndex = value;
  }

  get activeGisbasComponentId(): Signal<number> {
    return this._activeGisbasComponentId;
  }

  set activeGisbasComponentId(value: number) {
    this._activeGisbasComponentId.set(value);
  }

  get showLayoutMenu(): boolean {
    return this._showLayoutMenu;
  }

  get canShowLayoutRoot(): Signal<boolean> {
    return this._canShowLayoutRoot;
  }

  updateState(newLayoutRoot: LayoutRoot) {
    this._viewState.update((state) => {
      if (state?.layouts) {
        state.layouts.push(newLayoutRoot);
      } else if (state) {
        state.layouts = [newLayoutRoot];
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
