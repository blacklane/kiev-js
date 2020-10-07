# Kiev-js

[![Build status badge](https://travis-ci.com/blacklane/kiev-js.svg?token=eqEro8Uh7aLKHHx8ps1S&branch=master)](https://travis-ci.com/blacklane/kiev-js)

A lightweight logging library to generate Datadog friendly logs.

## Setup instructions

### Requirements

* [Node 12.X.X](./.nvmrc)

### Installation

* Kiev-js doesn't have any other dependency.

```sh
npm install blacklane/kiev-js
```

and then import the logger by adding te following line at the top of your file.

```js
import logger from '@blacklane/kiev-js'
```

### Configuration

The log will print a plain JSON object if the NODE_ENV environment variable is set to 'development'. **do not use development in production**

### Tests & Linter

* Run unit tests: `npm run test`
* Run Linter: `npm run lint`

## Contributing

This project is using [Simplified flow (GitHub flow)](http://handbook.int.blacklane.io/git.html#simplified-flow-github-flow) for development. Check the linked handbook for details.
