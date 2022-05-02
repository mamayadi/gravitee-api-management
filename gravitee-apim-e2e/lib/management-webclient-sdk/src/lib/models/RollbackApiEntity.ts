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
    ApiLifecycleState,
    ApiLifecycleStateFromJSON,
    ApiLifecycleStateFromJSONTyped,
    ApiLifecycleStateToJSON,
    ApiMetadataEntity,
    ApiMetadataEntityFromJSON,
    ApiMetadataEntityFromJSONTyped,
    ApiMetadataEntityToJSON,
    Flow,
    FlowFromJSON,
    FlowFromJSONTyped,
    FlowToJSON,
    Plan,
    PlanFromJSON,
    PlanFromJSONTyped,
    PlanToJSON,
    Property,
    PropertyFromJSON,
    PropertyFromJSONTyped,
    PropertyToJSON,
    Proxy,
    ProxyFromJSON,
    ProxyFromJSONTyped,
    ProxyToJSON,
    Resource,
    ResourceFromJSON,
    ResourceFromJSONTyped,
    ResourceToJSON,
    ResponseTemplate,
    ResponseTemplateFromJSON,
    ResponseTemplateFromJSONTyped,
    ResponseTemplateToJSON,
    Rule,
    RuleFromJSON,
    RuleFromJSONTyped,
    RuleToJSON,
    Services,
    ServicesFromJSON,
    ServicesFromJSONTyped,
    ServicesToJSON,
    Visibility,
    VisibilityFromJSON,
    VisibilityFromJSONTyped,
    VisibilityToJSON,
} from './';

/**
 * 
 * @export
 * @interface RollbackApiEntity
 */
export interface RollbackApiEntity {
    /**
     * API's uuid.
     * @type {string}
     * @memberof RollbackApiEntity
     */
    id: string;
    /**
     * Api's name. Duplicate names can exists.
     * @type {string}
     * @memberof RollbackApiEntity
     */
    name: string;
    /**
     * Api's version. It's a simple string only used in the portal.
     * @type {string}
     * @memberof RollbackApiEntity
     */
    version: string;
    /**
     * API's description. A short description of your API.
     * @type {string}
     * @memberof RollbackApiEntity
     */
    description: string;
    /**
     * 
     * @type {Services}
     * @memberof RollbackApiEntity
     */
    services?: Services;
    /**
     * The list of API resources used by policies like cache resources or oauth2
     * @type {Array<Resource>}
     * @memberof RollbackApiEntity
     */
    resources?: Array<Resource>;
    /**
     * 
     * @type {Visibility}
     * @memberof RollbackApiEntity
     */
    visibility: Visibility;
    /**
     * the list of sharding tags associated with this API.
     * @type {Array<string>}
     * @memberof RollbackApiEntity
     */
    tags?: Array<string>;
    /**
     * the API logo encoded in base64
     * @type {string}
     * @memberof RollbackApiEntity
     */
    picture?: string;
    /**
     * the list of categories associated with this API
     * @type {Array<string>}
     * @memberof RollbackApiEntity
     */
    categories?: Array<string>;
    /**
     * the free list of labels associated with this API
     * @type {Array<string>}
     * @memberof RollbackApiEntity
     */
    labels?: Array<string>;
    /**
     * API's groups. Used to add team in your API.
     * @type {Array<string>}
     * @memberof RollbackApiEntity
     */
    groups?: Array<string>;
    /**
     * 
     * @type {Array<ApiMetadataEntity>}
     * @memberof RollbackApiEntity
     */
    metadata?: Array<ApiMetadataEntity>;
    /**
     * the API background encoded in base64
     * @type {string}
     * @memberof RollbackApiEntity
     */
    background?: string;
    /**
     * 
     * @type {Proxy}
     * @memberof RollbackApiEntity
     */
    proxy: Proxy;
    /**
     * a map where you can associate a path to a configuration (the policies configuration)
     * @type {{ [key: string]: Array<Rule>; }}
     * @memberof RollbackApiEntity
     */
    paths: { [key: string]: Array<Rule>; };
    /**
     * a list of flows (the policies configuration)
     * @type {Array<Flow>}
     * @memberof RollbackApiEntity
     */
    flows: Array<Flow>;
    /**
     * a list of plans with flows (the policies configuration)
     * @type {Array<Plan>}
     * @memberof RollbackApiEntity
     */
    plans: Array<Plan>;
    /**
     * A dictionary (could be dynamic) of properties available in the API context.
     * @type {Array<Property>}
     * @memberof RollbackApiEntity
     */
    properties?: Array<Property>;
    /**
     * API's gravitee definition version
     * @type {string}
     * @memberof RollbackApiEntity
     */
    gravitee?: string;
    /**
     * API's flow mode.
     * @type {string}
     * @memberof RollbackApiEntity
     */
    flow_mode?: RollbackApiEntityFlowModeEnum;
    /**
     * the API logo URL
     * @type {string}
     * @memberof RollbackApiEntity
     */
    picture_url?: string;
    /**
     * A list of paths used to aggregate data in analytics
     * @type {Array<string>}
     * @memberof RollbackApiEntity
     */
    path_mappings?: Array<string>;
    /**
     * A map that allows you to configure the output of a request based on the event throws by the gateway. Example : Quota exceeded, api-ky is missing, ...
     * @type {{ [key: string]: { [key: string]: ResponseTemplate; }; }}
     * @memberof RollbackApiEntity
     */
    response_templates?: { [key: string]: { [key: string]: ResponseTemplate; }; };
    /**
     * 
     * @type {ApiLifecycleState}
     * @memberof RollbackApiEntity
     */
    lifecycle_state?: ApiLifecycleState;
    /**
     * 
     * @type {boolean}
     * @memberof RollbackApiEntity
     */
    disable_membership_notifications?: boolean;
    /**
     * the API background URL
     * @type {string}
     * @memberof RollbackApiEntity
     */
    background_url?: string;
}

