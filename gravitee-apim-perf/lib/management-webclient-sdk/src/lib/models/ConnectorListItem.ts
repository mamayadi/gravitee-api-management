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
 * @interface ConnectorListItem
 */
export interface ConnectorListItem {
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    icon?: string;
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    schema?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ConnectorListItem
     */
    supportedTypes?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ConnectorListItem
     */
    version?: string;
}

export function ConnectorListItemFromJSON(json: any): ConnectorListItem {
    return ConnectorListItemFromJSONTyped(json, false);
}

export function ConnectorListItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConnectorListItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'icon': !exists(json, 'icon') ? undefined : json['icon'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'schema': !exists(json, 'schema') ? undefined : json['schema'],
        'supportedTypes': !exists(json, 'supportedTypes') ? undefined : json['supportedTypes'],
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}

export function ConnectorListItemToJSON(value?: ConnectorListItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'icon': value.icon,
        'id': value.id,
        'name': value.name,
        'schema': value.schema,
        'supportedTypes': value.supportedTypes,
        'version': value.version,
    };
}


