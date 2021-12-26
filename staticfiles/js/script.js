import tabs from './modules/tabs';
import calc from './modules/calc';

window.addEventListener("DOMContentLoaded", () => {
      
    tabs();
    calc();

    

    
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

 
    function showNewsContent(c, t, p, ...rest) {
        rest.forEach(db => {
            if (db == imgNews) {
                db[c-1].classList.add('fade');
            }
            db[c-1].classList.add('show');
            db[c-1].classList.remove('hide');
        });
        
        current.innerHTML = c;
        total.innerHTML = t;
        prev.innerHTML = p;
    }
    
    // Start Slider

    let p = imgNews.length > news.length ? news.length : imgNews.length;

    hideNewsContent(news, imgNews);
    showNewsContent(1, 2, p, news, imgNews);

    let c = +current.textContent,
        t = +total.textContent;

    p = +prev.textContent;

    /// function Up slider add one slider for current, loop work around of all db items

    function upSlider (current, total, ...db) {
        let prev = current;

        current = total;
        total++; 

        if (current + 1 > db[0].length || current + 1 > db[1].length)  {
            total = 1;
        }
        hideNewsContent(db[0], db[1]);
        showNewsContent(current, total, prev, db[0], db[1]);
    }

    /// button slideer next
     let isFalse = false;

     function clearTimeSlider(id){
        clearInterval(id);
        id = null;
     }

    parentNews.querySelector('.offer__slider-next').addEventListener('click', () => {     
        clearTimeSlider(timeoutSldr);
        upSlider(+current.textContent, +total.textContent, news, imgNews);
    });

    // button slider previous
    parentNews.querySelector('.offer__slider-prev').addEventListener('click', () => {
        clearTimeSlider(timeoutSldr);
        t = c;
        c = p;
        p--; 
        if (c - 1 == 0)  {
            p = imgNews.length > news.length ? news.length : imgNews.length;
        }
        hideNewsContent(news, imgNews);
        showNewsContent(c, t, p, news, imgNews); 
    });

    // Timer for slider
    function timeSlider() {    
        if (!isFalse) {
            upSlider(+current.textContent, +total.textContent, news, imgNews);  
        }
    }
         
  let timeoutSldr = setInterval(timeSlider, 5000);

    //news img hover stop Timer Slider

    parentNews.querySelectorAll('img').forEach(img => {
 
        img.addEventListener('mouseenter', () => {
           isFalse = true;
        });
        img.addEventListener('mouseleave', () => {
            isFalse = false;
        });
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

