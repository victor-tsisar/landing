"use strict";

const body = document.body;
const title = document.querySelector('.title');
const mobileBtn = document.querySelector('.mobile-btn');
const langBtn = document.querySelector('.lang-btn');
const langList = document.querySelector('.lang-list');
const items = langList.querySelectorAll('.lang-list__item');
const circle = document.querySelector('.circle img');
const marquee = document.querySelectorAll('.marquee');
const marqueeSpan = document.querySelectorAll('.marquee span');

function setTransformAngle() {
    const { innerHeight, innerWidth } = window;
    const diagonal = Math.sqrt(Math.pow(innerHeight, 2) + Math.pow(innerWidth, 2))
    const arcSin = Math.asin((innerHeight / diagonal))
    const angle = Math.floor(arcSin / (Math.PI / 180) * 100) / 100;

    // задаємо розміри для бігучих рядків
    marquee.forEach(item => {
        item.style.width = `${innerWidth}px`;
        item.style.height = `${innerHeight}px`;
    });

    // встановлюємо кут нахилу для бігучих рядків
    marqueeSpan.forEach(item => {
        item.style.transform = `rotate(-${angle}deg)`;
        item.style.transform = `rotate(-${angle}deg)`;
    });
}

setTransformAngle();

window.addEventListener('resize', () => {
    // перерахунок кута нахилу для бігучих рядків при зміні розмірів та орієнтації девайсу
    setTransformAngle();
});

body.addEventListener("mousemove", event => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    let cursorX = 0;
    let cursorY = 0;
    let cordsX = 0;
    let cordsY = 0;
    
    // отримуємо коефіцієнти для зміщення по горизонталі від 1 до 9
    if (event.clientX < halfWidth) {
        // коли курсор рухається вліво
        cursorX = Math.floor(halfWidth / event.clientX);
        if (cursorX >= 10) {
            cursorX = 9;
        }
        cordsX = - (50 + cursorX);
    } else {
        // коли курсор рухається вправо
        cursorX = Math.floor(halfWidth / (window.innerWidth - event.clientX));
        if (cursorX >= 10) {
            cursorX = 9;
        }
        cordsX = - (50 - cursorX);
    }

    // отримуємо коефіцієнти для зміщення по вертикалі від 1 до 9
    if (event.clientY < halfHeight) {
        // коли курсор рухається вгору
        cursorY = Math.floor(halfHeight / event.clientY) * 2;
        if (cursorY >= 20) {
            cursorY = 19;
        }
        cordsY = - (50 + cursorY);
    } else {
        // коли курсор рухається справа
        cursorY = Math.floor(halfHeight / (window.innerHeight - event.clientY)) * 2;
        if (cursorY >= 20) {
            cursorY = 19;
        }
        cordsY = - (50 - cursorY);
    }

    title.style.transform = `translate(${cordsX}%, ${cordsY}%)`;
});

body.addEventListener('mouseleave', event => {
    // відключаємо магніт, коли курсор покидає сторінку;
    title.removeAttribute('style');
});

body.addEventListener('wheel', event => {
    // встановлюємо додатнє рандомне значення для пришвидшення зміни повороту
    let rotateSpeed = Math.abs((event.pageY / 360) * Math.random());
    
    circle.style.transform = `rotate(${rotateSpeed}rad)`;
});

mobileBtn.addEventListener('click', () => {
    // активація мобільного меню
    mobileBtn.classList.toggle('active');
});

langBtn.addEventListener('click', () => {
    // активація меню вибору мови
    langBtn.classList.toggle('active');
    langList.classList.toggle('active');
});

items.forEach(item => {
    // вибір активної позначки мови
    item.addEventListener('click', () => {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('current');
        }

        item.classList.add('current');
    })
});
