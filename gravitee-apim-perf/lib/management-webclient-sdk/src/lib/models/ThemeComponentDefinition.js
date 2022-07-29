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
import { exists } from '../runtime';
import { ThemeCssDefinitionFromJSON, ThemeCssDefinitionToJSON, } from './';
export function ThemeComponentDefinitionFromJSON(json) {
    return ThemeComponentDefinitionFromJSONTyped(json, false);
}
export function ThemeComponentDefinitionFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'css': !exists(json, 'css') ? undefined : (json['css'].map(ThemeCssDefinitionFromJSON)),
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}
export function ThemeComponentDefinitionToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'css': value.css === undefined ? undefined : (value.css.map(ThemeCssDefinitionToJSON)),
        'name': value.name,
    };
}
