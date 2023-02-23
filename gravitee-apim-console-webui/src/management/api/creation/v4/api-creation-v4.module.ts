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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GioConfirmDialogModule, GioIconsModule, GioFormJsonSchemaModule } from '@gravitee/ui-particles-angular';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApiCreationV4Component } from './api-creation-v4.component';
import { Step1ApiDetailsComponent } from './steps/step-1-api-details/step-1-api-details.component';
import { Step2Entrypoints1List } from './steps/step-2-entrypoints/step-2-entrypoints-1-list.component';
import { Step6SummaryComponent } from './steps/step-6-summary/step-6-summary.component';
import { ApiCreationV4ConfirmationComponent } from './api-creation-v4-confirmation.component';
import { ApiCreationStepperMenuModule } from './components/api-creation-stepper-menu/api-creation-stepper-menu.module';
import { Step1MenuItemComponent } from './steps/step-1-menu-item/step-1-menu-item.component';
import { Step4SecurityComponent } from './steps/step-4-security/step-4-security.component';
import { Step5DocumentationComponent } from './steps/step-5-documentation/step-5-documentation.component';
import { Step2Entrypoints2ConfigComponent } from './steps/step-2-entrypoints/step-2-entrypoints-2-config.component';
import { Step3Endpoints1ListComponent } from './steps/step-3-endpoints/step-3-endpoints-1-list.component';
import { Step3Endpoints2ConfigComponent } from './steps/step-3-endpoints/step-3-endpoints-2-config.component';
import { StepEntrypointMenuItemComponent } from './steps/step-connector-menu-item/step-entrypoint-menu-item.component';
import { StepEndpointMenuItemComponent } from './steps/step-connector-menu-item/step-endpoint-menu-item.component';

import { GioConnectorIconModule } from '../../../../components/gio-connector-icon/gio-connector-icon.module';
import { GioSelectionListModule } from '../../../../shared/components/gio-selection-list-option/gio-selection-list.module';
import { GioFormListenersContextPathModule } from '../../../../components/gio-form-listeners/gio-form-listeners-context-path/gio-form-listeners-context-path.module';
import { GioFormListenersVirtualHostModule } from '../../../../components/gio-form-listeners/gio-form-listeners-virtual-host/gio-form-listeners-virtual-host.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,

    GioConfirmDialogModule,
    GioIconsModule,
    GioSelectionListModule,
    GioConfirmDialogModule,
    GioFormJsonSchemaModule,
    ApiCreationStepperMenuModule,
    GioConnectorIconModule,
    GioFormListenersContextPathModule,
    GioFormListenersVirtualHostModule,
  ],
  declarations: [
    ApiCreationV4Component,
    ApiCreationV4ConfirmationComponent,

    // Steps components
    Step1ApiDetailsComponent,
    Step1MenuItemComponent,
    Step2Entrypoints1List,
    StepEntrypointMenuItemComponent,
    Step2Entrypoints2ConfigComponent,
    Step3Endpoints1ListComponent,
    Step3Endpoints2ConfigComponent,
    StepEndpointMenuItemComponent,
    Step4SecurityComponent,
    Step5DocumentationComponent,
    Step6SummaryComponent,
  ],
  exports: [ApiCreationV4Component],
})
export class ApiCreationV4Module {}
