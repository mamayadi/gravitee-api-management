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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/dist/ts3.9/client/preview/types-7-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { of } from 'rxjs';

import { GioFormListenersContextPathComponent } from './gio-form-listeners-context-path.component';
import { GioFormListenersContextPathModule } from './gio-form-listeners-context-path.module';

import { PortalSettingsService } from '../../../services-ngx/portal-settings.service';
import { ApiService } from '../../../services-ngx/api.service';

export default {
  title: 'Shared / Form listeners context path',
  component: GioFormListenersContextPathComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, GioFormListenersContextPathModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: PortalSettingsService, useValue: { get: () => of({ portal: { entrypoint: '' } }) } },
        { provide: ApiService, useValue: { contextPathValidator: () => () => of() } },
      ],
    }),
  ],
  argTypes: {},
  render: (args) => ({
    template: `<gio-form-listeners-context-path [ngModel]="listeners"></gio-form-listeners-context-path>`,
    props: args,
  }),
  args: {
    listeners: [],
  },
} as Meta;

export const Default: Story = {};
Default.args = {};

export const Filled: Story = {
  args: {
    listeners: [
      {
        path: '/api/api-1',
      },
      {
        path: '/api/api-2',
      },
    ],
  },
};

export const ReactiveForm: Story = {
  render: (args) => {
    const formControl = new FormControl(args.listeners);

    formControl.valueChanges.subscribe((value) => {
      action('Listeners')(value);
    });

    return {
      template: `<gio-form-listeners-context-path [formControl]="formControl"></gio-form-listeners-context-path>`,
      props: {
        formControl,
      },
    };
  },
  args: {
    listeners: [
      {
        path: '/api/my-api-1',
      },
      {
        path: '/api/my-api-2',
      },
      {
        path: '/api/my-api-3',
      },
    ],
  },
};
