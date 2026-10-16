import { tegnSøppelNotat, tegnVanligeNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";
export function slettNotat(denneData, notatBoks) {
    notatBoks.remove();
    denneData.sletta = true;
    lagreNotat();
    tegnVanligeNotat();
}
export function uSlettNotat(denneData, notatBoks) {
    denneData.sletta = false;
    lagreNotat();
    tegnSøppelNotat();
}
