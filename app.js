const Koa = require('koa');
const app = new Koa();

const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views/pages',
  basedir: './views',
  pretty: true,
  noCache: true,
  app: app
});

const statica = require('koa-static');
app.use(statica('./public'));

const session = require('koa-session');
app.use(
  session(
    {
      key: 'koa:sess',
      maxAge: 'session',
      overwrite: true,
      httpOnly: true /** (boolean) httpOnly or not (default true) */,
      signed: false /** (boolean) signed or not (default true) */,
      rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
      renew: false
    },
    app
  )
);

const flash = require('koa-flash-simple');
app.use(flash());

const koaBody = require('koa-body');
app.use(
  koaBody({
    formidable: {
      uploadDir: './public/assets/img/products/'
    },
    multipart: true
  })
);

const router = require('./router');
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
