import { Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { GisbasViewStateService } from '@GISBAS_CONNECT/gisbas-view-state.service';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

@Component({
  selector: 'app-infokort',
  imports: [SharedModule, SpinnerComponent],
  templateUrl: './infokort.component.html',
  styleUrl: './infokort.component.scss',
})
export class InfokortComponent {
  private viewStateService = inject(ViewStateService);
  private gisbasViewStateService = inject(GisbasViewStateService);

  showInfokort = false;
  viewState = this.viewStateService.viewState;

  constructor() {
    setTimeout(() => {
      this.gisbasViewStateService.addDomainContentDataToState({
        id: 102,
        title: 'Full tittel for innhold med id 102',
        shortTitle: 'Short-102',
        parentLayoutRootTitle: '20250313-2',
      });

      this.showInfokort = true;
    }, 1000);
  }
}
