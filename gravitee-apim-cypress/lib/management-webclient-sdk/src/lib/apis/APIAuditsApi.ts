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


import * as runtime from '../runtime';
import {
    MetadataPageAuditEntity,
    MetadataPageAuditEntityFromJSON,
    MetadataPageAuditEntityToJSON,
} from '../models';

export interface GetApiAuditEventsRequest {
    api: string;
    envId: string;
    orgId: string;
}

export interface GetApiAuditsRequest {
    api2: string;
    envId: string;
    orgId: string;
    envLog?: boolean;
    orgLog?: boolean;
    api?: string;
    application?: string;
    event?: string;
    from?: number;
    to?: number;
    size?: number;
    page?: number;
}

/**
 * 
 */
export class APIAuditsApi extends runtime.BaseAPI {

    /**
     * User must have the API_AUDIT[READ] permission to use this service
     * List available audit event type for API
     */
    async getApiAuditEventsRaw(requestParameters: GetApiAuditEventsRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.api === null || requestParameters.api === undefined) {
            throw new runtime.RequiredError('api','Required parameter requestParameters.api was null or undefined when calling getApiAuditEvents.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getApiAuditEvents.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getApiAuditEvents.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/apis/{api}/audit/events`.replace(`{${"api"}}`, encodeURIComponent(String(requestParameters.api))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * User must have the API_AUDIT[READ] permission to use this service
     * List available audit event type for API
     */
    async getApiAuditEvents(requestParameters: GetApiAuditEventsRequest): Promise<void> {
        await this.getApiAuditEventsRaw(requestParameters);
    }

    /**
     * User must have the API_AUDIT[READ] permission to use this service
     * Retrieve audit logs for the API
     */
    async getApiAuditsRaw(requestParameters: GetApiAuditsRequest): Promise<runtime.ApiResponse<MetadataPageAuditEntity>> {
        if (requestParameters.api2 === null || requestParameters.api2 === undefined) {
            throw new runtime.RequiredError('api2','Required parameter requestParameters.api2 was null or undefined when calling getApiAudits.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getApiAudits.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getApiAudits.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.envLog !== undefined) {
            queryParameters['envLog'] = requestParameters.envLog;
        }

        if (requestParameters.orgLog !== undefined) {
            queryParameters['orgLog'] = requestParameters.orgLog;
        }

        if (requestParameters.api !== undefined) {
            queryParameters['api'] = requestParameters.api;
        }

        if (requestParameters.application !== undefined) {
            queryParameters['application'] = requestParameters.application;
        }

        if (requestParameters.event !== undefined) {
            queryParameters['event'] = requestParameters.event;
        }

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/apis/{api}/audit`.replace(`{${"api"}}`, encodeURIComponent(String(requestParameters.api2))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MetadataPageAuditEntityFromJSON(jsonValue));
    }

    /**
     * User must have the API_AUDIT[READ] permission to use this service
     * Retrieve audit logs for the API
     */
    async getApiAudits(requestParameters: GetApiAuditsRequest): Promise<MetadataPageAuditEntity> {
        const response = await this.getApiAuditsRaw(requestParameters);
        return await response.value();
    }

}