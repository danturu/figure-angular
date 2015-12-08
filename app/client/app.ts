import { View, Component } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router'

import { FirebaseRouter } from './lib/firebase_router'

import * as AuthComponent from './components/auth/auth'
import * as FormsComponent from './components/forms/forms'
import * as SharedComponent from './components/shared/shared'

@RouteConfig([
  {
    path: '/',
    component: FormsComponent.New,
    as: "Home"
  },
  {
    path: '/login',
    component: AuthComponent.Login,
    as: "Login"
  },
  {
    path: '/forms/new',
    component: FormsComponent.New,
    as: "NewForm"
  },
  {
    path: '/forms/:formId',
    component: FormsComponent.Show,
    as: "ShowForm"
  },
  {
    path: '/forms/:formId/...',
    component: FormsComponent.Edit,
    as: "EditForm"
  },
])

@Component({
  selector: 'app',
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
    SharedComponent.Header,
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
