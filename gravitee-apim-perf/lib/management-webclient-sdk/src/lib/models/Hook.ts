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
/**
 * 
 * @export
 * @interface Hook
 */
export interface Hook {
    /**
     * 
     * @type {string}
     * @memberof Hook
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof Hook
     */
    description?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Hook
     */
    hidden?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Hook
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof Hook
     */
    scope?: HookScopeEnum;
    /**
     * 
     * @type {string}
     * @memberof Hook
     */
    template?: string;
}

export function HookFromJSON(json: any): Hook {
    return HookFromJSONTyped(json, false);
}

export function HookFromJSONTyped(json: any, ignoreDiscriminator: boolean): Hook {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'category': !exists(json, 'category') ? undefined : json['category'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'hidden': !exists(json, 'hidden') ? undefined : json['hidden'],
        'label': !exists(json, 'label') ? undefined : json['label'],
        'scope': !exists(json, 'scope') ? undefined : json['scope'],
        'template': !exists(json, 'template') ? undefined : json['template'],
    };
}

export function HookToJSON(value?: Hook | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'category': value.category,
        'description': value.description,
        'hidden': value.hidden,
        'label': value.label,
        'scope': value.scope,
        'template': value.template,
    };
}

/**
* @export
* @enum {string}
*/
export enum HookScopeEnum {
    API = 'API',
    APPLICATION = 'APPLICATION',
    PORTAL = 'PORTAL',
    TEMPLATESFORACTION = 'TEMPLATES_FOR_ACTION',
    TEMPLATESFORALERT = 'TEMPLATES_FOR_ALERT'
}


