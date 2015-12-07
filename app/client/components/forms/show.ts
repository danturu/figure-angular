import { Component, View } from 'angular2/angular2'
import { RouteParams, CanActivate } from 'angular2/router'

import { AssignLocal } from '../../lib/assign_local'
import { FirebaseRouter, FirebaseEventPipe } from '../../lib/firebase/firebase'
import { authRequired } from '../../lib/can_activate'

@Component({
  selector: 'form-component.show',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FirebaseEventPipe,
  ],

  template: `
    <div *assign-local="#form to formUrl | firebaseEvent" >
      <div *ng-if="form">
        <h2>{{ form.name }}</h2>

        <container>
          <p>form info goes here</p>
        </container>
      </div>
    </div>
  `,
})

@CanActivate(authRequired)

export class Show {
  formUrl: string;

  constructor(firebaseRouter: FirebaseRouter, params: RouteParams) {
    this.formUrl = firebaseRouter.url(`/forms/$userId/${params.get('formId')}`);
  }
}
