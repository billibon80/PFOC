function calc() {
    
    const result = document.querySelector('.calculating__result span'),
          classActive = 'calculating__choose-item_active',
          selectorSex = '#gender div',
          selectorPhysActive = '.calculating__choose_big [data-ratio]';


    const calcResult = document.querySelector('.calculating__result');
        window.addEventListener('scroll', () => {
            if(window.innerWidth <= 768) {
                let start = Math.round(+document.querySelector('.calculating').getBoundingClientRect().y + 150),
                    finish = Math.round(+document.querySelector('.calculating__total').getBoundingClientRect().y);

                if(start < 0 && finish > 10){
                    calcResult.style.cssText = 'position: fixed; right: 4px; top: 20px; color:#00000061';
                } else if (finish < 10 || start > 0) {
                    calcResult.style.cssText = '';
                } 
            } else {
                calcResult.style.cssText = '';
            }  
        }); 
    
    
          
          

    let sex = localStorage.getItem('sex')? localStorage.getItem('sex'): localStorage.setItem('sex','male'), 
        height, weight, age, 
        ratio = localStorage.getItem('ratio')? localStorage.getItem('ratio'): localStorage.setItem('ratio',1.375);


    function addActive(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
       
        elements.forEach(elem => {
            
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });
    }

    addActive(selectorSex, classActive);
    addActive(selectorPhysActive, classActive);

    function calcTotal() {

        
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "0";
            return;
        }


        let rData;

        if (sex === 'female') {
            rData = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            rData = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }

        result.textContent = Math.round(rData);
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {

            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }

    getStaticInformation(selectorSex, classActive);
    getStaticInformation(selectorPhysActive, classActive);

    function getDynamicData(selector) {
        const input = document.querySelector(selector);
        
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');

   
}

export default calc;
