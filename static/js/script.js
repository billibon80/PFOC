import tabs from './modules/tabs';
import calc from './modules/calc';
import modalSport from './modules/modal_sport';
import glideSlide from './modules/glide';
import timetable from './modules/timetable';
import el from './modules/el_slider';
import cardArea from './modules/card-area';
import badjes from '../../templates/homepage/badges/badjes'


window.addEventListener("DOMContentLoaded", () => {

    try {
       badjes(); 
    }
    catch (e) {
        console.log('badjes error', e)
    }

    try {
       tabs();  
     }
     catch (e) {
         console.log('tabs error', e)
     }

    try {
      calc();   
    }
    catch (e) {
        console.log('calc error', e)
    }
    
    try {
       modalSport();  
    }
    catch (e) {
        console.log('modalSport error', e)
    }
    
    try {
      glideSlide();   
    }
    catch (e) {
        console.log('glideSlide error', e)
    }
    
    try {
      timetable();   
    }
    catch (e) {
        console.log('timetable error', e)
    }

    try {
      el();   
    }
    catch (e) {
        console.log('el error', e)
    }
    
    try {
      cardArea();   
    }
    catch (e) {
        console.log('cardArea error', e)
    }
    

 

    // NavBar Link (hashTag) create scroll (link navbar) to hash (title of block)
    try {
        const allLinks = document.querySelectorAll('.header__links .header__link'),
          allHash = document.querySelectorAll('.title');

        allLinks.forEach((item, i) => {
                item.addEventListener('click', (e)=> {
                    e.preventDefault();
                    allHash[i].scrollIntoView({block: 'start', behavior: 'smooth'});
                });
        }); 
    }
    catch (e) {
        console.log('NavBarLink error', e)
    }
    
    
         
});

