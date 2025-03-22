import { Component, computed, inject } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { LayoutMenuComponent } from '@views/shared/layout-components/layout-menu/layout-menu.component';
import { LayoutComponent } from '@views/shared/layout-components/layout/layout.component';

import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';
import { GisbasSectionId } from '@GISBAS_CONNECT/gisbas-section-id.enum';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';

@Component({
  selector: 'app-prototype',
  imports: [SharedModule, SpinnerComponent, LayoutMenuComponent, LayoutComponent],
  templateUrl: './prototype.component.html',
})
export class PrototypeComponent {
  private stateService = inject(ViewStateService);

  GisbasComponentId = GisbasComponentId;
  gisbasComponentId: number | null = null;

  viewState = this.stateService.viewState;
  showLayoutMenu = this.stateService.showLayoutMenu;
  showLayoutRoot = computed(() => this.stateService.canShowLayoutRoot());

  prototypeLayouts = computed(() => {
    const layouts = this.viewState().layouts;

    // console.log('PrototypeComponent.prototypeLayouts: layouts', layouts);
    // this.dealWithChangingState_WIP(this.stateService.activeGisbasComponentId());

    if (layouts) {
      return layouts.filter((layout) => layout.parentSectionId === GisbasSectionId.Prototype);
    }
    return [this.stateService.getNewLayoutRoot(GisbasSectionId.Prototype)];
  });

  activePrototypeLayout = computed(() => {
    const layouts = this.prototypeLayouts();
    return layouts.find((layout) => layout.active) as LayoutRoot;
  });

  private dealWithChangingState_WIP(newId: number) {
    if (newId !== this.gisbasComponentId) {
      console.log('dealWithChangingState_WIP: newId', newId);
      console.log(
        'dealWithChangingState_WIP: this.gisbasComponentId (old id)',
        this.gisbasComponentId,
      );
    }
    this.gisbasComponentId = this.stateService.activeGisbasComponentId();
  }
}
