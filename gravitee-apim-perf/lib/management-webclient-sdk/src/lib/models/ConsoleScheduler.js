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
import { exists } from '../runtime';
export function ConsoleSchedulerFromJSON(json) {
    return ConsoleSchedulerFromJSONTyped(json, false);
}
export function ConsoleSchedulerFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'notifications': !exists(json, 'notifications') ? undefined : json['notifications'],
        'tasks': !exists(json, 'tasks') ? undefined : json['tasks'],
    };
}
export function ConsoleSchedulerToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'notifications': value.notifications,
        'tasks': value.tasks,
    };
}
