/// функция предпросмотра загружаемой картинки
function preloadImg (selectorInput, selectorImg, ...args) {
    
    const input = document.querySelector(selectorInput);
    input.addEventListener('input', () => {
        if(input.files && input.files[0]) {
            
            let reader = new FileReader();
            reader.onload = function(e) {
                let img = document.querySelector(selectorImg); 
                if(args[0].src){
                    img.src = e.target.result;
                } else if (args[0].bcg) {
                    img.style.backgroundImage = `url(${e.target.result})`;
                }
            }  
            reader.readAsDataURL(input.files[0]);
        }       
    }); 
}

window.addEventListener("DOMContentLoaded", () => {
    function inputTXT (inputSelector, insertSelector) {
            document.querySelector(inputSelector).addEventListener("input", (e) => {
            if(e.target.value.length <= e.target.attributes[4].value)
                document.querySelector(insertSelector).innerHTML = e.target.value;
        })
    }

    /// заголовок шапки турнирных таблиц
    try {
            //hide label
        document.querySelector('.fieldBox.field-get_header_tab label').style.display = 'none';

        // number_column
        inputTXT('#id_header_number_column', '.tl__main_block-position');
        // logo_column
        inputTXT('#id_header_logo_column', '.tl__main_block-img');
        // name_column
        inputTXT('#id_header_name_column', '.tl__main_block-text');
        // points_column
        inputTXT('#id_header_points_column', '.tl__main_block-points');
       
        // border color for main_block
        document.querySelector('#id_header_color').addEventListener('input', (e) => {
            document.querySelector('.tl__main_block-header').style.borderColor = e.target.value;
            document.querySelector('.tl__main_block-header').style.boxShadow = `0 0.5rem 0.5rem ${e.target.value}`;
        })

    }
    catch (e) {
        console.log('Заголовок шапки турнирные таблицы', e)
    }
    
    /// турнир создание
    try {

        //// hide lagel
        document.querySelector('.field-get_run_string label').style.display = 'none';
        /// run_string
        document.querySelector('#id_run_string').addEventListener("input", (e) => {
            document.querySelector('.marquee span').innerHTML = e.target.value;
        })
        /// time_run
        document.querySelector('#id_run_time').addEventListener("input", (e) => {
            document.querySelector('.marquee span').style.animation = `marquee ${e.target.value}s infinite linear`;
        })
        /// change_icon
        document.querySelector('#id_fa_icon').addEventListener("input", (e) => {
            document.querySelector('.field-get_icon .readonly').innerHTML = e.target.value;
        })
        /// change_color
        document.querySelector('#id_color').addEventListener("input", (e) => {
            const parentBlock = document.querySelector('#change_color_class');
            parentBlock.classList.remove(parentBlock.classList.value)
            parentBlock.classList.add(e.target.value);
        })

    }
    catch (e) {
        console.log("Турнир создание", e);
    }

    /// турнир список
    try {
        document.querySelectorAll('#result_list .field-color select').forEach((select, i) => {
            select.addEventListener('input', (e) => {
                const color = document.querySelectorAll('#result_list .field-get_icon #change_color_class')[i];
                color.classList.remove(color.classList.value);
                color.classList.add(e.target.value);
            })
        })
        

    }
    catch (e) {
        console.log("Турниры список", e);
    }


    /// команды (игроки)
    try {
        //hide label
    document.querySelector('.field-get_team_position label').style.display = 'none';

    // number_team
    document.querySelector('#id_position').addEventListener('input', (e) => {
        if(e.target.value < 100)
            document.querySelector('.tl__main_block-position').innerText = e.target.value;
    });
    // name_team
    inputTXT('#id_name', '.tl__main_block-text');
    // place_team
    document.querySelector('#id_place').addEventListener('input', (e) => {
        if(e.target.value < 100)
            document.querySelector('.tl__main_block-icon').innerText = e.target.value;
    });

    // place_team
    document.querySelector('#id_points').addEventListener('input', (e) => {
        document.querySelector('.tl__main_block-points').innerText = e.target.value;
    });

    // border color for main_block
    document.querySelector('#id_color').addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelector('.tl__main_block').style.borderColor = color;
        document.querySelector('.tl__main_block-img').style.backgroundColor = color;
        document.querySelector('.tl__main_block-icon').style.color = color;
    });

    // log предпросмотр (объект)
    
    preloadImg ('#id_logo', '.tl__main_block-img', {src: false, bcg: true})

    }
    catch (e) {
        console.log("Команды (игроки)", e)
    }

    /// турниры список команд
    try {

        function badgesTeamBlob(i) {

            const parentSelector = `#id_badgesteamlist_set-${i}-`,
                  imgSelector = `#${document.querySelectorAll('.img-logo')[i].id}`;
             /// цвет logo
            document.querySelector(parentSelector+"color").addEventListener('input', (e) => {
                document.querySelectorAll('.in-line')[i].style.background = e.target.value;
            });
            console.log(imgSelector);
            /// предпросмотр 
            preloadImg (parentSelector+"logo", imgSelector, {src: true, bcg: false})
            
        }

        function loopListSet () {   
            document.querySelectorAll('.dynamic-badgesteamlist_set').forEach((el, i) => {
                console.log(i);
                badgesTeamBlob(i);
            });
        }

        setTimeout(() => {
            loopListSet();
        }, 2000)
        
        
        setTimeout(() => {
            try {
                document.querySelector('.add-row').addEventListener('click', () => {
                    loopListSet();    
                });
            }
            catch (e) {
                console.log("Турнир спсок", e)
            }
            
        }, 2000)
        
    }
    catch (e) {
        console.log("Турнир список команд", e)
    }

    // Таблицы Игр команд
    function getSelected(url, ...rest) {
        fetch(url)
            .then(response => response.text())
            .then(textHTML => {
            rest.forEach(el => {
                document.querySelector(el.selector).innerHTML = textHTML;      
            })
        });
    }

    try {
       
        document.querySelectorAll('#content-main label').forEach(label => {
            if(label.textContent == ':')
                label.style.display = 'none';
        });

        document.querySelectorAll('#content-main .readonly').forEach(div => {
            div.style.margin = '0 auto';
        });

        const textBadge = (textSelectBadge, textSelectEnemy) =>  (`
            <div class="ti__player-item--play">${textSelectBadge}</div>
            <div style="background: center / contain no-repeat url(/media/vs.png); max-width:10%;" class="ti__player-item--icon"></div>
            <div class="ti__player-item--play">${textSelectEnemy}</div>
            <div id="img-icon" style="background: center / contain no-repeat url();
            position: absolute; bottom: 0; height: 65%;" 
            class="ti__player-item--icon"></div>
        `)

        const addOptionTurnamentSave = (selectorSelect, id, value) => {
            document.querySelector(selectorSelect).innerHTML += 
            `<option value="${id}">
                ${value}
                </option>`
            document.querySelector(selectorSelect).value = id;
        };
       
       
        
        const bt_id = document.querySelector('#id_badgesTeam'),
              et_id = document.querySelector('#id_enemyTeam');

        sessionStorage.setItem('turner', JSON.stringify(
            
            {'turner': document.querySelector('#id_turner').value,
            'badgesTeam_id': bt_id.value, 
            'badgesTeam_value': bt_id.querySelector(`option[value="${bt_id.value}"]`).textContent,
            'enemyTeam_id': et_id.value,
            'enemyTeam_value': et_id.querySelector(`option[value="${et_id.value}"]`).textContent,

            }
        ));
       

        const change_select = (cur_select, change_select) => {
            if(document.querySelector('#id_turner').value != "")
               getSelected(`/team_enemy/${ document.querySelector('#id_turner')
                    .value}?first_id_select=${document.querySelector(cur_select
                        ).value}&second_id_select=${document.querySelector(change_select
                            ).value}&stage=${document.querySelector('#id_stage').value}`, 
                    {'selector': change_select});
        }

        const blank_field = () => {
            html_blank = '<option value="" selected>-----------</option>'
            document.querySelector('#id_badgesTeam').innerHTML = html_blank;
            document.querySelector('#id_enemyTeam').innerHTML = html_blank;
        }

        if(document.querySelector('#id_turner').value != ''){
            document.querySelector('#id_turner').style.pointerEvents = 'none';  
            if (document.querySelector('#id_stage').value != "") {
                change_select('#id_badgesTeam', '#id_badgesTeam');
            } else 
            {
                change_select('#id_badgesTeam', '#id_enemyTeam');
                change_select('#id_enemyTeam', '#id_badgesTeam' ); 
            }
        } else {
            blank_field();
        }

        /// данные турнир 
        document.querySelector('#id_turner').addEventListener('input', (e) => {
            if (e.target.value != ""){
                change_select('#id_badgesTeam', '#id_enemyTeam' );
                change_select('#id_enemyTeam', '#id_badgesTeam' );
            
                if (document.querySelector('#id_stage').value == "")
                    innerText(document.querySelector('#id_badgesTeam').value, 
                            document.querySelector('#id_enemyTeam').value);
            } else {
                blank_field();
            }
        })


        // функция изменения блока contentEnemy
        const innerText = (selectBT="", selectET="") => { 
            const bt = document.querySelector(`#id_badgesTeam option[value="${selectBT}"]`).textContent;
            const et = document.querySelector(`#id_enemyTeam option[value="${selectET}"]`).textContent;
            document.querySelector('#contentEnemy').innerHTML = textBadge(bt, et); 
            run_cheked_icon()
        }

        /// изменение команда
        document.querySelector('#id_badgesTeam').addEventListener('input', (e) => {
            if (document.querySelector('#id_stage').value != "") {
                change_select( '#id_badgesTeam', '#id_badgesTeam');
                document.querySelector('#contentEnemy').innerHTML = 
                `<div class="ti__player-item--play"> ${document.querySelector(`#id_stage option[value="
                ${document.querySelector('#id_stage').value}"]`).textContent}</div>`
            } else {
                const et = document.querySelector('#id_enemyTeam').value;
                change_select('#id_badgesTeam', '#id_enemyTeam');  
                innerText(e.target.value, et);
            }
        });

        /// изменение команда (противник)
        document.querySelector('#id_enemyTeam').addEventListener('input', (e) => {
            
            const bt = document.querySelector('#id_badgesTeam').value 
            change_select( '#id_enemyTeam', '#id_badgesTeam'); 
            innerText(bt, e.target.value);
 
        });

        // /// выбор этапа 
        if(document.querySelector('#id_stage').value != '')
            document.querySelector('#id_enemyTeam').style.pointerEvents = 'none';

        document.querySelector('#id_stage').addEventListener('input', (e) => {
            const valueEt = document.querySelector('#id_enemyTeam');
            if(e.target.value != '') {
                if(valueEt != '')
                    localStorage.setItem('enemyTeam', valueEt.value);
                localStorage.setItem('enemyTeam', valueEt.value);
                valueEt.value = '';
                valueEt.style.pointerEvents = 'none';
                document.querySelector('#contentEnemy').innerHTML = 
                `<div class="ti__player-item--play">
                ${document.querySelector(`#id_stage option[value="${e.target.value}"]`).textContent}</div>`
                change_select( '#id_badgesTeam', '#id_badgesTeam');
            } else {
                valueEt.value = localStorage.getItem('enemyTeam');
                localStorage.removeItem('enemyTeam');
                valueEt.style.pointerEvents = null;
                innerText(document.querySelector('#id_badgesTeam').value, valueEt.value);
             }
        });

        /// отображение примечаний
        document.querySelector('#id_description').addEventListener('input', (e) => {
                
                document.querySelectorAll('.info').forEach(descr => {
                    descr.innerHTML = e.target.value;
                })
        });

        const imgIcon = (imgUrl, left) => {
            document.querySelector('#img-icon').style.backgroundImage = `url(${imgUrl})`;
            document.querySelector('#img-icon').style.left = left;
        }
        /// отображение значка победителя
        const winChecked = (selectorChek, selectorChek2, left) => {document.querySelector(selectorChek).addEventListener('input', (e) => {
                const winChek2 = document.querySelector(selectorChek2).checked;
                if (e.target.checked) {
                    if (winChek2){
                        imgIcon('/media/handshake.png', '0');
                    } else {
                        imgIcon('/media/win.png', `${left}%`);
                    }
                } else {
                    if (winChek2) {
                        imgIcon('/media/win.png', `${-1 * left}%`);
                    } else {
                      imgIcon('', '0');  
                    }
                    
                }
            })
        }

        const run_cheked_icon = () => {
            if (document.querySelector('#img-icon')) {
                winChecked('#id_first_team_win', '#id_second_team_win', -45);
                winChecked('#id_second_team_win', '#id_first_team_win', 45);
            } 
        }

        


    }
    catch (e) {
        console.log("Таблицы игр команд", e)
    }

