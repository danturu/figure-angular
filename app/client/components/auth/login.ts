import { Component, View, Inject } from 'angular2/angular2'
import { Router, CanActivate } from 'angular2/router'

import { FirebaseRouter } from '../../lib/firebase/firebase'
import { canAuth } from '../../lib/can_activate'

@Component({
  selector: 'auth-component.login',
})

@View({
  template: `
    <h2>Login</h2>

    <div>
      <a href="/login" (click)="loginWithGithub($event)">Login with GitHub</a>
    </div>

    <div *ng-if="authError">
      <p>An error has occurred.</p>
    </div>
  `,
})

@CanActivate(canAuth)

export class Login {
  authError: any;

  constructor(private _firebaseRouter: FirebaseRouter, private _router: Router) {
  }

  loginWithGithub(event: MouseEvent) {
    event.preventDefault();

    this._firebaseRouter.ref().authWithOAuthPopup("github", (error: any, authData: FirebaseAuthDataGithub) => {
      if (error) {
        this.authError = error;
      } else {
        this._firebaseRouter.ref(`/users/${authData.uid}`).update(authData.github);
        this._router.navigate(['Home']);
      }
    }, {
      scope: 'user:email',
    });
  }
}
