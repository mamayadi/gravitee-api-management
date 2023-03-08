/**
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
package io.gravitee.gateway.handlers.api.processor.transaction;

/**
 * The mode to use when the backend provides a value for the header
 */
public enum BackendOverrideMode {
    /**
     * NONE: The header set by the APIM Gateway will be kept and the one provided by the backend discarded
     */
    NONE,
    /**
     * MERGE: Both headers set by the APIM Gateway and the backend will be kept (as headers can be multi-valued)
     */
    MERGE,
    /**
     * OVERRIDE: The header set by the APIM Gateway will be discarded and the one provided by the backend kept
     */
    OVERRIDE,
}
