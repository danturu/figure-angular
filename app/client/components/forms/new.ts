import { FORM_DIRECTIVES, Component, View } from 'angular2/angular2'
import { Router, CanActivate } from 'angular2/router'

import { FirebaseRouter } from '../../services/firebase_router'
import { FormAttrs } from '../../../../lib/models/form'
import { authRequired } from '../../utils/can_activate'

@Component({
  selector: 'form-component.new',
})

@View({
  directives: [
    FORM_DIRECTIVES
  ],

  template: `
    <header class="new">
      <h1>New Form</h1>
      <p>Smart name matters</p>
    </header>

    <form #f="form" (submit)="onSubmit(f.value)">
      <div class="input" [ng-class]="{ valid: name.valid, invalid: !name.valid }">
        <label>
          <div class="label">Name</div>
          <input type="text" ng-control="name" #name="form" required>
        </label>
      </div>

      <div class="button">
        <button type="submit" [disabled]="!f.valid">Create Form</form>
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