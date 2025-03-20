import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { ViewState, ViewStateActionData } from './view-state.models';
import { RunViewStateUpdateAction, ViewStateUpdateActions } from './view-state-actions';

const MOCK_URL_ViewState = `${environment.apiBaseUrl}/ViewStateDataLoggedInUser`;

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  private http = inject(HttpClient);
  private _viewState: WritableSignal<ViewState | null> = signal(null);
  private _layoutIndex = 0;
  private _activeGisbasComponentId: WritableSignal<number> = signal(0);

  constructor() {
    this.getInitialViewState().subscribe((state) => {
      // TODO: Handle state = undefined -> new ViewState()
      this._viewState.set(state);
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

  // TODO: Rename based on what you actually update
  updateState(action: number, target: ViewStateActionData) {
    this._viewState.update((state) => {
      if (state?.layouts) {
        RunViewStateUpdateAction(
          ViewStateUpdateActions[action],
          target,
          state.layouts[this._layoutIndex]?.layoutColumns,
        );
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
