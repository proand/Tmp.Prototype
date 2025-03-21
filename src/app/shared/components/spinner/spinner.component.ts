import { Component, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-spinner',
  imports: [SharedModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  size = input<string>('xl');
}
