import { Routes } from '@angular/router';
import { GisbasSectionId } from '@GISBAS_CONNECT/gisbas-section-id.enum';

const defaultPath = `${GisbasSectionId.Prototype}`;

export const routes: Routes = [
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
