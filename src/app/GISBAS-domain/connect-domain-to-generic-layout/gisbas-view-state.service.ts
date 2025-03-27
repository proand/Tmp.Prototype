import { inject, Injectable } from '@angular/core';
import { ViewStateAction } from '@app/shared/view-state/view-state-action.enum';
import { ContentFromDomain } from '@app/shared/view-state/models/view-state.models';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

@Injectable({
  providedIn: 'root',
})
export class GisbasViewStateService {
  private viewStateService = inject(ViewStateService);

  addContentFromDomainDataToViewState(contentFromDomain: ContentFromDomain) {
    this.viewStateService.sharedLayoutData.contentFromDomain = contentFromDomain;
    this.viewStateService.updateViewState(ViewStateAction.addContentFromDomain);
  }
}
