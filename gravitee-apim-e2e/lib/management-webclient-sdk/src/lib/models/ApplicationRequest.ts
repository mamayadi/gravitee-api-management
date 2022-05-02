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
    Request,
    RequestFromJSON,
    RequestFromJSONTyped,
    RequestToJSON,
    Response,
    ResponseFromJSON,
    ResponseFromJSONTyped,
    ResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface ApplicationRequest
 */
export interface ApplicationRequest {
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequest
     */
    timestamp?: number;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    transactionId?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    uri?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    method?: ApplicationRequestMethodEnum;
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequest
     */
    status?: number;
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequest
     */
    responseTime?: number;
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequest
     */
    requestContentLength?: number;
    /**
     * 
     * @type {number}
     * @memberof ApplicationRequest
     */
    responseContentLength?: number;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    plan?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    api?: string;
    /**
     * 
     * @type {Request}
     * @memberof ApplicationRequest
     */
    request?: Request;
    /**
     * 
     * @type {Response}
     * @memberof ApplicationRequest
     */
    response?: Response;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof ApplicationRequest
     */
    metadata?: { [key: string]: { [key: string]: string; }; };
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    host?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    user?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    securityType?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationRequest
     */
    securityToken?: string;
}

export function ApplicationRequestFromJSON(json: any): ApplicationRequest {
    return ApplicationRequestFromJSONTyped(json, false);
}

export function ApplicationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApplicationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'uri': !exists(json, 'uri') ? undefined : json['uri'],
        'path': !exists(json, 'path') ? undefined : json['path'],
        'method': !exists(json, 'method') ? undefined : json['method'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'responseTime': !exists(json, 'responseTime') ? undefined : json['responseTime'],
        'requestContentLength': !exists(json, 'requestContentLength') ? undefined : json['requestContentLength'],
        'responseContentLength': !exists(json, 'responseContentLength') ? undefined : json['responseContentLength'],
        'plan': !exists(json, 'plan') ? undefined : json['plan'],
        'api': !exists(json, 'api') ? undefined : json['api'],
        'request': !exists(json, 'request') ? undefined : RequestFromJSON(json['request']),
        'response': !exists(json, 'response') ? undefined : ResponseFromJSON(json['response']),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'host': !exists(json, 'host') ? undefined : json['host'],
        'user': !exists(json, 'user') ? undefined : json['user'],
        'securityType': !exists(json, 'securityType') ? undefined : json['securityType'],
        'securityToken': !exists(json, 'securityToken') ? undefined : json['securityToken'],
    };
}

export function ApplicationRequestToJSON(value?: ApplicationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'timestamp': value.timestamp,
        'transactionId': value.transactionId,
        'uri': value.uri,
        'path': value.path,
        'method': value.method,
        'status': value.status,
        'responseTime': value.responseTime,
        'requestContentLength': value.requestContentLength,
        'responseContentLength': value.responseContentLength,
        'plan': value.plan,
        'api': value.api,
        'request': RequestToJSON(value.request),
        'response': ResponseToJSON(value.response),
        'metadata': value.metadata,
        'host': value.host,
        'user': value.user,
        'securityType': value.securityType,
        'securityToken': value.securityToken,
    };
}

/**
* @export
* @enum {string}
*/
export enum ApplicationRequestMethodEnum {
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

