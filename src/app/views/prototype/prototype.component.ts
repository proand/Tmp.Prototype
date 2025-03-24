import { Component, computed, inject } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { LayoutMenuComponent } from '@views/shared/layout-components/layout-menu/layout-menu.component';
import { LayoutRootComponent } from '@views/shared/layout-components/layout-root/layout-root.component';

import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';
import { GisbasViewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';

@Component({
  selector: 'app-prototype',
  imports: [SharedModule, SpinnerComponent, LayoutMenuComponent, LayoutRootComponent],
  templateUrl: './prototype.component.html',
})
export class PrototypeComponent {
  private viewStateService = inject(ViewStateService);

  GisbasComponentId = GisbasComponentId;
  gisbasComponentId: number | null = null;

  viewState = this.viewStateService.viewState;
  showLayoutMenu = this.viewStateService.showLayoutMenu;
  showLayoutRoot = computed(() => this.viewStateService.canShowLayoutRoot());

  prototypeLayoutRoots = computed(() => {
    const layoutRoots = this.viewState().layoutRoots;

    // console.log('PrototypeComponent.prototypeLayoutRoots: layoutRoots', layoutRoots);
    // this.dealWithChangingState_WIP(this.viewStateService.activeGisbasComponentId());

    if (layoutRoots) {
      return layoutRoots.filter((layoutRoot) => layoutRoot.parentviewId === GisbasViewId.Prototype);
    }
    return [this.viewStateService.getNewLayoutRoot(GisbasViewId.Prototype)];
  });

  activePrototypeLayoutRoot = computed(() => {
    const layoutRoots = this.prototypeLayoutRoots();
    return layoutRoots.find((layoutRoot) => layoutRoot.active) as LayoutRoot;
  });

  private dealWithChangingState_WIP(newId: number) {
    if (newId !== this.gisbasComponentId) {
      console.log('dealWithChangingState_WIP: newId', newId);
      console.log(
        'dealWithChangingState_WIP: this.gisbasComponentId (old id)',
        this.gisbasComponentId,
      );
    }
    this.gisbasComponentId = this.viewStateService.activeGisbasComponentId();
  }
}
