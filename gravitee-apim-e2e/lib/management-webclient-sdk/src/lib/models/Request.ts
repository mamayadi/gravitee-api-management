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
 * @interface Request
 */
export interface Request {
    /**
     * 
     * @type {string}
     * @memberof Request
     */
    method?: RequestMethodEnum;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof Request
     */
    headers?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof Request
     */
    uri?: string;
    /**
     * 
     * @type {string}
     * @memberof Request
     */
    body?: string;
}

export function RequestFromJSON(json: any): Request {
    return RequestFromJSONTyped(json, false);
}

export function RequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): Request {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'method': !exists(json, 'method') ? undefined : json['method'],
        'headers': !exists(json, 'headers') ? undefined : json['headers'],
        'uri': !exists(json, 'uri') ? undefined : json['uri'],
        'body': !exists(json, 'body') ? undefined : json['body'],
    };
}

export function RequestToJSON(value?: Request | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'method': value.method,
        'headers': value.headers,
        'uri': value.uri,
        'body': value.body,
    };
}

/**
* @export
* @enum {string}
*/
export enum RequestMethodEnum {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
    OTHER = 'OTHER'
}

