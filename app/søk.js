import { tegnVanligeNotat } from "./hoved.js";
let søketreff = [];
let søkeindeks = -1;
export function søkNotat(hovedNotat, søkjeord) {
    console.log('søk2');
    søketreff = [];
    søkeindeks = -1;
    const søk = søkjeord.trim();
    if (!søk) {
        tegnVanligeNotat();
        return;
    }
    function gåGjennom(notatliste) {
        for (const data of Object.values(notatliste)) {
            if (data.sletta !== 'ok')
                continue;
            const notatElement = document.getElementById(data.id);
            if (notatElement) {
                notatElement.classList.remove('notatOpent');
                notatElement.classList.add('notatLukka');
                const boks = notatElement.closest('.notatBoks');
                const tittel = boks === null || boks === void 0 ? void 0 : boks.querySelector('.tittel');
                const tekst = boks === null || boks === void 0 ? void 0 : boks.querySelector('.tekst');
                const treffITittel = data.tittel.toLowerCase().includes(søk.toLowerCase());
                const treffITekst = data.tekst.toLowerCase().includes(søk.toLowerCase());
                if (treffITittel || treffITekst) {
                    const treff = treffITittel ? tittel : tekst;
                    if (treff)
                        søketreff.push(treff);
                }
                if (treffITittel || treffITekst) {
                    console.log('TREFF:', data.tittel);
                }
                if (treffITittel || treffITekst || harTreffUnder(data, søk)) {
                    opneForeldre(notatElement);
                }
            }
            // Søk alltid vidare i undernotata
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
        if (barn.sletta !== 'ok')
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
    if (!notatBoks)
        return;
    fokuser(notatBoks);
}
export function fokuser(notatBoks) {
    const hovedBoks = document.getElementById('hovedNotatBoks');
    if (!hovedBoks)
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
