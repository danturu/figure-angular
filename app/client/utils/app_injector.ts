import { Injector } from 'angular2/angular2'

var appInjectorRef: Injector;

export const appInjector = (injector?: Injector): Injector => {
  if (injector) {
    appInjectorRef = injector;
  }

  return appInjectorRef;
};
