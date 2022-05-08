function cardArea() {
    const blockPrice = document.querySelector('.price'),
          btnCard = blockPrice.querySelectorAll('.inside-page__btn');
          
    btnCard.forEach(btn => {
              
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        addContent(btn, btn.dataset.priceGroup);
        });
    });

}

/// content
function addContent(btn, key) {
        
    fetch(`/priceBlock_content/${key}`)
    .then(response => response.text())
    .then(priceBlock => {
        
        // response from django page 
        document.querySelector('#priceGroup').innerHTML = priceBlock;

        const style = btn.currentStyle || window.getComputedStyle(btn),
              blockPrice = document.querySelector('#priceGroup'),
              modals = blockPrice.querySelector('.card-section__modal'),
              // get size of element
              domBtn = btn.getBoundingClientRect();
        
        modals.style.cssText = `
            top: ${Math.round(domBtn.top)}px;
            left: ${Math.round(domBtn.left)}px;
            height: ${Math.round(domBtn.height)}px;
            width: ${Math.round(domBtn.width)}px;
            z-index: -1;
            `;
        
        modals.style.cssText = `
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: 0;
            background: ${style.borderBlockColor.replaceAll(',', ' ').replace(')', ' / 100%)')};
            opacity: 1;
        `;
        modals.querySelector('.card-section__close').style.cssText = `
            opacity: 1;
            `;
        setTimeout(() => {
            modals.querySelector('.content').style.opacity = 1;
        }, 1000);
            document.querySelector('body').style.overflow = 'hidden';
        modals.querySelector('.card-section__close').addEventListener('click', () => {
            modals.querySelector('.content').style = '';
            setTimeout(() => {
                modals.style.cssText = `
                top: ${Math.round(domBtn.top)}px;
                left: ${Math.round(domBtn.left)}px;
                height: ${Math.round(domBtn.height)}px;
                width: ${Math.round(domBtn.width)}px;
                z-index: -1;
                `;
                modals.querySelector('.card-section__close').style = '';  
                document.querySelector('body').style.overflow = 'auto';
                // setTimeout(() => {
                //     // cards.classList.remove('card__hover');
                //     flips.classList.remove('flip-card__container__hover');
                // }, 1000);
                
            }, 500);
        });
        
    })
     
}
export default cardArea;