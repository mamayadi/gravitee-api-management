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

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { Step2Entrypoints2ConfigComponent } from './step-2-entrypoints-2-config.component';

import { EntrypointService } from '../../../../../../services-ngx/entrypoint.service';
import { ApiCreationStepService } from '../../services/api-creation-step.service';
import { ConnectorVM } from '../../models/ConnectorVM';
import {
  GioConnectorDialogComponent,
  GioConnectorDialogData,
} from '../../../../../../components/gio-connector-dialog/gio-connector-dialog.component';
import { IconService } from '../../../../../../services-ngx/icon.service';

@Component({
  selector: 'step-2-entrypoints-1-list',
  template: require('./step-2-entrypoints-1-list.component.html'),
  styles: [require('./step-2-entrypoints-1-list.component.scss'), require('../api-creation-steps-common.component.scss')],
})
export class Step2Entrypoints1ListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public formGroup: FormGroup;

  public entrypoints: ConnectorVM[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly entrypointService: EntrypointService,
    private readonly matDialog: MatDialog,
    private readonly stepService: ApiCreationStepService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly iconService: IconService,
  ) {}

  ngOnInit(): void {
    const currentStepPayload = this.stepService.payload;

    this.formGroup = this.formBuilder.group({
      selectedEntrypointsIds: this.formBuilder.control(
        (currentStepPayload.selectedEntrypoints ?? []).map((p) => p.id),
        [Validators.required],
      ),
    });

    this.entrypointService
      .v4ListAsyncEntrypointPlugins()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entrypointPlugins) => {
        this.entrypoints = entrypointPlugins.map((entrypoint) => ({
          id: entrypoint.id,
          name: entrypoint.name,
          description: entrypoint.description,
          isEnterprise: entrypoint.id.endsWith('-advanced'),
          supportedListenerType: entrypoint.supportedListenerType,
          icon: this.iconService.registerSvg(entrypoint.id, entrypoint.icon),
        }));
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  save(): void {
    const selectedEntrypointsIds = this.formGroup.getRawValue().selectedEntrypointsIds ?? [];
    const selectedEntrypoints = this.entrypoints
      .map(({ id, name, supportedListenerType, icon }) => ({ id, name, supportedListenerType, icon }))
      .filter((e) => selectedEntrypointsIds.includes(e.id));

    this.stepService.validStep((previousPayload) => ({
      ...previousPayload,
      selectedEntrypoints,
    }));

    this.stepService.goToNextStep({
      groupNumber: 2,
      component: Step2Entrypoints2ConfigComponent,
    });
  }

  goBack(): void {
    this.stepService.goToPreviousStep();
  }

  onMoreInfoClick(event, entrypoint: ConnectorVM) {
    event.stopPropagation();

    this.entrypointService
      .v4GetMoreInformation(entrypoint.id)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => of({})),
        tap((pluginMoreInformation) => {
          this.matDialog
            .open<GioConnectorDialogComponent, GioConnectorDialogData, boolean>(GioConnectorDialogComponent, {
              data: {
                name: entrypoint.name,
                pluginMoreInformation,
              },
              role: 'alertdialog',
              id: 'moreInfoDialog',
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
        }),
      )
      .subscribe();
  }
}
