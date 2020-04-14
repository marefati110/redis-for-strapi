'use strict';

const crypto = require('crypto');

// this function load data form redis and use in middleware
const getCache = async (ctx) => {
  // if (!strapi.redis_CONFIG_URLS) return false;
  if (!strapi.redis) return false;

  // const params = ctx.params || null;
  const query = ctx.request.query || null;
  const body = ctx.request.body || null;
  const method = ctx.request.method;
  // remove / in end of the url
  // in request.url in middleware and contoller in diffrent some time
  let url = ctx.request.url;
  if (url[url.length - 1] === '/') {
    url = url.slice(0, url.length - 1);
  }

  // if (!strapi.redis_CONFIG_URLS.includes(url)) return false;
  // if (method !== strapi.redis_CONFIG.urls[url].method) return false;

  const KEY = url + method + body + query;
  const hash = crypto.createHash('md5').update(KEY).digest('hex');

  let response;
  await strapi.redis.get(hash).then((res) => {
    response = JSON.parse(res);
  });
  return response;
};

const setCache = async (ctx, result, Expired = 60 * 60 * 24) => {
  if (!strapi.redis) return false;

  // const params = ctx.params || null;
  const query = ctx.request.query || null;
  const body = ctx.request.body || null;
  const method = ctx.request.method;
  // remove / in end of the url
  // in request.url in middleware and contoller in diffrent some time
  let url = ctx.request.url;
  if (url[url.length - 1] === '/') {
    url = url.slice(0, url.length - 1);
  }

  const KEY = url + method + body + query;
  const hash = crypto.createHash('md5').update(KEY).digest('hex');

  await strapi.redis.set(hash, JSON.stringify(result), 'EX', Expired);
};

module.exports = { getCache, setCache };
