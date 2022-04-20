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
    AccessControlEntity,
    AccessControlEntityFromJSON,
    AccessControlEntityFromJSONTyped,
    AccessControlEntityToJSON,
    PageMediaEntity,
    PageMediaEntityFromJSON,
    PageMediaEntityFromJSONTyped,
    PageMediaEntityToJSON,
    PageSourceEntity,
    PageSourceEntityFromJSON,
    PageSourceEntityFromJSONTyped,
    PageSourceEntityToJSON,
    Visibility,
    VisibilityFromJSON,
    VisibilityFromJSONTyped,
    VisibilityToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdatePageEntity
 */
export interface UpdatePageEntity {
    /**
     * 
     * @type {string}
     * @memberof UpdatePageEntity
     */
    content?: string;
    /**
     * 
     * @type {PageSourceEntity}
     * @memberof UpdatePageEntity
     */
    source?: PageSourceEntity;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdatePageEntity
     */
    metadata?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePageEntity
     */
    useAutoFetch?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdatePageEntity
     */
    crossId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePageEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePageEntity
     */
    lastContributor?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdatePageEntity
     */
    order?: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePageEntity
     */
    published?: boolean;
    /**
     * 
     * @type {Visibility}
     * @memberof UpdatePageEntity
     */
    visibility?: Visibility;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdatePageEntity
     */
    _configuration?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePageEntity
     */
    homepage?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdatePageEntity
     */
    parentId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePageEntity
     */
    excludedAccessControls?: boolean;
    /**
     * 
     * @type {Array<AccessControlEntity>}
     * @memberof UpdatePageEntity
     */
    accessControls?: Array<AccessControlEntity>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdatePageEntity
     */
    excluded_groups?: Array<string>;
    /**
     * 
     * @type {Array<PageMediaEntity>}
     * @memberof UpdatePageEntity
     */
    attached_media?: Array<PageMediaEntity>;
}

export function UpdatePageEntityFromJSON(json: any): UpdatePageEntity {
    return UpdatePageEntityFromJSONTyped(json, false);
}

export function UpdatePageEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdatePageEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'content': !exists(json, 'content') ? undefined : json['content'],
        'source': !exists(json, 'source') ? undefined : PageSourceEntityFromJSON(json['source']),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'useAutoFetch': !exists(json, 'useAutoFetch') ? undefined : json['useAutoFetch'],
        'crossId': !exists(json, 'crossId') ? undefined : json['crossId'],
        'name': json['name'],
        'lastContributor': !exists(json, 'lastContributor') ? undefined : json['lastContributor'],
        'order': !exists(json, 'order') ? undefined : json['order'],
        'published': !exists(json, 'published') ? undefined : json['published'],
        'visibility': !exists(json, 'visibility') ? undefined : VisibilityFromJSON(json['visibility']),
        '_configuration': !exists(json, 'configuration') ? undefined : json['configuration'],
        'homepage': !exists(json, 'homepage') ? undefined : json['homepage'],
        'parentId': !exists(json, 'parentId') ? undefined : json['parentId'],
        'excludedAccessControls': !exists(json, 'excludedAccessControls') ? undefined : json['excludedAccessControls'],
        'accessControls': !exists(json, 'accessControls') ? undefined : ((json['accessControls'] as Array<any>).map(AccessControlEntityFromJSON)),
        'excluded_groups': !exists(json, 'excluded_groups') ? undefined : json['excluded_groups'],
        'attached_media': !exists(json, 'attached_media') ? undefined : ((json['attached_media'] as Array<any>).map(PageMediaEntityFromJSON)),
    };
}

export function UpdatePageEntityToJSON(value?: UpdatePageEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'content': value.content,
        'source': PageSourceEntityToJSON(value.source),
        'metadata': value.metadata,
        'useAutoFetch': value.useAutoFetch,
        'crossId': value.crossId,
        'name': value.name,
        'lastContributor': value.lastContributor,
        'order': value.order,
        'published': value.published,
        'visibility': VisibilityToJSON(value.visibility),
        'configuration': value._configuration,
        'homepage': value.homepage,
        'parentId': value.parentId,
        'excludedAccessControls': value.excludedAccessControls,
        'accessControls': value.accessControls === undefined ? undefined : ((value.accessControls as Array<any>).map(AccessControlEntityToJSON)),
        'excluded_groups': value.excluded_groups,
        'attached_media': value.attached_media === undefined ? undefined : ((value.attached_media as Array<any>).map(PageMediaEntityToJSON)),
    };
}

