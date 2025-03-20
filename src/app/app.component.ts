import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { MainMenuComponent } from './core/main-menu/main-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, MainMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
