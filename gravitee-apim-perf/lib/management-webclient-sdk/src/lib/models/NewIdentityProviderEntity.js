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
import { IdentityProviderTypeFromJSON, IdentityProviderTypeToJSON, } from './';
export function NewIdentityProviderEntityFromJSON(json) {
    return NewIdentityProviderEntityFromJSONTyped(json, false);
}
export function NewIdentityProviderEntityFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'configuration': json['configuration'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'emailRequired': !exists(json, 'emailRequired') ? undefined : json['emailRequired'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'name': json['name'],
        'syncMappings': !exists(json, 'syncMappings') ? undefined : json['syncMappings'],
        'type': IdentityProviderTypeFromJSON(json['type']),
        'userProfileMapping': !exists(json, 'userProfileMapping') ? undefined : json['userProfileMapping'],
    };
}
export function NewIdentityProviderEntityToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'configuration': value.configuration,
        'description': value.description,
        'emailRequired': value.emailRequired,
        'enabled': value.enabled,
        'name': value.name,
        'syncMappings': value.syncMappings,
        'type': IdentityProviderTypeToJSON(value.type),
        'userProfileMapping': value.userProfileMapping,
    };
}
