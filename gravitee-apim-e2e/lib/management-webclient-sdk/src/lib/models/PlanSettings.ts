/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { PlanSecurity } from './PlanSecurity';
import {
    PlanSecurityFromJSON,
    PlanSecurityFromJSONTyped,
    PlanSecurityToJSON,
} from './PlanSecurity';

/**
 * 
 * @export
 * @interface PlanSettings
 */
export interface PlanSettings {
    /**
     * 
     * @type {PlanSecurity}
     * @memberof PlanSettings
     */
    security?: PlanSecurity;
}

/**
 * Check if a given object implements the PlanSettings interface.
 */
export function instanceOfPlanSettings(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PlanSettingsFromJSON(json: any): PlanSettings {
    return PlanSettingsFromJSONTyped(json, false);
}

export function PlanSettingsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlanSettings {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'security': !exists(json, 'security') ? undefined : PlanSecurityFromJSON(json['security']),
    };
}

export function PlanSettingsToJSON(value?: PlanSettings | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'security': PlanSecurityToJSON(value.security),
    };
}
