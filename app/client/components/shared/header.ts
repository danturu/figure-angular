import { Component, View } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Router, Location } from 'angular2/router'
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
    <a [router-link]="['/NewForm']" class="logo"><i></i></a>

    <nav class="forms">
      <ul>
        <li *ng-for="#form of formsUrl | orderByChild:'name' | toArray" [class.router-link-active]="isActiveLink('/forms/' + form.$id)">
          <a class="show" [router-link]="['/ShowForm', { formId: form.$key }]">{{ form.name }}</a>
          <a class="edit" [router-link]="['/EditForm', { formId: form.$key }, 'Setup']">E</a>
        </li>

        <li class="new">
          <a [router-link]="['/NewForm']">New Form</a>
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

export class Header {
  formsUrl: string;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router, private _location: Location) {
    this.formsUrl = this._firebaseRouter.url('/forms/$userId')
  }

  isActiveLink(path: string) {
    return this._location.path().startsWith(path);
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this._firebaseRouter.ref().unauth();
    this._router.navigate(['Login']);
  }
}
