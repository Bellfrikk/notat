import { tegnAlleNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";

export function slettNotat(denneData:Notat, notatBoks:HTMLElement) {
  notatBoks.remove();
  denneData.sletta = 'søppel';
  lagreNotat();
  tegnAlleNotat();
}
export function uSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  denneData.sletta = 'ok';
  lagreNotat();
  tegnAlleNotat();
}

export function evigSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  let bekreft = window.confirm('Sikker du vil sletta den for allltid??');
  if(!bekreft) return;
  denneData.sletta = 'evigSletta';
  lagreNotat();
  tegnAlleNotat();
}