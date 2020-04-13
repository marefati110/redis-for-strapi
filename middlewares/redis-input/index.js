const { getCache } = require('../../services/RedisForStrapi');

module.exports = (strapi) => {
  return {
    // can also be async
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const res = await getCache(ctx);
        if (res) {
          ctx.send(res);
        } else {
          await next();
        }
      });
    },
  };
};
