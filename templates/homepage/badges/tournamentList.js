
function tournamentList() {

    const teams = document.querySelectorAll('div[data-index-team]');
    teams.forEach((team, i) => {
        team.addEventListener('click', () => {
            if(teams[i].getAttribute('data-index-team'))
                fetch(`team_info/${teams[i].getAttribute('data-index-team')}`)
                    .then(response => response.text())
                    .then(textHTML => {
                        document.querySelector('#info_team').innerHTML = textHTML; 
                        
                        document.querySelector('#info_team').querySelectorAll('li[data-key-team]').forEach(li => {
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
                })
        });
    });
}

export default tournamentList;