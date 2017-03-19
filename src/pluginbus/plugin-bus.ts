import { Component } from '@angular/core';
import 'reflect-metadata';

export class PluginBus {

  public static getPlugs(typeGuard: any): any[] {
    if (PluginBus._instance._cache.has(typeGuard.getName())) {
      return PluginBus._instance._cache.get(typeGuard.getName());
    }

    let plugs: any[] = [];
    PluginBus._instance._plugins.forEach((value) => {
      if (typeGuard.isAssignableFrom(value)) {
        plugs.push(value);
      }
    });
    PluginBus._instance._cache.set(typeGuard.getName(), plugs);
    return plugs;
  }

  public static getPlugBySelector(selector: string): any {
    return PluginBus._instance._plugins.get(selector);
  }

  public static plug(pluginInstance: any): void {
    const selector: any = Reflect.getMetadata('annotations', pluginInstance)
      .filter((x: any): any => x instanceof Component && !!x.selector)
      .map((x: any): any => x.selector)
      .join(' ');
    console.log('plug selector ' + selector);
    if (PluginBus._instance._plugins.has(selector)) {
      return;
    }
    PluginBus._instance._cache.clear();
    PluginBus._instance._plugins.set(selector, pluginInstance);
  }

  private static _instance: PluginBus = new PluginBus();

  private _plugins: Map<string, any>;
  private _cache: Map<any, any[]>;

  private constructor() {
    this._plugins = new Map<string, any>();
    this._cache = new Map<any, any[]>();
  }
}
