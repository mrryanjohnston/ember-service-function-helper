# ember-service-function-helper

Pass service functions like closure actions into components.

## Installation

```
ember install ember-service-function-helper
```

## Usage

`service-function` takes two or more arguments:

1. Name of service
2. Name of function defined in service
3. Argument to pass to function

In use, it looks like this:

```hbs
{{!-- like a closure action --}}
logout=(service-function "session" "logout")
{{!-- or just an action --}}
onclick={{action (service-function "session" "logout")}}
```

## Examples

### Directly in a template 

To use this directly in a template as the result of an `onclick` or something
similar:

```javascript
// my-service.js
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
  }
});
```

```hbs
{{!-- application.hbs --}}
<button onclick={{action (service-function "myService" "addToState" "foo")}}>Add 'foo' to state</button>
```

### Like a Closure Action

You can also pass it into a component just like you would a closure action:

```hbs
{{!-- application.hbs --}}
{{my-component do=(service-function "myService" "addToState")}}
```

You could then use this as the result of some user event inside of `my-component` like so:

```hbs
{{!-- my-component.hbs --}}
<button onclick={{action do 'bar'}}>Add 'bar' to state</button>
```

Alternatively, you could do this:

```javascript
// my-component.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    do (thing) {
      // Note: `this.get('do')(thing)` will not work!
      this.do(thing);
    }
  }
});
```

```hbs
{{!-- my-component.hbs --}}
<button onclick={{action "do" "bat"}}>Add bat</button>
```

It then follows that something like this could work, too:

```hbs
{{!-- my-component.hbs --}}
{{my-component-2 do=(action "do" "qux")}}
```

```hbs
{{!-- my-component-2.hbs --}}
<button onclick={{action do}}>Do!</button>
```

### Currying Arguments

You can also curry arguments just like with the `action` helper:

```javascript
// my-service.js
import { A } from '@ember/array';
import Service from '@ember/service';

export default Service.extend({
  state: null,
  init() {
    this.set('state', A(['a']));
    this._super(...arguments);
  },
  addThreeToState(one, two, three) {
    this.get('state').pushObject(one);
    this.get('state').pushObject(two);
    this.get('state').pushObject(three);
  }
});
```

```hbs
{{!-- application.hbs --}}
{{my-component do=(service-function "myService" "addThreeToState" "foo")}}
```

```hbs
{{!-- my-component.hbs --}}
{{my-component-2 do=(action do "bar")}}
```

```hbs
{{!-- my-component-2.hbs --}}
<button onclick={{action do "bat"}}>Add foo, bar and bat</button>
```

## Why would you use this?

* You can avoid `inject`ing services into controllers or components
* You can avoid writing wrapper `actions` around `service` functionality
* This can decouple component behavior from implementation
* You can mock less services in tests

## Contributing

### Installation

* `git clone <repository-url>`
* `cd ember-service-function-helper`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
