import glideModularEsm from '../../../node_modules/@glidejs/glide/dist/glide.modular.esm';
import Glide, {Autoplay, Controls, Breakpoints, Images} from '../../../node_modules/@glidejs/glide/dist/glide.modular.esm';


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
        totalWidth = marg + widthSlide;

    slider.style.cssText = `transform: translateX(${totalWidth}px)`;
    curSlider = totalWidth;

    addSmoke(0);
    transformFrame(1);

    function bullet(id) {
        
        bullets.forEach(bullet => {
            bullet.style.opacity = 0.5;
        });
        bullets[id].style.opacity = 1;

    }

    function transformFrame (id) {
       

        if(id - 1 >= 0) {
            slideItems[id - 1].querySelector('.glide__bg').style
            .transform = ``; 
        }

        if(curSlider < totalWidth) {
            slideItems[id].querySelector('.glide__bg').style
            .transform = `perspective(1000px) rotateY(${40}deg)`;
        } else if (curSlider >= totalWidth) {
            slideItems[id].querySelector('.glide__bg').style
            .transform = `perspective(1000px) rotateY(${-40}deg)`;
        }
        
        
        if(id + 1 < slideItems.length - 1) {
            slideItems[id + 1].querySelector('.glide__bg').style
            .transform = ``; 
        }

        if(id + 2 <= slideItems.length - 1) {
            slideItems[id + 2].querySelector('.glide__bg').style
            .transform = `perspective(1000px) rotateY(${-40}deg)`;
        }else if (id + 2 <= slideItems.length){
            slideItems[slideItems.length - 1].querySelector('.glide__bg').style
            .transform = ``;
        }
        
    }

    function cleanStyle() {
        slideItems.forEach(slied => {
            slied.querySelector('.glide__bg').style.transform = '';
        });
    }

    function addSmoke(id) {
        
        slideItems.forEach(li => {
            li.classList.add('smoke');
            li.querySelector('.caption').classList.remove('show');
            const img = li.querySelector('.prize');
            img.classList.remove('show');
            // img.style = '';
        });

        slideItems[id].classList.remove('smoke');
        slideItems[id].querySelector('.caption').classList.add('show');
        
        slideItems[id].querySelector('.prize').classList.add('show');

        // if(slideItems[id-1] && slideItems[id+1]) {
        //     slideItems[id-1].querySelector('.prize').style.transform = 'scale(1) translate(0)';
        // }else{
        //     console.log('yes');
        //     if(!slideItems[id-1]) {
        //         slideItems[0].querySelector('.prize').style.transform = 'scale(1) translate(0)';
        //     } else {
        //         slideItems[slideItems.length - 2].querySelector('.prize').style.transform = 'scale(1) translate(0)';
        //     }   
        // }
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
                    cleanStyle();
                    slideItems[1].querySelector('.glide__bg').style
                    .transform = `perspective(1000px) rotateY(${-40}deg)`;
                    slider.style.cssText = `transform: translateX(${curSlider}px)`;
                    
                } else {
                    const curId = Math.abs(curSlider) / totalWidth;

                    addSmoke(curId + 1);
                    bullet(curId + 1);
                    transformFrame (curId);

                    slider.style.cssText = `transform: translateX(${curSlider}px)`;
                }

                
               
            } else {
                curSlider += marg + widthSlide;
                
                if(curSlider  > totalWidth ) {
                    curSlider = -1 * (slideItems.length - 2) * totalWidth;
                    addSmoke(slideItems.length - 1);
                    bullet(slideItems.length - 1);
                    cleanStyle();
                    slideItems[slideItems.length - 2].querySelector('.glide__bg').style
                    .transform = `perspective(1000px) rotateY(${40}deg)`;
                    slider.style.cssText = `transform: translateX(${curSlider}px)`;
                } else {
                    let curId = Math.abs(curSlider) / totalWidth;
                    transformFrame (curId); 
                    slider.style.cssText = `transform: translateX(${curSlider}px)`;
                    
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
}

export default glideSlide;