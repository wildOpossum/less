'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    //TABS
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabs = document.querySelectorAll('.tabheader__item');
    const parent = document.querySelector('.tabheader__items');

    // скрываем контет табов;
    function hideContetnt(){
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        // удаляем клас активности;
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

     // показывает контент табов;
    function showContnent(i){
        tabsContent[i].style.display = 'block';

        // присваем клас активности
        tabs[i].classList.add('tabheader__item_active');
       
    }

     // обработчик собитий для нажатия на меню
    parent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideContetnt();
                    showContnent(i);
                }
            });
        }

    });

    hideContetnt();
    showContnent(0);

    //TIMER

    const deadLine = '2022-06-30';
/* Установка таймера */
    function setTimeRemining (endtime){
        /* Вычисление сколько осталось до окончания */
        const time = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            seconds = Math.floor((time / 1000 ) % 60);

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    /* функционал добавления нуля спереди если число меньше 10 */
    function addZero(num) {
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else if (num < 0) {
            return` 00`;
        }
        else{
            return num;
        }
    }

    /* Установка таймера на сайте */
    function setClock (selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        /* установка интервала */
        const setTime = setInterval(updateClock, 1000);
        /* инициализация таймера, для предотврацение мерцания
        при обновлении страницы */
        updateClock();

        /* Собсвено сам функционал выводящий таймер */
        function updateClock (){
            const t = setTimeRemining(endtime); 

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            /* условия остановки таймера */
            if (t.total < 0){
                clearInterval(setTime);
            }
        }
    }

    setClock('.timer', deadLine);

//Modal window;

    const modalTriger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('[data-close]');
//Вызов модального окна;
    function showModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTriger.forEach(btn => {
        btn.addEventListener('click',  showModal)
    });
//Закрытие модального окна;
    function closeWindow () {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    closeModal.addEventListener('click', closeWindow);
    
    modal.addEventListener('click', (event) =>{
        if (event.target === modal){
            closeWindow ();
        }
    });
   
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape'){
            closeWindow ();          
        }
    });

    const modalTimerId = setTimeout(showModal, 150000);
    /* pageYOffset властивість об'єкту window яка повертає кількість
    пікселів які прокручені по вертикалі у браузері. */

    /*Свойство clientHeight содержит высоту элемента внутри границ
    вместе с padding, но без border и прокрутки).  */

    /* Свойство scrollHeight содержит высоту элемента с учетом
    вертикальной прокрутки. Если у элемента нет вертикальной полосы
    прокрутки, то значение scrollHeight равно clientHeight. */

    function openModalByScroll (){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    window.addEventListener('scroll', openModalByScroll);

    class UserMenu{
        constructor(image, alt, title, discription, price, classSelector){
            this.image = image;
            this.alt = alt;
            this.title = title;
            this.discription = discription;
            this.price = price;
            this.selector = document.querySelector(classSelector);
            this.transfer = 35.5;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }
        
        createLayout(){
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                    <img src=${this.image} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.discription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
           this.selector.append(element);
        }
    }

    new UserMenu(
        'img/tabs/vegy.jpg',
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        4,
        '.menu .container'
    ).createLayout();

    new UserMenu(
        'img/tabs/elite.jpg',
        "elite",
        'Меню “Премиум”"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        5.5,
        '.menu .container'
    ).createLayout();

    new UserMenu(
        'img/tabs/post.jpg',
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        5.0,
        '.menu .container'
    ).createLayout();

    //Обработка форм
    
    const forms = document.querySelectorAll('form');

    const massage = {
        loading: 'Загрузка',
        suscces: 'Спасибо! Скоро мы с Вами свяжеься',
        failure: 'Упс... Что-то пошло не так',
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            const statusMassage = document.createElement('div');
            statusMassage.classList.add('status');
            statusMassage.textContent = massage.loading;
            // Добавление елемента к форме
            form.append(statusMassage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

           /* request.setRequestHeader('Content-type', 'multipart/form-data'); */

            //Конструктор FormData() создаёт новые объект FormData, если проще - HTML-форму
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200){
                    console.log(request.response);
                    //cooбщение об успехе
                    statusMassage.textContent = massage.suscces;
                }else{
                    //сообщение об ошибке
                    statusMassage.textContent = massage.failure;
                }
            });


        });
    }

});