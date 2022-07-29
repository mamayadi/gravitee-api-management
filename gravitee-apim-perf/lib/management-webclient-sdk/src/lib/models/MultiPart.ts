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
import {
    BodyPart,
    BodyPartFromJSON,
    BodyPartFromJSONTyped,
    BodyPartToJSON,
    BodyPartMediaType,
    BodyPartMediaTypeFromJSON,
    BodyPartMediaTypeFromJSONTyped,
    BodyPartMediaTypeToJSON,
    ContentDisposition,
    ContentDispositionFromJSON,
    ContentDispositionFromJSONTyped,
    ContentDispositionToJSON,
    ParameterizedHeader,
    ParameterizedHeaderFromJSON,
    ParameterizedHeaderFromJSONTyped,
    ParameterizedHeaderToJSON,
} from './';

/**
 * 
 * @export
 * @interface MultiPart
 */
export interface MultiPart {
    /**
     * 
     * @type {Array<BodyPart>}
     * @memberof MultiPart
     */
    bodyParts?: Array<BodyPart>;
    /**
     * 
     * @type {ContentDisposition}
     * @memberof MultiPart
     */
    contentDisposition?: ContentDisposition;
    /**
     * 
     * @type {any}
     * @memberof MultiPart
     */
    entity?: any;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof MultiPart
     */
    headers?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {BodyPartMediaType}
     * @memberof MultiPart
     */
    mediaType?: BodyPartMediaType;
    /**
     * 
     * @type {any}
     * @memberof MultiPart
     */
    messageBodyWorkers?: any;
    /**
     * 
     * @type {{ [key: string]: Array<ParameterizedHeader>; }}
     * @memberof MultiPart
     */
    parameterizedHeaders?: { [key: string]: Array<ParameterizedHeader>; };
    /**
     * 
     * @type {MultiPart}
     * @memberof MultiPart
     */
    parent?: MultiPart;
    /**
     * 
     * @type {any}
     * @memberof MultiPart
     */
    providers?: any;
}

export function MultiPartFromJSON(json: any): MultiPart {
    return MultiPartFromJSONTyped(json, false);
}

export function MultiPartFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiPart {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bodyParts': !exists(json, 'bodyParts') ? undefined : ((json['bodyParts'] as Array<any>).map(BodyPartFromJSON)),
        'contentDisposition': !exists(json, 'contentDisposition') ? undefined : ContentDispositionFromJSON(json['contentDisposition']),
        'entity': !exists(json, 'entity') ? undefined : json['entity'],
        'headers': !exists(json, 'headers') ? undefined : json['headers'],
        'mediaType': !exists(json, 'mediaType') ? undefined : BodyPartMediaTypeFromJSON(json['mediaType']),
        'messageBodyWorkers': !exists(json, 'messageBodyWorkers') ? undefined : json['messageBodyWorkers'],
        'parameterizedHeaders': !exists(json, 'parameterizedHeaders') ? undefined : json['parameterizedHeaders'],
        'parent': !exists(json, 'parent') ? undefined : MultiPartFromJSON(json['parent']),
        'providers': !exists(json, 'providers') ? undefined : json['providers'],
    };
}

export function MultiPartToJSON(value?: MultiPart | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'bodyParts': value.bodyParts === undefined ? undefined : ((value.bodyParts as Array<any>).map(BodyPartToJSON)),
        'contentDisposition': ContentDispositionToJSON(value.contentDisposition),
        'entity': value.entity,
        'headers': value.headers,
        'mediaType': BodyPartMediaTypeToJSON(value.mediaType),
        'messageBodyWorkers': value.messageBodyWorkers,
        'parameterizedHeaders': value.parameterizedHeaders,
        'parent': MultiPartToJSON(value.parent),
        'providers': value.providers,
    };
}


