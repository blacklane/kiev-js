# Kiev-js

[![Build Status](https://travis-ci.com/blacklane/kiev-js.svg?branch=master)](https://travis-ci.com/blacklane/kiev-js)

Kiev-js is a wrapper logging library around [LogLevel](https://github.com/pimterry/loglevel) implementing Blacklane logging standards.

## Setup instructions

### Requirements

* [Node 12.X.X](./.nvmrc)

### Installation

```sh
npm install @blacklane/kiev-js
```

and then import the logger and use it as the example below.

```javascript
import { Logger, LogLevel } from '@blacklane/kiev-js'

const environment = process.env.NODE_ENV || 'development'

// Default level is 'warn'
logger = new Logger('application-name', environment)

// This won't be logged due to the default level
logger.debug('Something happening here', { foo: 'bar' })

// Next line will be logged
logger.warn('WARN! Look at this', { foo: 'bar' })

// => {"application":"application-name","environment":"development","level":"ERROR", message: "WARN! Look at this", "timestamp":"2020-10-15T10:51:32.621Z", "foo": "bar"}


// Setting logger to 'debug' level
logger.setLevel(LogLevel.DEBUG)

logger.debug('FooBar', { fizz: 'buzz' }) // Now it will be logged

// => {"application":"application-name","environment":"development","level":"DEBUG", message: "FooBar", "timestamp":"2020-10-15T10:51:32.621Z", "fizz": "buzz"}
```

## Contributing

1. Pull the code:

  ```
  git clone git@github.com:blacklane/kiev-js.git
  ```

2. Install dependencies

  ```
  npm install
  ```

3. Run tests:

  ```sh
  npm test
  ```

4. Create your feature branch (`git checkout -b my-new-feature`)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create a new Pull Request


### Tests & Linter

* Run unit tests: `npm run test`
* Run tests watch & coverage: `npm run test:cov`
* Run Linter: `npm run lint`
