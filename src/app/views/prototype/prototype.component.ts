import { Component, computed, inject } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';
import { LayoutMenuComponent } from '@views/shared/layout-components/layout-menu/layout-menu.component';
import { LayoutComponent } from '@views/shared/layout-components/layout/layout.component';

import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';
import { GisbasSectionId } from '@GISBAS_CONNECT/gisbas-section-id.enum';

@Component({
  selector: 'app-prototype',
  imports: [SharedModule, SpinnerComponent, LayoutMenuComponent, LayoutComponent],
  templateUrl: './prototype.component.html',
  styleUrl: './prototype.component.scss',
})
export class PrototypeComponent {
  private stateService = inject(ViewStateService);

  GisbasComponentId = GisbasComponentId;

  // true === Innspill til diskusjon :)
  showLayoutMenu = true; // NB! if false: set this._layoutIndex to 0 somewhere!

  viewState = this.stateService.viewState;

  layouts = computed(
    () =>
      this.viewState()?.layouts?.filter(
        (layout) => layout.parentSectionId === GisbasSectionId.Prototype,
      ) as LayoutRoot[],
  );

  // TODO: find better way to set default values than forcing type conversion
  //       (both this.layouts and this.activeLayout)

  activeLayout = computed(() => this.layouts()?.find((layout) => layout.active) as LayoutRoot);
}
