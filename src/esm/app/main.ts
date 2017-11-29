import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './core/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
