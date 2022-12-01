export default class Ticket {
   constructor(element, res, xhr) {
      if (typeof element === 'string') {
         element = document.querySelector(element);
      }
      this.element = element;
      // this.xhr = xhr;
      // if (localStorage.getItem('value')) {
      //    this.element.innerHTML = JSON.parse(localStorage.getItem('value'));
      //  }

      this.onReload = this.onReload.bind(this);
      this.addTicket = this.addTicket.bind(this);
      this.desk = this.desk.bind(this);
      this.deleteTicket = this.deleteTicket.bind(this);
      this.redactTicket = this.redactTicket.bind(this);
      this.rename = this.rename.bind(this);
      this.create = this.create.bind(this);
      this.xhr = this.xhr.bind(this);
      // this.abort = this.abort.bind(this);

      this.element.addEventListener('click', (e) => {
         this.desk(e);
         if (e.target.querySelector('.highload2') !== null) {
            e.target.querySelector('.highload2').click();
         }
         this.deleteTicket(e);
         this.redactTicket(e);
      });

      this.res = res;

      // this.per = per;
      // this.formData = new FormData();
      // this.result = result;
      // this.id = id;
      // this.name = name;
      // this.status = status;
      // this.created = created;
   }

   xhr(any) {
      this.xhr = any;
      console.log(any);
   }

   // логика доп описания? запрос тикет бай ид =>
   desk(e) {
      const div3 = document.createElement('div');
      div3.className = 'note2';
      console.log(this.res);

      if (e.target.classList.contains('div')) {
         for (let i = 0; i < this.res.length; i++) {
            console.log(e.target.querySelector('.note').textContent, this.res[i].description, this.res);
            if (e.target.querySelector('.note').textContent === this.res[i].name && (this.res[i].description !== undefined)) {
               if (e.target.querySelector('.notes2').querySelector('.note2')) {
                  e.preventDefault();
                  console.log(e.target.querySelector('.notes2').querySelector('.note2'));
                  e.target.querySelector('.notes2').querySelector('.note2').textContent = `
                     ${this.res[i].description}
                         `;
                  if (this.res[i].description === '') {
                     e.target.querySelector('.notes2').querySelector('.note2').remove();
                     console.log('desk = 0');
                  }
                  this.change(e.target);

                  return;
               }
               if (this.res[i].description !== '') {
                  div3.innerHTML = `
                     ${this.res[i].description}
                         `;
                  e.target.querySelector('.notes2').appendChild(div3);
                  console.log('dolgno poyvitsy');
               }
               console.log(this.res[i].id, this.res);
               const xhr = new XMLHttpRequest();
               // const { id } = this.res[i].id;
               xhr.open('GET', `http://localhost:7070/subscribe?method=ticketById&id=${this.res[i].id}`);
               xhr.send();
               xhr.addEventListener('load', () => {
                  if (xhr.status === 200) {
                     try {
                        console.log(xhr.response);
                     }

                     // .....................отправить запрос на сервер
                     // }
                     catch (e) {
                        console.error(e);
                     }
                  } else {
                     console.log(`Ошибка статус:${xhr.status}, ${xhr.response}`);
                  }
               });
            }
         }
      }
   }

   // появление и исчезновение скрытого описания =>
   change(any) {
      any.querySelector('.notes2').querySelector('.note2').classList.toggle('invisible');
   }

   // добавление тикета, функционал кнопок =>
   create(result) {
      const div = document.createElement('div');
      div.className = 'ticketsCont';
      const ul = document.createElement('ul');
      ul.className = 'ul';

      result.forEach((element) => {
         ul.appendChild(this.addTicket(element));
      });

      div.appendChild(ul);
      const but = document.createElement('button');
      but.className = 'btn addTicket';
      but.innerHTML = `
          Добавить тикет`;
      this.element.appendChild(div);
      this.element.querySelector('.container').appendChild(but);

      but.addEventListener('click', () => {
         // const ticketDiv = document.createElement('div');
         const ticket = document.createElement('form');
         ticket.className = 'div ticket';
         ticket.innerHTML = `
         <span class='text'> Добавить тикет </span><br>
         Краткое описание<br>
         <input data-id='name' name="form small" class="text" required><br>
         Подробное описание<br>
         <textarea data-id='description'  name="form big" class="text" ></textarea><br>
         <div class ='notes'>  <button class="btn">Отмена</button>
         <button class="btn ok">Ок</button></div>`;
         const nameInput = ticket.querySelector('[data-id=name]');
         const deskInput = ticket.querySelector('[data-id=description]');

         ticket.querySelector('.btn').addEventListener('click', (evt) => {
            evt.preventDefault();
            console.log('click');
            ticket.remove();
         });
         ticket.querySelector('.ok').addEventListener('click', (evt) => {
            //! !!!!!!!!!!!!!!
            evt.preventDefault();
            const formData = new FormData();
            formData.append('name', `${nameInput.value}`);
            formData.append('form', `${deskInput.value}`);

            ticket.remove();

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:7070/subscribe?method=createTicket');
            xhr.send(formData);
            xhr.addEventListener('load', () => {
               if (xhr.status === 200) {
                  try {
                     result.push(JSON.parse(xhr.response));
                     ul.appendChild(this.addTicket(JSON.parse(xhr.response)));
                     console.log(`Метод креат тикет:${JSON.parse(xhr.response)}`);
                     // bod.desk();
                     // bod.onReload();

                     // console.log(xhr.response, data);
                  } catch (e) {
                     console.error(e);
                  }
               } else {
                  console.log(xhr.response);
                  console.log(`Ошибка статус:${xhr.status}`);
               }
            });

            console.log(formData);
         });

         this.element.appendChild(ticket);
         ul.appendChild(ticket);
      });
      // return result;
      this.res = result;
      console.log(this.res);
      this.rename();
      // можно и без этого:

      // this.element.querySelectorAll('.div').forEach((el) => {
      //    el.addEventListener('click', (e) => {
      //       this.redactTicket(e);
      //       console.log(56966);
      //    });
      // });
   }

   // закрыть список дел =>
   rename() {
      this.element.querySelector('.first').style.display = 'none';
      const butRename = document.createElement('button');
      butRename.className = 'btn closeTickets';
      butRename.innerHTML = `
         Убрать список дел`;

      this.element.querySelector('.container').insertBefore(butRename, this.element.querySelector('.container').querySelector('.btn'));

      butRename.addEventListener('click', () => {
         this.onReload();
         console.log(this.xhr.response);

         // this.xhr.abort();
      });
   }

   // abort(any) {
   //    any.abort();
   // }

   // удаление лишних элементов при закрытии списка дел =>
   onReload() {
      // if (this.element.querySelector('.close') !== null) {
      //    this.element.querySelector('.close').addEventListener('click', () => {
      //       this.element.innerHTML = ' <div class="container"><button class="btn first">Посмотреть список дeл</button></div>';
      //    });
      // }
      this.element.querySelector('.first').style.display = 'inline-block';
      this.element.querySelector('.closeTickets').remove();
      this.element.querySelector('.addTicket').remove();
      this.element.querySelector('.ticketsCont').remove();
      console.log(123456789);
      ///----------------

      // const xhr = new XMLHttpRequest();
      // const method = 'allTickets';
      // xhr.open('DELETE', `http://localhost:8080/subscribe?method=${method}`);
      // xhr.send();
      // console.log('delete');
      window.location.reload();

      // const body = document.getElementsByTagName('body')[0];

      // const btn = document.querySelector('.btn');

      // btn.addEventListener('click', (evt) => {
      //    evt.preventDefault();
      //    // const formData = new FormData();
      //    // formData.append('method', `${nameInput.value}`);
      //    // formData.append('id', `${phoneInput.value}`);
      //    // console.log(nameInput.value);
      //    // formData.forEach((el) => {
      //    //   console.log(el);
      //    // });
      //    console.log(123);

      // /// пипец)
   }

   // добавление тикетов - шаблон =>
   addTicket(el) {
      const li = document.createElement('li');
      li.className = 'li';
      li.innerHTML = `
      <div class ='div'>
      <div class ='notes2'> 
      <div class ='notes'> 
      <label class ='label'> 
      <input type= 'checkbox' class ='checkbox' id ='happy'>
      <span class="highload2"></span>
      </label>
      <span class = 'note'>${el.name}</span></div></div>
      <div class ='notes'><span class = 'note'>${el.created}</span> 
      <span class="highload redaktor"></span>
      <span class="highload del">Х</span> 
      </div>      
       </div>          
      `;
      return li;
      //   this.element.querySelector('.ul').appendChild(li);
   }

   // удаление тикета =>
   deleteTicket(e) {
      this.element.querySelectorAll('.div').forEach((el) => {
         if (el.querySelector('.del') === e.target) {
            const del = document.createElement('div');
            del.className = 'div ticket';
            del.innerHTML = `
            <span class='text'> Вы точно хотите удалить тикет? Это действие необратимо!</span><br>
          
            <div class ='notes'>  <button class="btn">Отмена</button>
            <button class="btn ok">Ок</button></div>`;
            this.element.appendChild(del);
            console.log(this.element.querySelectorAll('.div'), del);
            del.querySelector('.btn').addEventListener('click', (evt) => {
               evt.preventDefault();
               del.remove();
               this.element.querySelector('.li').querySelector('.div ticket').remove();
            });
            del.querySelector('.ok').addEventListener('click', (evt) => {
               //! !!!!!!!!!!!!!!
               evt.preventDefault();
               del.remove();
               e.target.closest('.div').remove();
               for (let i = 0; i < this.res.length; i++) {
                  const xhr = new XMLHttpRequest();
                  const method = 'delete';
                  xhr.open('GET', `http://localhost:7070/subscribe?method=delete&id=${this.res[i].id}`);

                  if (e.target.closest('.div').querySelector('.note').textContent === this.res[i].name) {
                     xhr.addEventListener('load', () => {
                        if (xhr.status === 200) {
                           try {
                              const data = JSON.parse(xhr.response);
                              console.log(data);

                              this.res.splice(i, 1);

                              console.log(this.res);
                              // this.create(data);
                           } catch (e) {
                              console.log(xhr.response);
                              console.error(e);
                           }
                        } else {
                           alert(xhr.response);
                           console.log(`Ошибка удаления тикета:${xhr.status}`);
                        }
                     });
                     xhr.send();
                     console.log(633333);
                  }
                  console.log(123456);
               }
            });

            console.log('удален тикет');
         }

         // } else console.log(el, e.target.querySelector('.del'));
      });
   }

   // редактирование тикета =>
   redactTicket(e) {
      this.element.querySelectorAll('.div').forEach((el) => {
         if (el.querySelector('.redaktor') === e.target) {
            // if (e.target.classList.contains('redaktor'))

            const red = document.createElement('div');
            red.className = 'div ticket';

            for (let i = 0; i < this.res.length; i++) {
               if (e.target.closest('.div').querySelector('.note').textContent === this.res[i].name) {
                  red.innerHTML = `
                     <span class='text'> Редактировать тикет </span><br>
                     Краткое описание<br>
                     <input data-id='name' name="form small" class="text" value =${this.res[i].name} required><br>
                     Подробное описание<br>
                     <textarea data-id='description'  name="form big" class="text">${this.res[i].description}</textarea><br>
                     <div class ='notes'>  <button class="btn">Отмена</button>
                     <button class="btn ok">Ок</button></div>`;
                  const nameInput = red.querySelector('[data-id=name]');
                  const deskInput2 = red.querySelector('[data-id=description]');
                  if (this.res[i].description === undefined) {
                     deskInput2.value = '';
                  }
                  red.querySelector('.ok').addEventListener('click', (evt) => {
                     const formData = new FormData();
                     formData.append('name', `${nameInput.value}`);
                     formData.append('form', `${deskInput2.value}`);

                     // console.log(this.res, deskInput2, red);
                     red.remove();
                     for (let i = 0; i < this.res.length; i++) {
                        const xhr = new XMLHttpRequest();
                        const method = 'redact';
                        xhr.open('POST', `http://localhost:7070/subscribe?method=redact&id=${this.res[i].id}`);

                        if (e.target.closest('.div').querySelector('.note').textContent === this.res[i].name) {
                           xhr.addEventListener('load', () => {
                              if (xhr.status === 200) {
                                 try {
                                    const data = JSON.parse(xhr.response);
                                    console.log(data);

                                    this.res[i].description = `${deskInput2.value}`;

                                    console.log(this.res);
                                    // this.create(data);
                                 } catch (e) {
                                    console.log(xhr.response);
                                    console.error(e);
                                 }
                              } else {
                                 alert(xhr.response);
                                 console.log(`Ошибка редактирования тикета:${xhr.status}`);
                              }
                           });
                           xhr.send(formData);
                        }
                     }
                  });
               }
            }

            this.element.appendChild(red);
            red.querySelector('.btn').addEventListener('click', (evt) => {
               evt.preventDefault();
               red.remove();
            });
         }
      });
   }
}

// module.exports = class Ticket
