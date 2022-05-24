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

import { exists, mapValues } from '../runtime';
import {
    PlatformRequestItem,
    PlatformRequestItemFromJSON,
    PlatformRequestItemFromJSONTyped,
    PlatformRequestItemToJSON,
} from './';

/**
 * 
 * @export
 * @interface PlatformRequestItemSearchLogResponse
 */
export interface PlatformRequestItemSearchLogResponse {
    /**
     * 
     * @type {Array<PlatformRequestItem>}
     * @memberof PlatformRequestItemSearchLogResponse
     */
    logs?: Array<PlatformRequestItem>;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof PlatformRequestItemSearchLogResponse
     */
    metadata?: { [key: string]: { [key: string]: string; }; };
    /**
     * 
     * @type {number}
     * @memberof PlatformRequestItemSearchLogResponse
     */
    total?: number;
}

export function PlatformRequestItemSearchLogResponseFromJSON(json: any): PlatformRequestItemSearchLogResponse {
    return PlatformRequestItemSearchLogResponseFromJSONTyped(json, false);
}

export function PlatformRequestItemSearchLogResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformRequestItemSearchLogResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'logs': !exists(json, 'logs') ? undefined : ((json['logs'] as Array<any>).map(PlatformRequestItemFromJSON)),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'total': !exists(json, 'total') ? undefined : json['total'],
    };
}

export function PlatformRequestItemSearchLogResponseToJSON(value?: PlatformRequestItemSearchLogResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'logs': value.logs === undefined ? undefined : ((value.logs as Array<any>).map(PlatformRequestItemToJSON)),
        'metadata': value.metadata,
        'total': value.total,
    };
}

