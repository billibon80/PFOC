
window.addEventListener("DOMContentLoaded", () => {
    
     // Tabs & News Block
         
    function hideTabContent(blockContent, blockTab, selector) {
        blockContent.forEach(item => {
           // item.style.display = 'none'; // in-line style
           item.classList.add('hide');
           item.classList.remove('show');
        });

        blockTab.forEach(item => {
            item.classList.remove(selector);
        });
    }

    function showTabContent(i = 0, blockContent, blockTab, selector) {
        blockContent[i].classList.add('show', 'fade');
        blockContent[i].classList.remove('hide');
        blockTab[i].classList.add(selector);

    }

    // Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          selector = 'tabheader__item_active';


    hideTabContent(tabsContent, tabs, selector);
    showTabContent(0, tabsContent, tabs, selector);

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                
                if (target == item) {
                    hideTabContent(tabsContent, tabs, selector);
                    showTabContent(i, tabsContent, tabs, selector);
                }
            });
        }
    });

    
    // News

    const parentNews = document.querySelector('.offer'),
          news = parentNews.querySelectorAll('.offer__advantages'),
          imgNews = parentNews.querySelectorAll('.offer__slide'),
          current = parentNews.querySelector('#current'),
          total = parentNews.querySelector('#total'),
          prev = parentNews.querySelector('#previous');

    function hideNewsContent(...rest) {
        rest.forEach(db => {
                db.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
        });
       
    }

 
    function showNewsContent(c, t, p, ...rest) {
        rest.forEach(db => {
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

    parentNews.querySelector('.offer__slider-next').addEventListener('click', () => {     
        clearInterval(timeSlide_5);
        upSlider(+current.textContent, +total.textContent, news, imgNews);
    });

    // button slider previous

    parentNews.querySelector('.offer__slider-prev').addEventListener('click', () => {
        clearInterval(timeSlide_5);
        t = c;
        c = p;
        p--; 
        if (c - 1 == 0)  {
            p = imgNews.length > news.length ? news.length : imgNews.length;
        }
        hideNewsContent(news, imgNews);
        showNewsContent(c, t, p, news, imgNews); 
    });

    
    // Time for slider

    const timeSlide = () => {
        upSlider(+current.textContent, +total.textContent, news, imgNews);
    }
         
    const timeSlide_5 = setInterval(timeSlide, 5000);
       
          
});

