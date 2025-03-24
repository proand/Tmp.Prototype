import { MenuItem } from './menu-item.model';

import { GisbasViews } from '@GISBAS_CONNECT/gisbas-views.constants';
import { GisbasComponents } from '@GISBAS_CONNECT/gisbas-components.constant';

import { GisbasViewId as viewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';
import { GisbasComponentId as ComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

export const mainMenuItems: MenuItem[] = [
  {
    name: `${getViewMenuItemName(viewId.Prototype)}`,
    routerLink: `${viewId.Prototype}`,
    children: [
      {
        name: 'Henvendelse',
        children: [
          {
            name: `${getComponentMenuItemName(ComponentId.Henvendelse)}`,
            routerLink: `${viewId.Prototype}/${ComponentId.Henvendelse}`,
          },
        ],
      },
      {
        name: 'Infokort',
      },
      {
        name: 'Søk',
        children: [
          {
            name: `${getComponentMenuItemName(ComponentId.StandardSok)}`,
            routerLink: `${viewId.Prototype}/${ComponentId.StandardSok}`,
          },
        ],
      },
    ],
  },
];

export function getViewMenuItemName(id: number): string | undefined {
  return GisbasViews.find((view) => view.viewId === id)?.menuItemName;
}

export function getComponentMenuItemName(id: number): string | undefined {
  return GisbasComponents.find((component) => component.id === id)?.menuItemName;
}
