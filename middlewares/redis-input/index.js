const { getCache } = require('../../services/RedisForStrapi');
const {
  exec_after_func,
  exec_befor_func,
} = require('../../services/RedisHook');

module.exports = (strapi) => {
  return {
    async initialize() {
      strapi.app.use(async (ctx, next) => {
        // execute function before get cache
        exec_befor_func(ctx);
        // get cache
        const res = await getCache(ctx);
        // execute function after get cache
        exec_after_func(ctx);
        //
        if (res) {
          ctx.send(res);
        } else {
          await next();
        }
      });
    },
  };
};
