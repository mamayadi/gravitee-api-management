/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

import { UIRouterState, UIRouterStateParams } from '../../../../ajs-upgraded-providers';
import { ApiV4Service } from '../../../../services-ngx/api-v4.service';
import { ApiEntity, NewApiEntity } from '../../../../entities/api-v4';
import { SnackBarService } from '../../../../services-ngx/snack-bar.service';

@Component({
  selector: 'api-creation-v4-in-progress',
  template: require('./api-creation-v4-in-progress.component.html'),
  styles: [require('./api-creation-v4-in-progress.component.scss')],
})
export class ApiCreationV4InProgressComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  public api: ApiEntity;
  public apiPayload: NewApiEntity;
  public errorMessage: string;

  constructor(
    @Inject(UIRouterState) readonly ajsState: StateService,
    @Inject(UIRouterStateParams) private readonly ajsStateParams,
    private readonly apiV4Service: ApiV4Service,
    private readonly snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    // TODO: add deploy to state params
    const deploy = false;

    if (Object.keys(this.ajsStateParams.apiPayload).length === 0) {
      // If state does not contain payload, redirect to creation wizard
      this.ajsState.go('management.apis.create-v4');
      return;
    }

    this.apiPayload = this.ajsStateParams.apiPayload;

    this.apiV4Service
      .create(this.apiPayload)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(
          (_) => {
            this.snackBarService.success(`API ${deploy ? 'deployed' : 'created'} successfully!`);
          },
          (err) => {
            this.errorMessage = err.error?.message ?? `An error occurred while ${deploy ? 'deploying' : 'creating'} the API.`;
            return EMPTY;
          },
        ),
        switchMap((createdApi) => this.apiV4Service.get(createdApi.id)),
      )
      .subscribe((foundApi) => {
        this.api = foundApi;
      });
  }

  goToConfirmationPage() {
    return this.ajsState.go('management.apis.create-v4-confirmation', { apiId: this.api.id });
  }
}
