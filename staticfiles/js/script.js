import tabs from './modules/tabs';
import calc from './modules/calc';
import veloSlider from './modules/velo-slider';
import modalSport from './modules/modal_sport';
import glideSlide from './modules/glide';
import timetable from './modules/timetable';
import el from './modules/el_slider';

window.addEventListener("DOMContentLoaded", () => {

    tabs();
    calc();
    veloSlider();
    modalSport();
    glideSlide();
    timetable();
    el();
    

    window.addEventListener('resize', () => {
        glideSlide();
    });
         
});

