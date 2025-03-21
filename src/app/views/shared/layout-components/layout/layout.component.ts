import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutColumn, LayoutRoot } from '@app/shared/view-state/view-state.models';
import { LayoutColumnComponent } from '../layout-column/layout-column.component';

@Component({
  selector: 'app-layout',
  imports: [SharedModule, LayoutColumnComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private newLayoutColumn: LayoutColumn = {
    active: true,
    containerGroups: [],
  };

  layout = input.required<LayoutRoot>();
  layoutColumns = computed(() => {
    const columns = this.layout().layoutColumns;

    if (columns.length > 0) {
      return columns;
    }
    return [this.newLayoutColumn];
  });
}
