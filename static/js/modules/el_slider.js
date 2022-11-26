import news from '../../../templates/homepage/news/news';

function el() {
    
    const cont = document.querySelector('.cont'),
          elsArr = cont.querySelectorAll('.el'),
          closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));


    setTimeout(function() {
        cont.classList.remove('s--inactive');
    }, 200);
    
    elsArr.forEach(el => {
        el.addEventListener('click', () => {
            
            if (!el.classList.contains('s--active')) {
            el.querySelector('.el__bg').style.right = 0;
            cont.classList.add('s--el-active');
            el.classList.add('s--active');

            // create listenter for button 'more;
            const btnMore = el.querySelector('.el__more-btn');
            btnMore.addEventListener('click', () => {
                let indexNews = btnMore.dataset.newsIndex;
                    // get request from news content
                fetch(`/news_content/${indexNews}`)
                    .then(response => response.text())
                    .then(news_text => {

                        document.querySelector('html').style.overflow = 'hidden';
                        document.querySelector('#news').innerHTML = news_text;
                        // add event listener from news by default
                        news(indexNews);
                        document.querySelector('#news').classList.remove('invisible');        
                    })     
                });   
                }
        });
    });

    closeBtnsArr.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            cont.classList.remove('s--el-active');

            if(document.querySelector('.s--active .el__bg')){
                document.querySelector('.s--active .el__bg').style.right = "";
            }
            
            if(document.querySelector('.el.s--active') ) {
                document.querySelector('.el.s--active').classList.remove('s--active');   
            }
        });
    });

    setTimeout(() => {
        document.querySelectorAll('.el').forEach(el => {
            el.style.background = 'none';
        });
    }, 3000);

}

export default el;