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
import {
    ApiListItem,
    ApiListItemFromJSON,
    ApiListItemFromJSONTyped,
    ApiListItemToJSON,
    Page,
    PageFromJSON,
    PageFromJSONTyped,
    PageToJSON,
} from './';

/**
 * 
 * @export
 * @interface PagedResultApiListItem
 */
export interface PagedResultApiListItem {
    /**
     * 
     * @type {Array<ApiListItem>}
     * @memberof PagedResultApiListItem
     */
    data?: Array<ApiListItem>;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: object; }; }}
     * @memberof PagedResultApiListItem
     */
    metadata?: { [key: string]: { [key: string]: object; }; };
    /**
     * 
     * @type {Page}
     * @memberof PagedResultApiListItem
     */
    page?: Page;
}

export function PagedResultApiListItemFromJSON(json: any): PagedResultApiListItem {
    return PagedResultApiListItemFromJSONTyped(json, false);
}

export function PagedResultApiListItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedResultApiListItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(ApiListItemFromJSON)),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'page': !exists(json, 'page') ? undefined : PageFromJSON(json['page']),
    };
}

export function PagedResultApiListItemToJSON(value?: PagedResultApiListItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(ApiListItemToJSON)),
        'metadata': value.metadata,
        'page': PageToJSON(value.page),
    };
}

