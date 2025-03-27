import { Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { NavigationService } from '@app/shared/navigation.service';
import { GisbasViewStateService } from '@GISBAS_CONNECT/gisbas-view-state.service';

@Component({
  selector: 'app-standars-sok',
  imports: [SharedModule, SpinnerComponent],
  templateUrl: './standars-sok.component.html',
  styleUrl: './standars-sok.component.scss',
})
export class StandarsSokComponent {
  private gisbasViewStateService = inject(GisbasViewStateService);
  private navigationService = inject(NavigationService);

  showStandarsSok = false;

  constructor() {
    setTimeout(() => {
      this.gisbasViewStateService.addContentFromDomainDataToViewState({
        id: 101,
        title: 'Full tittel for innhold med id 101',
        shortTitle: 'Short-101',
        parentLayoutRootTitle: '20250313-2',
      });

      this.showStandarsSok = true;
    }, 1000);
  }

  navigate(routerLink: string) {
    this.navigationService.navigate(routerLink);
  }
}
