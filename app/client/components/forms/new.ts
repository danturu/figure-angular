import { FORM_DIRECTIVES, Component, View } from 'angular2/angular2'
import { Router, CanActivate } from 'angular2/router'

import { EmailsValidator } from './emails_validator'
import { FirebaseRouter } from '../../lib/firebase/firebase'
import { FormAttrs } from '../../../../lib/models/form'
import { InputError } from '../shared/input_error'
import { authRequired } from '../../utils/can_activate'

@Component({
  selector: 'form-component.new',
})

@View({
  directives: [
    FORM_DIRECTIVES,
    EmailsValidator,
    InputError,
  ],

  template: `
    <header class="new">
      <h1>New Form</h1>
      <p>Smart name matters</p>
    </header>

    <form #f="form" (submit)="onSubmit(f.value)">
      <fieldset>
        <legend>General</legend>

        <div class="input">
          <label>
            <div class="label">Name</div>
            <input type="text" ng-control="name" #name="form" required>
            <error control="name" [order]="['required']"></error>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Notifications</legend>

        <div class="input">
          <label>
            <div class="label">Send notifications to these email addresses</div>
            <input type="text" ng-control="subscribers" #subscribers="form" emails>
            <error control="subscribers" [order]="['emails']"></error>
          </label>
        </div>
      </fieldset>

      <div class="button">
        <button type="submit" [disabled]="!f.valid">Create Form</button>
      </div>
    </form>
  `,
})

@CanActivate(authRequired)

export class New {
  private _formsRef: Firebase;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router) {
    this._formsRef = _firebaseRouter.ref('forms/$userId')
  }

  onSubmit(form: FormAttrs) {
    let formId = this._formsRef.push(form).key();
    this._router.navigate(['/ShowForm', { formId: formId }]);
  }
}
