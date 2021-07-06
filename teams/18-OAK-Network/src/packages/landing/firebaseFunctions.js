const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';
// const nextjsDistDir = join('src', require('./src/next.config.js').distDir);

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: './.next',
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
