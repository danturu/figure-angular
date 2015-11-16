import { Component, View } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Router, RouterOutlet, RouteParams, RouteConfig, CanActivate } from 'angular2/router'

import { AssignLocal } from '../../directives/assign_local'
import { FirebaseEventPipe } from '../../pipes/firebase_event_pipe'
import { FirebaseRouter } from '../../services/firebase_router'
import { authRequired } from '../../utils/can_activate'

import * as DashboardComponent from './dashboard/dashboard'

@RouteConfig([
  {
    path: '/setup',
    component: DashboardComponent.Setup,
    as: "Setup"
  },
])

@Component({
  selector: 'form-component.edit',
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
    AssignLocal,
  ],

  pipes: [
    FirebaseEventPipe,
  ],

  template: `
    <div *assign-local="#form to formUrl | firebaseEvent" >
      <div *ng-if="form">
        <h2>{{ form.name }}</h2>

        <nav class="dashboard">
          <ul>
            <p>form dashboard goes here</p>
          </ul>
        </nav>

        <container>
          <router-outlet></router-outlet>
        </container>

        <button type="button" (click)="destroy()">Delete Form</form>
      </div>
    </div>
  `,
})

@CanActivate(authRequired)

export class Edit {
  formUrl: string;

  private _formRef: Firebase;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router, params: RouteParams) {
    this.formUrl = this._firebaseRouter.url(`/forms/$userId/${params.get('formId')}`);
  }

  destroy() {
    this._firebaseRouter.ref(this.formUrl).remove()
    this._router.navigate(['/Home']);
  }
}
