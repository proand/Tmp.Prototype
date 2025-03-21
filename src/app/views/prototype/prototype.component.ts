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
  private newLayoutRoot: LayoutRoot = {
    active: true,
    layoutColumns: [],
    parentSectionId: GisbasSectionId.Prototype,
    title: null,
  };

  GisbasComponentId = GisbasComponentId;
  viewState = this.stateService.viewState;
  showLayoutMenu = this.stateService.showLayoutMenu;
  showLaoutRoot = computed(() => this.stateService.canShowLayoutRoot());

  prototypeLayouts = computed(() => {
    const viewState = this.viewState();
    const layouts = viewState ? viewState.layouts : null;

    if (layouts) {
      return layouts.filter((layout) => layout.parentSectionId === GisbasSectionId.Prototype);
    }

    // TODO: where and how to update state?
    //   - maybe private _newViewState: new ViewState(); in ViewStateService is the way to go?
    //   - keep track of it, and when everything is ready (domain-content loaded etc.) -> this.stateService.updateState();
    return [this.newLayoutRoot];
  });

  activePrototypeLayout = computed(() => {
    const layouts = this.prototypeLayouts();
    return layouts.find((layout) => layout.active) as LayoutRoot;
  });
}
