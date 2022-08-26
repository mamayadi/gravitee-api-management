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
 */
export const AuditType = {
    ORGANIZATION: 'ORGANIZATION',
    ENVIRONMENT: 'ENVIRONMENT',
    APPLICATION: 'APPLICATION',
    API: 'API'
} as const;
export type AuditType = typeof AuditType[keyof typeof AuditType];


export function AuditTypeFromJSON(json: any): AuditType {
    return AuditTypeFromJSONTyped(json, false);
}

export function AuditTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuditType {
    return json as AuditType;
}

export function AuditTypeToJSON(value?: AuditType | null): any {
    return value as any;
}
