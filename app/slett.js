import { tegnAlleNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";
export function slettNotat(denneData, notatBoks) {
    notatBoks.remove();
    denneData.sletta = 'søppel';
    notatBoks.classList.add('erSletta');
    lagreNotat();
}
export function uSlettNotat(denneData, notatBoks) {
    denneData.sletta = 'ok';
    lagreNotat();
    notatBoks.classList.remove('erSletta');
}
export function evigSlettNotat(denneData, notatBoks) {
    let bekreft = window.confirm('Sikker du vil sletta den for allltid??');
    if (!bekreft)
        return;
    denneData.sletta = 'evigSletta';
    lagreNotat();
    tegnAlleNotat();
}
