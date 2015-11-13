/// <reference path='typings/bundle.d.ts' />

import { View, Component, Inject }        from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

import * as Firebase from 'firebase'

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
  forms: Firebase;

  constructor(@Inject('app.config') config) {
    this.forms = new Firebase(`${config.firebaseUrl}/forms`);

    this.forms.on("value", snapshot => {
      console.log(snapshot.val());
    });
  }
}
