export function opneLukkNotat(id) {
    const denneNotatBoks = document.getElementById(id);
    if (!denneNotatBoks)
        return;
    denneNotatBoks.classList.toggle('visNotat');
    const tittel = denneNotatBoks.querySelector('.tittel');
    if (tittel.contentEditable === 'true') {
        tittel.contentEditable = 'false';
    }
    else {
        tittel.contentEditable = 'true';
        tittel.focus();
    }
}
