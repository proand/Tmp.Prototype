import { Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { GisbasViewStateService } from '@GISBAS_CONNECT/gisbas-view-state.service';

@Component({
  selector: 'app-henvendelse',
  imports: [SharedModule, SpinnerComponent],
  templateUrl: './henvendelse.component.html',
  styleUrl: './henvendelse.component.scss',
})
export class HenvendelseComponent {
  private gisbasViewStateService = inject(GisbasViewStateService);

  showHenvendelse = false;

  constructor() {
    setTimeout(() => {
      this.gisbasViewStateService.addDomainContentDataToState({
        id: 100,
        title: 'Full tittel for innhold med id 100',
        shortTitle: 'Short-100',
        parentLayoutRootTitle: '20250313-2',
      });

      this.showHenvendelse = true;
    }, 1000);
  }
}
