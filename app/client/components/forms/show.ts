import { Component, View } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouteConfig, RouteParams, CanActivate } from 'angular2/router'
import { FIREBASE_PIPES, AssignLocal } from 'farel/farel'

import { FirebaseRouter } from '../../lib/firebase_router'
import { authRequired } from '../../lib/can_activate'

import * as DashboardComponent from './dashboard/dashboard'

@RouteConfig([
 {
    path: '/setup',
    component: DashboardComponent.Setup,
    name: 'Setup',
  },
  {
    path: '/Settings',
    component: DashboardComponent.Settings,
    name: 'Settings',
  },
  {
    path: '/notifications',
    component: DashboardComponent.Notifications,
    name: 'Notifications',
  },
  {
    path: '/Webhooks',
    component: DashboardComponent.Webhooks,
    name: 'Webhooks',
  },
])

@Component({
  selector: 'form-component.show',

  providers: [
    DashboardComponent.CurrentForm,
  ],
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
    AssignLocal,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <nav class="dashboard">
      <ul>
        <li>
          <a [router-link]="['Setup']">Setup</a>
        </li>
        <li>
          <a [router-link]="['Settings']">Settings</a>
        </li>
        <li>
          <a [router-link]="['Notifications']">Notifications</a>
        </li>
        <li>
          <a [router-link]="['Webhooks']">Webhooks</a>
        </li>
      </ul>
    </nav>

    <container class="dashboard">
      <router-outlet></router-outlet>
    </container>
  `,
})

@CanActivate(authRequired)

export class Show {
  formUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, params: RouteParams, currentForm: DashboardComponent.CurrentForm) {
    currentForm.formId = params.get('formId');
  }
}
