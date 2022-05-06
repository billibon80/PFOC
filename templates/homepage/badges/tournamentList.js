
function tournamentList() {

    const teams = document.querySelectorAll('div[data-index-team]');
    teams.forEach((team, i) => {
        team.addEventListener('click', (e) => {
            
            if(teams[i].getAttribute('data-index-team'))
                
                /// add show data for info tabs
                if(window.innerWidth <= 1200) {
                    document.querySelector('#info_team').style.display = 'block';
                    document.querySelector('#info_team').style.animation = 'openBlock 2s linear';
                }else 
                {
                    document.querySelector('#info_team').style.display = null;
                    document.querySelector('#info_team').style.animation = null;
                }
                fetch(`team_info/${teams[i].getAttribute('data-index-team')}`)
                    .then(response => response.text())
                    .then(textHTML => {
                        document.querySelector('#info_team').innerHTML = textHTML; 


                        const parentBlock =  document.querySelector('#info_team');
                        /// add close__info-btn event
                        parentBlock.querySelector('.ti__info-close').addEventListener('click', () => {
                            parentBlock.style.animation = "1.5s linear 0s 1 normal forwards running closeBlock";
                            
                        })
                        
                        parentBlock.querySelectorAll('li[data-key-team]').forEach(li => {
                           
                            const imgIcon = (imgUrl) => {
                                li.querySelector('#img-icon').style.backgroundImage = `url(${imgUrl})`;
                            }
                            const teamFirst = li.querySelector('[data-win-badges]').dataset.winBadges,
                                  teamSecond = li.querySelector('[data-win-enemy]').dataset.winEnemy,
                                  position = li.querySelector('#img-icon').style,
                                  percent = 85;

                            if (document.querySelector('li #img-icon'))
                                if (teamFirst == 'True') {
                                    if (teamSecond == 'True'){
                                        imgIcon('/media/handshake.png');
                                    } else {
                                        imgIcon('/media/win.png');
                                        position.right = `${percent}%`;
                                    }
                                } else {
                                    if (teamSecond == 'True') {
                                        imgIcon('/media/win.png');
                                        position.left = `${percent}%`;
                                    } else {
                                    imgIcon(''); 
                                    }                                
                                }

                        });

                       const removeClass = (selector, class_remove) => {
                        parentBlock.querySelectorAll(selector).forEach(tag => {
                            tag.classList.remove(class_remove);
                        })
                       }    
                        parentBlock.querySelectorAll('li[data-key-player]').forEach(li => {
                            removeClass('li[data-key-player]', 'activate');
                            // add event for player
                             
                             li.addEventListener('click', () => {
                                removeClass('li[data-key-player]', 'activate');
                                fetch(`player_info/${li.dataset.keyPlayer}`)
                                .then(response => response.text())
                                .then(textHTML => {
                                    document.querySelector('#team_description .ti__info-sticky').innerHTML = textHTML;
                                    li.classList.add('activate');
                                });
                             })
                        })
                })
        });
    });
}

export default tournamentList;