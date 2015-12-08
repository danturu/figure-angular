import { View, Component } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

import { FirebaseRouter } from './lib/firebase_router'
import { AppHeader } from './components/shared/app_header'

import * as AuthComponent from './components/auth/auth'
import * as FormsComponent from './components/forms/forms'

@RouteConfig([
  {
    path: '/',
    component: FormsComponent.New,
    name: 'Home',
  },
  {
    path: '/login',
    component: AuthComponent.Login,
    name: 'Login'
  },
  {
    path: '/forms/new',
    component: FormsComponent.New,
    name: 'NewForm',
  },
  {
    path: '/forms/:id/...',
    component: FormsComponent.Show,
    name: 'ShowForm'
  },
])

@Component({
  selector: 'app',
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
    AppHeader,
  ],

  template: `
    <header class="app" *ng-if="loggedIn"></header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})

export class App {
  loggedIn: boolean;

  constructor(firebaseRouter: FirebaseRouter) {
    firebaseRouter.ref().onAuth((authData) => {
      this.loggedIn = !!authData;
    });
  }
}
