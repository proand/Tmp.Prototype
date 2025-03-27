export interface MenuItem {
  name: string;
  gisbasViewId?: number;
  gisbasComponentId?: number;
  href?: string;
  children?: MenuItem[];

  // Trenger trolig ikke så mye metadata i GISBAS-menyen
  // active?: boolean;
  // expanded?: boolean;
  // hasActiveDescendant?: boolean;
  // id?: number;
}
