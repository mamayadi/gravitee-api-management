/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ConfigurationPlanSecurity,
    ConfigurationPlanSecurityFromJSON,
    ConfigurationPlanSecurityFromJSONTyped,
    ConfigurationPlanSecurityToJSON,
} from './';

/**
 * 
 * @export
 * @interface ConfigurationPlan
 */
export interface ConfigurationPlan {
    /**
     * 
     * @type {ConfigurationPlanSecurity}
     * @memberof ConfigurationPlan
     */
    security?: ConfigurationPlanSecurity;
}

export function ConfigurationPlanFromJSON(json: any): ConfigurationPlan {
    return ConfigurationPlanFromJSONTyped(json, false);
}

export function ConfigurationPlanFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfigurationPlan {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'security': !exists(json, 'security') ? undefined : ConfigurationPlanSecurityFromJSON(json['security']),
    };
}

export function ConfigurationPlanToJSON(value?: ConfigurationPlan | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'security': ConfigurationPlanSecurityToJSON(value.security),
    };
}

