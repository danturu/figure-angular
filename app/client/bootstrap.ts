import { bootstrap, provide } from 'angular2/angular2'
import { ROUTER_PROVIDERS } from 'angular2/router'

import { App } from './app'
import { CONFIG } from './config/config'
import { FirebaseRouter } from './lib/firebase/firebase'
import { appInjector } from './utils/app_injector'

bootstrap(App, [ROUTER_PROVIDERS, FirebaseRouter, provide('app.config', { useValue: CONFIG })]).then(appRef => appInjector(appRef.injector));
