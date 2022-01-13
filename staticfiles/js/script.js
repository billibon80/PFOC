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

    // News

    const parentNews = document.querySelector('.offer'),
          news = parentNews.querySelectorAll('.offer__advantages'),
          imgNews = parentNews.querySelectorAll('.offer__slide'),
          current = parentNews.querySelector('#current'),
          total = parentNews.querySelector('#total'),
          prev = parentNews.querySelector('#previous');

    function hideNewsContent(...rest) {
        rest.forEach(db => {
                db.forEach((item, i) => {
                item.classList.add('hide');
                item.classList.remove('show');
                if (db == imgNews) {
                    item.classList.remove('fade');
                }
            });
        });
       
    }

 

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

