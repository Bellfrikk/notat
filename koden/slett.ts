import { tegnSøppelNotat, tegnVanligeNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";

export function slettNotat(denneData:Notat, notatBoks:HTMLElement) {
  notatBoks.remove();
  denneData.sletta = true;
  lagreNotat();
  tegnVanligeNotat();
}
export function uSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  denneData.sletta = false;
  lagreNotat();
  tegnSøppelNotat();
}