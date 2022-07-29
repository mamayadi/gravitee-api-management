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
    ApiStatus,
    ApiStatusFromJSON,
    ApiStatusFromJSONTyped,
    ApiStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface Dashboards
 */
export interface Dashboards {
    /**
     * 
     * @type {ApiStatus}
     * @memberof Dashboards
     */
    apiStatus?: ApiStatus;
}

export function DashboardsFromJSON(json: any): Dashboards {
    return DashboardsFromJSONTyped(json, false);
}

export function DashboardsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Dashboards {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiStatus': !exists(json, 'apiStatus') ? undefined : ApiStatusFromJSON(json['apiStatus']),
    };
}

export function DashboardsToJSON(value?: Dashboards | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiStatus': ApiStatusToJSON(value.apiStatus),
    };
}


