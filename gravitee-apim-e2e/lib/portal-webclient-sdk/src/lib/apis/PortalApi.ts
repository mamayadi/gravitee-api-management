/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ApiInformation,
    ApiInformationFromJSON,
    ApiInformationToJSON,
    CategoriesResponse,
    CategoriesResponseFromJSON,
    CategoriesResponseToJSON,
    Category,
    CategoryFromJSON,
    CategoryToJSON,
    ConfigurationApplicationRolesResponse,
    ConfigurationApplicationRolesResponseFromJSON,
    ConfigurationApplicationRolesResponseToJSON,
    ConfigurationApplicationTypesResponse,
    ConfigurationApplicationTypesResponseFromJSON,
    ConfigurationApplicationTypesResponseToJSON,
    ConfigurationIdentitiesResponse,
    ConfigurationIdentitiesResponseFromJSON,
    ConfigurationIdentitiesResponseToJSON,
    ConfigurationResponse,
    ConfigurationResponseFromJSON,
    ConfigurationResponseToJSON,
    Dashboard,
    DashboardFromJSON,
    DashboardToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IdentityProvider,
    IdentityProviderFromJSON,
    IdentityProviderToJSON,
    Info,
    InfoFromJSON,
    InfoToJSON,
    LinksResponse,
    LinksResponseFromJSON,
    LinksResponseToJSON,
    Page,
    PageFromJSON,
    PageToJSON,
    PagesResponse,
    PagesResponseFromJSON,
    PagesResponseToJSON,
    ThemeResponse,
    ThemeResponseFromJSON,
    ThemeResponseToJSON,
    TicketInput,
    TicketInputFromJSON,
    TicketInputToJSON,
    TicketsResponse,
    TicketsResponseFromJSON,
    TicketsResponseToJSON,
} from '../models';

export interface CreateTicketRequest {
    ticketInput?: TicketInput;
}

export interface GetApiInformationsRequest {
    apiId: string;
}

export interface GetBackgroundByCategoryIdRequest {
    categoryId: string;
}

export interface GetCategoriesRequest {
    page?: number;
    size?: number;
}

export interface GetCategoryByCategoryIdRequest {
    categoryId: string;
}

export interface GetPageByPageIdRequest {
    pageId: string;
    include?: Array<GetPageByPageIdIncludeEnum>;
}

export interface GetPageContentByPageIdRequest {
    pageId: string;
}

export interface GetPagesRequest {
    page?: number;
    size?: number;
    homepage?: boolean;
    parent?: string;
}

export interface GetPictureByCategoryIdRequest {
    categoryId: string;
}

export interface GetPortalIdentityProviderRequest {
    identityProviderId: string;
}

export interface GetPortalMediaRequest {
    mediaHash: string;
}

export interface GetTicketsRequest {
    apiId?: string;
    applicationId?: string;
    page?: number;
    size?: number;
    order?: string;
}

/**
 * 
 */
export class PortalApi extends runtime.BaseAPI {

    /**
     * Create a ticket. This ticket can aim :   * a specific application   * a specific API   * the gravitee portal  User must be authenticated to use this service. 
     * Create a ticket.
     */
    async createTicketRaw(requestParameters: CreateTicketRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/tickets`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TicketInputToJSON(requestParameters.ticketInput),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a ticket. This ticket can aim :   * a specific application   * a specific API   * the gravitee portal  User must be authenticated to use this service. 
     * Create a ticket.
     */
    async createTicket(requestParameters: CreateTicketRequest): Promise<void> {
        await this.createTicketRaw(requestParameters);
    }

    /**
     * Get api informations. 
     * Get the api dynamic informations to display.
     */
    async getApiInformationsRaw(requestParameters: GetApiInformationsRequest): Promise<runtime.ApiResponse<Array<ApiInformation>>> {
        if (requestParameters.apiId === null || requestParameters.apiId === undefined) {
            throw new runtime.RequiredError('apiId','Required parameter requestParameters.apiId was null or undefined when calling getApiInformations.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/apis/{apiId}/informations`.replace(`{${"apiId"}}`, encodeURIComponent(String(requestParameters.apiId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ApiInformationFromJSON));
    }

    /**
     * Get api informations. 
     * Get the api dynamic informations to display.
     */
    async getApiInformations(requestParameters: GetApiInformationsRequest): Promise<Array<ApiInformation>> {
        const response = await this.getApiInformationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get application roles. 
     * Get the application roles list.
     */
    async getApplicationRolesRaw(): Promise<runtime.ApiResponse<ConfigurationApplicationRolesResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration/applications/roles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfigurationApplicationRolesResponseFromJSON(jsonValue));
    }

    /**
     * Get application roles. 
     * Get the application roles list.
     */
    async getApplicationRoles(): Promise<ConfigurationApplicationRolesResponse> {
        const response = await this.getApplicationRolesRaw();
        return await response.value();
    }

