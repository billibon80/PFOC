
function el() {
    const cont = document.querySelector('.cont');
    const elsArr = document.querySelectorAll('.el');
    const closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

    window.addEventListener('scroll', () => {
        const start = Math.round(+document.querySelector('.offer').getBoundingClientRect().y);
        
        let once = true;

        if (start - 150 < 0 && once) {

            once = false;

            setTimeout(function() {
                cont.classList.remove('s--inactive');
            }, 200);
        
            elsArr.forEach(el => {
                el.addEventListener('click', () => {
                     if (!el.classList.contains('s--active')) {
                        cont.classList.add('s--el-active');
                        el.classList.add('s--active');
                     }
                });
            });
        
            closeBtnsArr.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    cont.classList.remove('s--el-active');
                    document.querySelector('.el.s--active').classList.remove('s--active');
                });
            });
        }
    });

}

export default el;