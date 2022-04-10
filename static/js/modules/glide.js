

function glideSlide() {

    const slider = document.querySelector('.glide__slides'),
          slideItems = slider.querySelectorAll('.glide__slide'),
          bullets = document.querySelectorAll('.glide .glide__bullet'),
          bgc = slider.querySelectorAll('.glide__bgc'),
          style = slideItems[0].currentStyle || window.getComputedStyle(slideItems[0]),
          widthSlide = slideItems[0].offsetWidth;

    slideItems.forEach((span, i) => {
        span.querySelectorAll('.oh').forEach(text => {
            text.remove();
            text.textContent.split(/(?!$)/u).forEach(char => {
                const span = document.createElement('span');
                span.classList.add('oh');
                span.classList.add('fw-bold');
                span.innerText = char;
                bgc[i].append(span);

            });
        });
    });

    let curSlider = 0,
        marg = parseInt(style.marginLeft) + parseInt(style.marginRight),
        totalWidth = marg + widthSlide,
        start=0,
        correctSlide = 0;
        

        
       if (window.innerWidth <= 768) {
            correctSlide = totalWidth;
        }else {
            start = totalWidth;
        }

    slider.style.cssText = `transform: translateX(${start}px)`;
    curSlider = totalWidth;

    
    function transformLR(deg){
        return `scale(0.5) perspective(1000px) rotateY(${deg}deg)`;
    }
    console.log(transformLR(40));
    addSmoke(0);
    transformFrame(1);
    bullet(0);
    

    function bullet(id) {
        
        bullets.forEach(bullet => {
            bullet.style.opacity = 0.5;
        });
        if(bullets[id]) {
            bullets[id].style.opacity = 1;
        }
        

    }

    function cleanTransform(id) {
        if(slideItems[id]){
          slideItems[id].querySelector('.glide__bg').style
          .transform = ``;  
        }
        
    }

    function transformFrame(id) {
        for (let i=0; i < slideItems.length; i++) {
            cleanTransform(i);
        }

        if(id - 1 >= 0) { 
            cleanTransform(id - 1);
        }

        if(curSlider < totalWidth && slideItems[id]) {
            slideItems[id].querySelector('.glide__bg').style
            .transform = transformLR(40);
        } else if (curSlider >= totalWidth && slideItems[id]) {
            slideItems[id].querySelector('.glide__bg').style
            .transform = transformLR(-40);
        }
        
        
        if(id + 1 < slideItems.length - 1) {
            cleanTransform(id + 1);
        }

        if(id + 2 <= slideItems.length - 1) {
            slideItems[id + 2].querySelector('.glide__bg').style
            .transform = transformLR(-40);
        }else if (id + 2 <= slideItems.length){
            cleanTransform(slideItems.length - 1);
        }
        
    }


    function addSmoke(id) {
        
        slideItems.forEach(li => {
            li.classList.add('smoke');
            li.querySelector('.caption').classList.remove('show');
            const img = li.querySelector('.prize');
            img.classList.remove('show');
        });

        if(slideItems[id]) {
            slideItems[id].classList.remove('smoke');
            slideItems[id].querySelector('.caption').classList.add('show');
            slideItems[id].querySelector('.prize').classList.add('show');
        }
        
    }
   
    document.querySelectorAll('.glide__arrow').forEach(but => {
        but.addEventListener('click', () => {

            marg = parseInt(style.marginLeft) + parseInt(style.marginRight);
            totalWidth = marg + widthSlide;
            
            
            if(but.classList.contains('glide__arrow--right')) {
                curSlider -= totalWidth;
                
                if(Math.abs(curSlider)  >= (slideItems.length - 1) * totalWidth ) {
                    curSlider = totalWidth;
                    addSmoke(0);
                    bullet(0);
                    slideItems[1].querySelector('.glide__bg').style
                    .transform = transformLR(-40);
                    slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
                    cleanTransform(0);
                    
                } else {
                    const curId = Math.abs(curSlider) / totalWidth;

                    addSmoke(curId + 1);
                    bullet(curId + 1);
                    transformFrame (curId);

                    slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
                }

                
               
            } else {
                curSlider += totalWidth;
                
                if(curSlider  > totalWidth ) {
                    curSlider = -1 * (slideItems.length - 2) * totalWidth;
                    addSmoke(slideItems.length - 1);
                    bullet(slideItems.length - 1);
                    slideItems[slideItems.length - 2].querySelector('.glide__bg').style
                    .transform = transformLR(40);
                    cleanTransform(slideItems.length - 1);
                    slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
                } else {
                    let curId = Math.abs(curSlider) / totalWidth;
                    transformFrame (curId); 
                    slider.style.cssText = `transform: translateX(${curSlider - correctSlide}px)`;
                    
                    if(curSlider < totalWidth) {
                        curId += 1;
                    } else {
                        curId = 0;
                    }
                    addSmoke(curId);
                    bullet(curId);   
                }  
            }
        });
    });

    // document.querySelector('.container__video').playbackRate = 2;
}

export default glideSlide;