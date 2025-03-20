export interface MenuItem {
  name: string;
  routerLink?: string;
  href?: string;
  children?: MenuItem[];

  // Trenger trolig ikke så mye metadata i GISBAS-menyen
  // active?: boolean;
  // expanded?: boolean;
  // hasActiveDescendant?: boolean;
  // id?: number;
}
