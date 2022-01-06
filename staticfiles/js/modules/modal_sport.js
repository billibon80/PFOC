function modalSport() {

    let num = 15;

    const modalBtn = document.querySelectorAll('.tabheader__item'),
        modalContainer = document.querySelectorAll('.modals'),
        imgTabCont = document.querySelectorAll('.tabcontent img');
        
    modalBtn.forEach((btn, i) => {

        const holdModals = document.createDocumentFragment();
        for (let i = 0; i < num; i++) {
            const div = document.createElement('div');
            div.classList.add('modal-drop');
            div.style.top = Math.floor((Math.random() * 100)) + 'vh';
            div.style.left = Math.floor((Math.random() * 100)) + 'vw';
            div.style.transitionDelay = Math.random() + 's';
            holdModals.appendChild(div);
        }
        const modalsTab = document.querySelectorAll('.tabbed')[i];
        btn.addEventListener('click',function(){
            
            showContent(modalsTab);
            modalsTab.querySelectorAll('label').forEach((item, k) => {
                
                item.addEventListener('click', () => {
                    
                    modalsTab.querySelectorAll('input').forEach((inpt, ki) => {
                        if(inpt.hasAttribute('checked')){
                            console.log('click');
                            inpt.removeAttribute('checked');
                            modalsTab.querySelectorAll('.tabs > div')[ki].classList.remove('checked');
                            inpt.removeAttribute('checked');
                        }
                    });

                    let tabs = modalsTab.querySelectorAll('.tabs > div')[k],
                          inp = modalsTab.querySelectorAll('input')[k];

                    inp.setAttribute('checked', 'checked');
                    tabs.classList.add("checked");
                });
            });
              

            modalContainer[i].appendChild(holdModals);
            modalContainer[i].style.display = 'block';  
            
            window.setTimeout(function(){
                modalContainer[i].classList.add('active');
                document.querySelector('body').style.overflow = 'hidden';
            },0.4);
            modalContainer[i].querySelector('.modal-content')
            .style.cssText =  `background: url(${imgTabCont[i].getAttribute('src')})
            no-repeat center center fixed; background-size: cover; z-index: 6`;

            const closeBtn = modalContainer[i].querySelector('.close');
            closeBtn.addEventListener('click',function(){

                modalContainer[i].classList.remove('active');
                hiddenContent(modalsTab);
                document.querySelector('body').style.overflow = 'auto'; 
                window.setTimeout(function(){
                    modalContainer[i].style.display = 'none';
                },3000);
            });
        });


    });

    /// modal
    function showContent(parentSelector) {
        parentSelector.querySelectorAll('input').forEach((item, k) => {   
            if(item.hasAttribute('checked')) {
                const tabs = parentSelector.querySelectorAll('.tabs > div')[k];
                tabs.classList.add("checked");
            }
        });  
    }

    function hiddenContent(parentSelector) {

        parentSelector.querySelectorAll('input').forEach((item, k) => {   
            if(item.hasAttribute('checked')) {
                const tabs = parentSelector.querySelectorAll('.tabs > div')[k];
                tabs.classList.remove("checked");
            }   
        }); 
    }
}

export default modalSport;