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
import { RatingEntityFromJSON, RatingEntityToJSON, } from './';
export function PageRatingEntityFromJSON(json) {
    return PageRatingEntityFromJSONTyped(json, false);
}
export function PageRatingEntityFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'content': !exists(json, 'content') ? undefined : (json['content'].map(RatingEntityFromJSON)),
        'pageElements': !exists(json, 'pageElements') ? undefined : json['pageElements'],
        'pageNumber': !exists(json, 'pageNumber') ? undefined : json['pageNumber'],
        'totalElements': !exists(json, 'totalElements') ? undefined : json['totalElements'],
    };
}
export function PageRatingEntityToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'content': value.content === undefined ? undefined : (value.content.map(RatingEntityToJSON)),
        'pageElements': value.pageElements,
        'pageNumber': value.pageNumber,
        'totalElements': value.totalElements,
    };
}
