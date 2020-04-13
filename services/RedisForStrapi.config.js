const CONFIG = {
  urls: {
    '/qas': {
      method: 'GET',
      expire: 10,
    },
  },
  redis:{
    enabled:true
  }
};

module.exports = {CONFIG};
