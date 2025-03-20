import { Component, inject, input, OnInit } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import {
  ContentContainerGroup,
  ViewStateActionData,
} from '@app/shared/view-state/view-state.models';

import { ContentContainerComponent } from '../content-container/content-container.component';
import { ViewStateUpdateAction } from '@app/shared/view-state/view-state-action.enum';

@Component({
  selector: 'app-content-container-group',
  imports: [SharedModule, ContentContainerComponent],
  templateUrl: './content-container-group.component.html',
  styleUrl: './content-container-group.component.scss',
})
export class ContentContainerGroupComponent implements OnInit {
  private stateService = inject(ViewStateService);
  private actionData = new ViewStateActionData();

  contentContainerGroup = input.required<ContentContainerGroup>();
  index = input.required<number>();
  layoutColumnIndex = input.required<number>();

  ngOnInit() {
    this.actionData.layoutColumnIndex = this.layoutColumnIndex();
    this.actionData.contentContainerGroupIndex = this.index();
  }

  setContentContainerToActive(contentContainerIndex: number, activeDomainContentId: number) {
    this.actionData.contentContainerIndex = contentContainerIndex;
    this.actionData.activeDomainContentId = activeDomainContentId;

    console.log('this.actionData', this.actionData);

    this.stateService.updateState(ViewStateUpdateAction.setContentToActive, this.actionData);
  }
}