export function RollbackApiEntityFromJSON(json: any): RollbackApiEntity {
    return RollbackApiEntityFromJSONTyped(json, false);
}

export function RollbackApiEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): RollbackApiEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'version': json['version'],
        'description': json['description'],
        'services': !exists(json, 'services') ? undefined : ServicesFromJSON(json['services']),
        'resources': !exists(json, 'resources') ? undefined : ((json['resources'] as Array<any>).map(ResourceFromJSON)),
        'visibility': VisibilityFromJSON(json['visibility']),
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'picture': !exists(json, 'picture') ? undefined : json['picture'],
        'categories': !exists(json, 'categories') ? undefined : json['categories'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'groups': !exists(json, 'groups') ? undefined : json['groups'],
        'metadata': !exists(json, 'metadata') ? undefined : ((json['metadata'] as Array<any>).map(ApiMetadataEntityFromJSON)),
        'background': !exists(json, 'background') ? undefined : json['background'],
        'proxy': ProxyFromJSON(json['proxy']),
        'paths': json['paths'],
        'flows': ((json['flows'] as Array<any>).map(FlowFromJSON)),
        'plans': ((json['plans'] as Array<any>).map(PlanFromJSON)),
        'properties': !exists(json, 'properties') ? undefined : ((json['properties'] as Array<any>).map(PropertyFromJSON)),
        'gravitee': !exists(json, 'gravitee') ? undefined : json['gravitee'],
        'flow_mode': !exists(json, 'flow_mode') ? undefined : json['flow_mode'],
        'picture_url': !exists(json, 'picture_url') ? undefined : json['picture_url'],
        'path_mappings': !exists(json, 'path_mappings') ? undefined : json['path_mappings'],
        'response_templates': !exists(json, 'response_templates') ? undefined : json['response_templates'],
        'lifecycle_state': !exists(json, 'lifecycle_state') ? undefined : ApiLifecycleStateFromJSON(json['lifecycle_state']),
        'disable_membership_notifications': !exists(json, 'disable_membership_notifications') ? undefined : json['disable_membership_notifications'],
        'background_url': !exists(json, 'background_url') ? undefined : json['background_url'],
    };
}

export function RollbackApiEntityToJSON(value?: RollbackApiEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'version': value.version,
        'description': value.description,
        'services': ServicesToJSON(value.services),
        'resources': value.resources === undefined ? undefined : ((value.resources as Array<any>).map(ResourceToJSON)),
        'visibility': VisibilityToJSON(value.visibility),
        'tags': value.tags,
        'picture': value.picture,
        'categories': value.categories,
        'labels': value.labels,
        'groups': value.groups,
        'metadata': value.metadata === undefined ? undefined : ((value.metadata as Array<any>).map(ApiMetadataEntityToJSON)),
        'background': value.background,
        'proxy': ProxyToJSON(value.proxy),
        'paths': value.paths,
        'flows': ((value.flows as Array<any>).map(FlowToJSON)),
        'plans': ((value.plans as Array<any>).map(PlanToJSON)),
        'properties': value.properties === undefined ? undefined : ((value.properties as Array<any>).map(PropertyToJSON)),
        'gravitee': value.gravitee,
        'flow_mode': value.flow_mode,
        'picture_url': value.picture_url,
        'path_mappings': value.path_mappings,
        'response_templates': value.response_templates,
        'lifecycle_state': ApiLifecycleStateToJSON(value.lifecycle_state),
        'disable_membership_notifications': value.disable_membership_notifications,
        'background_url': value.background_url,
    };
}

/**
* @export
* @enum {string}
*/
export enum RollbackApiEntityFlowModeEnum {
    DEFAULT = 'DEFAULT',
    BESTMATCH = 'BEST_MATCH'
}

