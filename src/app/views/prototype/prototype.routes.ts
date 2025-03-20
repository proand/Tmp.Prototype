import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { RedirectService } from '@views/shared/redirect.service';
import { GisbasComponents } from '@GISBAS_CONNECT/gisbas-components.constant';
import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

import { PrototypeComponent } from './prototype.component';
import { PrototypeConstants as constants } from './prototype.constants';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const componentId = route.paramMap.get(constants.activeGisbasComponentId);

  if (GisbasComponents.find((component) => `${component.id}` === componentId)) {
    inject(ViewStateService).activeGisbasComponentId = parseInt(componentId as string);
    return true;
  }
  return inject(RedirectService).redirectToPageNotFound();
};

const defaultPath = `${GisbasComponentId.VelkommenTilDemo}`;

export const prototypeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${defaultPath}`,
  },
  {
    path: `:${constants.activeGisbasComponentId}`,
    canActivate: [canActivate],
    component: PrototypeComponent,
  },
];
