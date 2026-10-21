import { tegnSøppelNotat, tegnVanligeNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";

export function slettNotat(denneData:Notat, notatBoks:HTMLElement) {
  notatBoks.remove();
  denneData.sletta = 'søppel';
  lagreNotat();
  tegnVanligeNotat();
}
export function uSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  denneData.sletta = 'ok';
  lagreNotat();
  tegnSøppelNotat();
}

export function evigSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  let bekreft = window.confirm('Sikker du vil sletta den for allltid??');
  if(!bekreft) return;
  denneData.sletta = 'evigSletta';
  lagreNotat();
  tegnSøppelNotat();
}