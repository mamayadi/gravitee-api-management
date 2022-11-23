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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GioFormTagsInputModule, GioIconsModule, GioSaveBarModule } from '@gravitee/ui-particles-angular';

import { ApiMessagesComponent } from './api-messages.component';

import { GioApiImportDialogModule } from '../../../shared/components/gio-api-import-dialog/gio-api-import-dialog.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { GioFormSlideToggleModule } from '../../../shared/components/gio-form-slide-toogle/gio-form-slide-toggle.module';
import { GioFormFocusInvalidModule } from '../../../shared/components/gio-form-focus-first-invalid/gio-form-focus-first-invalid.module';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatRadioModule,
    GioFormSlideToggleModule,
    GioFormTagsInputModule,
    GioSaveBarModule,
    GioFormFocusInvalidModule,
  ],
  declarations: [ApiMessagesComponent],
  exports: [ApiMessagesComponent],
})
export class ApiMessagesModule {}
