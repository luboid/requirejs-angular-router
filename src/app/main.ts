import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './core/app.module';
import { requireJsResourceLoaderProvider } from './loader/require-js-resource-loader';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [requireJsResourceLoaderProvider]
});
