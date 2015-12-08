import { Component, View } from 'angular2/angular2'
import { Router } from 'angular2/router'
import { FIREBASE_PIPES, AssignLocal } from 'farel/farel'

import { CurrentForm } from './current_form'
import { FirebaseRouter } from '../../../lib/firebase_router'

@Component({
  selector: 'form-component.dashboard.settings',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <h3>Settings</h3>

    <div *assign-local="#form to formUrl | toObject">
      <div *ng-if="form">
        {{ form.name }}
        <button type="button" (click)="destroy()">Delete Form</button>
      </div>
    </div>
  `,
})

export class Settings {
  formUrl: string;

  private _formRef: Firebase;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router, currentForm: CurrentForm) {
    this.formUrl = this._firebaseRouter.url(`/forms/$userId/${currentForm.formId}`);
  }

  destroy() {
    this._formRef = this._firebaseRouter.ref(this.formUrl)
    this._formRef.remove()

    this._router.navigate(['/Home']);
  }
}
