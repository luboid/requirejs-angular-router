/**
 * https://github.com/angular/angular/blob/master/packages/core/src/linker/system_js_ng_module_factory_loader.ts
 * https://gist.github.com/brandonroberts/02cc07face25886fe142c4dbd8da1340
 *
 */
import {
  Injectable,
  Optional,
  Compiler,
  NgModuleFactory,
  NgModuleFactoryLoader,
  SystemJsNgModuleLoader,
  SystemJsNgModuleLoaderConfig
} from '@angular/core';

import { RequireJs } from './require-js';

const _SEPARATOR = '#';
const FACTORY_CLASS_SUFFIX = 'NgFactory';

/*export class SystemJsNgModuleLoaderEx extends SystemJsNgModuleLoader {
  constructor(
    compiler: Compiler,
    @Optional() config?: SystemJsNgModuleLoaderConfig
  ) {
    super(compiler, config);
    debugger;
  }
}*/

/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * @experimental
 */
export abstract class RequireJsNgModuleLoaderConfig {
  /**
   * Prefix to add when computing the name of the factory module for a given module name.
   */
  factoryPathPrefix: string;

  /**
   * Suffix to add when computing the name of the factory module for a given module name.
   */
  factoryPathSuffix: string;
}

const DEFAULT_CONFIG: RequireJsNgModuleLoaderConfig = {
  factoryPathPrefix: '',
  factoryPathSuffix: '.ngfactory'
};

/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * @experimental
 */
@Injectable()
export class RequireJsNgModuleLoader implements NgModuleFactoryLoader {
  private _config: RequireJsNgModuleLoaderConfig;

  constructor(
    public compiler: Compiler,
    @Optional() config?: RequireJsNgModuleLoaderConfig
  ) {
    this._config = config || DEFAULT_CONFIG;
    debugger;
  }

  load(path: string): Promise<NgModuleFactory<any>> {
    const offlineMode = this.compiler instanceof Compiler;
    return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
  }

  private loadAndCompile(path: string): Promise<NgModuleFactory<any>> {
    console.log('loadAndCompile:0:', path);
    let [module, exportName] = path.split(_SEPARATOR);
    if (exportName === undefined) {
      exportName = 'default';
    }

    console.log('loadAndCompile:1:', module);
    console.log('loadAndCompile:2:', (<any>window).require.toUrl(module));

    return RequireJs.import(module)
      .then((m: any) => m[exportName])
      .then((type: any) => checkNotEmpty(type, module, exportName))
      .then((type: any) => {
        debugger;
        return this.compiler.compileModuleAsync(type);
      });
  }

  private loadFactory(path: string): Promise<NgModuleFactory<any>> {
    let [module, exportName] = path.split(_SEPARATOR);
    let factoryClassSuffix = FACTORY_CLASS_SUFFIX;
    if (exportName === undefined) {
      exportName = 'default';
      factoryClassSuffix = '';
    }

    let importLocation =
      this._config.factoryPathPrefix + module + this._config.factoryPathSuffix;

    console.log('loadFactory', require.toUrl(importLocation));
    return RequireJs.import(importLocation)
      .then((m: any) => m[exportName + factoryClassSuffix])
      .then((factory: any) => checkNotEmpty(factory, module, exportName));
  }
}

function checkNotEmpty(
  value: any,
  modulePath: string,
  exportName: string
): any {
  debugger;
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}

export const requireJsNgModuleFactoryLoaderProvider = {
  provide: NgModuleFactoryLoader,
  useClass: RequireJsNgModuleLoader,
  deps: <any>[]
};
