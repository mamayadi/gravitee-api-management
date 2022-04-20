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
 * @interface EnvironmentEntity
 */
export interface EnvironmentEntity {
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    cockpitId?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EnvironmentEntity
     */
    hrids?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    organizationId: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EnvironmentEntity
     */
    domainRestrictions?: Array<string>;
}

export function EnvironmentEntityFromJSON(json: any): EnvironmentEntity {
    return EnvironmentEntityFromJSONTyped(json, false);
}

export function EnvironmentEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): EnvironmentEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'cockpitId': !exists(json, 'cockpitId') ? undefined : json['cockpitId'],
        'hrids': !exists(json, 'hrids') ? undefined : json['hrids'],
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'organizationId': json['organizationId'],
        'domainRestrictions': !exists(json, 'domainRestrictions') ? undefined : json['domainRestrictions'],
    };
}

export function EnvironmentEntityToJSON(value?: EnvironmentEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'cockpitId': value.cockpitId,
        'hrids': value.hrids,
        'name': value.name,
        'description': value.description,
        'organizationId': value.organizationId,
        'domainRestrictions': value.domainRestrictions,
    };
}

