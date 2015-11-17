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
    <span *ng-if="errorMessage !== null">{{ highestErrorMessage }}</span>
  `,
})

export class InputError {
  controlPath: string;
  errorsOrder: string[];
  highestErrorMessage: string;

  private _subscribed: boolean;

  constructor(@Host() private _formDir: NgForm) {
  }

  afterViewChecked() {
    if (this._subscribed) {
      return;
    }

    let control = this._formDir.form.find(this.controlPath);

    if (control) {
      control.valueChanges.subscribe(value => {
        if (control.valid) {
          return this.highestErrorMessage = null;
        }

        for (let errorType of this.errorsOrder) {
          if (control.hasError(errorType)) {
            return this.highestErrorMessage = this._errorMessage(errorType);
          }
        }
      });

      this._subscribed = true;
    }
  }

  private _errorMessage(errorType: string): string {
    return ERROR_MESSAGES[errorType];
  }
}
