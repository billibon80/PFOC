import {connectPage} from '../../../static/js/services/connect'

function badges() {
    document.querySelectorAll('.badge').forEach(e => {
        e.addEventListener('click', () => {
            console.log(e);
            connectPage({
                url:`/badges/${e.dataset.indexTournament}`,
                parentSelector: '#tournamentList',
                btnCloseSelector: '.tl__close-btn'
            }); 
        })
    });
}

export default badges;