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
import { ChannelSelectorV4FromJSONTyped, ConditionSelectorV4FromJSONTyped, HttpSelectorV4FromJSONTyped } from './';

/**
 *
 * @export
 * @interface Selector
 */
export interface Selector {
  /**
   *
   * @type {string}
   * @memberof Selector
   */
  type: SelectorTypeEnum;
}

/**
 * @export
 */
export const SelectorTypeEnum = {
  HTTP: 'HTTP',
  CHANNEL: 'CHANNEL',
  CONDITION: 'CONDITION',
} as const;
export type SelectorTypeEnum = typeof SelectorTypeEnum[keyof typeof SelectorTypeEnum];

/**
 * Check if a given object implements the Selector interface.
 */
export function instanceOfSelector(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'type' in value;

  return isInstance;
}

export function SelectorFromJSON(json: any): Selector {
  return SelectorFromJSONTyped(json, false);
}

export function SelectorFromJSONTyped(json: any, ignoreDiscriminator: boolean): Selector {
  if (json === undefined || json === null) {
    return json;
  }
  if (!ignoreDiscriminator) {
    if (json['type'] === 'ChannelSelectorV4') {
      return ChannelSelectorV4FromJSONTyped(json, true);
    }
    if (json['type'] === 'ConditionSelectorV4') {
      return ConditionSelectorV4FromJSONTyped(json, true);
    }
    if (json['type'] === 'HttpSelectorV4') {
      return HttpSelectorV4FromJSONTyped(json, true);
    }
  }
  return {
    type: json['type'],
  };
}

export function SelectorToJSON(value?: Selector | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: value.type,
  };
}