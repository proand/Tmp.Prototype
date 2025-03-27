import { Component, computed, inject } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { LayoutMenuComponent } from '@views/shared/layout-components/layout-menu/layout-menu.component';
import { LayoutRootComponent } from '@views/shared/layout-components/layout-root/layout-root.component';

import { GisbasViewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';
import { LayoutRoot } from '@app/shared/view-state/models/view-state.models';

@Component({
  selector: 'app-prototype',
  imports: [SharedModule, SpinnerComponent, LayoutMenuComponent, LayoutRootComponent],
  templateUrl: './prototype.component.html',
})
export class PrototypeComponent {
  private viewStateService = inject(ViewStateService);

  viewState = this.viewStateService.viewState;
  showLayoutMenu = this.viewStateService.showLayoutMenu;

  showLayoutRoot = computed(() => this.viewStateService.initialViewStateLoaded());

  prototypeLayoutRoots = computed(() => {
    const layoutRoots = this.viewState().layoutRoots;

    if (layoutRoots) {
      return layoutRoots.filter((layoutRoot) => layoutRoot.parentViewId === GisbasViewId.Prototype);
    }
    return [this.viewStateService.createLayoutRoot(GisbasViewId.Prototype)];
  });

  activePrototypeLayoutRoot = computed(() => {
    const layoutRoots = this.prototypeLayoutRoots();
    return layoutRoots.find((layoutRoot) => layoutRoot.active) as LayoutRoot;
  });
}
