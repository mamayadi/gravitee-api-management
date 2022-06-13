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
    ThemeDefinition,
    ThemeDefinitionFromJSON,
    ThemeDefinitionFromJSONTyped,
    ThemeDefinitionToJSON,
} from './';

/**
 * 
 * @export
 * @interface NewThemeEntity
 */
export interface NewThemeEntity {
    /**
     * 
     * @type {string}
     * @memberof NewThemeEntity
     */
    backgroundImage?: string;
    /**
     * 
     * @type {ThemeDefinition}
     * @memberof NewThemeEntity
     */
    definition?: ThemeDefinition;
    /**
     * 
     * @type {boolean}
     * @memberof NewThemeEntity
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof NewThemeEntity
     */
    favicon?: string;
    /**
     * 
     * @type {string}
     * @memberof NewThemeEntity
     */
    logo?: string;
    /**
     * 
     * @type {string}
     * @memberof NewThemeEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof NewThemeEntity
     */
    optionalLogo?: string;
}

export function NewThemeEntityFromJSON(json: any): NewThemeEntity {
    return NewThemeEntityFromJSONTyped(json, false);
}

export function NewThemeEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewThemeEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'backgroundImage': !exists(json, 'backgroundImage') ? undefined : json['backgroundImage'],
        'definition': !exists(json, 'definition') ? undefined : ThemeDefinitionFromJSON(json['definition']),
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'favicon': !exists(json, 'favicon') ? undefined : json['favicon'],
        'logo': !exists(json, 'logo') ? undefined : json['logo'],
        'name': json['name'],
        'optionalLogo': !exists(json, 'optionalLogo') ? undefined : json['optionalLogo'],
    };
}

export function NewThemeEntityToJSON(value?: NewThemeEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'backgroundImage': value.backgroundImage,
        'definition': ThemeDefinitionToJSON(value.definition),
        'enabled': value.enabled,
        'favicon': value.favicon,
        'logo': value.logo,
        'name': value.name,
        'optionalLogo': value.optionalLogo,
    };
}