/// prices block
try {

    // предпросмотре картинки

    preloadImg ('#id_imgAdd', '#img_price', {src: false, bcg: true});

    const outTxt = (selectorOut, selectorIn) => {
        if(document.querySelector(selectorOut))
            document.querySelector(selectorOut).addEventListener('input', (e) => {
                const innerBlock = document.querySelector(`.style_prevu_kit ${selectorIn.replace('_label', '')}`) 
                if(innerBlock)
                innerBlock.innerHTML = e.target.value
            }) 
    }

    outTxt('#id_title_ru', '.style_prevu_kit__title');
    outTxt('#id_description_ru', '.description');
    ['id_price_f', 'id_price_f_label', 'id_price_f_color_ru', 'id_price_f_label_2', 'id_price_f_label_3', 'id_price_f_label_4', 
     'id_price_l_color_ru', 'id_price_l', 'id_price_l_label', 'id_price_l_label_2', 'id_price_l_label_3', 'id_price_l_label_4',
     ].forEach(selector => {
        outTxt(`#${selector}`, `[data-for-id="${selector}"]`)
    });


    const focusLabel = (selectorInput ) => {
        const parentInput = document.querySelector(selectorInput);
        const focuListener = (event, display, input=false ) => {
            parentInput.addEventListener(event, (e) => {
                const selector = e.target.id;
                const price_label = document.querySelector(`[data-for-id="${selector}"]`);
                price_label.style.setProperty('--display', display); 

                if(input)
                    parentInput.addEventListener('input', (e) => {
                        price_label.dataset.price = e.target.value;
                    })
            })
        }
        focuListener('focus', 'block', true );
        focuListener('focusout', 'none', true );
    }

    for (step = 2; step < 5; step++) {
        focusLabel(`#id_price_f_${step}`);  
      }

    for (step = 2; step < 5; step++) {
      focusLabel(`#id_price_l_${step}`);  
    }
    

} catch (e) {
    console.log(`Prices block ${e}`)
}

 /// функция ввода текста и изменения данных блока верстки
 const outTxt = (selectorOut, selectorIn) => {
    if(document.querySelector(selectorOut))
        document.querySelector(selectorOut).addEventListener('input', (e) => {
            const innerBlock = document.querySelector(`${selectorIn}`) 
            if(innerBlock)
            innerBlock.innerHTML = e.target.value
        }) 
}

