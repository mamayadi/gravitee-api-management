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
 * @interface Rule
 */
export interface Rule {
    [key: string]: object | any;
    /**
     * 
     * @type {Array<string>}
     * @memberof Rule
     */
    methods?: Array<RuleMethodsEnum>;
    /**
     * 
     * @type {string}
     * @memberof Rule
     */
    description?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Rule
     */
    enabled?: boolean;
}

export function RuleFromJSON(json: any): Rule {
    return RuleFromJSONTyped(json, false);
}

export function RuleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rule {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
            ...json,
        'methods': !exists(json, 'methods') ? undefined : json['methods'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
    };
}

export function RuleToJSON(value?: Rule | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
            ...value,
        'methods': value.methods,
        'description': value.description,
        'enabled': value.enabled,
    };
}

/**
* @export
* @enum {string}
*/
export enum RuleMethodsEnum {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
    OTHER = 'OTHER'
}

