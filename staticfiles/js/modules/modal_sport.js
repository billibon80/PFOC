function modalSport() {

    let num = 15;

    const modalBtn = document.querySelectorAll('.tabheader__item'),
        modalContainer = document.querySelectorAll('.modals'),
        imgTabCont = document.querySelectorAll('.tabcontent img');
        
    

    // for (let i = 0; i < num; i++) {
    //     const div = document.createElement('div');
        
    //     div.classList.add('modal-drop');
    //     div.style.top = Math.floor((Math.random() * 100)) + 'vh';
    //     div.style.left = Math.floor((Math.random() * 100)) + 'vw';
    //     div.style.transitionDelay = Math.random() + 's';
    //     holdModals.appendChild(div);
    // }

    

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
        

        btn.addEventListener('click',function(){
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
                    document.querySelector('body').style.overflow = 'auto'; 
                    window.setTimeout(function(){
                        modalContainer[i].style.display = 'none';
                    },3000);
                });
               
            });
       
        console.log();
    });
    

    

    

}

export default modalSport;