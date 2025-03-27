import { Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { GisbasViewStateService } from '@GISBAS_CONNECT/gisbas-view-state.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-infokort',
  imports: [SharedModule, SpinnerComponent],
  templateUrl: './infokort.component.html',
  styleUrl: './infokort.component.scss',
})
export class InfokortComponent {
  private route = inject(ActivatedRoute);
  private gisbasViewStateService = inject(GisbasViewStateService);

  showInfokort = false;
  domainContentId: string | null = null;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((queryParamMap) => {
      this.domainContentId = queryParamMap.get('domainContentId');
    });

    setTimeout(() => {
      switch (this.domainContentId) {
        case '102':
          this.gisbasViewStateService.addContentFromDomainDataToViewState({
            id: 102,
            title: 'Full tittel for innhold med id 102',
            shortTitle: 'Short-102',
            parentLayoutRootTitle: '20250313-2',
          });
          break;

        case '103':
          this.gisbasViewStateService.addContentFromDomainDataToViewState({
            id: 103,
            title: 'Full tittel for innhold med id 103',
            shortTitle: 'Short-103',
            parentLayoutRootTitle: '20250313-2',
          });
          break;

        case '104':
          this.gisbasViewStateService.addContentFromDomainDataToViewState({
            id: 104,
            title: 'Full tittel for innhold med id 104',
            shortTitle: 'Short-104',
            parentLayoutRootTitle: '20250313-2',
          });
          break;

        case '105':
          this.gisbasViewStateService.addContentFromDomainDataToViewState({
            id: 105,
            title: 'Full tittel for innhold med id 105',
            shortTitle: 'Short-105',
            parentLayoutRootTitle: '20250313-2',
          });
          break;
      }

      this.showInfokort = true;
    }, 1000);
  }
}
