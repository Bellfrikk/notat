import { lagreNotat, lagreTittel } from "./lagreNotat.js";
import { nyId } from "./hoved.js";
import { endreFarge } from "./farge.js";
import { slettNotat, uSlettNotat, evigSlettNotat } from "./slett.js";
import { lagTomtNotat } from "./lagTomtNotat.js";
import { opneLukkNotat } from "./opneLukkNotat.js";
import { fokuser } from "./søk.js";
export function tegnNotat(overNotat, forelderData, denneData) {
    if (denneData.sletta === 'evigSletta')
        return; //ikkje tegn notat som er evig sletta
    const notatBoks = document.createElement('div');
    notatBoks.id = denneData.id;
    notatBoks.className = (denneData.sletta === 'søppel') ? 'slettaNotat' : 'vanligNotat';
    notatBoks.style.backgroundColor = denneData.farge;
    //tittelboks
    const tittelBoks = document.createElement('div');
    tittelBoks.className = 'tittelBoks';
    tittelBoks.addEventListener('click', () => {
        if (tittel.contentEditable === 'true')
            return;
        opneLukkNotat(denneData.id);
    });
    notatBoks.appendChild(tittelBoks);
    // Tilbakeknapp
    const tilbakeKnapp = document.createElement('button');
    tilbakeKnapp.style.backgroundImage = 'url(./ikon/tilbakepil.png)';
    tilbakeKnapp.className = 'knapp vanligKnapp søppelKnapp';
    tilbakeKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        opneLukkNotat(denneData.id);
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
    // Slettknapp
    const slettKnapp = document.createElement('button');
    slettKnapp.style.backgroundImage = 'url(./ikon/slett.png)';
    slettKnapp.className = 'knapp vanligKnapp';
    slettKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        slettNotat(denneData, notatBoks);
    });
    tittelBoks.appendChild(slettKnapp);
    // permanent slett knapp, skal bare vise i søppel
    const evigSlettKnapp = document.createElement('button');
    evigSlettKnapp.style.backgroundImage = 'url(./ikon/evigslett.png)';
    evigSlettKnapp.className = 'knapp søppelKnapp';
    evigSlettKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        evigSlettNotat(denneData, notatBoks);
    });
    tittelBoks.appendChild(evigSlettKnapp);
    // U slett knapp, skal bare vise i søppel
    const uSlettKnapp = document.createElement('button');
    uSlettKnapp.style.backgroundImage = 'url(./ikon/uslett.png)';
    uSlettKnapp.className = 'knapp søppelKnapp';
    uSlettKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        uSlettNotat(denneData, notatBoks);
    });
    tittelBoks.appendChild(uSlettKnapp);
    // Fargeknapp
    const fargeKnapp = document.createElement('button');
    fargeKnapp.style.backgroundImage = 'url(./ikon/farge.png)';
    fargeKnapp.className = 'knapp vanligKnapp';
    fargeKnapp.addEventListener('click', (event) => { event.stopPropagation(); endreFarge(denneData, notatBoks); });
    tittelBoks.appendChild(fargeKnapp);
    // + knapp
    const nyKnapp = document.createElement('button');
    nyKnapp.style.backgroundImage = 'url(./ikon/nyttnotat.png)';
    nyKnapp.className = 'knapp vanligKnapp';
    nyKnapp.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = nyId();
        denneData.underNotat[id] = lagTomtNotat(id, denneData.farge);
        lagreNotat();
        tegnNotat(underNotatBoks, denneData, denneData.underNotat[id]);
        const denneNotatBoks = document.getElementById(id);
        if (!denneNotatBoks)
            return;
        opneLukkNotat(id);
        fokuser(denneNotatBoks);
    });
    tittelBoks.appendChild(nyKnapp);
    //notat underboks
    const notat = document.createElement('div');
    notat.className = 'notat';
    //undernotat
    const underNotatBoks = document.createElement('div');
    notat.appendChild(underNotatBoks);
    let alleUndernotat = Object.keys(denneData.underNotat);
    if (alleUndernotat.length > 0) {
        alleUndernotat.forEach((id) => {
            tegnNotat(underNotatBoks, denneData, denneData.underNotat[id]);
        });
    }
    // notat tekst
    const tekst = document.createElement('div');
    tekst.className = 'tekst';
    tekst.contentEditable = 'true';
    tekst.innerText = denneData.tekst || '';
    tekst.addEventListener('input', () => {
        denneData.tekst = tekst.innerText;
        denneData.sistEndra = Date.now();
        lagreNotat();
    });
    notat.appendChild(tekst);
    notatBoks.appendChild(notat);
    overNotat.appendChild(notatBoks);
}
