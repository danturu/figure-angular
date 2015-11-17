import { Component, View, Pipe, PipeTransform } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Router, Location } from 'angular2/router'

import { FirebaseRouter } from '../../services/firebase_router'
import { FirebaseEventPipe } from '../../pipes/firebase_event_pipe'
import { FirebaseArrayPipe } from '../../pipes/firebase_array_pipe'

@Pipe({
  name: 'sort',
})

class SortPipe implements PipeTransform {
  transform(value: any[], args: any[] = null): any[] {
    if (Array.isArray(value)) {
      let comparator = (lhs: { name: string }, rhs: { name: string }): number => {
        if (lhs.name < rhs.name) return -1;
        if (lhs.name > rhs.name) return  1;
        return 0
      }

      return value.sort(comparator);
    } else {
      return value;
    }
  }
}

@Component({
  selector: 'header.app',
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
  ],

  pipes: [
    FirebaseEventPipe,
    FirebaseArrayPipe,
    SortPipe,
  ],

  template: `
    <a [router-link]="['/NewForm']" class="logo"><i></i></a>

    <nav class="forms">
      <ul>
        <li *ng-for="#form of formsUrl | firebaseEvent | firebaseArray | sort" [class.router-link-active]="isActiveLink('/forms/' + form.$id)">
          <a class="show" [router-link]="['/ShowForm', { formId: form.$id }]">{{ form.name }}</a>
          <a class="edit" [router-link]="['/EditForm', { formId: form.$id }, 'Setup']">E</a>
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
