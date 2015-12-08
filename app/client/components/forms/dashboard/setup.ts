import { Component, View } from 'angular2/angular2'
import { FIREBASE_PIPES, AssignLocal } from 'farel/farel'

import { CurrentForm } from './current_form'
import { FirebaseRouter } from '../../../lib/firebase_router'

@Component({
  selector: 'form-component.dashboard.setup',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <h3>Setup</h3>

    <div *assign-local="#form to formUrl | toObject" >
      <div *ng-if="form">
        {{ form.name }}
      </div>
    </div>
  `,
})

export class Setup {
  formUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, currentForm: CurrentForm) {
    this.formUrl = this._firebaseRouter.url(`/forms/$userId/${currentForm.formId}`);
  }
}
