window.addEventListener("DOMContentLoaded", () => {
     function addRule(i) {
        if (document.querySelector('#rules')) {
            fetch(`/rules/${i}`)
            .then(response => response.text())
            .then(tab => {
                document.querySelector('#textRule').innerHTML = tab;
            })
            .then(() => {
                btnClose ();
            })
        }

    }

    function addStyle (item) {
        item.querySelector('.news__tabs_bgc').style.opacity = 0;
        item.classList.add('news__tabs_content_active');
    }

    function delStyle (item) {
        item.forEach(item => {
            item.classList.remove('news__tabs_content_active');
            item.querySelector('.news__tabs_bgc').style.opacity = '';
            })
    }

    let allDiv = document.querySelectorAll('#rules .news__tabs_content')
    allDiv.forEach(div => {
        div.addEventListener('click', () => {
            delStyle (allDiv);
            addRule(div.dataset.index);
            addStyle(div);
        })
    })

    function btnClose () {
            
            let btn_close =  document.querySelector('#rules .news__close-btn');
            
            if (btn_close) {
                btn_close.addEventListener('click', () => {
                    document.querySelector('#rules .news__main').style.display = 'none';
                    delStyle (allDiv);
                })
            }
         
    }
   

    addRule(0);
    addStyle(document.querySelector('#rules .news__tabs_content'));
   

})