import { CORE_DIRECTIVES, Component, View, Inject }                  from 'angular2/angular2'
import { RouterOutlet, RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import * as Firebase from 'firebase'

import { AssignLocal }       from '../../directives/assign_local'
import { FirebaseEventPipe } from '../../pipes/firebase_event_pipe'

import * as Dashboard from './dashboard/dashboard'

@RouteConfig([
  { path: '/setup', component: Dashboard.Setup, as: "Setup" }
])

@Component({
  selector: 'form-component.edit'
})

@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, AssignLocal],
  pipes: [FirebaseEventPipe],

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
  `
})

export class Edit {
  formUrl: string;
  formRef: Firebase;

  constructor(@Inject('app.config') config, params: RouteParams) {
    this.formUrl = `${config.firebaseUrl}/forms/${params.get('formId')}`
    this.formRef = new Firebase(this.formUrl);
  }

  destroy() {
    this.formRef.remove()
  }
}
