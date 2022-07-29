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
import { FlowFromJSON, FlowToJSON, } from './';
export function NewApiEntityFromJSON(json) {
    return NewApiEntityFromJSONTyped(json, false);
}
export function NewApiEntityFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'contextPath': json['contextPath'],
        'description': json['description'],
        'endpoint': json['endpoint'],
        'flow_mode': !exists(json, 'flow_mode') ? undefined : json['flow_mode'],
        'flows': !exists(json, 'flows') ? undefined : (json['flows'].map(FlowFromJSON)),
        'gravitee': !exists(json, 'gravitee') ? undefined : json['gravitee'],
        'groups': !exists(json, 'groups') ? undefined : json['groups'],
        'name': json['name'],
        'paths': !exists(json, 'paths') ? undefined : json['paths'],
        'version': json['version'],
    };
}
export function NewApiEntityToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'contextPath': value.contextPath,
        'description': value.description,
        'endpoint': value.endpoint,
        'flow_mode': value.flow_mode,
        'flows': value.flows === undefined ? undefined : (value.flows.map(FlowToJSON)),
        'gravitee': value.gravitee,
        'groups': value.groups,
        'name': value.name,
        'paths': value.paths,
        'version': value.version,
    };
}
/**
* @export
* @enum {string}
*/
export var NewApiEntityFlowModeEnum;
(function (NewApiEntityFlowModeEnum) {
    NewApiEntityFlowModeEnum["DEFAULT"] = "DEFAULT";
    NewApiEntityFlowModeEnum["BESTMATCH"] = "BEST_MATCH";
})(NewApiEntityFlowModeEnum || (NewApiEntityFlowModeEnum = {}));
