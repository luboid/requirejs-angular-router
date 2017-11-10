import { RequireJs } from './require-js';
import { ResourceLoader } from '@angular/compiler';
export class RequireJsResourceLoader extends ResourceLoader {
  /**
   * https://github.com/angular/universal/issues/579
   */
  get(url: string): Promise<string> | string {
    console.log(url);
    let module = 'text!' + (url.charAt(0) === '/' ? url.substr(1) : url);
    console.log(module);
    return RequireJs.import<string>(module);
  }
}

export const requireJsResourceLoaderProvider = {
  provide: ResourceLoader,
  useClass: RequireJsResourceLoader,
  deps: <any>[]
};
