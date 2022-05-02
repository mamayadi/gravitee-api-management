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
 * @interface PageSourceEntity
 */
export interface PageSourceEntity {
    /**
     * 
     * @type {string}
     * @memberof PageSourceEntity
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof PageSourceEntity
     */
    configuration?: string;
}

export function PageSourceEntityFromJSON(json: any): PageSourceEntity {
    return PageSourceEntityFromJSONTyped(json, false);
}

export function PageSourceEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageSourceEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'configuration': !exists(json, 'configuration') ? undefined : json['configuration'],
    };
}

export function PageSourceEntityToJSON(value?: PageSourceEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'configuration': value.configuration,
    };
}

