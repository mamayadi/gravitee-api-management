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
import { FormGroup } from '@angular/forms';
import { StateService } from '@uirouter/core';

import { UIRouterState } from '../../../../../../ajs-upgraded-providers';
import { ApiCreationStepService } from '../../services/api-creation-step.service';
import { Step5DocumentationComponent } from '../step-5-documentation/step-5-documentation.component';
import { PlanSecurityType } from '../../../../../../entities/plan-v4';

export interface SecurityPlan {
  name: string;
  type: PlanSecurityType;
}

export enum PlanStatus {
  STAGING = 'staging',
  PUBLISHED = 'published',
  DEPRECATED = 'deprecated',
  CLOSED = 'closed',
}

@Component({
  selector: 'step-4-security-1-plans-list',
  template: require('./step-4-security-1-plans-list.component.html'),
  styles: [require('./step-4-security-1-plans-list.component.scss'), require('../api-creation-steps-common.component.scss')],
})
export class Step4Security1PlansListComponent implements OnInit {
  public form = new FormGroup({});
  displayedColumns: string[] = ['name', 'type', 'actions'];
  plans: SecurityPlan[] = [];

  constructor(@Inject(UIRouterState) readonly ajsState: StateService, private readonly stepService: ApiCreationStepService) {}

  ngOnInit(): void {
    // const currentStepPayload = this.stepService.payload;
    this.plans.push({
      name: 'Default Keyless Plan',
      type: PlanSecurityType.KEY_LESS,
    });
  }

  save(): void {
    const plans = this.plans;
    this.stepService.validStep((previousPayload) => ({
      ...previousPayload,
      plans,
    }));

    this.stepService.goToNextStep({ groupNumber: 5, component: Step5DocumentationComponent });
  }

  goBack(): void {
    this.stepService.goToPreviousStep();
  }

  removePlan(plan: SecurityPlan) {
    this.plans = this.plans.filter((listedPlan) => listedPlan !== plan);
  }
}
