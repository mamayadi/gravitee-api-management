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
import {
    MemberRoleEntity,
    MemberRoleEntityFromJSON,
    MemberRoleEntityFromJSONTyped,
    MemberRoleEntityToJSON,
} from './';

/**
 * 
 * @export
 * @interface GroupMembership
 */
export interface GroupMembership {
    /**
     * 
     * @type {string}
     * @memberof GroupMembership
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof GroupMembership
     */
    reference?: string;
    /**
     * 
     * @type {Array<MemberRoleEntity>}
     * @memberof GroupMembership
     */
    roles?: Array<MemberRoleEntity>;
}

export function GroupMembershipFromJSON(json: any): GroupMembership {
    return GroupMembershipFromJSONTyped(json, false);
}

export function GroupMembershipFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupMembership {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'roles': !exists(json, 'roles') ? undefined : ((json['roles'] as Array<any>).map(MemberRoleEntityFromJSON)),
    };
}

export function GroupMembershipToJSON(value?: GroupMembership | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'reference': value.reference,
        'roles': value.roles === undefined ? undefined : ((value.roles as Array<any>).map(MemberRoleEntityToJSON)),
    };
}

