import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  navigate(routerLink: string) {
    this.router.navigate([routerLink], { skipLocationChange: true });
  }
}
