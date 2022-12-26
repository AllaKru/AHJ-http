/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import cors from '@koa/cors';
import http from 'http';
import Koa from 'koa';
import koaBody from 'koa-body';
import path from 'path';

// import Router from 'koa-router'
// import next from 'next'

// const app = next({ dev: true });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//    const server = new Koa();
//    const router = new Router();

//    router.get('*', async (ctx) => {
//       handle(ctx.req, ctx.res);
//       ctx.respond = false;
//    });

//    server.use(router.routes());
//    server.listen(3000);
// }).catch((e) => {
//    console.log(e.stack);
// });

// const http = require('http');
// const https = require('https');
// const Koa = require('koa');
// eslint-disable-next-line no-unused-vars
// const url = require('url');
// const path = require('path');
// eslint-disable-next-line no-unused-vars
// const fs = require('fs');
// const uuid = require('uuid');
// const koaStatic = require('koa-static');
// const koaBody = require('koa-body');
// const multer = require('koa-multer');
// const { count } = require('console');
// const cors = require('@koa/cors');

// eslint-disable-next-line no-unused-vars
const public1 = path.join(__dirname, '/public');

const app = new Koa();

app.use(cors());
app.use(koaBody({
   urlencoded: true,
   multipart: true,
}));

const port = process.env.PORT || 7070;
// const port = process.env.API_URL || 7070;
console.log(`proc - ${process.env.PORT}, ${process.env}, `);

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

export default app.use(async (ctx) => {
   console.log('Запрос 1');

   const { method, id } = ctx.request.query;
   ctx.response.set({
      'Access-Control-Allow-Origin': '*',
   });
   if (ctx.request.method === 'GET') {
      console.log('Запрос 2');

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
});
const server = http.createServer(app.callback()).listen(port);
console.log(122323, port);
// module.exports = app;
// export default app;
