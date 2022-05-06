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
    ApplicationRequestItem,
    ApplicationRequestItemFromJSON,
    ApplicationRequestItemFromJSONTyped,
    ApplicationRequestItemToJSON,
} from './';

/**
 * 
 * @export
 * @interface ApplicationRequestItemSearchLogResponse
 */
export interface ApplicationRequestItemSearchLogResponse {
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequestItemSearchLogResponse
     */
    total?: number;
    /**
     * 
     * @type {Array<ApplicationRequestItem>}
     * @memberof ApplicationRequestItemSearchLogResponse
     */
    logs?: Array<ApplicationRequestItem>;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof ApplicationRequestItemSearchLogResponse
     */
    metadata?: { [key: string]: { [key: string]: string; }; };
}

export function ApplicationRequestItemSearchLogResponseFromJSON(json: any): ApplicationRequestItemSearchLogResponse {
    return ApplicationRequestItemSearchLogResponseFromJSONTyped(json, false);
}

export function ApplicationRequestItemSearchLogResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApplicationRequestItemSearchLogResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'total': !exists(json, 'total') ? undefined : json['total'],
        'logs': !exists(json, 'logs') ? undefined : ((json['logs'] as Array<any>).map(ApplicationRequestItemFromJSON)),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
    };
}

export function ApplicationRequestItemSearchLogResponseToJSON(value?: ApplicationRequestItemSearchLogResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'total': value.total,
        'logs': value.logs === undefined ? undefined : ((value.logs as Array<any>).map(ApplicationRequestItemToJSON)),
        'metadata': value.metadata,
    };
}

