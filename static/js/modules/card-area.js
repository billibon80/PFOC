function cardArea() {
    const blockPrice = document.querySelector('.price'),
          cards = blockPrice.querySelectorAll('.card'),
          flips = blockPrice.querySelectorAll('.flip-card__container'),
          btnCard = blockPrice.querySelectorAll('.inside-page__btn'),
          modals = blockPrice.querySelectorAll('.card-section__modal');
          

          btnCard.forEach((btn, i) => {
                const style = btn.currentStyle || window.getComputedStyle(btn);
                const domBtn = btn.getBoundingClientRect();
                modals[i].style.cssText = `
                    top: ${Math.round(domBtn.top)}px;
                    left: ${Math.round(domBtn.left)}px;
                    height: ${Math.round(domBtn.height)}px;
                    width: ${Math.round(domBtn.width)}px;
                    z-index: -1;
                    `;
             btn.addEventListener('click', (e) => {
                e.preventDefault();
                cards[i].classList.add('card__hover');
                flips[i].classList.add('flip-card__container__hover');
                
                modals[i].style.cssText = `
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
                modals[i].querySelector('.card-section__close').style.cssText = `
                    opacity: 1;
                    `;
                setTimeout(() => {
                    modals[i].querySelector('.content').style.opacity = 1;
                }, 1000);
                    document.querySelector('body').style.overflow = 'hidden';
                modals[i].querySelector('.card-section__close').addEventListener('click', () => {
                    modals[i].querySelector('.content').style = '';
                    setTimeout(() => {
                        modals[i].style.cssText = `
                        top: ${Math.round(domBtn.top)}px;
                        left: ${Math.round(domBtn.left)}px;
                        height: ${Math.round(domBtn.height)}px;
                        width: ${Math.round(domBtn.width)}px;
                        z-index: -1;
                        `;
                        modals[i].querySelector('.card-section__close').style = '';  
                        document.querySelector('body').style.overflow = 'auto';
                        setTimeout(() => {
                            cards[i].classList.remove('card__hover');
                            flips[i].classList.remove('flip-card__container__hover');
                        }, 1000);
                        
                    }, 500);
                });

             });
          });

}
export default cardArea;