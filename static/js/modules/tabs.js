

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

function showTabContent(blockContent, blockTab, selector, i = 0) {
    if (blockContent[i]) {
        blockContent[i].classList.add('show', 'fade');
        blockContent[i].classList.remove('hide');
        blockTab[i].classList.add(selector);
    }
}


function tabs() {
    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          selector = 'tabheader__item_active';


    hideTabContent(tabsContent, tabs, selector);
    showTabContent(tabsContent, tabs, selector);

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                
                if (target == item) {
                    hideTabContent(tabsContent, tabs, selector);
                    showTabContent( tabsContent, tabs, selector, i);
                }
            });
        }
    });
}

export default tabs;