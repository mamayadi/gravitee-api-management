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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTestingController } from '@angular/common/http/testing';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

import { ApiMessagesComponent } from './api-messages.component';
import { ApiMessagesModule } from './api-messages.module';

import { GioHttpTestingModule } from '../../../shared/testing';
import { CurrentUserService, UIRouterState } from '../../../ajs-upgraded-providers';
import { User } from '../../../entities/user';
import { GioPermissionModule } from '../../../shared/components/gio-permission/gio-permission.module';

describe('ApiMessagesComponent', () => {
  const fakeAjsState = {
    go: jest.fn(),
  };

  let fixture: ComponentFixture<ApiMessagesComponent>;
  let rootLoader: HarnessLoader;
  let component: ApiMessagesComponent;
  let httpTestingController: HttpTestingController;

  const initConfigureTestingModule = (currentUser: User) => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, GioPermissionModule, GioHttpTestingModule, ApiMessagesModule, MatIconTestingModule],
      providers: [
        { provide: UIRouterState, useValue: fakeAjsState },
        {
          provide: CurrentUserService,
          useValue: { currentUser },
        },
      ],
    })
      .overrideProvider(InteractivityChecker, {
        useValue: {
          isFocusable: () => true, // This traps focus checks and so avoid warnings when dealing with
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ApiMessagesComponent);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  };

  afterEach(() => {
    httpTestingController.verify();
  });
});
