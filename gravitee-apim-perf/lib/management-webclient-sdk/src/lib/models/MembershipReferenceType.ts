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
export enum MembershipReferenceType {
    APPLICATION = 'APPLICATION',
    API = 'API',
    GROUP = 'GROUP',
    ENVIRONMENT = 'ENVIRONMENT',
    ORGANIZATION = 'ORGANIZATION',
    PLATFORM = 'PLATFORM'
}

export function MembershipReferenceTypeFromJSON(json: any): MembershipReferenceType {
    return MembershipReferenceTypeFromJSONTyped(json, false);
}

export function MembershipReferenceTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): MembershipReferenceType {
    return json as MembershipReferenceType;
}

export function MembershipReferenceTypeToJSON(value?: MembershipReferenceType | null): any {
    return value as any;
}

