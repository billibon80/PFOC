
function news() {
    
    const news = document.querySelector('#news'),
        btnClose = news.querySelector('.news__close-btn');

        btnClose.addEventListener('click', () => {
            document.querySelector('html').style.overflow = null;
            news.classList.add('invisible');
            news.innerHTML = ""
        });

}

export default news;