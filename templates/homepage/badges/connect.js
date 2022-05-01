import { modalClose } from "../../../static/js/services/btn";
import tournamentList from "./tournamentList";

export function connectPage({url, parentSelector,btnCloseSelector, ...module}) {
    fetch(url)
        .then(response => response.text())
        .then(textHTML => {
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector(parentSelector).innerHTML = textHTML;
            // add event listener for btn-close
            modalClose(parentSelector, btnCloseSelector);
            document.querySelector(parentSelector).classList.remove('invisible');
            tournamentList();
    }); 
}