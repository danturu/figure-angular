import { Component, View, Host, NgForm } from 'angular2/angular2'

const ERROR_MESSAGES: { [errorType: string]: string } = {
  required: 'The field is required.',
  emails: 'The field should be a email list.'
}

@Component({
  selector: 'error',

  inputs: [
    'controlPath: control',
    'errorsOrder: order',
  ],
})

@View({
  template: `
    <span *ng-if="errorMessage !== null">{{ errorMessage }}</span>
  `,
})

export class InputError {
  controlPath: string;
  errorsOrder: string[];
  errorMessage: string;

  private _subscribed: boolean;

  constructor(@Host() private _formDir: NgForm) {
  }

  afterViewChecked() {
    if (this._subscribed) {
      return;
    }

    let control = this._formDir.form.find(this.controlPath);

    if (control) {
      this._subscribed = true;

      control.valueChanges.subscribe(value => {
        for (let errorType of this.errorsOrder) {
          if (control.hasError(errorType)) {
            return this.errorMessage = this._errorMessage(errorType);
          }
        }

        this.errorMessage = null;
      });
    }
  }

  private _errorMessage(errorType: string): string {
    return ERROR_MESSAGES[errorType];
  }
}
