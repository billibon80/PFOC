import {connectPage} from './connect';

function badges() {
    document.querySelectorAll('.badge').forEach(e => {
        e.addEventListener('click', () => {
            connectPage({
                url:`/badges/${e.dataset.indexTournament}`,
                parentSelector: '#tournamentList',
                btnCloseSelector: '.tl__close-btn',
            }); 
        })
    });
}

export default badges;