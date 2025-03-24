import { inject, Injectable } from '@angular/core';
import { DomainContent } from '@app/shared/view-state/view-state.models';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

@Injectable({
  providedIn: 'root',
})
export class GisbasViewStateService {
  private viewStateService = inject(ViewStateService);

  addDomainContentDataToState(domainContent: DomainContent) {
    this.viewStateService.updateStateWithDomainContent(domainContent);
  }
}
