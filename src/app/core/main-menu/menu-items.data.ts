import { MenuItem } from './menu-item.model';

import { GisbasSections } from '@GISBAS_CONNECT/gisbas-sections.constants';
import { GisbasComponents } from '@GISBAS_CONNECT/gisbas-components.constant';

import { GisbasSectionId as SectionId } from '@GISBAS_CONNECT/gisbas-section-id.enum';
import { GisbasComponentId as ComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

export const mainMenuItems: MenuItem[] = [
  {
    name: `${getSectionMenuItemName(SectionId.Prototype)}`,
    routerLink: `${SectionId.Prototype}`,
    children: [
      {
        name: 'Henvendelse',
        children: [
          {
            name: `${getComponentMenuItemName(ComponentId.Henvendelse)}`,
            routerLink: `${SectionId.Prototype}/${ComponentId.Henvendelse}`,
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
            name: `${getComponentMenuItemName(ComponentId.SokStandard)}`,
            routerLink: `${SectionId.Prototype}/${ComponentId.SokStandard}`,
          },
        ],
      },
    ],
  },
];

export function getSectionMenuItemName(id: number): string | undefined {
  return GisbasSections.find((section) => section.sectionId === id)?.menuItemName;
}

export function getComponentMenuItemName(id: number): string | undefined {
  return GisbasComponents.find((component) => component.id === id)?.menuItemName;
}
