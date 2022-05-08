

function glideSlide() {

    const  text_block = document.querySelector('.glide .text_block'),
          rgh_arrow = document.querySelector('.glide .glide__arrow--right'),
          lft_arrow = document.querySelector('.glide .glide__arrow--left'),
          slider = document.querySelector('.glide__slides'),
          slideItems = slider.querySelectorAll('.glide__slide'),
          bullets = document.querySelectorAll('.glide .glide__bullet'),
          bgc = slider.querySelectorAll('.glide__bg'),
          prize = slider.querySelectorAll('.prize');
    
    let text_h3 = text_block.querySelector('h3'),
        text_p = text_block.querySelector('p');
    
   
    /// функция слайдера bullet 
    const glideStart = (i) => {
        const text_span = slideItems[i].querySelectorAll('span');

            text_h3.classList.remove('opacity-1');
            text_p.classList.remove('opacity-1');
            
            bullets.forEach(li => {
                li.style.opacity = 0.5;
            })

            slideItems.forEach((li, row) => {
                li.classList.remove('active');
                prize[row].classList.remove('active_scale');
                
                if (row != i-1 && row != i+1)
                    bgc[row].classList.remove('l_rotate', 'r_rotate')
            });

            bullets[i].style.opacity = 1;
            
            let widthLi = 392;
            if (window.innerWidth <= 768) {
                widthLi = window.innerWidth;
                slider.style.transform = `translateX(${(-i*widthLi)}px)`
            } else {
                slider.style.transform = `translateX(${(-i*widthLi)+widthLi}px)`
            }
                
            document.querySelector('.glide .counter').innerText = `${i+1}/${slideItems.length}`
            
            text_h3.innerText = text_span[0].outerText;
            text_p.innerHTML = text_span[1].outerText;

            slideItems[i].classList.add('active');
            prize[i].classList.add('active_scale');
            text_h3.classList.add('opacity-1');
            text_p.classList.add('opacity-1');

            if(bgc[i-1])
                bgc[i-1].classList.add('l_rotate');
            
            if(slideItems[i+1])
                bgc[i+1].classList.add('r_rotate');
    }

    glideStart(0);

    bullets.forEach((bullet, i) => {
        bullet.addEventListener('click', () => {
            glideStart(i);
        })
    });

    const indexRow = () => {
        let ik = null;
        slideItems.forEach((li, i) => {
            if (li.classList.contains('active')) ik = i;
        }) 
        return ik;
    }

    rgh_arrow.addEventListener('click', () => {
        if (indexRow() != null) {
            let i = indexRow();
            glideStart(i + 1 < slideItems.length ?  i + 1 : 0) }
        
    })

    lft_arrow.addEventListener('click', () => {
        if (indexRow() != null) {
            let i = indexRow();
            glideStart(i - 1 >= 0 ?  i - 1 : slideItems.length - 1) }
        
    })
}

export default glideSlide;