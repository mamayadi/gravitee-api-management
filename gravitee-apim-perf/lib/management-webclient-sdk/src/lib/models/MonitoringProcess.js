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
export function MonitoringProcessFromJSON(json) {
    return MonitoringProcessFromJSONTyped(json, false);
}
export function MonitoringProcessFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'cpu_percent': !exists(json, 'cpu_percent') ? undefined : json['cpu_percent'],
        'max_file_descriptors': !exists(json, 'max_file_descriptors') ? undefined : json['max_file_descriptors'],
        'open_file_descriptors': !exists(json, 'open_file_descriptors') ? undefined : json['open_file_descriptors'],
    };
}
export function MonitoringProcessToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'cpu_percent': value.cpu_percent,
        'max_file_descriptors': value.max_file_descriptors,
        'open_file_descriptors': value.open_file_descriptors,
    };
}
