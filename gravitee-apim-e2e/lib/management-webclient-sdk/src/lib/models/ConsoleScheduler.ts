/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.18.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ConsoleScheduler
 */
export interface ConsoleScheduler {
    /**
     * 
     * @type {number}
     * @memberof ConsoleScheduler
     */
    tasks?: number;
    /**
     * 
     * @type {number}
     * @memberof ConsoleScheduler
     */
    notifications?: number;
}

export function ConsoleSchedulerFromJSON(json: any): ConsoleScheduler {
    return ConsoleSchedulerFromJSONTyped(json, false);
}

export function ConsoleSchedulerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConsoleScheduler {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tasks': !exists(json, 'tasks') ? undefined : json['tasks'],
        'notifications': !exists(json, 'notifications') ? undefined : json['notifications'],
    };
}

export function ConsoleSchedulerToJSON(value?: ConsoleScheduler | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tasks': value.tasks,
        'notifications': value.notifications,
    };
}

