'use strict';

// Menu

const burger = document.querySelector('.burger'),
      menu = document.querySelector('.menu'),
      menuClose = document.querySelector('.close');

burger.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

menuClose.addEventListener('click', (e) => {
    menu.classList.toggle('menu_active');
});

// Slider

const slider = document.querySelector('.slider'),
      sliderContent = document.querySelector('.slider__content'),
      slidItem = document.querySelectorAll('.slider__item'),
      sliderDots = document.querySelector('.slider__dots'),
      slidNext = document.querySelector('.next'),
      slidPrev = document.querySelector('.prev');

let settings = {
    showSlideItem: 2.25, // Устанавливаем количество слайдеров которое должно быть видно
    dots: true,       // Разрешаем отображение точек для прокрутки слайдера
    responsive: {

    }
};

slidItem[0].classList.add('slider__active');


// Расчет ширины контента и элементов
function widthCalculation(widthSlide) {
    // Расчитываем ширину контейнера слайдера в котором будут находится элементы слайдера
    settings.sliderContentWidth = widthSlide * slidItem.length;
    // Расчитываем ширину элемента слайдера
    // settings.sliderItemWidth = slider.clientWidth / settings.showSlideItem;
    settings.sliderItemWidth = widthSlide;
}

// Функция устанавливает ширину элемента слайдера
function settingWidth() {
    sliderContent.style.width = `${settings.sliderContentWidth}px`;
    slidItem.forEach(item => {
        item.style.width = `${settings.sliderItemWidth}px`;
    });
}

// Функция создает точки для прокрутки слайдера
function createDots() {

    let amountDots,
        dot;

    if (settings.dots) {
        // sliderDots.style.display = 'flex';
        amountDots = settings.sliderContentWidth / (settings.showSlideItem * settings.sliderItemWidth);
        for (let i = 0; i < amountDots; i++) {
            dot = document.createElement('span');
            dot.classList.add('slider__dot');
            // sliderDots.append(dot);
        }
    }
}

// Функция перемещает слайдер в точку по которой совершен клик
function moveSliderToDot() {
    const sliderDot = document.querySelectorAll('.slider__dot');

    // sliderDot[0].classList.add('slider__dot_active');

    sliderDot.forEach((dot) => {
        dot.addEventListener('click', (e) => {

            sliderDot.forEach((dot, i) => {

                if (dot.classList.contains('slider__dot_active')) {
                    sliderDot[i].classList.remove('slider__dot_active');
                }

                if (e.target == dot) {
                    sliderDot[i].classList.add('slider__dot_active');
                    moveSlider(i);
                }
            });

        });
    });

}

// Функция перемещения слайдера
function moveSlider(i) {
    const step = settings.sliderItemWidth * settings.showSlideItem * (i);
    sliderContent.style.transform = `translateX(-${step}px)`;
}

// Функция определяет ширину экрана и устанавливает количиство отображаемых слайдов при изменении ширины экрана
function responsive() {

    if (window.innerWidth <= 992 && window.innerWidth > 576) {
        settings.showSlideItem = 2;
        widthCalculation(400);
        settingWidth();
        console.log(992);
    } else if (window.innerWidth <= 768) {
        settings.showSlideItem = 1;
        widthCalculation(320);
        settingWidth();
        console.log(576);
    } else {
        settings.showSlideItem = 2.25;
        widthCalculation(550);
        settingWidth();
    }
}

slidNext.addEventListener('click', (e) => {
    e.preventDefault();

    for (let i = 0; i < slidItem.length; i++) {
        if (i == 6) {
            break;
        }

        if (slidItem[i].classList.contains('slider__active')) {
            slidItem[i].classList.remove('slider__active');
            slidItem[i+1].classList.add('slider__active');
            const step = settings.sliderItemWidth * (i + 1);
            sliderContent.style.transform = `translateX(-${step}px)`;
            break;
        }
    }
});

slidPrev.addEventListener('click', (e) => {
    e.preventDefault();

    for (let i = 1; i < slidItem.length; i++) {
        if (i == 0) {
            break;
        }

        if (slidItem[i].classList.contains('slider__active')) {
            console.log('q');
            slidItem[i].classList.remove('slider__active');
            slidItem[i-1].classList.add('slider__active');
            const step = settings.sliderItemWidth * (i - 1);
            sliderContent.style.transform = `translateX(-${step}px)`;
            break;
        }
    }
});

widthCalculation(550);
responsive();
settingWidth();
createDots();
moveSliderToDot();

window.addEventListener('resize', (e) => {

    responsive();
    createDots();
    moveSliderToDot();
});

// Accordion

const accordion = document.querySelector('.accordion'),
      accordionItem = document.querySelectorAll('.accordion__item'),
      accordionBtn = document.querySelector('.accordion__btn');

accordionItem.forEach(item => {
    let btn = item.querySelector('.accordion__btn');

    btn.addEventListener('click', e => {
        if (item.classList.contains('accordion__item_active')) {
            accordionItem.forEach(item => {
                item.classList.remove('accordion__item_active');
            });
        } else {
            accordionItem.forEach(item => {
                item.classList.remove('accordion__item_active');
            });
            item.classList.add('accordion__item_active');
        }
    });
});