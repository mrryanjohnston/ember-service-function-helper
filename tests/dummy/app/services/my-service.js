import { A } from '@ember/array';
import Service from '@ember/service';

export default Service.extend({
  state: null,
  init() {
    this.set('state', A(['a']));
    this._super(...arguments);
  },
  addToState(toAdd) {
    this.get('state').pushObject(toAdd);
  },
  addThreeToState(one, two, three) {
    this.get('state').pushObject(one);
    this.get('state').pushObject(two);
    this.get('state').pushObject(three);
  }
});
