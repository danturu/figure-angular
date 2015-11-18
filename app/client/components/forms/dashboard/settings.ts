import { Component, View } from 'angular2/angular2'
import { Router } from 'angular2/router'

import { AssignLocal } from '../../../directives/assign_local'
import { CurrentForm } from './current_form'
import { FirebaseRouter, FirebaseEventPipe } from '../../../lib/firebase/firebase'

@Component({
  selector: 'form-component.dashboard.settings',
})

@View({
  directives: [
    AssignLocal,
  ],

  pipes: [
    FirebaseEventPipe,
  ],

  template: `
    <h3>Settings</h3>

    <div *assign-local="#form to formUrl | firebaseEvent" >
      <div *ng-if="form">
        {{ form.name }}
        <button type="button" (click)="destroy()">Delete Form</form>
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
