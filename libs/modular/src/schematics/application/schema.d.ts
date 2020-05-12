/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ApplicationOptions {
  /**
   * The name of the application.
   */
  name: string;
  /**
   * runtime platform
   */
  platform?: "web" | "mobile" | "desktop" | "node" | "universal";
  /**
   * Backend project that provides data to this application. This sets up proxy.config.json.
   */
  backendProject?: string;
  [k: string]: any;
}
