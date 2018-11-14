import { getOwner } from '@ember/application';
import { helper } from '@ember/component/helper';

export function serviceFunction([service, serviceFunction, ...rest]) {
  return function() {
    let theService = getOwner(this).lookup(`service:${service}`)
    theService.get(serviceFunction).apply(theService, rest.concat(...arguments));
  }
}

export default helper(serviceFunction);
