import tabs from './modules/tabs';
import calc from './modules/calc';
import veloSlider from './modules/velo-slider';
import modalSport from './modules/modal_sport';
import glideSlide from './modules/glide';
import timetable from './modules/timetable';
import el from './modules/el_slider';
import cardArea from './modules/card-area';

window.addEventListener("DOMContentLoaded", () => {

    tabs();
    calc();
    veloSlider();
    modalSport();
    glideSlide();
    timetable();
    el();
    cardArea();

    window.addEventListener('resize', () => {
        glideSlide();
    });

 

    // NavBar Link (hashTag) create scroll (link navbar) to hash (title of block)

    const allLinks = document.querySelectorAll('.header__links .header__link'),
          allHash = document.querySelectorAll('.title');

    allLinks.forEach((item, i) => {
            item.addEventListener('click', (e)=> {
                e.preventDefault();
                allHash[i].scrollIntoView({block: 'start', behavior: 'smooth'});
            });
    });
    
         
});

