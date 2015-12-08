import { Component, View } from 'angular2/angular2'
import { RouteParams, CanActivate } from 'angular2/router'
import { FIREBASE_PIPES, AssignLocal } from 'farel/farel'

import { FirebaseRouter } from '../../lib/firebase_router'
import { authRequired } from '../../lib/can_activate'

@Component({
  selector: 'form-component.show',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <div *assign-local="#form to formUrl | toObject" >
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
