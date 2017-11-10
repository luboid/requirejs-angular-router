import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { requireJsResourceLoaderProvider } from './loader';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [requireJsResourceLoaderProvider]
});
