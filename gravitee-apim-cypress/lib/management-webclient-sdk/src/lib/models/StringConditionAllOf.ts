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
 * @interface StringConditionAllOf
 */
export interface StringConditionAllOf {
    /**
     * 
     * @type {string}
     * @memberof StringConditionAllOf
     */
    property?: string;
    /**
     * 
     * @type {string}
     * @memberof StringConditionAllOf
     */
    operator?: StringConditionAllOfOperatorEnum;
    /**
     * 
     * @type {string}
     * @memberof StringConditionAllOf
     */
    pattern?: string;
    /**
     * 
     * @type {boolean}
     * @memberof StringConditionAllOf
     */
    ignoreCase?: boolean;
}

export function StringConditionAllOfFromJSON(json: any): StringConditionAllOf {
    return StringConditionAllOfFromJSONTyped(json, false);
}

export function StringConditionAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): StringConditionAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'property': !exists(json, 'property') ? undefined : json['property'],
        'operator': !exists(json, 'operator') ? undefined : json['operator'],
        'pattern': !exists(json, 'pattern') ? undefined : json['pattern'],
        'ignoreCase': !exists(json, 'ignoreCase') ? undefined : json['ignoreCase'],
    };
}

export function StringConditionAllOfToJSON(value?: StringConditionAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'property': value.property,
        'operator': value.operator,
        'pattern': value.pattern,
        'ignoreCase': value.ignoreCase,
    };
}

/**
* @export
* @enum {string}
*/
export enum StringConditionAllOfOperatorEnum {
    EQUALS = 'EQUALS',
    NOTEQUALS = 'NOT_EQUALS',
    STARTSWITH = 'STARTS_WITH',
    ENDSWITH = 'ENDS_WITH',
    CONTAINS = 'CONTAINS',
    MATCHES = 'MATCHES'
}

