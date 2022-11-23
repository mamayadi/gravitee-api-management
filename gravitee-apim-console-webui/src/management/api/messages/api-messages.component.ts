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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Role } from '../../../entities/role/role';
import { RoleService } from '../../../services-ngx/role.service';

@Component({
  selector: 'api-messages',
  template: require('./api-messages.component.html'),
  styles: [require('./api-messages.component.scss')],
})
export class ApiMessagesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private roles$: Observable<Role[]>;
  private readonly resolvedScope = 'ENVIRONMENT';

  messagesForm: FormGroup;

  channelOptions = [
    { id: 'PORTAL', name: 'Portal Notifications' },
    { id: 'MAIL', name: 'Email' },
    { id: 'HTTP', name: 'POST HTTP message' },
  ];

  public get channel() {
    return this.messagesForm.get('channel');
  }

  public get recipients() {
    return this.messagesForm.get('recipients');
  }

  public get title() {
    return this.messagesForm.get('title');
  }

  public get text() {
    return this.messagesForm.get('text');
  }

  constructor(private readonly formBuilder: FormBuilder, private readonly roleService: RoleService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  private createForm() {
    this.messagesForm = this.formBuilder.group({
      channel: [true, [Validators.required]],
      recipients: [true, [Validators.required]],
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }
}
