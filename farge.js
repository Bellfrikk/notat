import { lagreNotat } from "./lagreNotat.js";
export function endreFarge(denneData, notatBoks) {
    let fargeNr = fargar.indexOf(denneData.farge);
    if (fargeNr === -1) {
        fargeNr = 0;
    }
    fargeNr++;
    if (fargeNr >= fargar.length) {
        fargeNr = 0;
    }
    denneData.farge = fargar[fargeNr];
    notatBoks.style.backgroundColor = denneData.farge;
    lagreNotat();
}
export function nyFarge(forelderFarge) {
    const nyFargeNr = Math.floor(Math.random() * fargar.length);
    if (fargar[nyFargeNr] === forelderFarge)
        return fargar[nyFargeNr + 1 % fargar.length];
    return fargar[nyFargeNr];
}
const fargar = [
    '#FFF4C2', // gul
    '#DFF3E3', // grøn
    '#DDEBF7', // blå
    '#E8DDF5', // lilla
    '#F8D9E5', // rosa
    '#FBE4D5', // fersken
    '#E5E5E5', // grå
    '#DDF0EE' // turkis
];
