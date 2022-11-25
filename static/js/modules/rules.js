window.addEventListener("DOMContentLoaded", () => {
     function addRule(i) {
        if (document.querySelector('#rules')) {
            fetch(`/rules/${i}`)
            .then(response => response.text())
            .then(tab => {
                document.querySelector('#textRule').innerHTML = tab;
            })
            .then(() => {
//                if(document.querySelector('#storyList .comics__grid').dataset.btfade == "True") {
//                    document.querySelector('#addStories').setAttribute('disabled','disabled')
//                }
//                storyCard();
            })
        }

    }

    let allDiv = document.querySelectorAll('#rules .news__tabs_content')
    allDiv.forEach(div => {
        div.addEventListener('click', () => {
            allDiv.forEach(item => {
                    item.classList.remove('news__tabs_content_active');
                    item.querySelector('.news__tabs_bgc').style.opacity = '';
                    })
            addRule(div.dataset.index);
            div.querySelector('.news__tabs_bgc').style.opacity = 0;
            div.classList.add('news__tabs_content_active')
        })
    })

    addRule(0)

})