    /**
     * Get the background of a category. 
     * Get background of a Category
     */
    async getBackgroundByCategoryIdRaw(requestParameters: GetBackgroundByCategoryIdRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling getBackgroundByCategoryId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/categories/{categoryId}/background`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Get the background of a category. 
     * Get background of a Category
     */
    async getBackgroundByCategoryId(requestParameters: GetBackgroundByCategoryIdRequest): Promise<Blob> {
        const response = await this.getBackgroundByCategoryIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all categories of the platform. 
     * Get a Category list
     */
    async getCategoriesRaw(requestParameters: GetCategoriesRequest): Promise<runtime.ApiResponse<CategoriesResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/categories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoriesResponseFromJSON(jsonValue));
    }

    /**
     * Get all categories of the platform. 
     * Get a Category list
     */
    async getCategories(requestParameters: GetCategoriesRequest): Promise<CategoriesResponse> {
        const response = await this.getCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get a specific category. 
     * Get a Category
     */
    async getCategoryByCategoryIdRaw(requestParameters: GetCategoryByCategoryIdRequest): Promise<runtime.ApiResponse<Category>> {
        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling getCategoryByCategoryId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/categories/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryFromJSON(jsonValue));
    }

    /**
     * Get a specific category. 
     * Get a Category
     */
    async getCategoryByCategoryId(requestParameters: GetCategoryByCategoryIdRequest): Promise<Category> {
        const response = await this.getCategoryByCategoryIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all dashboards of the platform. 
     * Get a Dashboards list
     */
    async getDashboardsRaw(): Promise<runtime.ApiResponse<Array<Dashboard>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dashboards`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DashboardFromJSON));
    }

    /**
     * Get all dashboards of the platform. 
     * Get a Dashboards list
     */
    async getDashboards(): Promise<Array<Dashboard>> {
        const response = await this.getDashboardsRaw();
        return await response.value();
    }

    /**
     * Get enabled application types. 
     * Get the application types list.
     */
    async getEnabledApplicationTypesRaw(): Promise<runtime.ApiResponse<ConfigurationApplicationTypesResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration/applications/types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfigurationApplicationTypesResponseFromJSON(jsonValue));
    }

    /**
     * Get enabled application types. 
     * Get the application types list.
     */
    async getEnabledApplicationTypes(): Promise<ConfigurationApplicationTypesResponse> {
        const response = await this.getEnabledApplicationTypesRaw();
        return await response.value();
    }

    /**
     * Get a specific portal documentation page. 
     * Get a portal page
     */
    async getPageByPageIdRaw(requestParameters: GetPageByPageIdRequest): Promise<runtime.ApiResponse<Page>> {
        if (requestParameters.pageId === null || requestParameters.pageId === undefined) {
            throw new runtime.RequiredError('pageId','Required parameter requestParameters.pageId was null or undefined when calling getPageByPageId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.include) {
            queryParameters['include'] = requestParameters.include;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages/{pageId}`.replace(`{${"pageId"}}`, encodeURIComponent(String(requestParameters.pageId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PageFromJSON(jsonValue));
    }

    /**
     * Get a specific portal documentation page. 
     * Get a portal page
     */
    async getPageByPageId(requestParameters: GetPageByPageIdRequest): Promise<Page> {
        const response = await this.getPageByPageIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get the contentn of a specific portal documentation page. 
     * Get the content of a portal page.
     */
    async getPageContentByPageIdRaw(requestParameters: GetPageContentByPageIdRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.pageId === null || requestParameters.pageId === undefined) {
            throw new runtime.RequiredError('pageId','Required parameter requestParameters.pageId was null or undefined when calling getPageContentByPageId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages/{pageId}/content`.replace(`{${"pageId"}}`, encodeURIComponent(String(requestParameters.pageId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Get the contentn of a specific portal documentation page. 
     * Get the content of a portal page.
     */
    async getPageContentByPageId(requestParameters: GetPageContentByPageIdRequest): Promise<string> {
        const response = await this.getPageContentByPageIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * List all portal documentation pages 
     * List portal pages
     */
    async getPagesRaw(requestParameters: GetPagesRequest): Promise<runtime.ApiResponse<PagesResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.homepage !== undefined) {
            queryParameters['homepage'] = requestParameters.homepage;
        }

        if (requestParameters.parent !== undefined) {
            queryParameters['parent'] = requestParameters.parent;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PagesResponseFromJSON(jsonValue));
    }

    /**
     * List all portal documentation pages 
     * List portal pages
     */
    async getPages(requestParameters: GetPagesRequest): Promise<PagesResponse> {
        const response = await this.getPagesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get the picture of a category. 
     * Get picture of a Category
     */
    async getPictureByCategoryIdRaw(requestParameters: GetPictureByCategoryIdRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling getPictureByCategoryId.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/categories/{categoryId}/picture`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Get the picture of a category. 
     * Get picture of a Category
     */
    async getPictureByCategoryId(requestParameters: GetPictureByCategoryIdRequest): Promise<Blob> {
        const response = await this.getPictureByCategoryIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all the portal configuration from the platform settings. 
     * Get portal configuration.
     */
    async getPortalConfigurationRaw(): Promise<runtime.ApiResponse<ConfigurationResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfigurationResponseFromJSON(jsonValue));
    }

    /**
     * Get all the portal configuration from the platform settings. 
     * Get portal configuration.
     */
    async getPortalConfiguration(): Promise<ConfigurationResponse> {
        const response = await this.getPortalConfigurationRaw();
        return await response.value();
    }

    /**
     * Get a specific identity provider by its id. 
     * Get an identity provider.
     */
    async getPortalIdentityProviderRaw(requestParameters: GetPortalIdentityProviderRequest): Promise<runtime.ApiResponse<IdentityProvider>> {
        if (requestParameters.identityProviderId === null || requestParameters.identityProviderId === undefined) {
            throw new runtime.RequiredError('identityProviderId','Required parameter requestParameters.identityProviderId was null or undefined when calling getPortalIdentityProvider.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration/identities/{identityProviderId}`.replace(`{${"identityProviderId"}}`, encodeURIComponent(String(requestParameters.identityProviderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdentityProviderFromJSON(jsonValue));
    }

    /**
     * Get a specific identity provider by its id. 
     * Get an identity provider.
     */
    async getPortalIdentityProvider(requestParameters: GetPortalIdentityProviderRequest): Promise<IdentityProvider> {
        const response = await this.getPortalIdentityProviderRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all the identity providers that can used in the portal. 
     * Get the identity provider list.
     */
    async getPortalIdentityProvidersRaw(): Promise<runtime.ApiResponse<ConfigurationIdentitiesResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration/identities`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfigurationIdentitiesResponseFromJSON(jsonValue));
    }

    /**
     * Get all the identity providers that can used in the portal. 
     * Get the identity provider list.
     */
    async getPortalIdentityProviders(): Promise<ConfigurationIdentitiesResponse> {
        const response = await this.getPortalIdentityProvidersRaw();
        return await response.value();
    }

    /**
     * Get some information about the portal (version, ...). 
     * Get portal information.
     */
    async getPortalInformationRaw(): Promise<runtime.ApiResponse<Info>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InfoFromJSON(jsonValue));
    }

    /**
     * Get some information about the portal (version, ...). 
     * Get portal information.
     */
    async getPortalInformation(): Promise<Info> {
        const response = await this.getPortalInformationRaw();
        return await response.value();
    }

    /**
     * Get all the links (internal and external) to be displayed in the header and in the footer of the portal. 
     * Get the portal links for header and footer.
     */
    async getPortalLinksRaw(): Promise<runtime.ApiResponse<LinksResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/configuration/links`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LinksResponseFromJSON(jsonValue));
    }

    /**
     * Get all the links (internal and external) to be displayed in the header and in the footer of the portal. 
     * Get the portal links for header and footer.
     */
    async getPortalLinks(): Promise<LinksResponse> {
        const response = await this.getPortalLinksRaw();
        return await response.value();
    }

    /**
     * Get portal media. 
     * Get the media of the portal.
     */
    async getPortalMediaRaw(requestParameters: GetPortalMediaRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.mediaHash === null || requestParameters.mediaHash === undefined) {
            throw new runtime.RequiredError('mediaHash','Required parameter requestParameters.mediaHash was null or undefined when calling getPortalMedia.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/media/{mediaHash}`.replace(`{${"mediaHash"}}`, encodeURIComponent(String(requestParameters.mediaHash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Get portal media. 
     * Get the media of the portal.
     */
    async getPortalMedia(requestParameters: GetPortalMediaRequest): Promise<Blob> {
        const response = await this.getPortalMediaRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get portal theme. 
     * Get portal theme.
     */
    async getPortalThemeRaw(): Promise<runtime.ApiResponse<ThemeResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/theme`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ThemeResponseFromJSON(jsonValue));
    }

    /**
     * Get portal theme. 
     * Get portal theme.
     */
    async getPortalTheme(): Promise<ThemeResponse> {
        const response = await this.getPortalThemeRaw();
        return await response.value();
    }

    /**
     * List all tickets written by current user 
     */
    async getTicketsRaw(requestParameters: GetTicketsRequest): Promise<runtime.ApiResponse<TicketsResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.apiId !== undefined) {
            queryParameters['apiId'] = requestParameters.apiId;
        }

        if (requestParameters.applicationId !== undefined) {
            queryParameters['applicationId'] = requestParameters.applicationId;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.order !== undefined) {
            queryParameters['order'] = requestParameters.order;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/tickets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TicketsResponseFromJSON(jsonValue));
    }

    /**
     * List all tickets written by current user 
     */
    async getTickets(requestParameters: GetTicketsRequest): Promise<TicketsResponse> {
        const response = await this.getTicketsRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum GetPageByPageIdIncludeEnum {
    Content = 'content'
}