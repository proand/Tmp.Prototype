import { inject, Injectable } from '@angular/core';
import { RedirectCommand, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  redirectToPageNotFound() {
    const urlTree = inject(Router).parseUrl('N/A');
    return this.redirect(urlTree);
  }

  // Use it like this from any component or service:
  //   return inject(RedirectService).redirectToErrorCode([code], [message]);
  redirectToErrorCode(errorCode: string, errorMessage: string) {
    const urlTree = inject(Router).parseUrl('N/A');
    urlTree.queryParams = { errorMessage: errorMessage, errorCode: errorCode };
    return this.redirect(urlTree);
  }

  private redirect(urlTree: UrlTree) {
    return new RedirectCommand(urlTree, { skipLocationChange: true });
  }
}
