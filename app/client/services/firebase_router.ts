import { Inject, Injectable } from 'angular2/angular2'

import * as Firebase from 'firebase'

@Injectable()
export class FirebaseRouter {
  private _ref: Firebase;

  constructor(@Inject('app.config') private _config: { firebaseUrl: string }) {
    this._ref = new Firebase(this._config.firebaseUrl);
  }

  url(url: string = "/"): string {
    return this._normalizeUrl(url.startsWith(this._config.firebaseUrl) ? url : this._config.firebaseUrl + url);
  }

  ref(url: string = "/"): Firebase {
    return this._ref.child(this._normalizeUrl(url.replace(this._config.firebaseUrl, '')));
  }

  private _normalizeUrl(url: string): string {
    let authData = this._ref.getAuth()

    if (authData) {
      return url.replace('$userId', authData.uid);
    } else {
      return url;
    }
  }
}

