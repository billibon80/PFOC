import glideModularEsm from '../../../node_modules/@glidejs/glide/dist/glide.modular.esm';
import Glide, {Autoplay, Controls, Breakpoints, Images} from '../../../node_modules/@glidejs/glide/dist/glide.modular.esm';


function glideSlide() {

    const glide = new Glide('.glide', {
        srartAt: 0,
        autoplay: 4000,
        hoverpause: true,
        animationTimingFunc: 'ease-in',
        animationDuration: 3000,
        type: 'carousel',
        perView: 3,
        focusAt: "center",
        breakpoints: {
            800: {
                perView: 3,
            },
            480: {
                perView: 1,
                animationDuration: 1500,
                autoplay: false
            }
        }
    });


    const buttons = document.querySelectorAll('.glide__arrow');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
               
        });
    });

    const lengthListLi = document.querySelectorAll('.glide__slide');

    glide.on('move', (e) => {
        const listItem = document.querySelectorAll('.glide__slide');

        listItem.forEach((li, i )=> {
              li.classList.add('smoke');    
        });
        
        if(lengthListLi.length == listItem.length){
            listItem[0].classList.remove('smoke');
        }

        let index = Math.round(e.movement / listItem[0].getBoundingClientRect().width);
        listItem[index].classList.remove('smoke');

        if (listItem.length == lengthListLi.length*2) {
            listItem[index+2].classList.remove('smoke');
        } else if (listItem.length == lengthListLi.length*3) {
            listItem[index+lengthListLi.length].classList.remove('smoke');
            listItem[index+lengthListLi.length*2].classList.remove('smoke');
        }
    });

    glide.mount({Autoplay, Controls, Breakpoints, Images});
}

export default glideSlide;