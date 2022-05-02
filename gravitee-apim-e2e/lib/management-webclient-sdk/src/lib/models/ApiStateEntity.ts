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
 * @interface ApiStateEntity
 */
export interface ApiStateEntity {
    /**
     * 
     * @type {string}
     * @memberof ApiStateEntity
     */
    api_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiStateEntity
     */
    is_synchronized?: boolean;
}

export function ApiStateEntityFromJSON(json: any): ApiStateEntity {
    return ApiStateEntityFromJSONTyped(json, false);
}

export function ApiStateEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiStateEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'api_id': !exists(json, 'api_id') ? undefined : json['api_id'],
        'is_synchronized': !exists(json, 'is_synchronized') ? undefined : json['is_synchronized'],
    };
}

export function ApiStateEntityToJSON(value?: ApiStateEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'api_id': value.api_id,
        'is_synchronized': value.is_synchronized,
    };
}

