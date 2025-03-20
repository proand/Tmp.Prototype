import { Component, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-error-code',
  imports: [SharedModule],
  templateUrl: './error-code.component.html',
  styleUrl: './error-code.component.scss',
})
export class ErrorCodeComponent {
  errorCode = input<string | null>();
  errorMessage = input<string | null>();
}
