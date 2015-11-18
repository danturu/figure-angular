import { ChangeDetectorRef, WrappedValue, Pipe, PipeTransform, PipeOnDestroy } from 'angular2/angular2'
import * as Firebase from 'firebase'

@Pipe({
  name: 'firebaseEvent', pure: false
})

export class FirebaseEventPipe implements PipeTransform, PipeOnDestroy {
  private _firebaseRef: Firebase;
  private _latestValue: any;
  private _latestReturnedValue: any;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  onDestroy() {
    if (this._firebaseRef) {
      this._firebaseRef.off();
    }
  }

  transform(value: string, args: string[]): any {
   if (!this._firebaseRef) {
      this._firebaseRef = new Firebase(value);

      this._firebaseRef.on('value', snapshot => {
        this._latestValue = snapshot.val();
        this._changeDetectorRef.markForCheck();
      });
    }

    if (this._latestValue === this._latestReturnedValue) {
      return this._latestValue;
    } else {
      return WrappedValue.wrap(this._latestReturnedValue = this._latestValue);
    }
  }
}
