
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
        previous.innerHTML = p;
    }
    
    let p = imgNews.length > news.length ? news.length : imgNews.length;

    hideNewsContent(news, imgNews);
    showNewsContent(1, 2, p, news, imgNews);

    parentNews.addEventListener('click', (e) => {
        const target = e.target;

        let c = +current.textContent,
            t = +total.textContent; 
            p = +previous.textContent;

        if (target && target.classList.contains('offer__slider-next')) { 
            p = c;
            c = t;
            t++;  
            if (c + 1 > news.length || c + 1 > imgNews.length)  {
                t = 1;
            }
        } else if (target && target.classList.contains('offer__slider-prev')) {
            t = c;
            c = p;
            p--; 
            if (c - 1 == 0)  {
                p = imgNews.length > news.length ? news.length : imgNews.length;
            }

        }

        hideNewsContent(news, imgNews);
        showNewsContent(c, t, p, news, imgNews); 

         
          

    });
          
});

