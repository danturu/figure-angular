import { Router } from 'angular2/router'

import { FirebaseRouter } from '../lib/firebase_router'
import { appInjector } from './app_injector'

export const canActivate = (callback: (auth: boolean) => string[], next: any, prev: any): Promise<boolean> => {
  let injector = appInjector();
  let firebaseRouter = injector.get(FirebaseRouter);
  let router = injector.get(Router);
  let firebaseRef = firebaseRouter.ref()

  return new Promise((resolve, reject) => {
    let onAuthCallback = (authData: FirebaseAuthDataGithub): void => {
      firebaseRef.offAuth(onAuthCallback);

      let redirectTo = callback(!!authData);

      if (redirectTo) {
        resolve(false);
        router.navigate(redirectTo);
      } else {
        resolve(true);
      }
    }

    firebaseRef.onAuth(onAuthCallback);
  });
};

export const canAuth = (next: any, prev: any): Promise<boolean> => {
  return canActivate(((auth: boolean) => auth ? ['Home'] : null), next, prev)
};

export const authRequired = (next: any, prev: any): Promise<boolean> => {
  return canActivate(((auth: boolean) => auth ? null : ['Login']), next, prev)
};



