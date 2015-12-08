import { bootstrap, provide } from 'angular2/angular2'
import { ROUTER_PROVIDERS } from 'angular2/router'

import { App } from './app'
import { ENV } from './config/env'
import { FirebaseRouter } from './lib/firebase_router'
import { appInjector } from './lib/app_injector'

bootstrap(App, [ROUTER_PROVIDERS, FirebaseRouter, provide('app.env', { useValue: ENV })]).then(appRef => appInjector(appRef.injector));
