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
import { ApiListItemFromJSON, ApiListItemToJSON, PageFromJSON, PageToJSON, } from './';
export function PagedResultApiListItemFromJSON(json) {
    return PagedResultApiListItemFromJSONTyped(json, false);
}
export function PagedResultApiListItemFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'data': !exists(json, 'data') ? undefined : (json['data'].map(ApiListItemFromJSON)),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'page': !exists(json, 'page') ? undefined : PageFromJSON(json['page']),
    };
}
export function PagedResultApiListItemToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'data': value.data === undefined ? undefined : (value.data.map(ApiListItemToJSON)),
        'metadata': value.metadata,
        'page': PageToJSON(value.page),
    };
}
