'use strict';
const { exec_before } = require('../config/before');
const { exec_after } = require('../config/after');

const exec_befor_func = async (ctx) => {
  for (const func of exec_before) {
    await func(ctx);
  }
  return true;
};
const exec_after_func = async (ctx) => {
  for (const func of exec_after) {
    await func(ctx);
  }
  return true;
};

module.exports = { exec_befor_func, exec_after_func };
