import {modalClose} from '../../../static/js/services/btn';
import spinner from '../../../static/js/modules/spinner';
import ErrorMessage from '../../../static/js/modules/errorMessage/ErrorMessage';

function news(indN=0) {

    let totalN = 7;
     modalClose('#news', '.news__close-btn');


     function fetchBlock(path, blcSel, blcSpiner,styleId=0) {
        const blockTxt = document.querySelector(blcSel),
              blocdSpiner = document.querySelector(blcSpiner);
       
        if (blockTxt) {
            blocdSpiner.innerHTML = spinner();
            fetch(path)
            .then(response => response.text())
            .then(txt => {
                blockTxt.innerHTML = txt;
            })
            .then(() => {
                addClickTab(); 
                if (styleId != 0) {
                    addScroll(document.querySelector(`.news__tabs_block [data-news-index="${styleId}"]`));
                }
            })
            .catch((e) => {
                console.log(e);
                blockTxt.innerHTML = ErrorMessage();
            });
        }

    }

    function addStyle (item) {
        item.querySelector('.news__tabs_bgc').style.opacity = 0;
        item.classList.add('news__tabs_content_active');
    }

    function delStyle (allDiv) {
        allDiv.forEach(item => {
            item.classList.remove('news__tabs_content_active');
            item.querySelector('.news__tabs_bgc').style.opacity = '';
            })

    }

    function addClickTab() {
        const divMain = document.querySelectorAll('.news__tabs_content')

        if (divMain.length > 0) {
            divMain.forEach(div => {
                div.addEventListener('click', () => {  
                    delStyle(divMain)
                    addStyle(div);                 
                    fetchBlock(
                        `/news_txt/${div.dataset.newsIndex}`, 
                        '.news__main_txt',
                        '.news__main_txt' )
                });
            });
        }
    }

    function addScroll(bIN) {
        if (bIN) {
            addStyle(bIN)
            bIN.scrollIntoView({block: 'start', behavior: 'smooth'});  
        }
    }

    document.querySelector('.news__btn').addEventListener('click', () => { 
                         
        const indCurBl = document.querySelector('.news__tabs_content_active').dataset.newsIndex;
        
        fetchBlock(
            `/news_tab/${totalN}`, 
            '.news__tabs_block',
            '#spinnerNews',
            indCurBl )
           
        totalN += 2;
        
            
    });

    addClickTab();
    const bIN = document.querySelector(`.news__tabs_block [data-news-index="${indN}"]`);
    addScroll(bIN);
    
}

export default news;