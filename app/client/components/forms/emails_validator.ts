import { NG_VALIDATORS, Directive, Validator, Control, provide } from 'angular2/angular2'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/i

@Directive({
  selector: '[emails]',
  providers: [provide(NG_VALIDATORS, { useExisting: EmailsValidator, multi: true })],
})

export class EmailsValidator implements Validator {
  validate(control: Control): { [errorType: string]: boolean } {
    if (control.value) {
      let emails = (<string[]>control.value.split(',')).map(email => email.trim()).filter(email => !!email);

      for (let email of emails) {
        if (!EMAIL_REGEX.test(email)) {
          return { "emails" : true };
        }
      }
    }

    return null;
  }
}
