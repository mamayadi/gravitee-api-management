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


import * as runtime from '../runtime';
import {
    ApiRequest,
    ApiRequestFromJSON,
    ApiRequestToJSON,
    PlatformRequestItemSearchLogResponse,
    PlatformRequestItemSearchLogResponseFromJSON,
    PlatformRequestItemSearchLogResponseToJSON,
} from '../models';

export interface ExportPlatformLogsAsCSVRequest {
    from?: number;
    to?: number;
    query?: string;
    size?: number;
    page?: number;
    field?: string;
    order?: boolean;
    envId: string;
    orgId: string;
}

export interface GetPlatformLogRequest {
    log: string;
    timestamp?: number;
    envId: string;
    orgId: string;
}

export interface GetPlatformLogsRequest {
    from?: number;
    to?: number;
    query?: string;
    size?: number;
    page?: number;
    field?: string;
    order?: boolean;
    envId: string;
    orgId: string;
}

/**
 * 
 */
export class PlatformLogsApi extends runtime.BaseAPI {

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Export platform logs as CSV
     */
    async exportPlatformLogsAsCSVRaw(requestParameters: ExportPlatformLogsAsCSVRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling exportPlatformLogsAsCSV.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling exportPlatformLogsAsCSV.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.query !== undefined) {
            queryParameters['query'] = requestParameters.query;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.field !== undefined) {
            queryParameters['field'] = requestParameters.field;
        }

        if (requestParameters.order !== undefined) {
            queryParameters['order'] = requestParameters.order;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/platform/logs/export`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Export platform logs as CSV
     */
    async exportPlatformLogsAsCSV(requestParameters: ExportPlatformLogsAsCSVRequest): Promise<string> {
        const response = await this.exportPlatformLogsAsCSVRaw(requestParameters);
        return await response.value();
    }

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Get a specific log
     */
    async getPlatformLogRaw(requestParameters: GetPlatformLogRequest): Promise<runtime.ApiResponse<ApiRequest>> {
        if (requestParameters.log === null || requestParameters.log === undefined) {
            throw new runtime.RequiredError('log','Required parameter requestParameters.log was null or undefined when calling getPlatformLog.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getPlatformLog.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getPlatformLog.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.timestamp !== undefined) {
            queryParameters['timestamp'] = requestParameters.timestamp;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/platform/logs/{log}`.replace(`{${"log"}}`, encodeURIComponent(String(requestParameters.log))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiRequestFromJSON(jsonValue));
    }

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Get a specific log
     */
    async getPlatformLog(requestParameters: GetPlatformLogRequest): Promise<ApiRequest> {
        const response = await this.getPlatformLogRaw(requestParameters);
        return await response.value();
    }

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Get platform logs
     */
    async getPlatformLogsRaw(requestParameters: GetPlatformLogsRequest): Promise<runtime.ApiResponse<PlatformRequestItemSearchLogResponse>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getPlatformLogs.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getPlatformLogs.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.query !== undefined) {
            queryParameters['query'] = requestParameters.query;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.field !== undefined) {
            queryParameters['field'] = requestParameters.field;
        }

        if (requestParameters.order !== undefined) {
            queryParameters['order'] = requestParameters.order;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/platform/logs`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PlatformRequestItemSearchLogResponseFromJSON(jsonValue));
    }

    /**
     * User must have the MANAGEMENT_PLATFORM[READ] permission to use this service
     * Get platform logs
     */
    async getPlatformLogs(requestParameters: GetPlatformLogsRequest): Promise<PlatformRequestItemSearchLogResponse> {
        const response = await this.getPlatformLogsRaw(requestParameters);
        return await response.value();
    }

}