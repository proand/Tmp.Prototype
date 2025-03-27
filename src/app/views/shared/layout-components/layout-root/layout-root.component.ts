import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutRoot } from '@app/shared/view-state/models/view-state.models';
import { LayoutColumnComponent } from '../layout-column/layout-column.component';

@Component({
  selector: 'app-layout-root',
  imports: [SharedModule, LayoutColumnComponent],
  templateUrl: './layout-root.component.html',
  styleUrl: './layout-root.component.scss',
})
export class LayoutRootComponent {
  layoutRoot = input.required<LayoutRoot>();
  layoutColumns = computed(() => {
    // console.log('2. columns', this.layout().layoutColumns);
    return this.layoutRoot().layoutColumns;
  });
}
