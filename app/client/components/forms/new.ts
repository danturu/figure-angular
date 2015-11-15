import { CORE_DIRECTIVES, FORM_DIRECTIVES, Component, View, Inject } from 'angular2/angular2'
import * as Firebase from 'firebase'

import { FormAttrs } from '../../../../lib/models/form'

@Component({
  selector: 'form-component.new'
})

@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],

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
  `
})

export class New {
  formsRef: Firebase;

  constructor(@Inject('app.config') config) {
    this.formsRef = new Firebase(`${config.firebaseUrl}/forms`);
  }

  onSubmit(form: FormAttrs) {
    this.formsRef.push(form);
  }
}
