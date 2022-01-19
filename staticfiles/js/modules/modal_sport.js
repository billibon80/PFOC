function modalSport() {
    const mapObject = {
        uralski: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.7245528185163!2d27.603444051677933!3d53.90109958000135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce4c14ec5a01%3A0x57066527f341de31!2z0L_QtdGALiDQo9GA0LDQu9GM0YHQutC40LkgOSwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556354543!5m2!1sru!2sby",
        sviazistov: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.0729779989574!2d27.67176025167828!3d53.91267908000396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce8ff01c44e1%3A0x5b8b09f26039f9aa!2z0YPQu9C40YbQsCDQodCy0Y_Qt9C40YHRgtC-0LIgNiwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641556667022!5m2!1sru!2sby",
        stoletova: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.3202720606596!2d27.6163428516781!3d53.90828448000296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce5135975133%3A0x92f8db69fd2068de!2z0J_QsNGA0Log0Y3QutGB0YLRgNC10LzQsNC70YzQvdGL0YUg0LLQuNC00L7QsiDRgdC_0L7RgNGC0LA!5e0!3m2!1sru!2sby!4v1641561455175!5m2!1sru!2sby",
        vaupshasova: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.71130226406!2d27.661851551677955!3d53.90133508000146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce7d0bbdf3bb%3A0xaf2507637d8ae287!2z0YPQu9C40YbQsCDQktCw0YPQv9GI0LDRgdC-0LLQsCA0Niwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1641561371614!5m2!1sru!2sby",
    };

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
                            inpt.removeAttribute('checked');
                            modalsTab.querySelectorAll('.tabs > div')[ki].classList.remove('checked');
                            inpt.removeAttribute('checked');
                        }
                    });

                    let tabs = modalsTab.querySelectorAll('.tabs > div')[k],
                          inp = modalsTab.querySelectorAll('input')[k];

                    inp.setAttribute('checked', 'checked');
                    tabs.classList.add("checked");
                    if (inp.className == 'tab-nav-4') {

                        
                        const mapSelector = modalsTab.querySelectorAll('[data-map]');
                        mapSelector.forEach((frame, mi) => {
                            let textHtml = `
                            <iframe src=${mapObject[frame.getAttribute('data-map')]} width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            `;
                            frame.innerHTML = textHtml;
                        });
                        
                    } else {
                        const iframe = modalsTab.querySelectorAll('iframe');
                        if (iframe.length > 0) {
                            iframe.forEach(selector => {
                                selector.remove();
                            });
                        }
                    }
                  
                    //
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
            no-repeat center center fixed; background-size: cover;`;

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