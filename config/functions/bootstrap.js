'use strict';

const Redis = require('ioredis');
const { setCache } = require('../../services/RedisForStrapi');
const { CONFIG } = require('../../services/RedisForStrapi.config');
const URL_OF_CONFIG = Object.keys(CONFIG.urls);

module.exports = () => {
  if (
    CONFIG.redis &&
    CONFIG.redis.enabled &&
    CONFIG.redis.enabled
  ) {
    const redis = new Redis({
      port: 6379,
      host: '127.0.0.1',
      db: 1,
    });
    strapi.redis = redis;
    strapi.redis_setCashe = setCache;
    strapi.redis_CONFIG_URLS = URL_OF_CONFIG;
    strapi.redis_CONFIG = CONFIG;
  }
};
