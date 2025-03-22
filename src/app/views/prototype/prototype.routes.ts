import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { RedirectService } from '@views/shared/redirect.service';
import { GisbasComponents } from '@GISBAS_CONNECT/gisbas-components.constant';

import { PrototypeComponent } from './prototype.component';
import { PrototypeConstants } from './prototype.constants';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { PrototypeLandingPageComponent } from './prototype-landing-page/prototype-landing-page.component';

const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const viewStateService = inject(ViewStateService);
  const componentId = parseInt(
    route.paramMap.get(PrototypeConstants.activeGisbasComponentId) as string,
  );
  if (componentId === viewStateService.activeGisbasComponentId()) {
    viewStateService.updateStateWithContentContainerWhenActiveGisbasComponentIdIsSameAsTheNewOne();
    return true;
  }
  if (GisbasComponents.find((component) => component.id === componentId)) {
    viewStateService.activeGisbasComponentId = componentId;
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
