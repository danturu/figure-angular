import { Component, View } from 'angular2/angular2'

import { AssignLocal } from '../../../directives/assign_local'
import { CurrentForm } from './current_form'
import { FirebaseEventPipe } from '../../../pipes/firebase_event_pipe'
import { FirebaseRouter } from '../../../services/firebase_router'

@Component({
  selector: 'form-component.dashboard.notifications',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FirebaseEventPipe,
  ],

  template: `
    <h3>Notifications</h3>

    <div *assign-local="#form to formUrl | firebaseEvent" >
      <div *ng-if="form">
        {{ form.name }}
      </div>
    </div>
  `,
})

export class Notifications {
  formUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, currentForm: CurrentForm) {
    this.formUrl = this._firebaseRouter.url(`/forms/$userId/${currentForm.formId}`);
  }
}
