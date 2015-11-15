import { CORE_DIRECTIVES, Component, View, Inject } from 'angular2/angular2'
import { RouteParams }                              from 'angular2/router'

import { AssignLocal }       from '../../directives/assign_local'
import { FirebaseEventPipe } from '../../pipes/firebase_event_pipe'

@Component({
  selector: 'form-component.show'
})

@View({
  directives: [CORE_DIRECTIVES, AssignLocal],
  pipes: [FirebaseEventPipe],

  template: `
    <div *assign-local="#form to formUrl | firebaseEvent" >
      <div *ng-if="form">
        <h2>{{ form.name }}</h2>

        <container>
          <p>form info goes here</p>
        </container>
      </div>
    </div>
  `
})

export class Show {
  formUrl: string;

  constructor(@Inject('app.config') config, params: RouteParams) {
    this.formUrl = `${config.firebaseUrl}/forms/${params.get('formId')}`
  }
}
