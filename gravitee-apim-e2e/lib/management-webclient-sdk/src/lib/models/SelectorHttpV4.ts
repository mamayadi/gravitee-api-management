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
import type { Selector } from './Selector';
import {
    SelectorFromJSON,
    SelectorFromJSONTyped,
    SelectorToJSON,
} from './Selector';
import type { SelectorHttpV4AllOf } from './SelectorHttpV4AllOf';
import {
    SelectorHttpV4AllOfFromJSON,
    SelectorHttpV4AllOfFromJSONTyped,
    SelectorHttpV4AllOfToJSON,
} from './SelectorHttpV4AllOf';

/**
 * 
 * @export
 * @interface SelectorHttpV4
 */
export interface SelectorHttpV4 extends Selector {
    /**
     * 
     * @type {string}
     * @memberof SelectorHttpV4
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof SelectorHttpV4
     */
    pathOperator: SelectorHttpV4PathOperatorEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof SelectorHttpV4
     */
    methods?: Array<SelectorHttpV4MethodsEnum>;
}


/**
 * @export
 */
export const SelectorHttpV4PathOperatorEnum = {
    STARTS_WITH: 'STARTS_WITH',
    EQUALS: 'EQUALS'
} as const;
export type SelectorHttpV4PathOperatorEnum = typeof SelectorHttpV4PathOperatorEnum[keyof typeof SelectorHttpV4PathOperatorEnum];

/**
 * @export
 */
export const SelectorHttpV4MethodsEnum = {
    CONNECT: 'CONNECT',
    DELETE: 'DELETE',
    GET: 'GET',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
    TRACE: 'TRACE',
    OTHER: 'OTHER'
} as const;
export type SelectorHttpV4MethodsEnum = typeof SelectorHttpV4MethodsEnum[keyof typeof SelectorHttpV4MethodsEnum];


/**
 * Check if a given object implements the SelectorHttpV4 interface.
 */
export function instanceOfSelectorHttpV4(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "pathOperator" in value;

    return isInstance;
}

export function SelectorHttpV4FromJSON(json: any): SelectorHttpV4 {
    return SelectorHttpV4FromJSONTyped(json, false);
}

export function SelectorHttpV4FromJSONTyped(json: any, ignoreDiscriminator: boolean): SelectorHttpV4 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...SelectorFromJSONTyped(json, ignoreDiscriminator),
        'path': json['path'],
        'pathOperator': json['pathOperator'],
        'methods': !exists(json, 'methods') ? undefined : json['methods'],
    };
}

export function SelectorHttpV4ToJSON(value?: SelectorHttpV4 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SelectorToJSON(value),
        'path': value.path,
        'pathOperator': value.pathOperator,
        'methods': value.methods,
    };
}
