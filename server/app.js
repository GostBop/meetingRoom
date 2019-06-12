const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const rest = require('./rest');

const cors = require('koa2-cors');

const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    console.log(`${ctx.request.path}`);
    await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.use(cors());



app.listen(3000);
console.log('app started at port 3000...');