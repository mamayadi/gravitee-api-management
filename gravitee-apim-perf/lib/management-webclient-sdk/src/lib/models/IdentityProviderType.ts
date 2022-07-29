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

/**
 * 
 * @export
 * @enum {string}
 */
export enum IdentityProviderType {
    GOOGLE = 'GOOGLE',
    GITHUB = 'GITHUB',
    GRAVITEEIOAM = 'GRAVITEEIO_AM',
    OIDC = 'OIDC'
}

export function IdentityProviderTypeFromJSON(json: any): IdentityProviderType {
    return IdentityProviderTypeFromJSONTyped(json, false);
}

export function IdentityProviderTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): IdentityProviderType {
    return json as IdentityProviderType;
}

export function IdentityProviderTypeToJSON(value?: IdentityProviderType | null): any {
    return value as any;
}

