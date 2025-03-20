import { Component } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-page-not-found',
  imports: [SharedModule],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {}
