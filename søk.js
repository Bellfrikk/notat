import { tegnVanligeNotat } from "./hoved.js";
let søketreff = [];
let søkeindeks = -1;
export function søkNotat(hovedNotat, søkjeord) {
    søketreff = [];
    søkeindeks = -1;
    const søk = søkjeord.trim();
    if (!søk) {
        tegnVanligeNotat();
        return;
    }
    function gåGjennom(notatliste) {
        for (const data of Object.values(notatliste)) {
            if (data.sletta)
                continue;
            const notatElement = document.getElementById(data.id);
            if (!notatElement)
                continue;
            notatElement.classList.remove('notatOpent');
            notatElement.classList.add('notatLukka');
            const boks = notatElement.closest('.notatBoks');
            const tittel = boks.querySelector('.tittel');
            const tekst = boks.querySelector('.tekst');
            const treffITittel = data.tittel.toLowerCase().includes(søk.toLowerCase());
            const treffITekst = data.tekst.toLowerCase().includes(søk.toLowerCase());
            if (treffITittel || treffITekst) {
                søketreff.push(treffITittel ? tittel : tekst);
            }
            // Opne notatet dersom det har treff eller treff under seg
            if (treffITittel || treffITekst || harTreffUnder(data, søk)) {
                opneForeldre(notatElement);
            }
            gåGjennom(data.underNotat);
        }
    }
    gåGjennom(hovedNotat.underNotat);
    if (søketreff.length > 0) {
        søkeindeks = 0;
        fokuserSøketreff();
    }
}
function opneForeldre(element) {
    let forelder = element.parentElement;
    while (forelder) {
        if (forelder.classList.contains('notat')) {
            forelder.classList.remove('notatLukka');
            forelder.classList.add('notatOpent');
        }
        forelder = forelder.parentElement;
    }
    // Opne sjølve notatet
    element.classList.remove('notatLukka');
    element.classList.add('notatOpent');
}
function harTreffUnder(data, søk) {
    for (const barn of Object.values(data.underNotat)) {
        if (barn.sletta)
            continue;
        if (barn.tittel.toLowerCase().includes(søk.toLowerCase()) ||
            barn.tekst.toLowerCase().includes(søk.toLowerCase()) ||
            harTreffUnder(barn, søk)) {
            return true;
        }
    }
    return false;
}
function fokuserSøketreff() {
    if (søkeindeks < 0 || søkeindeks >= søketreff.length)
        return;
    const treff = søketreff[søkeindeks];
    const notatBoks = treff.closest('.notatBoks');
    const hovedBoks = document.getElementById('hovedNotatBoks');
    if (!notatBoks || !hovedBoks)
        return;
    const topp = hovedBoks.scrollTop +
        notatBoks.getBoundingClientRect().top -
        hovedBoks.getBoundingClientRect().top;
    hovedBoks.scrollTo({
        top: topp,
        behavior: 'smooth'
    });
}
export function nesteTreff() {
    if (søketreff.length === 0)
        return;
    søkeindeks = (søkeindeks + 1) % søketreff.length;
    fokuserSøketreff();
}
