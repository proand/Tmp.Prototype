import { Routes } from '@angular/router';
import { GisbasViewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';

const defaultPath = `${GisbasViewId.Prototype}`;

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${defaultPath}`,
  },
  {
    path: defaultPath,
    loadChildren: () => import('./views/prototype/prototype.routes').then((m) => m.prototypeRoutes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./views/global-error/global-error.routes').then((m) => m.globalErrorRoutes),
  },
];
