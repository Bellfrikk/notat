import { hentNotat, hovedNotat } from "./henteNotat.js";
import { lagTopplinje } from "./topplinje.js";
import { tegnNotat } from "./tegnNotat.js";
export function nyId() {
    return crypto.randomUUID();
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .catch(feil => {
            console.error('Service worker-feil:', feil);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    start();
});
export const hovedNotatBoks = document.createElement('div');
hovedNotatBoks.id = 'hovedNotat';
hovedNotatBoks.className = 'hovedNotatBoks';
export async function start() {
    lagTopplinje();
    hentNotat();
}
export function tegnVanligeNotat() {
    hovedNotatBoks.innerHTML = '';
    hovedNotatBoks.id = 'hovedNotatBoks';
    document.body.appendChild(hovedNotatBoks);
    let undernotatListe = Object.keys(hovedNotat.underNotat);
    if (undernotatListe.length > 0) {
        undernotatListe.forEach((id) => {
            //lag alle notat som ikkje er merka som sletta
            if (!hovedNotat.underNotat[id].sletta) {
                tegnNotat(hovedNotatBoks, hovedNotat, hovedNotat.underNotat[id], 'vanlig');
            }
        });
    }
}
export function tegnSøppelNotat() {
    hovedNotatBoks.innerHTML = '';
    hovedNotatBoks.id = 'hovedNotatBoks';
    document.body.appendChild(hovedNotatBoks);
    let undernotatListe = Object.keys(hovedNotat.underNotat);
    if (undernotatListe.length > 0) {
        undernotatListe.forEach((id) => {
            //lag alle notat som er merka som sletta
            if (hovedNotat.underNotat[id].sletta) {
                tegnNotat(hovedNotatBoks, hovedNotat, hovedNotat.underNotat[id], 'hovedSøppel');
            }
        });
    }
}
