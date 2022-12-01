// const koa = require('koa');

// const subscribeWidget = document.querySelector('[data-widget=subscribe]');
// const subscribeForm = subscribeWidget.querySelector('[data-id=subscribe-form]');
// const nameInput = subscribeWidget.querySelector('[data-id=name]');
// const phoneInput = subscribeWidget.querySelector('[data-id=phone]');
import Ticket from '../tickets';

const options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const ticket = [{
  id: '123',
  name: 'уборка',
  status: 'ok',
  created: new Date().toLocaleString('ru', options.era, options.year, options.month, options.day, options.weekday,
    options.timezone, options.hour, options.minute, options.second),

  // (new Date()).toISOString().slice(0,10)
}, {
  id: '4',
  name: 'глажка',
  status: 'нo',
  created: new Date().toLocaleString('ru', options.era, options.year, options.month, options.day, options.weekday,
    options.timezone, options.hour, options.minute, options.second),

}];
const body = document.getElementsByTagName('body')[0];
body.className = 'body';
const btn = document.querySelector('.btn');

btn.addEventListener('click', (evt) => {
  evt.preventDefault();

  console.log(1234);
  const xhr = new XMLHttpRequest();
  const method = 'allTickets';
  // xhr.open('GET', `http://localhost:8080/subscribe?method=${formData.get('method')}&id=${formData.get('id')}`);
  xhr.open('GET', `http://localhost:7070/subscribe?method=${method}`);
  const bod = new Ticket('.main');
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      try {
        if (btn.classList.contains('done')) {
          // xhr.abort();
        }
        const data = JSON.parse(xhr.response);

        // data.forEach(element => {

        // });
        // bod.create(ticket);
        bod.create(data);
        btn.className = 'btn first done';
        // bod.rename();
        console.log('ответ сервера', data, xhr.response);
        // bod.desk();
        // bod.onReload();

        // console.log(xhr.response, data);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert(xhr.response);
      console.log(`Ошибка статус:${xhr.status}`);
    }
  });

  xhr.send();
  bod.xhr(xhr);
});
// &&&&&&&&&&&&&&??????????????????
window.addEventListener('load', () => {
  console.log(123456);
});
//
