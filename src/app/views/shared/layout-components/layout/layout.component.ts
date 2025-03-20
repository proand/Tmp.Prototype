import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';
import { LayoutColumnComponent } from '../layout-column/layout-column.component';

@Component({
  selector: 'app-layout',
  imports: [SharedModule, LayoutColumnComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  layout = input.required<LayoutRoot>();
  layoutColumns = computed(() => this.layout().layoutColumns);
}
