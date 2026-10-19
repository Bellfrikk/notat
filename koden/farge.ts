import { lagreNotat } from "./lagreNotat.js";

export function endreFarge(denneData:Notat, notatBoks:HTMLElement) {
  let fargeNr = fargar.indexOf(denneData.farge);
  if (fargeNr === -1) { fargeNr = 0; }
  fargeNr++;
  if (fargeNr >= fargar.length) { fargeNr = 0; }
  denneData.farge = fargar[fargeNr];
  notatBoks.style.backgroundColor = denneData.farge;
  lagreNotat();
}

export function nyFarge(forelderFarge:string):string { //gir einfarge frå lista som er ulik forelderen
  const nyFargeNr = Math.floor(Math.random() * fargar.length);
  if ( fargar[nyFargeNr] === forelderFarge) return fargar[nyFargeNr+1 % fargar.length];
  return fargar[nyFargeNr];
}

const fargar = [
  '#FFF4C2', // gulconst fargar = [
  '#F4D477', // sennepsgul
  '#C9DFB2', // salviegrøn
  '#AFCBE8', // stålblå
  '#C9B5DF', // dempa lilla
  '#E8B6C4', // gammelrosa
  '#E9B18C', // terrakotta
  '#D5D2CB', // steingrå
  '#A9D5CE', // sjøgrøn

  '#E9C49A', // sand
  '#D99A72', // kopar
  '#B8C6A0', // olivengrøn
  '#8FB8B0', // mørkare turkis
  '#D7A9A0', // leirraud
  '#B6B5D8', // blåfiolett
  '#E6D7A8', // havregul
  '#B9C9D9'  // skiferblå
];