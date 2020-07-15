/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586914862056_2506';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // 配置跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    // origin: 'http://localhost:3000', // 不设置就表示允许所有的请求域访问 不可以设置通配符'*' 否则设置credentials无效
    credentials: true,   // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  // 配置session过期时间
  config.session = {
    key: 'loginSessionId',  // 设置session cookie里面的key
    maxAge: 1000 * 3600 * 7, // 设置过期时间  1000 ms * 3600 = 1天
    httpOnly: true,
    encrypt: true,
    renew: true         // renew等于true 那么每次刷新页面的时候 session都会被延期
  }

  return {
    ...config,
    ...userConfig,
  };
};
