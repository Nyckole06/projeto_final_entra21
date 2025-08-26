document.addEventListener('DOMContentLoaded', function () {

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        coverflowEffect: {
            rotate: 30,      // rotação dos slides
            stretch: 0,      // espaço entre slides
            depth: 100,      // profundidade do slide
            modifier: 1,     // multiplicador do efeito
            slideShadows: true, // sombras nos slides
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },


    });

});
