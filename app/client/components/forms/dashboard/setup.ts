import { Component, View } from 'angular2/angular2'

import { AssignLocal } from '../../../lib/assign_local'
import { CurrentForm } from './current_form'
import { FirebaseRouter, FirebaseEventPipe } from '../../../lib/firebase/firebase'

@Component({
  selector: 'form-component.dashboard.setup',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FirebaseEventPipe,
  ],

  template: `
    <h3>Setup</h3>

    <div *assign-local="#form to formUrl | firebaseEvent" >
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
