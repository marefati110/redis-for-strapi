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
        await exec_befor_func();
        // get cache
        const res = await getCache(ctx);
        // execute function after get cache
        await exec_after_func();
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
