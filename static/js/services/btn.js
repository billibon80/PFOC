
export function modalClose(parentSelector, btnSelector) {
   
    const parentBlock = document.querySelector(parentSelector), // parentSelector (id, class ...) where is nested btnClose
    
    btnClose = parentBlock.querySelector(btnSelector);// btnSelector (id, class ..) of btnClose

    btnClose.addEventListener('click', () => {
        document.querySelector('html').style.overflow = null;
        parentBlock.classList.add('invisible');
        parentBlock.innerHTML = ""
    });
}
