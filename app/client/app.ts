/// <reference path='typings/bundle.d.ts' />

import { View, Component, Inject }        from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

import { Header } from './components/shared/header'
import * as Forms from './components/forms/forms'

@RouteConfig([
  { path: '/forms/new',         component: Forms.New,  as: "NewForm" },
  { path: '/forms/:formId',     component: Forms.Show, as: "ShowForm" },
  { path: '/forms/:formId/...', component: Forms.Edit, as: "EditForm" }
])

@Component({
  selector: 'app'
})

@View({
  directives: [ROUTER_DIRECTIVES, Header],

  template: `
    <header class="app"></header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})

export default class App {
  constructor(@Inject('app.config') config) {
  }
}
