import { Pipe, PipeTransform } from 'angular2/angular2'

@Pipe({
  name: 'iterable'
})

export class IterablePipe implements PipeTransform {
  transform(value: any, args: any[] = null): any[] {
    return Object.keys(value || []).map(key => Object.assign(value[key], { $id: key }))
  }
}
