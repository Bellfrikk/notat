import { tegnAlleNotat } from "./hoved.js";
import { lagreNotat } from "./lagreNotat.js";

export function slettNotat(denneData:Notat, notatBoks:HTMLElement) {
  denneData.sletta = 'søppel';
  denneData.sistEndra = Date.now();
  notatBoks.classList.add('slettaNotat');
  notatBoks.classList.remove('vanligNotat');
  lagreNotat();
}
export function uSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  denneData.sletta = 'ok';
  notatBoks.classList.remove('slettaNotat');
  notatBoks.classList.add('vanligNotat');
  lagreNotat();
}

export function evigSlettNotat(denneData:Notat, notatBoks:HTMLElement) {
  let bekreft = window.confirm('Sikker du vil sletta den for alltid??');
  if(!bekreft) return;
  denneData.sletta = 'evigSletta';
  notatBoks.remove();
  lagreNotat();
}
