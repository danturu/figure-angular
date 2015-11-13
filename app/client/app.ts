/// <reference path='typings/bundle.d.ts' />

import { View, Component, Inject }        from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

@RouteConfig([
])

@Component({
  selector: 'app'
})

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <main>
      <h1>Hello Angular!</h1>
      <router-outlet></router-outlet>
    </main>
  `
})

export default class App {
  constructor(@Inject('app.config') config) {
  }
}
