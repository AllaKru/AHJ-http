/* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
// import Ticket from './tickets';
// сработало только рекуире!
// const tic = require('./src/tickets');
// eslint-disable-next-line no-unused-vars
// import { readFileSync } from 'fs';

const http = require('http');
const https = require('https');
const Koa = require('koa');
// eslint-disable-next-line no-unused-vars
const url = require('url');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const uuid = require('uuid');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const multer = require('koa-multer');
const { count } = require('console');
const cors = require('@koa/cors');

const public1 = path.join(__dirname, '/public1');
// const cors = require('koa2-cors');
// eslint-disable-next-line new-cap
const app = new Koa();

app.use(cors());
app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));
// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//     'Access-Control-Allow-Origin': true,
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//     // eslint-disable-next-line comma-dangle
//   })
// );

// const port = process.env.PORT || 7070;
const port = process.env.PORT || 7070;
// const port = process.env.API_URL || 7070;
console.log(`proc - ${process.env.PORT}, ${process.env}, `);


// app.use(multer());

// app.use(function *() {
//   this.body = this.req.body;
// });

const ticket = [{
  id: '1',
  name: 'уборка',
  status: 'ok',
  created: new Date(),

}, {
  id: '2',
  name: 'глажка',
  status: 'нo',
  created: new Date(),

}];
const ticketFull = [{
  id: '123',
  name: 'уборка',
  description: 'убраться тщательно',
  status: 'ok',
  created: new Date(),

}, {
  id: '4',
  name: 'глажка',
  description: 'прогладить тщательно',
  status: 'нo',
  created: new Date(),

},
{
  id: '56',
  name: 'комп',
  description: 'починить все',
  status: 'нo',
  created: new Date(),

}];
// const server = http.Server((req, res) => {
//   const uparsed = url.parse(req.url, true);
//   console.log(req.url, res.query, uparsed);
//   if (uparsed.query.name === 'alla' && uparsed.query.phone === '89055495395') {
//     res.statusCode = 200;
//     res.end(`Hi, ${uparsed.query.name}!`);
//     console.log(uparsed.query.name);
//   } else {
//     res.statusCode = 404;
//     res.end('Доступ ограничен');
//     console.log(typeof uparsed.query.phone);
//   }
// });
// server.listen(port);
// export default app;
app.use(async (ctx) => {
  // ctx.response.body = 'server response';
  console.log('Запрос 1');
  // if (ctx.request.url === '/subscribe?name=alla&phone=89055495395') {
  // console.log(1234567);
  // ctx.response.status = 200;
  // ctx.response.res.end('hi');
  // console.log(ctx.request);
  // koaStatic(public);
  const { method, id } = ctx.request.query;
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });
  if (ctx.request.method === 'GET') {
    console.log('Запрос 2');
    // if (ctx.request.url === '/?method=allTickets') {
    //   ctx.response.body = ticket;
    //   // ctx.response.res.end(ticket);
    //   console.log(ctx.response)
    // } else if (ctx.request.url === '/?method=ticketById&id') {
    //   ctx.response.body = ticketFull;
    // } else {
    //   ctx.response.status = 404;
    //   console.log(ctx.request);
    //   ctx.response.res.end('Доступ ограничен');
    //   return;
    // }
    // ctx.request.url = method;
    // const { method } = ctx.request.query;

    switch (method) {
      case 'delete':
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= ticket.length; i++) {
          if (id === ticket[i].id) {
            ctx.response.body = ticket[i];
            ticket.splice(i, 1);
            // ticket[i].description = ctx.request.body.description;
            console.log(' удаляется', ticket);
            return;
          } console.log('ошибка удаления', ticket[i].id, id);
        }

        return;

      case 'allTickets':
        ctx.response.body = ticket;
        // console.log(ctx.request.query);
        console.log('Запрос 3');
        return;
      case 'ticketById':

        for (let i = 0; i < ticket.length; i++) {
          if (id === ticket[i].id) {
            ctx.response.body = ticket[i];
            ctx.request.body.description = ticket[i].description;
            console.log('вылазит описание', ctx.request.body, ticket, ctx.request.body.description);
            return;
            // return очень важно!!!!!
          } ctx.response.body = ticketFull;

          console.log(id, ctx.request.query);
        }
        return;

      default:

        ctx.response.status = 404;
        // console.log(ctx.request.query);
        ctx.response.res.end('Доступ ограничен');
    }

    // ctx.request.url = '/?method=allTickets';

    // const tic = new Ticket()
    // console.log(tic.now() )
  } else if (ctx.request.method === 'POST' && method === 'createTicket') {
    console.log('создание тикета');
    let count22 = (ticket.length + 1);

    for (let i = 0; i <= ticket.length; i++) {
      if (ticket.length !== 0) {
        console.log(count22.toString(), ticket[i].id);
        if (count22.toString() === ticket[i].id) {
          count22 += 1;
        }
      }
      const obj = {
        // eslint-disable-next-line no-const-assign, no-plusplus
        id: count22.toString(),
        name: ctx.request.body.name,

        status: 'нo',
        created: new Date(),
        description: ctx.request.body.form,

      };
      ctx.response.body = obj;
      ticket.push(obj);
      console.log(ticket);
      return;
    }

    // (ticket.length + 1).toString()
  } else if (ctx.request.method === 'POST' && method === 'redact') {
    for (let i = 0; i <= ticket.length; i++) {
      if (id === ticket[i].id) {
        // ctx.response.body = ticket[i];
        ticket[i].description = ctx.request.body.form;
        ctx.response.body = ticket[i];
        console.log(' редактируется', ticket[i].description, ctx.request.body.description, ctx.request.body);
        return;
      } console.log('ошибка редактировния', ticket[i].id, id);
    }
  }
  // this.body = this.req.body;
  //   // ctx.response.status = 400;
  //   // console.log(1245)
  //   return;
  // }
  // ctx.response.write(7777777777777);
  // ctx.response.end('Пока');
});
// app.listen(port, () => {
//   console.log(`Server runnings on ${port}`);
// });
const server = http.createServer(app.callback()).listen(port);
console.log(122323, port);
module.exports = { app };
// const server = http.createServer(app.callback()).listen(8080);
// export default function handler(request, response) {
//   // api/[name].js -> /api/lee
//   // req.query.name -> "lee"
//   const { name } = request.query;
//   return response.end(`Hello ${name}!`);
// }

// import path from 'path';

function handler(req, res) {
  const file = path.join(process.cwd(), 'files', 'test.json');
  const stringified = fs(file, 'utf8');

  res.setHeader('Content-Type', 'application/json');
  return res.end(stringified);
}
module.exports = { handler };
