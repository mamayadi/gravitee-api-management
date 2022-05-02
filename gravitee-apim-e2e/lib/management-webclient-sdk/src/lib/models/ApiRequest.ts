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
 * @interface ApiRequest
 */
export interface ApiRequest {
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    api?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    timestamp?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    transactionId?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    uri?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    method?: ApiRequestMethodEnum;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    status?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    responseTime?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    apiResponseTime?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    requestContentLength?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiRequest
     */
    responseContentLength?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    plan?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    application?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    localAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    remoteAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    endpoint?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    tenant?: string;
    /**
     * 
     * @type {Request}
     * @memberof ApiRequest
     */
    clientRequest?: Request;
    /**
     * 
     * @type {Request}
     * @memberof ApiRequest
     */
    proxyRequest?: Request;
    /**
     * 
     * @type {Response}
     * @memberof ApiRequest
     */
    clientResponse?: Response;
    /**
     * 
     * @type {Response}
     * @memberof ApiRequest
     */
    proxyResponse?: Response;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    gateway?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    subscription?: string;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof ApiRequest
     */
    metadata?: { [key: string]: { [key: string]: string; }; };
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    host?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    user?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    securityType?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRequest
     */
    securityToken?: string;
}

export function ApiRequestFromJSON(json: any): ApiRequest {
    return ApiRequestFromJSONTyped(json, false);
}

export function ApiRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'api': !exists(json, 'api') ? undefined : json['api'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'uri': !exists(json, 'uri') ? undefined : json['uri'],
        'path': !exists(json, 'path') ? undefined : json['path'],
        'method': !exists(json, 'method') ? undefined : json['method'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'responseTime': !exists(json, 'responseTime') ? undefined : json['responseTime'],
        'apiResponseTime': !exists(json, 'apiResponseTime') ? undefined : json['apiResponseTime'],
        'requestContentLength': !exists(json, 'requestContentLength') ? undefined : json['requestContentLength'],
        'responseContentLength': !exists(json, 'responseContentLength') ? undefined : json['responseContentLength'],
        'plan': !exists(json, 'plan') ? undefined : json['plan'],
        'application': !exists(json, 'application') ? undefined : json['application'],
        'localAddress': !exists(json, 'localAddress') ? undefined : json['localAddress'],
        'remoteAddress': !exists(json, 'remoteAddress') ? undefined : json['remoteAddress'],
        'endpoint': !exists(json, 'endpoint') ? undefined : json['endpoint'],
        'tenant': !exists(json, 'tenant') ? undefined : json['tenant'],
        'clientRequest': !exists(json, 'clientRequest') ? undefined : RequestFromJSON(json['clientRequest']),
        'proxyRequest': !exists(json, 'proxyRequest') ? undefined : RequestFromJSON(json['proxyRequest']),
        'clientResponse': !exists(json, 'clientResponse') ? undefined : ResponseFromJSON(json['clientResponse']),
        'proxyResponse': !exists(json, 'proxyResponse') ? undefined : ResponseFromJSON(json['proxyResponse']),
        'message': !exists(json, 'message') ? undefined : json['message'],
        'gateway': !exists(json, 'gateway') ? undefined : json['gateway'],
        'subscription': !exists(json, 'subscription') ? undefined : json['subscription'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'host': !exists(json, 'host') ? undefined : json['host'],
        'user': !exists(json, 'user') ? undefined : json['user'],
        'securityType': !exists(json, 'securityType') ? undefined : json['securityType'],
        'securityToken': !exists(json, 'securityToken') ? undefined : json['securityToken'],
    };
}

export function ApiRequestToJSON(value?: ApiRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'api': value.api,
        'timestamp': value.timestamp,
        'transactionId': value.transactionId,
        'uri': value.uri,
        'path': value.path,
        'method': value.method,
        'status': value.status,
        'responseTime': value.responseTime,
        'apiResponseTime': value.apiResponseTime,
        'requestContentLength': value.requestContentLength,
        'responseContentLength': value.responseContentLength,
        'plan': value.plan,
        'application': value.application,
        'localAddress': value.localAddress,
        'remoteAddress': value.remoteAddress,
        'endpoint': value.endpoint,
        'tenant': value.tenant,
        'clientRequest': RequestToJSON(value.clientRequest),
        'proxyRequest': RequestToJSON(value.proxyRequest),
        'clientResponse': ResponseToJSON(value.clientResponse),
        'proxyResponse': ResponseToJSON(value.proxyResponse),
        'message': value.message,
        'gateway': value.gateway,
        'subscription': value.subscription,
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
export enum ApiRequestMethodEnum {
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

