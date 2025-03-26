import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { RedirectService } from '@views/shared/redirect.service';
import { GisbasComponents } from '@GISBAS_CONNECT/gisbas-components.constant';

import { PrototypeComponent } from './prototype.component';
import { PrototypeConstants } from './prototype.constants';
import { PrototypeLandingPageComponent } from './prototype-landing-page/prototype-landing-page.component';

const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const viewStateService = inject(ViewStateService);
  const componentId = parseInt(
    route.paramMap.get(PrototypeConstants.activeGisbasComponentId) as string,
  );
  if (componentId === viewStateService.activeGisbasComponentId) {
    // console.log('Same GisbasComponent as the currently acive one');
    return true;
  }
  if (GisbasComponents.find((component) => component.id === componentId)) {
    // console.log('Not the same GisbasComponent as the currently acive one');

    viewStateService.activeGisbasComponentId = componentId;
    viewStateService.openGisbasComponent();
    return true;
  }
  return inject(RedirectService).redirectToPageNotFound();
};

export const prototypeRoutes: Routes = [
  {
    path: '',
    component: PrototypeLandingPageComponent,
  },
  {
    path: `:${PrototypeConstants.activeGisbasComponentId}`,
    canActivate: [canActivate],
    runGuardsAndResolvers: 'always',
    component: PrototypeComponent,
  },
];
