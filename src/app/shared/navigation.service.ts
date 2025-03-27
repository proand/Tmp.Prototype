import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GisbasViewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);
  private gisbasViewId: number = GisbasViewId.Prototype;

  navigate(gisbasComponentId: number, domainContentId?: number | string) {
    this.router.navigate([`${this.getViewId()}/${gisbasComponentId}`], {
      skipLocationChange: true,
      ...this.getQueryParams(domainContentId),
    });
  }

  navigateToView(gisbasViewId: number) {
    this.setViewId(gisbasViewId);
    this.router.navigate([`${gisbasViewId}`], {
      skipLocationChange: true,
    });
  }

  private setViewId(gisbasViewId: number) {
    this.gisbasViewId = gisbasViewId;
  }

  private getViewId() {
    return this.gisbasViewId !== 0 ? this.gisbasViewId : 0;
  }

  private getQueryParams(domainContentId?: number | string) {
    let queryParamsObj;
    if (domainContentId) {
      queryParamsObj = { queryParams: { domainContentId: domainContentId } };
    }
    return queryParamsObj;
  }
}
