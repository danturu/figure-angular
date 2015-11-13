import { bootstrap, provide } from 'angular2/angular2'
import { ROUTER_PROVIDERS }   from 'angular2/router'

import CONFIG from './config/config'
import App    from './app'

bootstrap(App, [ROUTER_PROVIDERS, provide('app.config', { useValue: CONFIG })])
