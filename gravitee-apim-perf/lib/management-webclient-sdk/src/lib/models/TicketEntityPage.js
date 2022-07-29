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
import { TicketEntityFromJSON, TicketEntityToJSON, } from './';
export function TicketEntityPageFromJSON(json) {
    return TicketEntityPageFromJSONTyped(json, false);
}
export function TicketEntityPageFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'content': !exists(json, 'content') ? undefined : (json['content'].map(TicketEntityFromJSON)),
        'pageElements': !exists(json, 'pageElements') ? undefined : json['pageElements'],
        'pageNumber': !exists(json, 'pageNumber') ? undefined : json['pageNumber'],
        'totalElements': !exists(json, 'totalElements') ? undefined : json['totalElements'],
    };
}
export function TicketEntityPageToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'content': value.content === undefined ? undefined : (value.content.map(TicketEntityToJSON)),
        'pageElements': value.pageElements,
        'pageNumber': value.pageNumber,
        'totalElements': value.totalElements,
    };
}
