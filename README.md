# strapi-plugin-redis-for-strapi

***This plugin allows you to easily use Radis to cache***

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 About

strapi-for-redis plugin allows you to easily use Radis to cache

## 🏁 Getting Started

Install [degit](https://github.com/Rich-Harris/degit) for getting last commits:

### Prerequisites

1) install redis database

2) install ioredis package

```bash
yarn add ioredis
```

### Installing

```bash
git clone https://github.com/marefati110/redis-for-strapi

# OR

degit https://github.com/marefati110/redis-for-strapi
```

Now move redis-api-folder to strapi plugin folder.

## 🎈 Usage

### Enable middleware

Create ```middleware.json``` in ```./config/environments/**/middleware.json```

```json
{
  ...
  "redis": {
    "enabled": true,
    ...
  }
}
```

### Load order

Goto ```./config/middleware.json``` and change the config like this

```json
{
  "timeout": 100,
  "load": {
    "before": ["responseTime", "logger", "cors", "responses"],
    "order": [],
    "after": ["parser", "router","redis"]
  }
}
```

### Cacheing

To cache a variable, just use the function below

  ```javascript
  // also can be async
  strapi.redis_setCache(ctx,variable,expite_time);
                                  // default is 24h (optional)
  ```

  I recommend use it before ```ctx.send(variable)```

***you can use ioredis package like this***

```javascript
strapi.redis
```

#### Hook function

You can perform your functions before or after retrieving data from the redis database.

***./plugins/redis-for-strapi/config/before.js***

***./plugins/redis-for-strapi/config/after.js***

Define your function and put the function name in the list (exec_befor, exec_after)

##### WARNING

- function must have one argument that are ctx
- functoin must return true or false

```javascript
'use strict';

const Before = (ctx) =>{

  console.log('This msg show for every request.');
  
  return true;
};

const exec_before = [Before];

module.exports = { exec_before }; // Dont Change it
```

## ✍️ Authors

- [@marefati110](https://github.com/marefati110) - Idea & Initial work
