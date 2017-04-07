# loggers

A tiny wrapper around [tracer](https://github.com/baryon/tracer), giving logging utilities.

## Installation

```javascript
  npm install remillc/loggers
```

## Usage

```javascript
  const console = require('loggers').logger();
```

```javascript
  const requestLogger = require('loggers').dev;
  ```

## loggers.logger()

  ![logger screenshot](/doc/logger-screenshot.png)

Provides a logger utility with tracer's methods: `log`, `trace`, `debug`, `info`, `warn`, `error`.

```javascript
  const console = require('loggers').logger();
```

```javascript
  const console = require('loggers').logger(config.logLevel);
```

`level` {string} is an optional argument that will set logging level ([see tracer for details](https://github.com/baryon/tracer)).

### setLevel()

Logging level can also be set anytime:

```javascript
  console.setLevel('warn');
```

### getLevel()

```javascript
  console.getLevel(); // 'warn'
```

## loggers.dev

![dev logger screenshot](/doc/dev-logger-screenshot.png)

Provides a middleware for [Express](http://expressjs.com/) that will log HTTP requests to the console.

```javascript
  // index.js
  const express = require('express');
  const requestLogger = require('loggers').dev;
  const app = express();
  
  ...
  
  /*
   * Middlewares
   */

  if (process.env.NODE_ENV !== 'production') {
	  app.use(requestLogger);
  }
  
  const console = loggers.logger(config.logLevel);
```

