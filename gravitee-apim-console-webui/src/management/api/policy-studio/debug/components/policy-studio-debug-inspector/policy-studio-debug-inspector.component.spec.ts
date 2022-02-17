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

import { getDiffState, PolicyStudioDebugInspectorComponent } from './policy-studio-debug-inspector.component';

import { fakeRequestDebugStep } from '../../models/DebugStep.fixture';
import { PolicyStudioDebugModule } from '../../policy-studio-debug.module';

describe('PolicyStudioDebugInspectorComponent', () => {
  let fixture: ComponentFixture<PolicyStudioDebugInspectorComponent>;
  let component: PolicyStudioDebugInspectorComponent;

  const inputDebugStep = fakeRequestDebugStep();
  const outputDebugStep = fakeRequestDebugStep({
    output: {
      headers: {
        'content-length': ['3476'],
      },
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PolicyStudioDebugModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyStudioDebugInspectorComponent);

    component = fixture.componentInstance;
    component.inputDebugStep = inputDebugStep;
    component.outputDebugStep = outputDebugStep;
    fixture.detectChanges();
  });

  it('should build tree nodes', () => {
    const { nodes, hasErrors } = component.buildTreeNodes();

    expect(nodes).not.toBeNull();
    expect(nodes.length).toBeGreaterThanOrEqual(3);
    expect(hasErrors).toBeFalsy();

    expect(nodes[0].name).toEqual('HTTP properties');
    expect(nodes[0].children.length).toBeGreaterThanOrEqual(3);
    expect(nodes[0].children[0].name).toEqual('Path params');
    expect(nodes[0].children[0].type).toBeUndefined();
    expect(nodes[0].children[0].children.length).toEqual(1);
    expect(nodes[0].children[1].name).toEqual('Method');
    expect(nodes[0].children[1].type).toBeUndefined();
    expect(nodes[0].children[1].children[0].type).toEqual('text');
    expect(nodes[1].name).toEqual('HTTP headers');
    expect(nodes[1].children[0].type).toEqual('table');
    expect(nodes[1].children[0].input).toBeDefined();
    expect(nodes[1].children[0].output).toBeDefined();
    expect(nodes[2].name).toEqual('HTTP body');
    expect(nodes[2].children[0].type).toEqual('body');
    expect(nodes[2].children[0].input).toBeDefined();
    expect(nodes[2].children[0].output).toBeDefined();
  });

  it('should get diff state between 2 params', () => {
    expect(getDiffState('', 'foobar')).toEqual('added');
    expect(getDiffState(undefined, 'foobar')).toEqual('added');
    expect(getDiffState(null, 'foobar')).toEqual('added');
    expect(getDiffState('foobar', '')).toEqual('deleted');
    expect(getDiffState('foobar', undefined)).toEqual('deleted');
    expect(getDiffState('foobar', null)).toEqual('deleted');
    expect(getDiffState('foobar', 'updated')).toEqual('updated');
    expect(getDiffState('foobar', 'foobar')).toBeUndefined();
    expect(getDiffState('', '')).toBeUndefined();
    expect(getDiffState(undefined, undefined)).toBeUndefined();
    expect(getDiffState(null, null)).toBeUndefined();
  });
});
