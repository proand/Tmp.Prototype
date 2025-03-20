import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorCodeComponent } from './error-code/error-code.component';

import { ErrorConstants as c } from '@views/shared/error.constants';

@Component({
  selector: 'app-global-error',
  imports: [SharedModule, PageNotFoundComponent, ErrorCodeComponent],
  templateUrl: './global-error.component.html',
})
export class GlobalErrorComponent {
  private route = inject(ActivatedRoute);
  errorCode: string | null = null;
  errorMessage: string | null = null;
  errorCode500 = c.errorCode500;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((queryParamMap) => {
      this.errorCode = queryParamMap.get(c.errorCode);
      this.errorMessage = queryParamMap.get(c.errorMessage);
    });
  }
}
