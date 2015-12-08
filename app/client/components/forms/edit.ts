import { Component, View } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig, CanActivate } from 'angular2/router'
import { FIREBASE_PIPES, AssignLocal } from 'farel/farel'

import { authRequired } from '../../lib/can_activate'
import { FirebaseRouter } from '../../lib/firebase_router'

import * as DashboardComponent from './dashboard/dashboard'

@RouteConfig([
  {
    path: '/setup',
    component: DashboardComponent.Setup,
    as: 'Setup',
  },
  {
    path: '/Settings',
    component: DashboardComponent.Settings,
    as: 'Settings',
  },
  {
    path: '/notifications',
    component: DashboardComponent.Notifications,
    as: 'Notifications',
  },
  {
    path: '/Webhooks',
    component: DashboardComponent.Webhooks,
    as: 'Webhooks',
  },
])

@Component({
  selector: 'form-component.edit',

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
    <div *assign-local="#form to formUrl | toObject" >
      <div *ng-if="form">
        <nav class="dashboard">
          <ul>
            <li>
              <a [router-link]="['./Setup']">Setup</a>
            </li>
            <li>
              <a [router-link]="['./Settings']">Settings</a>
            </li>
            <li>
              <a [router-link]="['./Notifications']">Notifications</a>
            </li>
            <li>
              <a [router-link]="['./Webhooks']">Webhooks</a>
            </li>
          </ul>
        </nav>

        <container class="dashboard">
          <router-outlet></router-outlet>
        </container>
      </div>
    </div>
  `,
})

@CanActivate(authRequired)

export class Edit {
  formUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, params: RouteParams, currentForm: DashboardComponent.CurrentForm) {
    this.formUrl = this._firebaseRouter.url(`/forms/$userId/${params.get('formId')}`);
    currentForm.formId = params.get('formId');
  }
}