try {

     // предпросмотре картинки
     preloadImg ('#id_logo', '.ti__player-item--iconplayer', {src: false, bcg: true});

   
    
    [
        ['#id_position', '.ti__player-item--play'], 
        ['#id_description', '.ti__player-item--play-text'],
        ['#id_name', '.ti__player-item--play-teamplayer'],
    ].forEach(selector => {
        outTxt(selector[0], selector[1]);
    });

    /// функция для отбора команд по турнирам
    const parentSelect = document.querySelector('#id_team')
    getSelected(`/turner_group/${ parentSelect.value !="" ? parentSelect.value : 0 }`, {'selector': '#id_team'});

    parentSelect.addEventListener('input', (e) => {
            teamId = e.target.value;
            if (teamId != ''){
                const data_value =  parentSelect.querySelector(`option[value="${teamId}"]`).dataset;
                document.querySelector('#label_turner').innerText =data_value.turner;
                document.querySelector('.ti__player-item--play.number').style.background = data_value.color;
                console.log(data_value.position);
            }
            
        })

} catch (e) {
    console.log('Card of team member', e);
}


/// add player in the comand panel
try {

    let iBlock = 0;
    const addEventInput = (i) => {
        // предпросмотре картинки
      preloadImg (`#id_teaminfoplayers_set-${i}-logo`, `#teaminfoplayers_set-${i} .ti__player-item--iconplayer`, {src: false, bcg: true});

        // список селекторов input
      [
        [`#id_teaminfoplayers_set-${i}-position`, `#teaminfoplayers_set-${i} .ti__player-item--play`], 
        [`#id_teaminfoplayers_set-${i}-description`, `#teaminfoplayers_set-${i} .ti__player-item--play-text`],
        [`#id_teaminfoplayers_set-${i}-name`, `#teaminfoplayers_set-${i} .ti__player-item--play-teamplayer`],
      ].forEach(selector => {
            outTxt(selector[0], selector[1]);
        });       
    }

    const teamEvent = () => {
        document.querySelectorAll('.inline-related.has_original.dynamic-teaminfoplayers_set').forEach((div, i) => {
            addEventInput(i);
            iBlock = i;
        })

        document.querySelector('.add-row').addEventListener('click', () => {
            iBlock++;
            addEventInput(iBlock);
            
        })
    }

     setTimeout(teamEvent, 500)

    
      

} catch (e) {
    console.log("Add player in the comand panel", e);
}
/// endDOMcontentLoaded
})
