import { Component, View } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Router } from 'angular2/router'
import { FIREBASE_PIPES } from 'farel/farel'

import { FirebaseRouter } from '../../lib/firebase_router'

@Component({
  selector: 'header.app',
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <a [router-link]="['Home']" class="logo"><i></i></a>

    <nav class="forms">
      <ul>
        <li *ng-for="#form of formsUrl | orderByChild:'name' | toArray">
          <a [router-link]="['ShowForm', { id: form.$key }, 'Setup']">{{ form.name }}</a>
        </li>

        <li class="new">
          <a [router-link]="['NewForm']">New Form</a>
        </li>
      </ul>
    </nav>

    <nav class="account">
      <ul>
        <li>
          <a href="/logout" (click)="logout($event)">Logout</a>
        </li>
      </ul>
    </nav>
  `,
})

export class AppHeader {
  formsUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router) {
    this.formsUrl = this._firebaseRouter.url('/forms/$userId')
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this._firebaseRouter.ref().unauth();
    this._router.navigate(['Login']);
  }
}
