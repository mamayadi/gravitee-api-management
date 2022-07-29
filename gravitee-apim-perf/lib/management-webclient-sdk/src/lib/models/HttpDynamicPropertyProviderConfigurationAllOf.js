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
import { exists } from '../runtime';
import { HttpHeaderFromJSON, HttpHeaderToJSON, } from './';
export function HttpDynamicPropertyProviderConfigurationAllOfFromJSON(json) {
    return HttpDynamicPropertyProviderConfigurationAllOfFromJSONTyped(json, false);
}
export function HttpDynamicPropertyProviderConfigurationAllOfFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'url': !exists(json, 'url') ? undefined : json['url'],
        'specification': !exists(json, 'specification') ? undefined : json['specification'],
        'useSystemProxy': !exists(json, 'useSystemProxy') ? undefined : json['useSystemProxy'],
        'method': !exists(json, 'method') ? undefined : json['method'],
        'headers': !exists(json, 'headers') ? undefined : (json['headers'].map(HttpHeaderFromJSON)),
        'body': !exists(json, 'body') ? undefined : json['body'],
    };
}
export function HttpDynamicPropertyProviderConfigurationAllOfToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'url': value.url,
        'specification': value.specification,
        'useSystemProxy': value.useSystemProxy,
        'method': value.method,
        'headers': value.headers === undefined ? undefined : (value.headers.map(HttpHeaderToJSON)),
        'body': value.body,
    };
}
/**
* @export
* @enum {string}
*/
export var HttpDynamicPropertyProviderConfigurationAllOfMethodEnum;
(function (HttpDynamicPropertyProviderConfigurationAllOfMethodEnum) {
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["CONNECT"] = "CONNECT";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["DELETE"] = "DELETE";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["GET"] = "GET";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["HEAD"] = "HEAD";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["OPTIONS"] = "OPTIONS";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["PATCH"] = "PATCH";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["POST"] = "POST";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["PUT"] = "PUT";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["TRACE"] = "TRACE";
    HttpDynamicPropertyProviderConfigurationAllOfMethodEnum["OTHER"] = "OTHER";
})(HttpDynamicPropertyProviderConfigurationAllOfMethodEnum || (HttpDynamicPropertyProviderConfigurationAllOfMethodEnum = {}));
