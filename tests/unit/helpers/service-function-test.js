import { module, test } from 'qunit';
import serviceFunction from 'helpers/service-function';

module('Unit | Helper | service-function', function() {
  // Replace this with your real tests.
  test('it returns a function on a service', function(assert) {
    this.container.register('service:mockService', {
      mockTrue() {
        return true;
      },
      mockFalse() {
        return false;
      }
    });

    assert.equal(serviceFunction('mockService', 'mockTrue')(), true);
    assert.equal(serviceFunction('mockService', 'mockFalse')(), false);
  });
});
