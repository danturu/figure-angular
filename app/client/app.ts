/// <reference path='typings/bundle.d.ts' />

import { View, Component, Inject }        from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

import * as Firebase    from 'firebase'

import { FirebasePipe } from './pipes/firebase_pipe'
import { IterablePipe } from './pipes/iterable_pipe'

@RouteConfig([
])

@Component({
  selector: 'app'
})

@View({
  directives: [ROUTER_DIRECTIVES],
  pipes: [FirebasePipe, IterablePipe],

  template: `
    <main>
      <router-outlet></router-outlet>

      <h1>Forms</h1>
      <ul>
        <li *ng-for="#form of formsRef | firebase:'value' | iterable">
          <a>{{ form.name }} {{ form.$id }}</a>
        </li>
      </ul>
    </main>
  `
})

export default class App {
  formsRef: string;

  constructor(@Inject('app.config') config) {
    this.formsRef = `${config.firebaseUrl}/forms`;
  }
}
