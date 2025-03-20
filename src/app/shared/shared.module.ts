import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule],
})
export class SharedModule {}
