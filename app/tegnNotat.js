import { lagreNotat, lagreTittel } from "./lagreNotat.js";
import { nyId } from "./hoved.js";
import { endreFarge } from "./farge.js";
import { slettNotat, uSlettNotat, evigSlettNotat } from "./slett.js";
import { lagTomtNotat } from "./lagTomtNotat.js";
export function tegnNotat(overNotat, forelderData, denneData, type) {
    const notatBoks = document.createElement('div');
    notatBoks.className = 'notatBoks';
    notatBoks.style.backgroundColor = denneData.farge;
    //tittelboks
    const tittelBoks = document.createElement('div');
    tittelBoks.className = 'tittelBoks';
    tittelBoks.addEventListener('click', opneNotat);
    notatBoks.appendChild(tittelBoks);
    function opneNotat() {
        tittelBoks.querySelectorAll('.notatLukka').forEach((knapp) => {
            knapp.classList.remove('notatLukka');
            knapp.classList.add('notatOpent');
        });
        notat.classList.remove('notatLukka');
        notat.classList.add('notatOpent');
        tittelBoks.removeEventListener('click', opneNotat);
        tittel.contentEditable = 'true';
        tittel.focus();
    }
    // Tilbakeknapp
    const tilbakeKnapp = document.createElement('button');
    tilbakeKnapp.style.backgroundImage = 'url(./ikon/tilbakepil.png)';
    tilbakeKnapp.className = 'knapp notatLukka';
    tilbakeKnapp.addEventListener('click', (event) => {
        var _a;
        event.stopPropagation();
        tittel.contentEditable = 'false';
        //lagra tittel
        const nyTittel = (_a = tittel.textContent) !== null && _a !== void 0 ? _a : '';
        lagreTittel(forelderData, denneData, nyTittel);
        //skjul notat
        notatBoks.querySelectorAll('.notatOpent').forEach((ting) => {
            ting.classList.remove('notatOpent');
            ting.classList.add('notatLukka');
        });
        tittelBoks.addEventListener('click', opneNotat);
    });
    tittelBoks.appendChild(tilbakeKnapp);
    // tittel
    const tittel = document.createElement('h2');
    tittel.innerText = denneData.tittel;
    tittel.className = 'tittel';
    tittel.addEventListener('input', () => {
        var _a;
        const nyTittel = (_a = tittel.textContent) !== null && _a !== void 0 ? _a : '';
        lagreTittel(forelderData, denneData, nyTittel);
    });
    tittelBoks.appendChild(tittel);
    if (type === 'vanlig') {
        // Slettknapp
        const slettKnapp = document.createElement('button');
        slettKnapp.style.backgroundImage = 'url(./ikon/slett.png)';
        slettKnapp.className = 'knapp notatLukka';
        slettKnapp.addEventListener('click', (event) => {
            event.stopPropagation();
            slettNotat(denneData, notatBoks);
        });
        tittelBoks.appendChild(slettKnapp);
    }
    if (type === 'hovedSøppel') {
        // permanent slett knapp, skal bare vise i søppel
        const evigSlettKnapp = document.createElement('button');
        evigSlettKnapp.style.backgroundImage = 'url(./ikon/evigslett.png)';
        evigSlettKnapp.className = 'knapp notatLukka';
        evigSlettKnapp.addEventListener('click', (event) => {
            event.stopPropagation();
            evigSlettNotat(denneData, notatBoks);
        });
        tittelBoks.appendChild(evigSlettKnapp);
        // U slett knapp, skal bare vise i søppel
        const uSlettKnapp = document.createElement('button');
        uSlettKnapp.style.backgroundImage = 'url(./ikon/uslett.png)';
        uSlettKnapp.className = 'knapp notatLukka';
        uSlettKnapp.addEventListener('click', (event) => {
            event.stopPropagation();
            uSlettNotat(denneData, notatBoks);
        });
        tittelBoks.appendChild(uSlettKnapp);
    }
    if (type === 'vanlig') {
        // Fargeknapp
        const fargeKnapp = document.createElement('button');
        fargeKnapp.style.backgroundImage = 'url(./ikon/farge.png)';
        fargeKnapp.className = 'knapp notatLukka';
        fargeKnapp.addEventListener('click', (event) => { event.stopPropagation(); endreFarge(denneData, notatBoks); });
        tittelBoks.appendChild(fargeKnapp);
        // + knapp
        const nyKnapp = document.createElement('button');
        nyKnapp.style.backgroundImage = 'url(./ikon/nyttnotat.png)';
        nyKnapp.className = 'knapp notatLukka';
        nyKnapp.addEventListener('click', (event) => {
            event.stopPropagation();
            const id = nyId();
            denneData.underNotat[id] = lagTomtNotat(id, denneData.farge);
            lagreNotat();
            tegnNotat(underNotatBoks, denneData, denneData.underNotat[id], 'vanlig');
        });
        tittelBoks.appendChild(nyKnapp);
    }
    //notat underboks
    const notat = document.createElement('div');
    notat.id = denneData.id;
    notat.className = 'notat notatLukka';
    //undernotat
    const underNotatBoks = document.createElement('div');
    notat.appendChild(underNotatBoks);
    let alleUndernotat = Object.keys(denneData.underNotat);
    if (alleUndernotat.length > 0) {
        alleUndernotat.forEach((id) => {
            tegnNotat(underNotatBoks, denneData, denneData.underNotat[id], (type === 'vanlig') ? 'vanlig' : 'underSøppel'); //alle undernotat av søppel skal være undersøppel
        });
    }
    //notat tekst
    const tekst = document.createElement('div');
    tekst.className = 'tekst';
    tekst.textContent = denneData.tekst;
    tekst.contentEditable = 'true';
    tekst.addEventListener('input', () => {
        var _a;
        denneData.tekst = (_a = tekst.textContent) !== null && _a !== void 0 ? _a : '';
        denneData.sistEndra = Date.now();
        lagreNotat();
    });
    notat.appendChild(tekst);
    notatBoks.appendChild(notat);
    overNotat.appendChild(notatBoks);
}
