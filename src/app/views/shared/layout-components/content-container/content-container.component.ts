import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContentContainer } from '@app/shared/view-state/view-state.models';

import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';
import { HenvendelseComponent } from '@GISBAS_COMPONENTS/henvendelse/henvendelse.component';
import { VelkommenTilDemoComponent } from '@GISBAS_COMPONENTS/velkommen-til-demo/velkommen-til-demo.component';
import { StandarsSokComponent } from '@GISBAS_COMPONENTS/standars-sok/standars-sok.component';

@Component({
  selector: 'app-content-container',
  imports: [SharedModule, HenvendelseComponent, VelkommenTilDemoComponent, StandarsSokComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent {
  contentContainer = input.required<ContentContainer>();

  gisbasComponentId = computed(() => this.contentContainer().gisbasComponentId);
  GisbasComponentId = GisbasComponentId;
}
